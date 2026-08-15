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
          introduction: 'Durante la semana hemos recordado que Dios no permanece en silencio. El Dios que creo por su palabra, sostiene su verdad y llama a su pueblo a escuchar, tambien se ha revelado de manera suprema en su Hijo. Esta lectura congregacional nos invita a recibir la Palabra de Dios con reverencia, fe y obediencia.',
          mainTruth: 'Dios nos ha hablado fielmente, y su revelacion culmina en Jesucristo, a quien debemos escuchar y obedecer.'
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

  const approvedReadings = {
    '2026-09-01': {
      title: 'Dios habla',
      explanation: 'La Biblia comienza presentandonos a Dios como Creador y Rey. Antes de que exista orden, luz o vida, Dios habla. Su palabra no es debil ni incierta; cumple lo que manda. Esta lectura nos recuerda que la Palabra de Dios no nace de la opinion humana, sino del Dios vivo que gobierna todo. Si Dios crea por su palabra, tambien puede formar, corregir, sostener y renovar a su pueblo por esa misma Palabra.',
      reflectionQuestion: 'Que revela Genesis 1 sobre la autoridad de la Palabra de Dios?',
      application: 'Comienza hoy reconociendo que Dios tiene la primera palabra sobre tu vida, tus decisiones y tu manera de ver el mundo.',
      prayer: 'Senor, ayudame a escuchar tu Palabra con reverencia. Que mi corazon descanse en tu autoridad y responda con obediencia. Amen.',
      keywords: ['creacion', 'autoridad', 'dios habla', 'genesis']
    },
    '2026-09-02': {
      title: 'La Palabra de Dios permanece',
      explanation: 'Todo lo humano es fragil. Nuestros planes, fuerzas y logros son temporales, pero la Palabra de Dios permanece. Isaias nos lleva a mirar mas alla de lo pasajero y confiar en lo eterno. La iglesia necesita esta verdad porque vivimos rodeados de voces cambiantes, opiniones rapidas y promesas inseguras. La Palabra del Senor no envejece ni pierde poder. Lo que Dios ha dicho sigue siendo firme, confiable y suficiente para sostener la fe.',
      reflectionQuestion: 'En que areas has estado confiando mas en lo pasajero que en la Palabra permanente de Dios?',
      application: 'Memoriza o anota una verdad biblica que necesites recordar cuando todo a tu alrededor cambie.',
      prayer: 'Dios eterno, afirmame en tu Palabra. Librame de depender de lo pasajero y ensename a confiar en lo que permanece para siempre. Amen.',
      keywords: ['permanecer', 'isaias', 'confianza', 'eterno']
    },
    '2026-09-03': {
      title: 'La Palabra es verdad',
      explanation: 'Jesus ora al Padre y afirma que su Palabra es verdad. Esta declaracion nos da seguridad: la verdad no depende de la cultura, de emociones cambiantes ni de preferencias personales. Dios mismo define la verdad y la entrega a su pueblo por medio de su Palabra. Ser santificados en la verdad significa que Dios usa las Escrituras para apartarnos, limpiarnos y formarnos para su gloria. La Palabra no solo informa; transforma.',
      reflectionQuestion: 'Que voz compite con la verdad de Dios en tu mente o en tu corazon?',
      application: 'Antes de tomar una decision hoy, preguntate: que dice la Palabra de Dios sobre esto?',
      prayer: 'Padre, santificame en tu verdad. Que tu Palabra corrija mis pensamientos, ordene mis deseos y dirija mis pasos. Amen.',
      keywords: ['verdad', 'santificacion', 'juan', 'palabra']
    },
    '2026-09-04': {
      title: 'Escuchar con fe',
      explanation: 'La fe no surge de la nada. Dios ha establecido que su pueblo escuche el mensaje de Cristo y responda con confianza. Romanos nos recuerda la importancia de anunciar, oir y creer la Palabra. Esto debe despertar gratitud y responsabilidad. Gratitud, porque alguien nos anuncio el evangelio. Responsabilidad, porque otros necesitan escuchar. La Palabra predicada y compartida sigue siendo el medio por el cual Dios llama personas a la fe en Cristo.',
      reflectionQuestion: 'A quien puedes animar esta semana compartiendo una verdad del evangelio?',
      application: 'Ora por una persona especifica y busca una oportunidad sencilla para hablarle de Cristo o invitarle a escuchar la Palabra.',
      prayer: 'Senor, gracias por permitirme escuchar el evangelio. Dame amor y valentia para compartir tu Palabra con otros. Amen.',
      keywords: ['fe', 'evangelio', 'romanos', 'predicacion']
    },
    '2026-09-05': {
      title: 'Guardar la Palabra',
      explanation: 'El salmista no trata la Palabra como informacion distante, sino como tesoro guardado en el corazon. La santidad practica comienza cuando la Palabra de Dios ocupa el centro de nuestros afectos, pensamientos y decisiones. Guardarla no significa solamente leerla, sino recibirla, recordarla y permitir que gobierne nuestra conducta. Una iglesia firme en la Palabra sera una iglesia que aprende a amar lo que Dios ama y rechazar lo que Dios llama pecado.',
      reflectionQuestion: 'Que practica puede ayudarte a guardar la Palabra en tu corazon esta semana?',
      application: 'Escoge un versiculo de la lectura, escribelo y vuelve a leerlo varias veces durante el dia.',
      prayer: 'Senor, guarda mi vida por medio de tu Palabra. Que no solo la lea, sino que la atesore y la obedezca. Amen.',
      keywords: ['guardar', 'salmo 119', 'corazon', 'santidad']
    },
    '2026-09-06': {
      title: 'Dios nos ha hablado por su Hijo',
      explanation: 'Hebreos nos lleva al centro de la revelacion de Dios: Jesucristo. Dios hablo de muchas maneras, pero su Palabra final y suprema se revela en el Hijo. Cristo no es simplemente otro mensajero; es el resplandor de la gloria de Dios y quien sostiene todas las cosas. Por eso, leer la Biblia correctamente nos conduce a adorarlo, confiar en su obra y obedecer su voz. La Palabra escrita nos dirige al Verbo vivo.',
      reflectionQuestion: 'Como cambia tu lectura biblica al recordar que las Escrituras nos conducen a Cristo?',
      application: 'Participa hoy en la lectura congregacional escuchando con fe, reverencia y disposicion a obedecer a Cristo.',
      prayer: 'Padre, gracias por hablarnos en tu Hijo. Abre nuestros oidos para escuchar a Cristo y nuestros corazones para obedecerle. Amen.',
      keywords: ['hebreos', 'cristo', 'revelacion', 'hijo']
    }
  };

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
      title: approvedReadings[date]?.title || `${title} (PLACEHOLDER)`,
      reference,
      version: 'RVR1960',
      bibleText: '',
      explanation: approvedReadings[date]?.explanation || 'PLACEHOLDER: Explicacion biblica breve de 70 a 130 palabras. Este espacio sera reemplazado por contenido pastoral revisado antes de publicarse como definitivo.',
      reflectionQuestion: approvedReadings[date]?.reflectionQuestion || 'PLACEHOLDER: Pregunta breve para meditar en el pasaje.',
      application: approvedReadings[date]?.application || 'PLACEHOLDER: Aplicacion practica para vivir esta verdad hoy.',
      prayer: approvedReadings[date]?.prayer || 'PLACEHOLDER: Oracion breve relacionada directamente con la lectura.',
      keywords: ['palabra', 'discipulado', 'prfwb', week.title.toLowerCase(), ...(approvedReadings[date]?.keywords || [])],
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
