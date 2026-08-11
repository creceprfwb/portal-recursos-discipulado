"""
Descarga el feed publico .ics del calendario de Google de JEEC y lo convierte
a eventos-import.json, listo para subir con el boton "Importar desde Google
Calendar" en admin-eventos.html.

Expande series recurrentes semanales (RRULE:FREQ=WEEKLY) en una entrada por
cada ocurrencia, respetando fechas excluidas (EXDATE) y ocurrencias movidas o
modificadas (RECURRENCE-ID). Las series sin fecha de fin (UNTIL) se expanden
hasta RECURRENCE_HORIZON_DAYS a partir de hoy; vuelve a correr este script
periodicamente para extender el horizonte.

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
RECURRENCE_HORIZON_DAYS = 365

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


def parse_ics_datetime(value: str) -> datetime:
    """Parses a raw DTSTART/DTEND/EXDATE/UNTIL/RECURRENCE-ID value into a
    Puerto Rico local datetime (naive)."""
    value = value.strip()
    if re.fullmatch(r"\d{8}", value):
        return datetime.strptime(value, "%Y%m%d")
    is_utc = value.endswith("Z")
    dt = datetime.strptime(value.rstrip("Z"), "%Y%m%dT%H%M%S")
    if is_utc:
        dt += PUERTO_RICO_UTC_OFFSET
    return dt


def sanitize_id(uid: str) -> str:
    return "gcal-" + re.sub(r"[^a-zA-Z0-9_-]", "-", uid.strip())


def parse_rrule(value: str) -> dict:
    parts = {}
    for chunk in value.split(";"):
        if "=" not in chunk:
            continue
        key, val = chunk.split("=", 1)
        parts[key.strip().upper()] = val.strip()
    return parts


def parse_raw_events(lines):
    """First pass: one dict per VEVENT block with raw (unconverted) fields."""
    raw_events = []
    current = None

    for line in lines:
        if line == "BEGIN:VEVENT":
            current = {"exdates": []}
            continue
        if line == "END:VEVENT":
            if current and current.get("uid") and current.get("dtstart_raw"):
                raw_events.append(current)
            current = None
            continue
        if current is None or ":" not in line:
            continue

        key_part, value = line.split(":", 1)
        key = key_part.split(";")[0]

        if key == "UID":
            current["uid"] = value.strip()
        elif key == "RECURRENCE-ID":
            current["recurrence_id_raw"] = value.strip()
        elif key == "RRULE":
            current["rrule"] = parse_rrule(value)
        elif key == "EXDATE":
            current["exdates"].extend(v.strip() for v in value.split(",") if v.strip())
        elif key == "SUMMARY":
            current["title"] = unescape_text(value)
        elif key == "LOCATION":
            current["location"] = unescape_text(value)
        elif key == "DESCRIPTION":
            current["description"] = unescape_text(value)
        elif key == "DTSTART":
            current["dtstart_raw"] = value.strip()
        elif key == "DTEND":
            current["dtend_raw"] = value.strip()

    return raw_events


def build_event(raw, start_dt: datetime, end_dt: datetime, event_id: str) -> dict:
    return {
        "id": event_id,
        "title": raw.get("title", ""),
        "date": start_dt.strftime("%Y-%m-%d"),
        "start": start_dt.strftime("%H:%M") if raw.get("has_time", True) else "",
        "end": end_dt.strftime("%H:%M") if raw.get("has_time", True) else "",
        "location": raw.get("location", ""),
        "description": raw.get("description", ""),
    }


def expand_events(raw_events):
    by_uid = {}
    for raw in raw_events:
        by_uid.setdefault(raw["uid"], []).append(raw)

    horizon = datetime.now() + timedelta(days=RECURRENCE_HORIZON_DAYS)
    events = []

    for uid, group in by_uid.items():
        masters = [e for e in group if "recurrence_id_raw" not in e]
        overrides = [e for e in group if "recurrence_id_raw" in e]

        for override in overrides:
            start_dt = parse_ics_datetime(override["dtstart_raw"])
            end_dt = parse_ics_datetime(override["dtend_raw"]) if override.get("dtend_raw") else start_dt
            slot_dt = parse_ics_datetime(override["recurrence_id_raw"])
            events.append(build_event(override, start_dt, end_dt, f"{sanitize_id(uid)}-{slot_dt.strftime('%Y%m%d')}"))

        for master in masters:
            start_dt = parse_ics_datetime(master["dtstart_raw"])
            end_dt = parse_ics_datetime(master["dtend_raw"]) if master.get("dtend_raw") else start_dt
            duration = end_dt - start_dt
            base_id = sanitize_id(uid)
            rrule = master.get("rrule")

            excluded = {parse_ics_datetime(v).strftime("%Y%m%d") for v in master.get("exdates", [])}
            excluded |= {
                parse_ics_datetime(o["recurrence_id_raw"]).strftime("%Y%m%d")
                for o in overrides
            }

            if not rrule:
                events.append(build_event(master, start_dt, end_dt, base_id))
                continue

            if rrule.get("FREQ") != "WEEKLY":
                # Only weekly recurrence shows up in this calendar today; fall
                # back to a single event so nothing is silently dropped.
                events.append(build_event(master, start_dt, end_dt, base_id))
                continue

            until_dt = parse_ics_datetime(rrule["UNTIL"]) if "UNTIL" in rrule else horizon
            until_dt = min(until_dt, horizon)

            occurrence = start_dt
            while occurrence <= until_dt:
                if occurrence.strftime("%Y%m%d") not in excluded:
                    occ_end = occurrence + duration
                    events.append(build_event(master, occurrence, occ_end, f"{base_id}-{occurrence.strftime('%Y%m%d')}"))
                occurrence += timedelta(days=7)

    return [e for e in events if e["title"] and e["date"]]


def main():
    print(f"Descargando {ICS_URL} ...")
    raw = fetch_ics(ICS_URL)
    lines = unfold_lines(raw)
    raw_events = parse_raw_events(lines)
    events = expand_events(raw_events)
    events.sort(key=lambda e: (e["date"], e["start"]))
    OUTPUT_PATH.write_text(json.dumps({"events": events}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Se encontraron {len(raw_events)} evento(s) en el calendario ({len(events)} ocurrencias tras expandir repeticiones). Guardado en {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
