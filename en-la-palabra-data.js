(function () {
  const month = {
    year: 2026,
    month: 9,
    monthKey: '2026-09',
    monthName: 'Septiembre',
    theme: 'Firmes en la Palabra',
    description: 'PLACEHOLDER: Durante septiembre, las congregaciones de PRFWB seran animadas a conocer, creer, meditar y obedecer la Palabra de Dios, reconociendo que las Escrituras nos conducen a Cristo y forman nuestra vida como discipulos.',
    weeks: [
      {
        title: 'Dios nos ha hablado',
        start: '2026-09-01',
        end: '2026-09-06',
        sunday: {
          date: '2026-09-06',
          theme: 'Dios nos ha hablado por su Palabra',
          reference: 'Hebreos 1:1-4',
          version: 'RVR1960',
          bibleText: '',
          introduction: 'PLACEHOLDER: Introduccion pastoral para preparar la lectura congregacional.',
          mainTruth: 'PLACEHOLDER: Dios se ha revelado fielmente y nos llama a escucharle.'
        }
      },
      {
        title: 'La Palabra transforma nuestra mente y corazon',
        start: '2026-09-07',
        end: '2026-09-13',
        sunday: {
          date: '2026-09-13',
          theme: 'Transformados por la Palabra',
          reference: 'Romanos 12:1-2',
          version: 'RVR1960',
          bibleText: '',
          introduction: 'PLACEHOLDER: Introduccion pastoral para la congregacion.',
          mainTruth: 'PLACEHOLDER: La Palabra renueva nuestra mente para vivir conforme a la voluntad de Dios.'
        }
      },
      {
        title: 'Cristo y las Escrituras',
        start: '2026-09-14',
        end: '2026-09-20',
        sunday: {
          date: '2026-09-20',
          theme: 'Las Escrituras nos conducen a Cristo',
          reference: 'Lucas 24:25-27',
          version: 'RVR1960',
          bibleText: '',
          introduction: 'PLACEHOLDER: Introduccion pastoral para dirigir la mirada de la iglesia a Cristo.',
          mainTruth: 'PLACEHOLDER: Toda la Escritura apunta al plan redentor de Dios cumplido en Cristo.'
        }
      },
      {
        title: 'Oidores y hacedores de la Palabra',
        start: '2026-09-21',
        end: '2026-09-27',
        sunday: {
          date: '2026-09-27',
          theme: 'Obedecer la Palabra',
          reference: 'Santiago 1:22-25',
          version: 'RVR1960',
          bibleText: '',
          introduction: 'PLACEHOLDER: Introduccion pastoral para llamar a obediencia gozosa.',
          mainTruth: 'PLACEHOLDER: La fe viva escucha la Palabra y responde con obediencia.'
        }
      },
      {
        title: 'Permaneciendo firmes en la verdad',
        start: '2026-09-28',
        end: '2026-09-30',
        sunday: {
          date: '2026-10-04',
          theme: 'Permanecer firmes en la verdad',
          reference: '2 Timoteo 3:14-17',
          version: 'RVR1960',
          bibleText: '',
          introduction: 'PLACEHOLDER: Introduccion pastoral para cerrar el enfasis mensual.',
          mainTruth: 'PLACEHOLDER: Las Escrituras preparan al pueblo de Dios para toda buena obra.'
        }
      }
    ]
  };

  const dailySeeds = [
    ['2026-09-01', 'Dios habla', 'Genesis 1:1-5'],
    ['2026-09-02', 'La palabra de Dios permanece', 'Isaias 40:6-8'],
    ['2026-09-03', 'La Palabra es verdad', 'Juan 17:17'],
    ['2026-09-04', 'Escuchar con fe', 'Romanos 10:14-17'],
    ['2026-09-05', 'Guardar la Palabra', 'Salmo 119:9-11'],
    ['2026-09-06', 'Dios nos ha hablado por su Hijo', 'Hebreos 1:1-4'],
    ['2026-09-07', 'Meditar dia y noche', 'Salmo 1:1-3'],
    ['2026-09-08', 'Lampara para mis pies', 'Salmo 119:105'],
    ['2026-09-09', 'Renovados en la mente', 'Romanos 12:1-2'],
    ['2026-09-10', 'La Palabra discierne el corazon', 'Hebreos 4:12-13'],
    ['2026-09-11', 'Recibir con mansedumbre', 'Santiago 1:19-21'],
    ['2026-09-12', 'Permanecer en la verdad', 'Juan 8:31-32'],
    ['2026-09-13', 'Transformados por la Palabra', 'Romanos 12:1-2'],
    ['2026-09-14', 'Cristo anunciado', 'Lucas 24:25-27'],
    ['2026-09-15', 'Las Escrituras dan testimonio', 'Juan 5:39-40'],
    ['2026-09-16', 'El Verbo hecho carne', 'Juan 1:1-14'],
    ['2026-09-17', 'El evangelio prometido', 'Romanos 1:1-6'],
    ['2026-09-18', 'Cristo crucificado', '1 Corintios 1:18-25'],
    ['2026-09-19', 'Cristo resucitado', '1 Corintios 15:1-8'],
    ['2026-09-20', 'Las Escrituras nos conducen a Cristo', 'Lucas 24:25-27'],
    ['2026-09-21', 'Oidores y hacedores', 'Santiago 1:22-25'],
    ['2026-09-22', 'Obedecer por amor', 'Juan 14:21-24'],
    ['2026-09-23', 'Fruto de la Palabra', 'Colosenses 3:12-17'],
    ['2026-09-24', 'Enseñar y amonestar', 'Colosenses 3:16'],
    ['2026-09-25', 'Practicar la justicia', '1 Juan 3:16-18'],
    ['2026-09-26', 'Perseverar en la doctrina', 'Hechos 2:42-47'],
    ['2026-09-27', 'Obedecer la Palabra', 'Santiago 1:22-25'],
    ['2026-09-28', 'Continua en lo aprendido', '2 Timoteo 3:14-15'],
    ['2026-09-29', 'Inspirada por Dios', '2 Timoteo 3:16-17'],
    ['2026-09-30', 'Reten la forma de las sanas palabras', '2 Timoteo 1:13-14']
  ];

  function findWeek(date) {
    return month.weeks.find((week) => date >= week.start && date <= week.end) || month.weeks[month.weeks.length - 1];
  }

  const readings = dailySeeds.map(([date, title, reference]) => {
    const week = findWeek(date);
    const sunday = week.sunday.date === date;
    return {
      date,
      monthTheme: month.theme,
      weekTheme: week.title,
      title: `${title} (PLACEHOLDER)`,
      reference,
      version: 'RVR1960',
      bibleText: '',
      explanation: 'PLACEHOLDER: Explicacion biblica breve de 70 a 130 palabras. Este espacio sera reemplazado por contenido pastoral revisado antes de publicarse como definitivo.',
      reflectionQuestion: 'PLACEHOLDER: Pregunta breve para meditar en el pasaje.',
      application: 'PLACEHOLDER: Aplicacion practica para vivir esta verdad hoy.',
      prayer: 'PLACEHOLDER: Oracion breve relacionada directamente con la lectura.',
      keywords: ['palabra', 'discipulado', 'prfwb', week.title.toLowerCase()],
      sunday,
      sundayReading: sunday ? week.sunday : undefined
    };
  });

  window.enLaPalabraData = {
    version: 'PLACEHOLDER-2026-09',
    months: [month],
    readings
  };
})();
