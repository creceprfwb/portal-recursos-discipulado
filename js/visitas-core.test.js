import { describe, expect, it } from 'vitest';
import './visitas-core.js';

const core = globalThis.VisitasCore;

describe('normalizacion', () => {
  it('ignora acentos, mayusculas y espacios en los nombres', () => {
    expect(core.normalizeName('  María  José PÉREZ ')).toBe('maria jose perez');
  });

  it('reduce el telefono a digitos y quita el 1 inicial', () => {
    expect(core.phoneKey('(787) 555-1234')).toBe('7875551234');
    expect(core.phoneKey('+1 787 555 1234')).toBe('7875551234');
  });

  it('valida telefono y correo', () => {
    expect(core.isValidPhone('787-555-1234')).toBe(true);
    expect(core.isValidPhone('123')).toBe(false);
    expect(core.isValidEmail('ana@correo.com')).toBe(true);
    expect(core.isValidEmail('ana@correo')).toBe(false);
  });
});

describe('fechas en Puerto Rico', () => {
  it('usa el dia de Puerto Rico y no el de UTC', () => {
    // 02:30 UTC del 5 de octubre todavia es 4 de octubre en Puerto Rico.
    expect(core.dateKey(new Date('2026-10-05T02:30:00Z'))).toBe('2026-10-04');
    expect(core.timeKey(new Date('2026-10-05T02:30:00Z'))).toBe('22:30');
  });

  it('convierte fecha y hora locales a un instante real', () => {
    expect(core.fromLocalInputs('2026-10-04', '10:00').toISOString()).toBe('2026-10-04T14:00:00.000Z');
  });

  it('calcula los limites del dia y suma dias', () => {
    expect(core.dayStart('2026-10-04').toISOString()).toBe('2026-10-04T04:00:00.000Z');
    expect(core.dayEnd('2026-10-04').toISOString()).toBe('2026-10-05T04:00:00.000Z');
    expect(core.addDays('2026-10-01', -1)).toBe('2026-09-30');
  });

  it('calcula periodos predefinidos', () => {
    const now = new Date('2026-10-15T15:00:00Z');
    expect(core.periodPreset('mes', now)).toEqual({ from: '2026-10-01', to: '2026-10-15' });
    expect(core.periodPreset('mes-pasado', now)).toEqual({ from: '2026-09-01', to: '2026-09-30' });
    expect(core.periodPreset('7d', now)).toEqual({ from: '2026-10-09', to: '2026-10-15' });
  });
});

describe('metricas', () => {
  const people = [
    { id: 'ana', name: 'Ana', firstVisitAt: '2026-09-06T14:00:00Z', followUpStatus: 'contactado', nextActionDate: '2026-10-01' },
    { id: 'luis', name: 'Luis', firstVisitAt: '2026-10-04T14:00:00Z', followUpStatus: 'pendiente' },
    { id: 'hijo', name: 'Hijo', firstVisitAt: '2026-10-04T14:00:00Z', followUpStatus: 'pendiente', trackFollowUp: false },
    { id: 'viejo', name: 'Duplicado', firstVisitAt: '2026-10-04T14:00:00Z', followUpStatus: 'pendiente', mergedInto: 'luis' }
  ];
  const records = [
    { personId: 'ana', visitedAt: '2026-09-06T14:00:00Z' },
    { personId: 'ana', visitedAt: '2026-10-04T14:00:00Z' },
    { personId: 'ana', visitedAt: '2026-10-11T14:00:00Z' },
    { personId: 'luis', visitedAt: '2026-10-04T14:00:00Z' },
    { personId: 'hijo', visitedAt: '2026-10-04T14:00:00Z' }
  ];

  it('distingue visitas de personas unicas', () => {
    const metrics = core.computeMetrics({ people, records, fromKey: '2026-10-01', toKey: '2026-10-31', todayKey: '2026-10-15' });
    expect(metrics.visits).toBe(4);
    expect(metrics.uniquePeople).toBe(3);
    expect(metrics.newVisitors).toBe(2);
    expect(metrics.returning).toBe(1);
  });

  it('cuenta pendientes y vencidos solo de quienes llevan seguimiento', () => {
    const metrics = core.computeMetrics({ people, records, fromKey: '2026-10-01', toKey: '2026-10-31', todayKey: '2026-10-15' });
    expect(metrics.pendingIds).toEqual(['luis']);
    expect(metrics.overdueIds).toEqual(['ana']);
  });
});

describe('busqueda y duplicados', () => {
  const people = [
    { id: 'a', name: 'Ana Rivera', phoneKey: '7875551234', emailKey: '', followUpStatus: 'pendiente', assignedTo: 'u1', lastVisitAt: '2026-10-04T14:00:00Z' },
    { id: 'b', name: 'Carlos Rivera', phoneKey: '7875551234', emailKey: 'carlos@correo.com', followUpStatus: 'contactado', lastVisitAt: '2026-09-06T14:00:00Z' },
    { id: 'c', name: 'Ana Rivera', phoneKey: '7875551234', mergedInto: 'a' }
  ];

  it('busca por nombre o telefono y filtra por estado, responsable y fecha', () => {
    expect(core.filterPeople(people, { text: 'rivera' }).map((p) => p.id)).toEqual(['a', 'b']);
    expect(core.filterPeople(people, { text: '555-1234' }).length).toBe(2);
    expect(core.filterPeople(people, { status: 'contactado' }).map((p) => p.id)).toEqual(['b']);
    expect(core.filterPeople(people, { assignedTo: 'u1' }).map((p) => p.id)).toEqual(['a']);
    expect(core.filterPeople(people, { assignedTo: 'sin-asignar' }).map((p) => p.id)).toEqual(['b']);
    expect(core.filterPeople(people, { fromKey: '2026-10-01' }).map((p) => p.id)).toEqual(['a']);
  });

  it('no trata como la misma persona a quien solo comparte el telefono', () => {
    const matches = core.findMatches(people, { name: 'ana rivéra', phone: '787 555 1234', email: '' });
    expect(matches.map((m) => [m.person.id, m.sameName])).toEqual([['a', true], ['b', false]]);
  });
});

describe('exportacion y WhatsApp', () => {
  it('escapa comas, comillas y formulas en el CSV', () => {
    const csv = core.toCsv(
      [{ key: 'name', label: 'Nombre' }, { key: 'note', label: 'Nota' }],
      [{ name: 'Pérez, Ana', note: '=SUMA(A1)' }, { name: 'Luis "Tito"', note: '' }]
    );
    expect(csv).toBe('﻿Nombre,Nota\r\n"Pérez, Ana",\'=SUMA(A1)\r\n"Luis ""Tito""",');
  });

  it('prepara el enlace de WhatsApp con el codigo de pais', () => {
    expect(core.whatsAppHref('787-555-1234', 'Hola Ana')).toBe('https://wa.me/17875551234?text=Hola%20Ana');
    expect(core.welcomeMessage('Ana Rivera', 'Marta')).toContain('Hola Ana, ');
  });
});
