/**
 * Logica pura del modulo "Visitas y seguimiento" (sin Firebase ni DOM).
 * La usan bienvenida.html y admin-visitas.html, y se prueba en
 * js/visitas-core.test.js.
 */
(function (root) {
  var TIME_ZONE = 'America/Puerto_Rico';
  // Puerto Rico no cambia la hora: siempre UTC-4.
  var UTC_OFFSET = '-04:00';
  var DAY_MS = 24 * 60 * 60 * 1000;
  var CHURCH_ID = 'jeec';
  var CHURCH_NAME = 'Jesús es el Centro';
  // Numero de WhatsApp de la iglesia (solo digitos, con codigo de area).
  // Vacio = el formulario no muestra el boton "Escribenos por WhatsApp".
  var CHURCH_WHATSAPP = '7876322693';

  var STATUSES = [
    { id: 'pendiente', label: 'Pendiente de contactar' },
    { id: 'contactado', label: 'Contactado' },
    { id: 'regreso', label: 'Volvió a visitar' },
    { id: 'discipulado', label: 'Interesado en discipulado' },
    { id: 'pausado', label: 'Seguimiento pausado' }
  ];

  var ROLES = [
    { id: 'bienvenida', label: 'Equipo de bienvenida' },
    { id: 'responsable', label: 'Responsable de seguimiento' },
    { id: 'pastor', label: 'Pastor' },
    { id: 'admin', label: 'Administrador' }
  ];

  var CONTACT_METHODS = [
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'llamada', label: 'Llamada' },
    { id: 'texto', label: 'Mensaje de texto' },
    { id: 'correo', label: 'Correo electrónico' }
  ];

  var CONTACT_TYPES = [
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'llamada', label: 'Llamada' },
    { id: 'texto', label: 'Mensaje de texto' },
    { id: 'correo', label: 'Correo' },
    { id: 'persona', label: 'En persona' },
    { id: 'nota', label: 'Nota' }
  ];

  function labelOf(list, id, fallback) {
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === id) return list[i].label;
    }
    return fallback === undefined ? String(id || '') : fallback;
  }

  function normalizeName(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function phoneKey(value) {
    var digits = String(value || '').replace(/\D/g, '');
    if (digits.length === 11 && digits.charAt(0) === '1') digits = digits.slice(1);
    return digits;
  }

  function emailKey(value) {
    return String(value || '').trim().toLowerCase();
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
  }

  function isValidPhone(value) {
    var digits = phoneKey(value);
    return digits.length >= 7 && digits.length <= 15;
  }

  function toDate(value) {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value.toDate === 'function') return value.toDate();
    var date = new Date(value);
    return isNaN(date.getTime()) ? null : date;
  }

  /** 'YYYY-MM-DD' del dia en Puerto Rico. */
  function dateKey(value) {
    var date = toDate(value);
    if (!date) return '';
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }

  function dayStart(key) {
    return new Date(key + 'T00:00:00' + UTC_OFFSET);
  }

  /** Limite exclusivo: inicio del dia siguiente. */
  function dayEnd(key) {
    return new Date(dayStart(key).getTime() + DAY_MS);
  }

  function addDays(key, amount) {
    return dateKey(new Date(dayStart(key).getTime() + amount * DAY_MS + DAY_MS / 2));
  }

  /** Hora 'HH:MM' en Puerto Rico. */
  function timeKey(value) {
    var date = toDate(value);
    if (!date) return '';
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: TIME_ZONE,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  }

  /** Convierte fecha y hora escritas en Puerto Rico a un Date real. */
  function fromLocalInputs(key, time) {
    return new Date(key + 'T' + (time || '12:00') + ':00' + UTC_OFFSET);
  }

  function formatDate(value) {
    var date = toDate(value);
    if (!date) return '';
    return date.toLocaleDateString('es-PR', {
      timeZone: TIME_ZONE,
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function formatDateTime(value) {
    var date = toDate(value);
    if (!date) return '';
    return date.toLocaleString('es-PR', {
      timeZone: TIME_ZONE,
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  function formatTime(value) {
    var date = toDate(value);
    if (!date) return '';
    return date.toLocaleTimeString('es-PR', { timeZone: TIME_ZONE, hour: 'numeric', minute: '2-digit' });
  }

  function formatDateKey(key) {
    return key ? formatDate(new Date(key + 'T12:00:00' + UTC_OFFSET)) : '';
  }

  function periodPreset(name, now) {
    var today = dateKey(now || new Date());
    var year = today.slice(0, 4);
    var month = today.slice(5, 7);
    if (name === 'hoy') return { from: today, to: today };
    if (name === '7d') return { from: addDays(today, -6), to: today };
    if (name === '30d') return { from: addDays(today, -29), to: today };
    if (name === 'anio') return { from: year + '-01-01', to: today };
    if (name === 'mes-pasado') {
      var lastOfPrevious = addDays(year + '-' + month + '-01', -1);
      return { from: lastOfPrevious.slice(0, 8) + '01', to: lastOfPrevious };
    }
    return { from: year + '-' + month + '-01', to: today };
  }

  function isActivePerson(person) {
    return Boolean(person) && !person.mergedInto;
  }

  function tracksFollowUp(person) {
    return isActivePerson(person) && person.trackFollowUp !== false;
  }

  function isOverdue(person, todayKey) {
    return tracksFollowUp(person) &&
      Boolean(person.nextActionDate) &&
      person.nextActionDate < todayKey &&
      person.followUpStatus !== 'pausado';
  }

  /**
   * Metricas del periodo [fromKey, toKey] (dias de Puerto Rico, inclusivos).
   * "visits" cuenta registros de visita; "uniquePeople" cuenta personas.
   */
  function computeMetrics(input) {
    var people = (input.people || []).filter(isActivePerson);
    var todayKey = input.todayKey || dateKey(new Date());
    var fromKey = input.fromKey;
    var toKey = input.toKey;
    var peopleById = {};
    people.forEach(function (person) { peopleById[person.id] = person; });

    var visits = 0;
    var unique = {};
    var returning = {};
    (input.records || []).forEach(function (record) {
      var key = dateKey(record.visitedAt);
      if (!key || key < fromKey || key > toKey) return;
      visits += 1;
      unique[record.personId] = true;
      var person = peopleById[record.personId];
      if (person && person.firstVisitAt && key > dateKey(person.firstVisitAt)) {
        returning[record.personId] = true;
      }
    });

    var newVisitors = people.filter(function (person) {
      var key = dateKey(person.firstVisitAt);
      return key && key >= fromKey && key <= toKey;
    });
    var pending = people.filter(function (person) {
      return tracksFollowUp(person) && person.followUpStatus === 'pendiente';
    });
    var overdue = people.filter(function (person) { return isOverdue(person, todayKey); });

    return {
      visits: visits,
      uniquePeople: Object.keys(unique).length,
      newVisitors: newVisitors.length,
      returning: Object.keys(returning).length,
      pending: pending.length,
      overdue: overdue.length,
      pendingIds: pending.map(function (person) { return person.id; }),
      overdueIds: overdue.map(function (person) { return person.id; })
    };
  }

  function filterPeople(people, filters) {
    var f = filters || {};
    var text = normalizeName(f.text);
    var digits = String(f.text || '').replace(/\D/g, '');
    var todayKey = f.todayKey || dateKey(new Date());
    return (people || []).filter(function (person) {
      if (!isActivePerson(person)) return false;
      if (text || digits) {
        var byName = text && normalizeName(person.name).indexOf(text) !== -1;
        var byPhone = digits.length >= 3 && String(person.phoneKey || '').indexOf(digits) !== -1;
        if (!byName && !byPhone) return false;
      }
      if (f.status === 'vencido') {
        if (!isOverdue(person, todayKey)) return false;
      } else if (f.status && person.followUpStatus !== f.status) {
        return false;
      }
      if (f.assignedTo === 'sin-asignar') {
        if (person.assignedTo) return false;
      } else if (f.assignedTo && person.assignedTo !== f.assignedTo) {
        return false;
      }
      if (f.fromKey || f.toKey) {
        var last = dateKey(person.lastVisitAt);
        if (!last) return false;
        if (f.fromKey && last < f.fromKey) return false;
        if (f.toKey && last > f.toKey) return false;
      }
      return true;
    });
  }

  /**
   * Personas que comparten telefono o correo con los datos indicados.
   * "sameName" marca al que ademas coincide en nombre (muy probablemente
   * la misma persona). Los demas son solo posibles duplicados: un telefono
   * familiar compartido no basta para combinarlos.
   */
  function findMatches(people, data) {
    var name = normalizeName(data.name);
    var phone = phoneKey(data.phone);
    var email = emailKey(data.email);
    var matches = [];
    (people || []).forEach(function (person) {
      if (!isActivePerson(person)) return;
      var byPhone = Boolean(phone) && person.phoneKey === phone;
      var byEmail = Boolean(email) && person.emailKey === email;
      if (!byPhone && !byEmail) return;
      matches.push({
        person: person,
        byPhone: byPhone,
        byEmail: byEmail,
        sameName: Boolean(name) && normalizeName(person.name) === name
      });
    });
    matches.sort(function (a, b) { return Number(b.sameName) - Number(a.sameName); });
    return matches;
  }

  function csvCell(value) {
    var text = value === null || value === undefined ? '' : String(value);
    // Evita que Excel interprete datos de visitantes como formulas.
    if (/^[=+\-@\t\r]/.test(text)) text = "'" + text;
    if (/[",\r\n]/.test(text)) text = '"' + text.replace(/"/g, '""') + '"';
    return text;
  }

  function toCsv(columns, rows) {
    var lines = [columns.map(function (column) { return csvCell(column.label); }).join(',')];
    (rows || []).forEach(function (row) {
      lines.push(columns.map(function (column) { return csvCell(row[column.key]); }).join(','));
    });
    // BOM para que Excel abra los acentos correctamente.
    return '﻿' + lines.join('\r\n');
  }

  function whatsAppHref(phone, message) {
    var clean = String(phone || '').replace(/\D/g, '');
    var withCountry = clean.length === 10 ? '1' + clean : clean;
    return 'https://wa.me/' + withCountry + '?text=' + encodeURIComponent(message || '');
  }

  function firstName(name) {
    return String(name || '').trim().split(/\s+/)[0] || '';
  }

  function welcomeMessage(personName, senderName) {
    var greeting = firstName(personName);
    return 'Hola' + (greeting ? ' ' + greeting : '') + ', ¡Dios te bendiga! ' +
      'Te saluda ' + (senderName || 'el equipo de bienvenida') + ' de la iglesia ' + CHURCH_NAME + '. ' +
      'Gracias por visitarnos; fue una alegría tenerte con nosotros. ' +
      '¿Hay algo por lo que podamos orar o en lo que podamos ayudarte? ' +
      '¡Esperamos verte pronto!';
  }

  root.VisitasCore = {
    TIME_ZONE: TIME_ZONE,
    CHURCH_ID: CHURCH_ID,
    CHURCH_NAME: CHURCH_NAME,
    CHURCH_WHATSAPP: CHURCH_WHATSAPP,
    STATUSES: STATUSES,
    ROLES: ROLES,
    CONTACT_METHODS: CONTACT_METHODS,
    CONTACT_TYPES: CONTACT_TYPES,
    labelOf: labelOf,
    normalizeName: normalizeName,
    phoneKey: phoneKey,
    emailKey: emailKey,
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    toDate: toDate,
    dateKey: dateKey,
    timeKey: timeKey,
    dayStart: dayStart,
    dayEnd: dayEnd,
    addDays: addDays,
    fromLocalInputs: fromLocalInputs,
    formatDate: formatDate,
    formatDateTime: formatDateTime,
    formatTime: formatTime,
    formatDateKey: formatDateKey,
    periodPreset: periodPreset,
    isActivePerson: isActivePerson,
    tracksFollowUp: tracksFollowUp,
    isOverdue: isOverdue,
    computeMetrics: computeMetrics,
    filterPeople: filterPeople,
    findMatches: findMatches,
    toCsv: toCsv,
    whatsAppHref: whatsAppHref,
    welcomeMessage: welcomeMessage
  };
})(typeof window !== 'undefined' ? window : globalThis);
