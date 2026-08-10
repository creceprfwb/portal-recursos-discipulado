/*
  PRFWB - Sincronizacion de estacionamiento con Google Calendar

  Pasos:
  1. Entra a https://script.google.com y crea un proyecto nuevo.
  2. Pega este codigo en Code.gs.
  3. Cambia CALENDAR_ID por el ID del calendario de JEEC o usa 'primary'.
  4. Deploy > New deployment > Web app.
  5. Execute as: Me.
  6. Who has access: Anyone with the link.
  7. Copia la URL terminada en /exec y pegala en la pagina de estacionamiento.
*/

const CALENDAR_ID = 'jeeccalendario@gmail.com';
const TIME_ZONE = 'America/Puerto_Rico';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action || 'upsert';
    const assignment = body.assignment || {};

    if (!assignment.id) {
      return jsonResponse({ ok: false, error: 'Falta assignment.id' });
    }

    if (action === 'delete') {
      deleteCalendarEvent_(assignment.id);
      return jsonResponse({ ok: true, action: 'delete' });
    }

    const event = upsertCalendarEvent_(assignment);
    return jsonResponse({
      ok: true,
      action: 'upsert',
      eventId: event.getId(),
      title: event.getTitle()
    });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

function upsertCalendarEvent_(assignment) {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  const props = PropertiesService.getScriptProperties();
  const key = `parking_${assignment.id}`;
  const savedEventId = props.getProperty(key);

  const start = parseDateTime_(assignment.date, assignment.start);
  const end = parseDateTime_(assignment.date, assignment.end);
  const title = `Estacionamiento - ${assignment.service || 'Servicio'}`;
  const description = [
    `Area: ${assignment.role || 'Sin area'}`,
    `Servidor: ${assignment.serverName || 'Sin asignar'}`,
    `Telefono: ${assignment.serverPhone || 'No registrado'}`,
    `Estado: ${assignment.status || 'open'}`,
    `Notas: ${assignment.notes || ''}`,
    '',
    'Creado desde el portal PRFWB.'
  ].join('\n');

  let event = savedEventId ? getEventById_(calendar, savedEventId) : null;

  if (event) {
    event.setTitle(title);
    event.setTime(start, end);
    event.setLocation(assignment.location || 'Jesus es el Centro');
    event.setDescription(description);
  } else {
    event = calendar.createEvent(title, start, end, {
      location: assignment.location || 'Jesus es el Centro',
      description
    });
    props.setProperty(key, event.getId());
  }

  return event;
}

function deleteCalendarEvent_(assignmentId) {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  const props = PropertiesService.getScriptProperties();
  const key = `parking_${assignmentId}`;
  const savedEventId = props.getProperty(key);
  const event = savedEventId ? getEventById_(calendar, savedEventId) : null;

  if (event) {
    event.deleteEvent();
  }

  props.deleteProperty(key);
}

function getEventById_(calendar, eventId) {
  try {
    return calendar.getEventById(eventId);
  } catch (error) {
    return null;
  }
}

function parseDateTime_(dateValue, timeValue) {
  const parts = String(dateValue || '').split('-').map(Number);
  const timeParts = String(timeValue || '00:00').split(':').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2], timeParts[0], timeParts[1] || 0, 0);
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
