"""
Descarga el feed publico .ics del calendario de Google de JEEC y lo convierte
a eventos-import.json, listo para subir con el boton "Importar desde Google
Calendar" en admin-eventos.html.

Uso:
    python scripts/export_google_calendar.py
"""

import json
import re
import urllib.request
from datetime import datetime, timedelta
from pathlib import Path

# Puerto Rico (AST) has no daylight saving time, always UTC-4.
PUERTO_RICO_UTC_OFFSET = timedelta(hours=-4)

CALENDAR_ID = "jeeccalendario@gmail.com"
ICS_URL = (
    "https://calendar.google.com/calendar/ical/"
    + CALENDAR_ID.replace("@", "%40")
    + "/public/basic.ics"
)
OUTPUT_PATH = Path(__file__).resolve().parent.parent / "eventos-import.json"


def fetch_ics(url: str) -> str:
    with urllib.request.urlopen(url) as response:
        return response.read().decode("utf-8")


def unfold_lines(raw: str):
    lines = raw.replace("\r\n", "\n").split("\n")
    unfolded = []
    for line in lines:
        if line.startswith((" ", "\t")) and unfolded:
            unfolded[-1] += line[1:]
        else:
            unfolded.append(line)
    return unfolded


def unescape_text(value: str) -> str:
    return (
        value.replace("\\n", "\n")
        .replace("\\N", "\n")
        .replace("\\,", ",")
        .replace("\\;", ";")
        .replace("\\\\", "\\")
    )


def parse_datetime(value: str):
    """Returns (date, time) as ('YYYY-MM-DD', 'HH:MM' or ''), converted to Puerto Rico time."""
    value = value.strip()
    if re.fullmatch(r"\d{8}", value):
        dt = datetime.strptime(value, "%Y%m%d")
        return dt.strftime("%Y-%m-%d"), ""
    is_utc = value.endswith("Z")
    dt = datetime.strptime(value.rstrip("Z"), "%Y%m%dT%H%M%S")
    if is_utc:
        # DTSTART/DTEND with a trailing Z are UTC; everything else in this
        # calendar already uses TZID=America/Puerto_Rico (local time).
        dt += PUERTO_RICO_UTC_OFFSET
    return dt.strftime("%Y-%m-%d"), dt.strftime("%H:%M")


def parse_events(lines):
    events = []
    current = None

    for line in lines:
        if line == "BEGIN:VEVENT":
            current = {}
            continue
        if line == "END:VEVENT":
            if current and current.get("title") and current.get("date"):
                events.append(current)
            current = None
            continue
        if current is None or ":" not in line:
            continue

        key_part, value = line.split(":", 1)
        key = key_part.split(";")[0]

        if key == "SUMMARY":
            current["title"] = unescape_text(value)
        elif key == "LOCATION":
            current["location"] = unescape_text(value)
        elif key == "DESCRIPTION":
            current["description"] = unescape_text(value)
        elif key == "DTSTART":
            date, start = parse_datetime(value)
            current["date"] = date
            current["start"] = start
        elif key == "DTEND":
            _, end = parse_datetime(value)
            current["end"] = end

    for event in events:
        event.setdefault("start", "")
        event.setdefault("end", "")
        event.setdefault("location", "")
        event.setdefault("description", "")

    return events


def main():
    print(f"Descargando {ICS_URL} ...")
    raw = fetch_ics(ICS_URL)
    lines = unfold_lines(raw)
    events = parse_events(lines)
    OUTPUT_PATH.write_text(json.dumps({"events": events}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Se encontraron {len(events)} evento(s). Guardado en {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
