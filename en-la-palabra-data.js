(function () {
  const BIBLE_VERSION = 'RV1909 - Edicion de lectura PRFWB';
  const bibleTextSource = 'Texto basado en Reina-Valera 1909, dominio publico. Edicion de lectura PRFWB con actualizacion minima de ortografia/vocabulario.';
  const sundayTexts = {
    'Isaias 6:1-8': `En el ano que murio el rey Uzias vi yo al Senor sentado sobre un trono alto y sublime, y sus faldas llenaban el templo.
Y encima de el estaban serafines; cada uno tenia seis alas: con dos cubrian sus rostros, con dos cubrian sus pies, y con dos volaban.
Y el uno al otro daba voces, diciendo: Santo, santo, santo, Jehova de los ejercitos: toda la tierra esta llena de su gloria.
Y los quiciales de las puertas se estremecieron con la voz del que clamaba, y la casa se lleno de humo.
Entonces dije: Ay de mi! que soy muerto; porque siendo hombre inmundo de labios, y habitando en medio de pueblo que tiene labios inmundos, han visto mis ojos al Rey, Jehova de los ejercitos.
Y volo hacia mi uno de los serafines, teniendo en su mano un carbon encendido, tomado del altar con unas tenazas.
Y tocando con el sobre mi boca, dijo: He aqui que esto toco tus labios, y es quitada tu culpa, y limpio tu pecado.
Despues oi la voz del Senor, que decia: A quien enviare, y quien ira por nosotros? Entonces respondi yo: Heme aqui, enviame a mi.`,
    '2 Corintios 5:17-21': `De modo que si alguno esta en Cristo, nueva criatura es: las cosas viejas pasaron; he aqui todas son hechas nuevas.
Y todo esto es de Dios, el cual nos reconcilio consigo por Cristo, y nos dio el ministerio de la reconciliacion.
Porque ciertamente Dios estaba en Cristo reconciliando el mundo consigo, no imputandoles sus pecados, y puso en nosotros la palabra de la reconciliacion.
Asi que somos embajadores en nombre de Cristo, como si Dios rogase por medio de nosotros; les rogamos en nombre de Cristo: Reconciliense con Dios.
Al que no conocio pecado, por nosotros lo hizo pecado, para que nosotros fuesemos hechos justicia de Dios en el.`,
    'Efesios 4:11-16': `Y el mismo dio unos, ciertamente apostoles; y otros, profetas; y otros, evangelistas; y otros, pastores y maestros;
para perfeccion de los santos, para la obra del ministerio, para edificacion del cuerpo de Cristo;
hasta que todos lleguemos a la unidad de la fe y del conocimiento del Hijo de Dios, a un varon perfecto, a la medida de la edad de la plenitud de Cristo.
Que ya no seamos ninos fluctuantes, llevados por doquiera de todo viento de doctrina, por estratagema de hombres que, para enganar, emplean con astucia los artificios del error.
Antes siguiendo la verdad en amor, crezcamos en todas cosas en aquel que es la cabeza, a saber, Cristo;
del cual todo el cuerpo, bien concertado y unido entre si por todas las coyunturas que se ayudan mutuamente, segun la operacion propia de cada miembro, recibe su crecimiento para ir edificandose en amor.`,
    'Filipenses 2:1-11': `Por tanto, si hay alguna consolacion en Cristo, si algun consuelo de amor, si alguna comunion del Espiritu, si algun afecto y misericordia,
cumplan mi gozo, que sientan lo mismo, teniendo el mismo amor, unanimes, sintiendo una misma cosa.
Nada hagan por contienda o por vanagloria; antes bien con humildad, estimando cada uno a los demas como superiores a si mismo.
No mire cada uno a lo suyo propio, sino cada cual tambien a lo de los otros.
Haya, pues, en ustedes este sentir que hubo tambien en Cristo Jesus:
el cual, siendo en forma de Dios, no estimo como cosa a que aferrarse el ser igual a Dios;
sino que se despojo a si mismo, tomando forma de siervo, hecho semejante a los hombres;
y hallado en la condicion como hombre, se humillo a si mismo, hecho obediente hasta la muerte, y muerte de cruz.
Por lo cual Dios tambien le ensalzo soberanamente, y le dio un nombre que es sobre todo nombre;
para que en el nombre de Jesus se doble toda rodilla de los que estan en los cielos, y de los que estan en la tierra, y de los que estan debajo de la tierra;
y toda lengua confiese que Jesucristo es el Senor, a la gloria de Dios Padre.`,
    'Hechos 13:44-49': `Y el sabado siguiente se junto casi toda la ciudad a oir la palabra de Dios.
Pero los judios, viendo la multitud, se llenaron de celos, y se oponian a lo que Pablo decia, contradiciendo y blasfemando.
Entonces Pablo y Bernabe, usando de libertad, dijeron: A ustedes a la verdad era menester que se hablase primero la palabra de Dios; mas porque la desechan, y se juzgan indignos de la vida eterna, he aqui, nos volvemos a los gentiles.
Porque asi nos ha mandado el Senor, diciendo: Te he puesto para luz de los gentiles, para que seas salvacion hasta lo postrero de la tierra.
Y los gentiles, oyendo esto, se gozaban, y glorificaban la palabra del Senor; y creyeron todos los que estaban ordenados para vida eterna.
Y la palabra del Senor era sembrada por toda aquella provincia.`,
    '1 Corintios 15:58': `Asi que, hermanos mios amados, esten firmes y constantes, creciendo en la obra del Senor siempre, sabiendo que su trabajo en el Senor no es vano.`,
    'Lucas 1:26-38': `Y al sexto mes, el angel Gabriel fue enviado de Dios a una ciudad de Galilea, llamada Nazaret,
a una virgen desposada con un varon que se llamaba Jose, de la casa de David; y el nombre de la virgen era Maria.
Y entrando el angel a donde ella estaba, dijo: Salve, muy favorecida; el Senor es contigo; bendita tu entre las mujeres.
Mas ella, cuando le vio, se turbo por sus palabras, y pensaba que salutacion fuese esta.
Entonces el angel le dijo: Maria, no temas, porque has hallado gracia delante de Dios.
Y he aqui, concebiras en tu seno, y pariras un hijo, y llamaras su nombre Jesus.
Este sera grande, y sera llamado Hijo del Altisimo; y le dara el Senor Dios el trono de David su padre.
Y reinara en la casa de Jacob por siempre; y de su reino no habra fin.
Entonces Maria dijo al angel: Como sera esto? porque no conozco varon.
Y respondiendo el angel le dijo: El Espiritu Santo vendra sobre ti, y la virtud del Altisimo te hara sombra; por lo cual tambien lo santo que nacera sera llamado Hijo de Dios.
Porque ninguna cosa es imposible para Dios.
Entonces Maria dijo: He aqui la sierva del Senor; hagase a mi conforme a tu palabra. Y el angel se fue de ella.`,
    'Mateo 1:18-25': `Y el nacimiento de Jesucristo fue asi: que siendo Maria su madre desposada con Jose, antes que se juntasen, se hallo haber concebido del Espiritu Santo.
Y Jose su marido, como era justo, y no quisiese infamarla, quiso dejarla secretamente.
Y pensando el en esto, he aqui el angel del Senor le aparece en suenos, diciendo: Jose, hijo de David, no temas recibir a Maria tu mujer, porque lo que en ella es engendrado, del Espiritu Santo es.
Y parira un hijo, y llamaras su nombre Jesus, porque el salvara a su pueblo de sus pecados.
Todo esto acontecio para que se cumpliese lo que fue dicho por el Senor por el profeta, que dijo:
He aqui la virgen concebira y parira un hijo, y llamaras su nombre Emmanuel, que declarado es: Dios con nosotros.
Y despertando Jose del sueno, hizo como el angel del Senor le habia mandado, y recibio a su mujer.
Y no la conocio hasta que pario a su hijo primogenito; y llamo su nombre Jesus.`,
    'Lucas 2:1-20': `Y acontecio en aquellos dias que salio edicto de parte de Augusto Cesar, que toda la tierra fuese empadronada.
E iban todos para ser empadronados, cada uno a su ciudad.
Y subio Jose de Galilea, de la ciudad de Nazaret, a Judea, a la ciudad de David, que se llama Belen, por cuanto era de la casa y familia de David;
para ser empadronado con Maria su mujer, desposada con el, la cual estaba encinta.
Y acontecio que estando ellos alli, se cumplieron los dias en que ella habia de parir.
Y pario a su hijo primogenito, y le envolvio en panales, y le acosto en un pesebre, porque no habia lugar para ellos en el meson.
Y habia pastores en la misma tierra, que velaban y guardaban las vigilias de la noche sobre su ganado.
Y he aqui el angel del Senor vino sobre ellos, y la claridad de Dios los cerco de resplandor; y tuvieron gran temor.
Mas el angel les dijo: No teman; porque he aqui les doy nuevas de gran gozo, que sera para todo el pueblo:
que les ha nacido hoy, en la ciudad de David, un Salvador, que es Cristo el Senor.
Y esto les sera por senal: hallaran al nino envuelto en panales, echado en un pesebre.
Y repentinamente fue con el angel una multitud de los ejercitos celestiales, que alababan a Dios, y decian:
Gloria en las alturas a Dios, y en la tierra paz, buena voluntad para con los hombres.
Y volvieron los pastores glorificando y alabando a Dios por todas las cosas que habian oido y visto, como les habia sido dicho.`,
    'Juan 1:1-14': `En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.
Este era en el principio con Dios.
Todas las cosas por el fueron hechas; y sin el nada de lo que es hecho, fue hecho.
En el estaba la vida, y la vida era la luz de los hombres.
Y aquel Verbo fue hecho carne, y habito entre nosotros; y vimos su gloria, gloria como del unigenito del Padre, lleno de gracia y de verdad.`,
    'Apocalipsis 21:1-5': `Y vi un cielo nuevo, y una tierra nueva; porque el primer cielo y la primera tierra se fueron, y el mar ya no es.
Y yo Juan vi la santa ciudad, Jerusalem nueva, que descendia del cielo, de Dios, dispuesta como una esposa ataviada para su marido.
Y oi una gran voz del cielo que decia: He aqui el tabernaculo de Dios con los hombres, y morara con ellos; y ellos seran su pueblo, y el mismo Dios sera su Dios con ellos.
Y limpiara Dios toda lagrima de los ojos de ellos; y la muerte no sera mas; y no habra mas llanto, ni clamor, ni dolor; porque las primeras cosas son pasadas.
Y el que estaba sentado en el trono dijo: He aqui, yo hago nuevas todas las cosas.`,
    'Mateo 6:9-13': `Ustedes, pues, oren asi:

Padre nuestro que estas en los cielos, santificado sea tu nombre.
Venga tu reino. Sea hecha tu voluntad, como en el cielo, asi tambien en la tierra.
Danos hoy nuestro pan cotidiano.
Y perdonanos nuestras deudas, como tambien nosotros perdonamos a nuestros deudores.
Y no nos metas en tentacion, mas libranos del mal:
porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amen.`
  };

  const september = {
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
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hebreos 1:1-4'] || '',
          bibleTextSource,
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
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Romanos 12:1-2'] || '',
          bibleTextSource,
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
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Lucas 24:25-27'] || '',
          bibleTextSource,
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
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Santiago 1:22-25'] || '',
          bibleTextSource,
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
          version: BIBLE_VERSION,
          bibleText: sundayTexts['2 Timoteo 3:14-17'] || '',
          bibleTextSource,
          introduction: 'PLACEHOLDER: Introduccion pastoral para cerrar el enfasis mensual.',
          mainTruth: 'PLACEHOLDER: Las Escrituras preparan al pueblo de Dios para toda buena obra.'
        }
      }
    ]
  };

  const october = {
    year: 2026,
    month: 10,
    monthKey: '2026-10',
    monthName: 'Octubre',
    theme: 'Caminando en Oracion',
    description: 'Durante octubre, PRFWB sera animada a crecer en una vida de oracion biblica, sincera y perseverante, aprendiendo a depender de Dios, buscar su voluntad, interceder por otros y vivir en comunion constante con el Padre por medio de Cristo.',
    weeks: [
      {
        title: 'Dios nos invita a buscarle',
        start: '2026-10-01',
        end: '2026-10-04',
        sunday: {
          date: '2026-10-04',
          theme: 'Senor, ensenanos a orar',
          reference: 'Mateo 6:9-13',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Mateo 6:9-13'] || '',
          bibleTextSource,
          introduction: 'Durante esta primera semana hemos visto que Dios invita a su pueblo a buscarle con sinceridad, confianza y reverencia. La oracion no es una repeticion vacia ni un intento de impresionar a otros; es comunion con el Padre que nos escucha. Al leer juntos el modelo de oracion que Jesus enseno, recordamos que toda oracion cristiana comienza con Dios, su nombre, su reino y su voluntad.',
          mainTruth: 'Jesus nos ensena a orar buscando primero al Padre, su reino y su voluntad.'
        }
      },
      {
        title: 'Orar con dependencia',
        start: '2026-10-05',
        end: '2026-10-11',
        sunday: {
          date: '2026-10-11',
          theme: 'El Padre escucha a sus hijos',
          reference: 'Lucas 11:1-13',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Lucas 11:1-13'] || '',
          bibleTextSource,
          introduction: 'PLACEHOLDER: Introduccion pastoral para la lectura congregacional.',
          mainTruth: 'PLACEHOLDER: Dios llama a sus hijos a acercarse con confianza y dependencia.'
        }
      },
      {
        title: 'Interceder por otros',
        start: '2026-10-12',
        end: '2026-10-18',
        sunday: {
          date: '2026-10-18',
          theme: 'La oracion eficaz del justo',
          reference: 'Santiago 5:13-18',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Santiago 5:13-18'] || '',
          bibleTextSource,
          introduction: 'PLACEHOLDER: Introduccion pastoral para la lectura congregacional.',
          mainTruth: 'PLACEHOLDER: La iglesia ora confiando en la gracia, el poder y la fidelidad de Dios.'
        }
      },
      {
        title: 'Perseverar en oracion',
        start: '2026-10-19',
        end: '2026-10-25',
        sunday: {
          date: '2026-10-25',
          theme: 'Una iglesia que ora con valentia',
          reference: 'Hechos 4:23-31',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hechos 4:23-31'] || '',
          bibleTextSource,
          introduction: 'PLACEHOLDER: Introduccion pastoral para la lectura congregacional.',
          mainTruth: 'PLACEHOLDER: Una iglesia llena del Espiritu ora y proclama la Palabra con valentia.'
        }
      },
      {
        title: 'Orar y vivir en mision',
        start: '2026-10-26',
        end: '2026-10-31',
        sunday: {
          date: '2026-11-01',
          theme: 'Orar para que corra la Palabra',
          reference: '2 Tesalonicenses 3:1-5',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['2 Tesalonicenses 3:1-5'] || '',
          bibleTextSource,
          introduction: 'PLACEHOLDER: Introduccion pastoral para conectar oracion y mision.',
          mainTruth: 'PLACEHOLDER: La oracion impulsa a la iglesia a vivir y servir en la mision de Dios.'
        }
      }
    ]
  };

  const months = [september, october];

  const november = {
    year: 2026,
    month: 11,
    monthKey: '2026-11',
    monthName: 'Noviembre',
    theme: 'Una Iglesia en Mision',
    description: 'Durante noviembre, PRFWB sera animada a recordar que la iglesia existe para glorificar a Dios proclamando a Cristo, haciendo discipulos y sirviendo como testigo fiel del evangelio en su comunidad y hasta lo ultimo de la tierra.',
    weeks: [
      {
        title: 'Dios envia a su pueblo',
        start: '2026-11-01',
        end: '2026-11-01',
        sunday: {
          date: '2026-11-01',
          theme: 'Heme aqui, enviame a mi',
          reference: 'Isaias 6:1-8',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Isaias 6:1-8'] || '',
          bibleTextSource,
          introduction: 'La mision comienza con una vision correcta de Dios. Isaias no se ofrece a servir porque se cree suficiente, sino porque ha visto la santidad del Senor, ha reconocido su pecado y ha recibido gracia. Solo un pueblo perdonado puede responder al llamado de Dios con humildad y disponibilidad.',
          mainTruth: 'Dios envia a los que primero han sido confrontados por su santidad y limpiados por su gracia.'
        }
      },
      {
        title: 'Proclamamos a Cristo',
        start: '2026-11-02',
        end: '2026-11-08',
        sunday: {
          date: '2026-11-08',
          theme: 'Embajadores de Cristo',
          reference: '2 Corintios 5:17-21',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['2 Corintios 5:17-21'] || '',
          bibleTextSource,
          introduction: 'Durante esta semana hemos recordado que la iglesia no anuncia ideas humanas ni proyectos personales; proclamamos a Cristo. El evangelio nos reconcilia con Dios y nos convierte en mensajeros de reconciliacion. Somos enviados como embajadores, llamando a otros a responder a la gracia de Dios en Cristo.',
          mainTruth: 'La iglesia proclama a Cristo porque Dios nos reconcilio consigo y nos dio el ministerio de la reconciliacion.'
        }
      },
      {
        title: 'Hacemos discipulos',
        start: '2026-11-09',
        end: '2026-11-15',
        sunday: {
          date: '2026-11-15',
          theme: 'Edificar el cuerpo de Cristo',
          reference: 'Efesios 4:11-16',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Efesios 4:11-16'] || '',
          bibleTextSource,
          introduction: 'Durante esta semana hemos visto que la mision tambien incluye formar discipulos maduros. Cristo no deja a su iglesia sin recursos; El equipa a su pueblo por medio de dones, liderazgo, verdad y amor. La iglesia crece cuando cada miembro sirve bajo la direccion de Cristo, la cabeza del cuerpo.',
          mainTruth: 'Cristo equipa a su iglesia para crecer en madurez, verdad y amor.'
        }
      },
      {
        title: 'Servimos a nuestra comunidad',
        start: '2026-11-16',
        end: '2026-11-22',
        sunday: {
          date: '2026-11-22',
          theme: 'Servir con la mente de Cristo',
          reference: 'Filipenses 2:1-11',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Filipenses 2:1-11'] || '',
          bibleTextSource,
          introduction: 'Servir a la comunidad requiere mas que buenas ideas; requiere la mente de Cristo. La humildad de Jesus corrige nuestro orgullo y nos ensena a mirar por los demas. Al leer este pasaje, la iglesia recuerda que todo servicio cristiano nace de la obra, el ejemplo y el senorio de Cristo.',
          mainTruth: 'La iglesia sirve con humildad porque Cristo se humillo por nosotros.'
        }
      },
      {
        title: 'Hasta lo ultimo de la tierra',
        start: '2026-11-23',
        end: '2026-11-29',
        sunday: {
          date: '2026-11-29',
          theme: 'La Palabra del Senor se difundia',
          reference: 'Hechos 13:44-49',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hechos 13:44-49'] || '',
          bibleTextSource,
          introduction: 'La Palabra de Dios avanza aun en medio de oposicion. En Antioquia vemos rechazo, pero tambien gozo, fe y expansion del evangelio. Esta lectura anima a la iglesia a perseverar en la mision, confiando en que Dios sigue usando su Palabra para llamar a muchos a Cristo.',
          mainTruth: 'Dios extiende su Palabra para llamar pueblos y naciones a Cristo.'
        }
      },
      {
        title: 'Firmes en la obra del Senor',
        start: '2026-11-30',
        end: '2026-11-30',
        sunday: {
          date: '2026-12-06',
          theme: 'Firmes y constantes',
          reference: '1 Corintios 15:58',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['1 Corintios 15:58'] || '',
          bibleTextSource,
          introduction: 'Cerramos el enfoque de mision recordando que la resurreccion de Cristo sostiene nuestro servicio. La iglesia puede trabajar, sembrar y perseverar porque el Senor vive. Nada hecho en Cristo y para Cristo es en vano, aun cuando el fruto no se vea de inmediato.',
          mainTruth: 'En Cristo, nuestro trabajo en el Senor no es en vano.'
        }
      }
    ]
  };

  const december = {
    year: 2026,
    month: 12,
    monthKey: '2026-12',
    monthName: 'Diciembre',
    theme: 'Cristo, Nuestra Esperanza',
    description: 'Durante diciembre, PRFWB sera animada a contemplar la venida de Cristo, adorar al Salvador prometido, anunciar el gozo del evangelio y cerrar el ano descansando en la esperanza segura del reino de Dios.',
    weeks: [
      {
        title: 'La promesa del Rey',
        start: '2026-12-01',
        end: '2026-12-06',
        sunday: {
          date: '2026-12-06',
          theme: 'Nada es imposible para Dios',
          reference: 'Lucas 1:26-38',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Lucas 1:26-38'] || '',
          bibleTextSource,
          introduction: 'Diciembre comienza recordandonos que Dios cumple sus promesas de maneras que superan nuestra imaginacion. El anuncio a Maria no es solo una escena navidena; es la declaracion de que el Hijo del Altisimo viene a reinar para siempre. La respuesta de fe de Maria nos llama a rendirnos a la Palabra de Dios.',
          mainTruth: 'Dios cumple su promesa enviando a Jesus, el Rey cuyo reino no tendra fin.'
        }
      },
      {
        title: 'Dios con nosotros',
        start: '2026-12-07',
        end: '2026-12-13',
        sunday: {
          date: '2026-12-13',
          theme: 'Jesus salvara a su pueblo',
          reference: 'Mateo 1:18-25',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Mateo 1:18-25'] || '',
          bibleTextSource,
          introduction: 'El nacimiento de Jesus revela el corazon del evangelio: Dios viene a nosotros para salvarnos de nuestros pecados. Jose obedece la Palabra del Senor, y el nombre de Jesus anuncia su mision. Emmanuel no es solo consuelo emocional; es la verdad gloriosa de Dios habitando con su pueblo para redimirlo.',
          mainTruth: 'Jesus es Dios con nosotros, enviado para salvar a su pueblo de sus pecados.'
        }
      },
      {
        title: 'Buenas nuevas de gran gozo',
        start: '2026-12-14',
        end: '2026-12-20',
        sunday: {
          date: '2026-12-20',
          theme: 'Ha nacido un Salvador',
          reference: 'Lucas 2:1-20',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Lucas 2:1-20'] || '',
          bibleTextSource,
          introduction: 'La noticia del nacimiento de Jesus no fue anunciada primero a los poderosos, sino a pastores en la noche. Dios revela que el Salvador ha nacido para traer gozo verdadero a todo el pueblo. Esta lectura nos invita a recibir, adorar y anunciar a Cristo con la misma alegria de los pastores.',
          mainTruth: 'El nacimiento de Cristo trae buenas nuevas de gran gozo para todo el pueblo.'
        }
      },
      {
        title: 'El Verbo hecho carne',
        start: '2026-12-21',
        end: '2026-12-27',
        sunday: {
          date: '2026-12-27',
          theme: 'Lleno de gracia y verdad',
          reference: 'Juan 1:1-14',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Juan 1:1-14'] || '',
          bibleTextSource,
          introduction: 'Juan nos lleva al misterio profundo de la Navidad: el Verbo eterno se hizo carne y habito entre nosotros. Jesus no es solo un maestro enviado por Dios; es Dios mismo revelado, lleno de gracia y verdad. Al cerrar la semana de Navidad, adoramos al Hijo que trae vida y luz.',
          mainTruth: 'El Hijo eterno de Dios se hizo carne para revelarnos la gloria, la gracia y la verdad del Padre.'
        }
      },
      {
        title: 'Esperanza para un nuevo ano',
        start: '2026-12-28',
        end: '2026-12-31',
        sunday: {
          date: '2027-01-03',
          theme: 'Yo hago nuevas todas las cosas',
          reference: 'Apocalipsis 21:1-5',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Apocalipsis 21:1-5'] || '',
          bibleTextSource,
          introduction: 'El cierre del ano no descansa en nostalgia ni temor, sino en la promesa de Dios. La historia camina hacia la renovacion de todas las cosas en Cristo. Mientras esperamos ese dia, vivimos con esperanza, consuelo y fidelidad, sabiendo que Dios morara con su pueblo para siempre.',
          mainTruth: 'La esperanza cristiana descansa en la promesa de Dios de hacer nuevas todas las cosas.'
        }
      }
    ]
  };

  months.push(november, december);

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
    ['2026-09-30', 'Reten la forma de las sanas palabras', '2 Timoteo 1:13-14'],
    ['2026-10-01', 'Buscar a Dios de todo corazon', 'Jeremias 29:11-13'],
    ['2026-10-02', 'El corazon que busca el rostro de Dios', 'Salmo 27:7-14'],
    ['2026-10-03', 'Orar delante del Padre', 'Mateo 6:5-8'],
    ['2026-10-04', 'Senor, ensenanos a orar', 'Mateo 6:9-13'],
    ['2026-10-05', 'Reconocer a Dios en todos los caminos', 'Proverbios 3:5-6'],
    ['2026-10-06', 'Presentar nuestras peticiones con gratitud', 'Filipenses 4:4-7'],
    ['2026-10-07', 'Echar nuestra ansiedad sobre Dios', '1 Pedro 5:6-7'],
    ['2026-10-08', 'Estar quietos delante de Dios', 'Salmo 46:1-11'],
    ['2026-10-09', 'No mi voluntad, sino la tuya', 'Mateo 26:36-46'],
    ['2026-10-10', 'Acercarnos al trono de la gracia', 'Hebreos 4:14-16'],
    ['2026-10-11', 'El Padre escucha a sus hijos', 'Lucas 11:1-13'],
    ['2026-10-12', 'Interceder con amor por el pueblo', 'Exodo 32:7-14'],
    ['2026-10-13', 'No cesar de orar por otros', '1 Samuel 12:20-25'],
    ['2026-10-14', 'Orar para conocer mejor a Dios', 'Efesios 1:15-23'],
    ['2026-10-15', 'Orar por fortaleza espiritual', 'Efesios 3:14-21'],
    ['2026-10-16', 'Orar por crecimiento y fruto', 'Colosenses 1:9-14'],
    ['2026-10-17', 'Orar por todos', '1 Timoteo 2:1-6'],
    ['2026-10-18', 'La oracion eficaz del justo', 'Santiago 5:13-18'],
    ['2026-10-19', 'Orar siempre y no desmayar', 'Lucas 18:1-8'],
    ['2026-10-20', 'Constantes en la oracion', 'Romanos 12:9-12'],
    ['2026-10-21', 'Perseverar velando con accion de gracias', 'Colosenses 4:2-6'],
    ['2026-10-22', 'Orar sin cesar', '1 Tesalonicenses 5:16-18'],
    ['2026-10-23', 'Orar en medio de la espera', 'Salmo 13'],
    ['2026-10-24', 'Confiar aunque no veamos', 'Habacuc 3:17-19'],
    ['2026-10-25', 'Una iglesia que ora con valentia', 'Hechos 4:23-31'],
    ['2026-10-26', 'Rogar por obreros', 'Mateo 9:35-38'],
    ['2026-10-27', 'Unidos en oracion', 'Hechos 1:12-14'],
    ['2026-10-28', 'Orar antes de enviar', 'Hechos 13:1-3'],
    ['2026-10-29', 'Orar para que corra la Palabra', '2 Tesalonicenses 3:1-5'],
    ['2026-10-30', 'Orar en el Espiritu', 'Judas 20-21'],
    ['2026-10-31', 'Las oraciones delante del Cordero', 'Apocalipsis 5:8-10'],
    ['2026-11-01', 'Heme aqui, enviame a mi', 'Isaias 6:1-8'],
    ['2026-11-02', 'Hacer discipulos de todas las naciones', 'Mateo 28:16-20'],
    ['2026-11-03', 'Predicar el evangelio', 'Marcos 16:15-16'],
    ['2026-11-04', 'Testigos de Cristo', 'Lucas 24:44-49'],
    ['2026-11-05', 'Enviados por el Senor', 'Juan 20:19-23'],
    ['2026-11-06', 'Recibir poder para testificar', 'Hechos 1:6-8'],
    ['2026-11-07', 'No avergonzarnos del evangelio', 'Romanos 1:14-17'],
    ['2026-11-08', 'Embajadores de Cristo', '2 Corintios 5:17-21'],
    ['2026-11-09', 'Una comunidad que persevera', 'Hechos 2:42-47'],
    ['2026-11-10', 'Presentar a todo hombre perfecto en Cristo', 'Colosenses 1:24-29'],
    ['2026-11-11', 'Encargar a otros fieles', '2 Timoteo 2:1-7'],
    ['2026-11-12', 'Ensenar sana doctrina', 'Tito 2:1-8'],
    ['2026-11-13', 'Estimularnos al amor y buenas obras', 'Hebreos 10:19-25'],
    ['2026-11-14', 'Servir con los dones recibidos', '1 Pedro 4:8-11'],
    ['2026-11-15', 'Edificar el cuerpo de Cristo', 'Efesios 4:11-16'],
    ['2026-11-16', 'Sal y luz', 'Mateo 5:13-16'],
    ['2026-11-17', 'Amar al projimo', 'Lucas 10:25-37'],
    ['2026-11-18', 'Hacer bien a todos', 'Galatas 6:7-10'],
    ['2026-11-19', 'Una fe que sirve', 'Santiago 2:14-18'],
    ['2026-11-20', 'Amar con hechos y verdad', '1 Juan 3:16-18'],
    ['2026-11-21', 'Buscar el bienestar de la ciudad', 'Jeremias 29:4-7'],
    ['2026-11-22', 'Servir con la mente de Cristo', 'Filipenses 2:1-11'],
    ['2026-11-23', 'Que las naciones conozcan a Dios', 'Salmo 67'],
    ['2026-11-24', 'Luz para las naciones', 'Isaias 49:5-6'],
    ['2026-11-25', 'Rogar por obreros', 'Mateo 9:35-38'],
    ['2026-11-26', 'Enviados por el Espiritu', 'Hechos 13:1-3'],
    ['2026-11-27', 'Hermosos son los pies de los que anuncian', 'Romanos 10:11-15'],
    ['2026-11-28', 'Una multitud de toda nacion', 'Apocalipsis 7:9-12'],
    ['2026-11-29', 'La Palabra del Senor se difundia', 'Hechos 13:44-49'],
    ['2026-11-30', 'Firmes y constantes en la obra del Senor', '1 Corintios 15:58'],
    ['2026-12-01', 'La promesa de la simiente', 'Genesis 3:14-15'],
    ['2026-12-02', 'Bendicion para todas las familias', 'Genesis 12:1-3'],
    ['2026-12-03', 'Un nino nos es nacido', 'Isaias 9:1-7'],
    ['2026-12-04', 'El Renuevo justo', 'Jeremias 23:5-6'],
    ['2026-12-05', 'El Rey nacido en Belen', 'Miqueas 5:2-5'],
    ['2026-12-06', 'Nada es imposible para Dios', 'Lucas 1:26-38'],
    ['2026-12-07', 'El Dios que visita a su pueblo', 'Lucas 1:67-79'],
    ['2026-12-08', 'La luz en tinieblas', 'Isaias 60:1-3'],
    ['2026-12-09', 'El Hijo de David', 'Mateo 1:1-17'],
    ['2026-12-10', 'Dios con nosotros', 'Mateo 1:18-25'],
    ['2026-12-11', 'Preparar el camino', 'Lucas 3:1-6'],
    ['2026-12-12', 'El Cordero de Dios', 'Juan 1:29-34'],
    ['2026-12-13', 'Jesus salvara a su pueblo', 'Mateo 1:18-25'],
    ['2026-12-14', 'Buenas nuevas para los humildes', 'Lucas 2:8-14'],
    ['2026-12-15', 'Los pastores adoran', 'Lucas 2:15-20'],
    ['2026-12-16', 'Simeon espera la consolacion', 'Lucas 2:25-35'],
    ['2026-12-17', 'Ana habla del Redentor', 'Lucas 2:36-38'],
    ['2026-12-18', 'La alegria del reino', 'Salmo 98'],
    ['2026-12-19', 'Venid, adoremos', 'Salmo 95:1-7'],
    ['2026-12-20', 'Ha nacido un Salvador', 'Lucas 2:1-20'],
    ['2026-12-21', 'En el principio era el Verbo', 'Juan 1:1-5'],
    ['2026-12-22', 'La luz verdadera', 'Juan 1:6-13'],
    ['2026-12-23', 'El Verbo fue hecho carne', 'Juan 1:14-18'],
    ['2026-12-24', 'Cristo vino en humildad', 'Filipenses 2:5-11'],
    ['2026-12-25', 'Dios envio a su Hijo', 'Galatas 4:4-7'],
    ['2026-12-26', 'La gracia de Dios se manifesto', 'Tito 2:11-14'],
    ['2026-12-27', 'Lleno de gracia y verdad', 'Juan 1:1-14'],
    ['2026-12-28', 'Mirar atras con gratitud', 'Salmo 103:1-14'],
    ['2026-12-29', 'Confiar el camino al Senor', 'Proverbios 16:1-9'],
    ['2026-12-30', 'Olvidando lo que queda atras', 'Filipenses 3:12-16'],
    ['2026-12-31', 'Yo hago nuevas todas las cosas', 'Apocalipsis 21:1-5']
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
    },
    '2026-10-01': {
      title: 'Buscar a Dios de todo corazon',
      explanation: 'La oracion comienza con una invitacion: Dios llama a su pueblo a buscarle. Jeremias habla a personas que necesitaban esperanza en medio de una temporada dificil, y les recuerda que Dios no esta lejos de quienes le buscan con todo el corazon. Buscar a Dios no es usar la oracion solo para recibir cosas; es volver el corazon al Senor, confiar en sus promesas y rendir nuestros caminos delante de El.',
      reflectionQuestion: 'Estas buscando a Dios mismo o solo buscando lo que quieres que El resuelva?',
      application: 'Aparta hoy un momento sin distracciones para buscar a Dios con sinceridad, no solo para pedir, sino para rendirte a El.',
      prayer: 'Senor, ensename a buscarte de todo corazon. Que mi oracion nazca de confianza, humildad y deseo de caminar contigo. Amen.',
      keywords: ['oracion', 'buscar a dios', 'jeremias', 'corazon']
    },
    '2026-10-02': {
      title: 'El corazon que busca el rostro de Dios',
      explanation: 'El salmista no solo pide ayuda; desea el rostro de Dios. Esta lectura nos recuerda que la oracion biblica es relacion antes que rutina. En medio de temores, espera y necesidad, el creyente aprende a decir: tu rostro buscare. Dios no llama a su pueblo a una fe fria, sino a una comunion viva donde el corazon descansa en su presencia, espera en su bondad y encuentra fortaleza para seguir.',
      reflectionQuestion: 'Que significa para ti buscar el rostro de Dios en medio de tus circunstancias actuales?',
      application: 'Convierte una preocupacion especifica en una oracion que exprese confianza en la presencia y bondad de Dios.',
      prayer: 'Padre, quiero buscar tu rostro mas que tus regalos. Fortalece mi corazon para esperar en ti con fe. Amen.',
      keywords: ['salmo 27', 'rostro de dios', 'esperar', 'confianza']
    },
    '2026-10-03': {
      title: 'Orar delante del Padre',
      explanation: 'Jesus corrige una forma de orar centrada en la apariencia. La oracion no es teatro espiritual ni una manera de impresionar a otros. El Padre ve en secreto y conoce nuestras necesidades antes de que hablemos. Esto nos libra de la hipocresia y de las repeticiones vacias. Podemos acercarnos a Dios con sencillez, reverencia y confianza, sabiendo que somos escuchados por un Padre que conoce el corazon.',
      reflectionQuestion: 'Que motivaciones necesitas revisar cuando oras?',
      application: 'Ora hoy en privado con palabras sencillas y honestas, recordando que tu Padre te escucha.',
      prayer: 'Padre, limpia mis motivaciones. Ensename a orar con humildad, sinceridad y confianza delante de ti. Amen.',
      keywords: ['mateo 6', 'padre', 'secreto', 'sinceridad']
    },
    '2026-10-04': {
      title: 'Senor, ensenanos a orar',
      explanation: 'Jesus no solo manda a orar; tambien ensena como hacerlo. La oracion modelo comienza con Dios: su nombre, su reino y su voluntad. Luego nos ensena a depender del Padre para el pan diario, el perdon, la santidad y la proteccion. Esta lectura ordena nuestros deseos y nos recuerda que la oracion cristiana no gira alrededor de nuestro control, sino de la gloria de Dios y nuestra dependencia diaria de El.',
      reflectionQuestion: 'Cual peticion de la oracion del Senor necesitas practicar con mas conciencia esta semana?',
      application: 'Ora lentamente usando las peticiones de Mateo 6:9-13 como guia para tu tiempo con Dios.',
      prayer: 'Padre nuestro, ordena mi corazon segun tu reino y tu voluntad. Dame dependencia diaria, perdon y fortaleza para vivir para tu gloria. Amen.',
      keywords: ['padre nuestro', 'mateo 6', 'reino', 'voluntad']
    },
    '2026-11-01': {
      title: 'Heme aqui, enviame a mi',
      explanation: 'Isaias no comienza su llamado mirando la necesidad del mundo, sino contemplando la santidad de Dios. Antes de ser enviado, es quebrantado por su pecado y limpiado por gracia. La mision cristiana nace de esta misma verdad: Dios envia a personas que han sido alcanzadas por su misericordia. No servimos porque somos suficientes; servimos porque el Rey santo nos perdona, nos levanta y nos llama a participar en su obra.',
      reflectionQuestion: 'Como la santidad y la gracia de Dios preparan tu corazon para servir?',
      prayer: 'Senor santo, limpia mi corazon y hazme disponible para tu mision. Que mi servicio nazca de tu gracia y sea para tu gloria. Amen.',
      application: 'Presentate hoy delante de Dios con disponibilidad sincera: Senor, aqui estoy; usame donde tu quieras.',
      keywords: ['mision', 'envio', 'isaias', 'santidad', 'gracia']
    },
    '2026-11-02': {
      title: 'Hacer discipulos de todas las naciones',
      explanation: 'Jesus resucitado envia a su iglesia con una comision clara: hacer discipulos. La mision no es simplemente llenar actividades religiosas, sino llamar personas a seguir a Cristo, bautizarlas y ensenarles a obedecer todo lo que El mando. Esta tarea descansa en la autoridad de Jesus y en su promesa de presencia continua. La iglesia va, ensena y discipula porque Cristo reina y esta con su pueblo todos los dias.',
      reflectionQuestion: 'A quien estas ayudando, intencionalmente, a seguir y obedecer a Cristo?',
      application: 'Ora por una persona a quien puedas discipular, animar o invitar a caminar mas cerca de Jesus.',
      prayer: 'Cristo resucitado, gracias por tu autoridad y tu presencia. Ayudanos a hacer discipulos fieles para tu gloria. Amen.',
      keywords: ['gran comision', 'discipulos', 'mateo 28', 'naciones']
    },
    '2026-11-03': {
      title: 'Predicar el evangelio',
      explanation: 'El evangelio es buena noticia que debe ser anunciada. La iglesia no existe para guardar el mensaje en privado, sino para proclamar a Cristo con fidelidad. Predicar el evangelio incluye hablar de la gracia de Dios, el pecado humano, la obra de Cristo y el llamado a responder con fe. Aunque no todos predican desde un pulpito, todo creyente puede dar testimonio de la esperanza que ha recibido en Jesus.',
      reflectionQuestion: 'Que te impide hablar con mas claridad del evangelio?',
      application: 'Resume el evangelio en tus propias palabras y preparate para compartirlo con alguien esta semana.',
      prayer: 'Senor, dame claridad, amor y valentia para anunciar el evangelio de Cristo sin verguenza. Amen.',
      keywords: ['evangelio', 'predicar', 'marcos', 'testimonio']
    },
    '2026-11-04': {
      title: 'Testigos de Cristo',
      explanation: 'Jesus muestra que las Escrituras apuntan a su muerte y resurreccion, y luego envia a sus discipulos como testigos. La mision cristiana no se basa en opiniones religiosas, sino en hechos: Cristo padecio, resucito y ahora se proclama en su nombre arrepentimiento y perdon. Ser testigos significa anunciar lo que Dios ha hecho en Cristo y vivir como personas transformadas por esa verdad.',
      reflectionQuestion: 'Que aspecto de la obra de Cristo necesitas recordar con mas gratitud hoy?',
      application: 'Comparte con alguien una manera concreta en que Cristo ha traido perdon, esperanza o cambio a tu vida.',
      prayer: 'Jesus, hazme un testigo fiel de tu muerte, resurreccion y perdon. Que mi vida apunte a ti. Amen.',
      keywords: ['testigos', 'lucas 24', 'resurreccion', 'perdon']
    },
    '2026-11-05': {
      title: 'Enviados por el Senor',
      explanation: 'El Cristo resucitado se presenta a sus discipulos con paz y proposito. No solo calma sus temores; tambien los envia. La mision nace de la paz que Jesus da y de la autoridad con que El comisiona. La iglesia no sale al mundo por iniciativa propia, sino como pueblo enviado por su Senor. Nuestra presencia en la comunidad debe reflejar el caracter, la verdad y la gracia de Aquel que nos envio.',
      reflectionQuestion: 'Como cambia tu manera de servir saber que Jesus mismo envia a su pueblo?',
      application: 'Piensa en tu trabajo, escuela, vecindario o familia como un lugar donde Cristo te ha enviado a representarlo.',
      prayer: 'Senor Jesus, gracias por tu paz. Enviame con humildad, amor y fidelidad para representarte donde me has puesto. Amen.',
      keywords: ['enviados', 'juan 20', 'paz', 'cristo resucitado']
    },
    '2026-11-06': {
      title: 'Recibir poder para testificar',
      explanation: 'Jesus promete poder para ser testigos. La mision de la iglesia no depende de carisma humano, estrategias perfectas o fuerza propia, sino del poder del Espiritu Santo. El alcance es amplio: cerca y lejos, en nuestra comunidad y hasta lo ultimo de la tierra. Esta lectura nos recuerda que la iglesia debe depender del Espiritu mientras proclama a Cristo con fidelidad y esperanza.',
      reflectionQuestion: 'Estas intentando servir en tus fuerzas o dependiendo del Espiritu Santo?',
      application: 'Antes de servir o hablar de Cristo hoy, ora pidiendo al Espiritu Santo poder, sabiduria y amor.',
      prayer: 'Espiritu Santo, capacitanos para ser testigos fieles de Cristo en nuestra comunidad y hasta lo ultimo de la tierra. Amen.',
      keywords: ['hechos 1', 'espiritu santo', 'testigos', 'poder']
    },
    '2026-11-07': {
      title: 'No avergonzarnos del evangelio',
      explanation: 'Pablo declara que no se averguenza del evangelio porque es poder de Dios para salvacion. La iglesia necesita esta conviccion. El evangelio puede parecer debil ante los valores del mundo, pero es el mensaje por el cual Dios salva. No anunciamos a Cristo porque sea popular, sino porque es verdadero y poderoso. Nuestra confianza no esta en nuestra habilidad, sino en el poder de Dios obrando por su Palabra.',
      reflectionQuestion: 'En que situaciones sientes tentacion de callar o suavizar el evangelio?',
      application: 'Pide a Dios valentia para identificarte claramente con Cristo y su evangelio esta semana.',
      prayer: 'Padre, librame de avergonzarme del evangelio. Aumenta mi confianza en tu poder para salvar. Amen.',
      keywords: ['romanos 1', 'poder de dios', 'salvacion', 'evangelio']
    },
    '2026-11-08': {
      title: 'Embajadores de Cristo',
      explanation: 'En Cristo somos nueva creacion y hemos sido reconciliados con Dios. Pero esa gracia no termina en nosotros: Dios nos confia el ministerio y la palabra de reconciliacion. La iglesia representa a Cristo ante el mundo, llamando a otros a reconciliarse con Dios. Ser embajadores no es promover nuestra imagen, sino hablar y vivir de tal manera que Cristo sea anunciado con fidelidad, humildad y urgencia.',
      reflectionQuestion: 'Estas representando a Cristo con tus palabras, decisiones y relaciones?',
      application: 'Busca una oportunidad concreta para practicar reconciliacion: pedir perdon, perdonar o invitar a alguien a mirar a Cristo.',
      prayer: 'Senor, gracias por reconciliarme contigo en Cristo. Hazme un embajador fiel de tu gracia y tu verdad. Amen.',
      keywords: ['embajadores', 'reconciliacion', '2 corintios 5', 'nueva creacion']
    },
    '2026-11-09': {
      title: 'Una comunidad que persevera',
      explanation: 'La iglesia primitiva perseveraba en la doctrina, la comunion, el partimiento del pan y las oraciones. La mision no se sostiene con eventos aislados, sino con una comunidad formada por la Palabra y unida en Cristo. Cuando la iglesia vive el evangelio en comunion real, su testimonio se vuelve visible. Dios usa una iglesia fiel, sencilla y perseverante para mostrar al mundo la belleza de su gracia.',
      reflectionQuestion: 'En que practica necesitas perseverar con mas fidelidad junto a tu iglesia?',
      application: 'Participa esta semana en una accion concreta de comunion, servicio u oracion con otros creyentes.',
      prayer: 'Senor, forma en nosotros una comunidad perseverante, generosa y fiel a tu Palabra. Amen.',
      keywords: ['iglesia', 'comunion', 'hechos 2', 'perseverancia']
    },
    '2026-11-10': {
      title: 'Presentar a todo hombre perfecto en Cristo',
      explanation: 'Pablo describe su ministerio como una labor enfocada en anunciar a Cristo, amonestar y ensenar para presentar a cada creyente maduro en El. El discipulado no es entretenimiento religioso; es formacion espiritual centrada en Cristo. La meta no es que las personas dependan de lideres, sino que crezcan en conocimiento, obediencia y madurez. Toda ensenanza fiel debe apuntar a Cristo como suficiente Salvador y Senor.',
      reflectionQuestion: 'Tu servicio ayuda a otros a depender mas de Cristo?',
      application: 'Ora por alguien especifico y busca animarle con una verdad biblica que le ayude a crecer.',
      prayer: 'Cristo, que todo lo que ensenamos y hacemos lleve a otros a madurar en ti. Amen.',
      keywords: ['discipulado', 'madurez', 'colosenses', 'cristo']
    },
    '2026-11-11': {
      title: 'Encargar a otros fieles',
      explanation: 'El discipulado saludable piensa en generaciones. Pablo anima a Timoteo a confiar la verdad a personas fieles que tambien puedan ensenar a otros. La iglesia no debe guardar el ministerio en pocas manos; debe formar, acompanar y levantar obreros fieles. Esta vision requiere paciencia, confianza y responsabilidad. Lo que hemos recibido por gracia debe ser transmitido con fidelidad para que otros tambien sirvan a Cristo.',
      reflectionQuestion: 'A quien puedes ayudar a prepararse para servir con fidelidad?',
      application: 'Identifica una persona que puedas animar, entrenar o incluir en un area de servicio.',
      prayer: 'Senor, danos obreros fieles y corazones dispuestos a formar a otros para tu obra. Amen.',
      keywords: ['formacion', 'obreros', '2 timoteo', 'fidelidad']
    },
    '2026-11-12': {
      title: 'Ensenar sana doctrina',
      explanation: 'La sana doctrina produce una vida sana. Tito recibe instrucciones para ensenar de manera que hombres, mujeres, jovenes y toda la comunidad vivan de acuerdo con el evangelio. La mision de la iglesia no separa verdad y conducta. Lo que creemos debe verse en la forma en que hablamos, servimos, amamos y perseveramos. Una iglesia que ensena bien tambien aprende a vivir bien delante de Dios y de los demas.',
      reflectionQuestion: 'Que verdad biblica necesitas obedecer de manera mas visible?',
      application: 'Escoge una accion practica que haga visible hoy lo que dices creer.',
      prayer: 'Padre, que nuestra doctrina sea sana y nuestra conducta honre el evangelio. Amen.',
      keywords: ['sana doctrina', 'tito', 'conducta', 'ensenanza']
    },
    '2026-11-13': {
      title: 'Estimularnos al amor y buenas obras',
      explanation: 'Hebreos nos llama a acercarnos a Dios, mantener firme la esperanza y considerarnos unos a otros para estimularnos al amor y a las buenas obras. La vida cristiana no fue disenada para caminarse en soledad. Necesitamos una comunidad que anime, corrija y sostenga. Una iglesia en mision se congrega con proposito: adorar a Cristo y ayudarse mutuamente a vivir para su gloria.',
      reflectionQuestion: 'A quien puedes animar hoy a seguir firme en Cristo?',
      application: 'Envia un mensaje, haz una llamada o comparte una palabra biblica de animo con alguien de tu iglesia.',
      prayer: 'Senor, usanos para animar a otros al amor, la esperanza y las buenas obras. Amen.',
      keywords: ['comunidad', 'hebreos', 'buenas obras', 'esperanza']
    },
    '2026-11-14': {
      title: 'Servir con los dones recibidos',
      explanation: 'Pedro ensena que cada creyente ha recibido dones para ministrar a otros como buen administrador de la gracia de Dios. Los dones no son trofeos personales, sino herramientas de servicio. La iglesia crece cuando cada miembro usa lo que Dios le ha dado para bendecir al cuerpo. Servir con los dones recibidos exige amor, hospitalidad, humildad y dependencia de la fuerza que Dios provee.',
      reflectionQuestion: 'Que don o capacidad puedes usar para servir mejor esta semana?',
      application: 'Ofrece ayuda concreta en un ministerio, necesidad o persona donde puedas servir con gozo.',
      prayer: 'Dios de gracia, ayudame a administrar fielmente lo que me has dado para servir a otros. Amen.',
      keywords: ['dones', 'servicio', '1 pedro', 'gracia']
    },
    '2026-11-15': {
      title: 'Edificar el cuerpo de Cristo',
      explanation: 'Cristo equipa a su iglesia para que el cuerpo crezca en madurez, verdad y amor. La meta no es solo tener mas actividad, sino parecernos mas a Cristo. Cada miembro tiene una parte en la edificacion del cuerpo. Cuando hablamos la verdad en amor y servimos unidos bajo la cabeza que es Cristo, la iglesia se fortalece y puede cumplir su mision con mayor fidelidad.',
      reflectionQuestion: 'Estas contribuyendo a la unidad y madurez de tu iglesia?',
      application: 'Practica hoy hablar la verdad con amor en una conversacion importante.',
      prayer: 'Cristo, cabeza de la iglesia, edificanos en verdad, amor y madurez para servirte. Amen.',
      keywords: ['efesios 4', 'cuerpo de cristo', 'madurez', 'unidad']
    },
    '2026-11-16': {
      title: 'Sal y luz',
      explanation: 'Jesus llama a sus discipulos sal de la tierra y luz del mundo. La mision tambien se vive en la presencia cotidiana del creyente en su comunidad. La sal preserva y da sabor; la luz alumbra y dirige la mirada a Dios. Nuestras buenas obras no deben buscar aplauso personal, sino que otros glorifiquen al Padre. La vida de la iglesia debe hacer visible el caracter del reino.',
      reflectionQuestion: 'Que parte de tu vida necesita reflejar con mas claridad la luz de Cristo?',
      application: 'Haz una obra buena en secreto o con humildad, buscando que Dios sea glorificado.',
      prayer: 'Padre, haznos sal y luz en nuestra comunidad para que otros te glorifiquen. Amen.',
      keywords: ['sal', 'luz', 'mateo 5', 'testimonio']
    },
    '2026-11-17': {
      title: 'Amar al projimo',
      explanation: 'La parabola del buen samaritano nos confronta con una pregunta practica: quien esta actuando como projimo? Jesus muestra que el amor verdadero no se queda en teoria, sino que se acerca, se compadece y sirve. La mision local comienza cuando vemos a las personas no como interrupciones, sino como oportunidades para mostrar misericordia. Amar al projimo refleja el corazon de Dios hacia nosotros.',
      reflectionQuestion: 'A quien te esta llamando Dios a mirar con misericordia?',
      application: 'Identifica una necesidad cercana y responde con una accion concreta de amor.',
      prayer: 'Senor, abre mis ojos para ver al projimo y servir con compasion verdadera. Amen.',
      keywords: ['projimo', 'misericordia', 'lucas 10', 'servicio']
    },
    '2026-11-18': {
      title: 'Hacer bien a todos',
      explanation: 'Galatas nos recuerda que no debemos cansarnos de hacer el bien. La mision de la iglesia incluye sembrar con paciencia, aun cuando el fruto tarde en verse. Hacer bien a todos, especialmente a la familia de la fe, expresa una vida guiada por el Espiritu. El servicio cristiano requiere perseverancia porque se sostiene en la promesa de Dios, no en resultados inmediatos.',
      reflectionQuestion: 'Donde te has cansado de hacer el bien?',
      application: 'Continua una obra buena que habias pensado abandonar, confiando en el tiempo de Dios.',
      prayer: 'Padre, dame perseverancia para sembrar el bien con fe y amor. Amen.',
      keywords: ['hacer bien', 'galatas', 'perseverancia', 'servicio']
    },
    '2026-11-19': {
      title: 'Una fe que sirve',
      explanation: 'Santiago ensena que una fe viva se expresa en obras. Las obras no compran la salvacion, pero muestran que la fe es real. Si vemos necesidad y solo respondemos con palabras vacias, algo esta mal. La mision de la iglesia debe unir proclamacion y compasion. Creemos en Cristo y por eso amamos, compartimos, servimos y respondemos a las necesidades con obediencia practica.',
      reflectionQuestion: 'Tu fe se esta viendo en acciones concretas de amor?',
      application: 'Convierte una intencion buena en una accion concreta antes de terminar el dia.',
      prayer: 'Senor, que mi fe sea viva, humilde y visible en obras de amor. Amen.',
      keywords: ['fe', 'obras', 'santiago', 'compasion']
    },
    '2026-11-20': {
      title: 'Amar con hechos y verdad',
      explanation: 'Juan nos llama a amar no solo de palabra, sino con hechos y en verdad. El amor cristiano se mide por el ejemplo de Cristo, quien puso su vida por nosotros. La iglesia no debe conformarse con discursos de compasion; debe practicar el amor sacrificial. Cuando el pueblo de Dios ama con hechos, el evangelio se vuelve tangible ante una comunidad que necesita ver la gracia de Cristo.',
      reflectionQuestion: 'Que diferencia hay entre decir que amas y amar con hechos?',
      application: 'Haz una accion especifica que demuestre amor sacrificial hacia alguien en necesidad.',
      prayer: 'Jesus, ensename a amar como tu amas: con verdad, sacrificio y accion. Amen.',
      keywords: ['amor', 'hechos', '1 juan', 'sacrificio']
    },
    '2026-11-21': {
      title: 'Buscar el bienestar de la ciudad',
      explanation: 'Jeremias llama al pueblo en exilio a buscar el bienestar de la ciudad y orar por ella. Aunque el contexto era dificil, Dios queria que su pueblo viviera con responsabilidad y bendicion en el lugar donde estaba. La iglesia tambien esta llamada a orar por su comunidad, trabajar por su bien y dar testimonio de la esperanza de Dios en medio de la sociedad.',
      reflectionQuestion: 'Como puedes orar y trabajar por el bienestar de tu comunidad?',
      application: 'Ora hoy por tu barrio, pueblo o ciudad, y piensa en una manera concreta de servirle.',
      prayer: 'Senor, bendice nuestra comunidad y usanos como instrumentos de paz, verdad y esperanza. Amen.',
      keywords: ['ciudad', 'jeremias', 'comunidad', 'oracion']
    },
    '2026-11-22': {
      title: 'Servir con la mente de Cristo',
      explanation: 'Filipenses nos lleva al ejemplo supremo del servicio: Cristo se humillo y obedecio hasta la muerte de cruz. La mision cristiana no puede caminar con orgullo, competencia o vanagloria. Servimos con la mente de Cristo cuando miramos por los demas, preferimos la humildad y buscamos la gloria del Padre. Una iglesia que sirve como Cristo proclama el evangelio con su actitud y sus acciones.',
      reflectionQuestion: 'En que relacion necesitas practicar la humildad de Cristo?',
      application: 'Sirve hoy a alguien sin buscar reconocimiento, recordando la humildad de Jesus.',
      prayer: 'Senor Jesus, forma en nosotros tu mente humilde y obediente para servir con amor. Amen.',
      keywords: ['filipenses 2', 'humildad', 'servicio', 'cristo']
    },
    '2026-11-23': {
      title: 'Que las naciones conozcan a Dios',
      explanation: 'El Salmo 67 une bendicion y mision. Dios bendice a su pueblo para que su camino sea conocido en la tierra y su salvacion entre todas las naciones. La gracia recibida no debe encerrarse en nosotros. Cuando pedimos la bendicion de Dios, tambien debemos desear que otros pueblos le conozcan, le alaben y se gocen en su justicia.',
      reflectionQuestion: 'Tus oraciones incluyen el deseo de que las naciones conozcan a Dios?',
      application: 'Ora por un pais, misionero o comunidad que necesite escuchar el evangelio.',
      prayer: 'Dios, haz conocido tu camino en la tierra y tu salvacion entre todas las naciones. Amen.',
      keywords: ['naciones', 'salmo 67', 'mision', 'bendicion']
    },
    '2026-11-24': {
      title: 'Luz para las naciones',
      explanation: 'Isaias presenta el proposito de Dios de llevar salvacion hasta lo ultimo de la tierra. La mision no es una idea secundaria; esta en el corazon del plan de Dios. Cristo es la luz prometida, y su iglesia participa anunciando esa salvacion. Esta verdad ensancha nuestra vision: Dios no solo esta obrando en nuestro circulo cercano, sino llamando pueblos a la luz de Cristo.',
      reflectionQuestion: 'Tu vision de la obra de Dios es local solamente o tambien global?',
      application: 'Lee o investiga una necesidad misionera y ora por puertas abiertas para el evangelio.',
      prayer: 'Senor, extiende la luz de Cristo hasta lo ultimo de la tierra y usa nuestras vidas en tu mision. Amen.',
      keywords: ['isaias', 'luz', 'naciones', 'salvacion']
    },
    '2026-11-25': {
      title: 'Rogar por obreros',
      explanation: 'Jesus ve a las multitudes con compasion y llama a sus discipulos a rogar al Senor de la mies que envie obreros. La mision comienza con ver como Cristo ve. Las personas no son numeros, problemas o interrupciones; son ovejas necesitadas de pastor. La iglesia debe orar por mas obreros y estar dispuesta a ser parte de la respuesta de Dios a esa oracion.',
      reflectionQuestion: 'Estas dispuesto a ser parte de la respuesta a la oracion por obreros?',
      application: 'Ora por maestros, pastores, lideres, evangelistas y nuevos servidores en tu iglesia.',
      prayer: 'Senor de la mies, envia obreros fieles y danos compasion por las multitudes. Amen.',
      keywords: ['obreros', 'mateo 9', 'compasion', 'mies']
    },
    '2026-11-26': {
      title: 'Enviados por el Espiritu',
      explanation: 'En Hechos 13 la iglesia adora, ayuna y escucha la direccion del Espiritu Santo. La mision nace en una comunidad que busca a Dios y obedece su voz. Bernabe y Saulo son apartados y enviados, no por impulso humano, sino por direccion divina. Una iglesia misionera ora, discierne, confirma llamados y envia obreros con dependencia del Espiritu.',
      reflectionQuestion: 'Como puede tu iglesia discernir y apoyar mejor a quienes Dios llama a servir?',
      application: 'Ora por alguien que este sirviendo o preparandose para servir en la obra del Senor.',
      prayer: 'Espiritu Santo, guia a tu iglesia, aparta obreros y envianos en obediencia a Cristo. Amen.',
      keywords: ['hechos 13', 'espiritu santo', 'enviados', 'iglesia']
    },
    '2026-11-27': {
      title: 'Hermosos son los pies de los que anuncian',
      explanation: 'Romanos 10 muestra la necesidad de enviar, predicar, oir y creer. Nadie invoca a Cristo si no ha oido de El. Esta cadena nos recuerda que la mision requiere mensajeros. Dios se complace en usar personas comunes para llevar buenas nuevas. Cada iglesia debe valorar, apoyar y participar en la proclamacion del evangelio para que otros puedan escuchar y creer.',
      reflectionQuestion: 'Que parte puedes tomar en enviar, apoyar o anunciar el evangelio?',
      application: 'Apoya hoy la mision con oracion, generosidad o una conversacion evangelistica.',
      prayer: 'Senor, levanta mensajeros fieles y haznos parte de tu obra de anunciar buenas nuevas. Amen.',
      keywords: ['romanos 10', 'anunciar', 'evangelio', 'enviar']
    },
    '2026-11-28': {
      title: 'Una multitud de toda nacion',
      explanation: 'Apocalipsis nos muestra el final glorioso de la mision: una multitud de toda nacion, tribu, pueblo y lengua adorando al Cordero. La obra misionera tiene esperanza porque Dios cumplira su proposito. Cada esfuerzo fiel, cada oracion, cada testimonio y cada envio participa en una historia que termina en adoracion. La meta de la mision es que Cristo sea adorado por todos los pueblos.',
      reflectionQuestion: 'Como esta vision futura fortalece tu perseverancia en la mision?',
      application: 'Adora hoy a Cristo recordando que El esta reuniendo un pueblo de todas las naciones.',
      prayer: 'Cordero de Dios, recibe adoracion de todos los pueblos. Usa nuestras vidas para tu gloria. Amen.',
      keywords: ['apocalipsis', 'naciones', 'adoracion', 'cordero']
    },
    '2026-11-29': {
      title: 'La Palabra del Senor se difundia',
      explanation: 'En Hechos 13 vemos oposicion, gozo y expansion de la Palabra. La mision nunca avanza sin resistencia, pero Dios abre puertas y llama a los que responden con fe. Los gentiles se gozaban y glorificaban la Palabra del Senor. Esta lectura anima a la iglesia a no desanimarse ante el rechazo, sino a seguir anunciando a Cristo con confianza en el poder de Dios.',
      reflectionQuestion: 'Como respondes cuando el evangelio es rechazado o resistido?',
      application: 'Ora por perseverancia y por puertas abiertas para que la Palabra del Senor siga difundiendose.',
      prayer: 'Senor, que tu Palabra corra, sea glorificada y produzca fruto en muchos corazones. Amen.',
      keywords: ['hechos 13', 'palabra', 'mision', 'perseverancia']
    },
    '2026-11-30': {
      title: 'Firmes y constantes en la obra del Senor',
      explanation: 'Pablo cierra su gran ensenanza sobre la resurreccion llamando a la iglesia a estar firme y constante en la obra del Senor. La mision tiene sentido porque Cristo resucito. Nuestro trabajo no es en vano cuando se hace en El. Aunque a veces el fruto parezca lento, la resurreccion garantiza esperanza. La iglesia puede servir con estabilidad, gozo y perseverancia porque Cristo vive y reina.',
      reflectionQuestion: 'Que te anima a permanecer firme cuando el servicio parece dificil?',
      application: 'Renueva hoy tu compromiso con una obra concreta del Senor, confiando en que no es en vano.',
      prayer: 'Cristo resucitado, afirma nuestro corazon y haznos constantes en tu obra. Amen.',
      keywords: ['1 corintios 15', 'resurreccion', 'firmeza', 'obra del senor']
    },
    '2026-12-01': {
      title: 'La promesa de la simiente',
      explanation: 'Desde el comienzo, Dios anuncio esperanza en medio de la caida. Genesis 3:15 apunta a la victoria final de la simiente prometida sobre el mal. Diciembre nos invita a mirar la Navidad no como una tradicion sentimental, sino como el cumplimiento de una promesa antigua. Cristo vino para enfrentar el pecado, vencer al enemigo y traer redencion a un mundo quebrantado.',
      reflectionQuestion: 'Como te ayuda saber que Dios prometio redencion desde el principio?',
      application: 'Comienza diciembre adorando a Cristo como el cumplimiento de la promesa de Dios.',
      prayer: 'Senor, gracias porque desde el principio preparaste salvacion en Cristo. Amen.',
      keywords: ['promesa', 'genesis', 'redencion', 'cristo']
    },
    '2026-12-02': {
      title: 'Bendicion para todas las familias',
      explanation: 'La promesa dada a Abraham no era pequena ni privada. Dios anuncio que por medio de su descendencia serian benditas todas las familias de la tierra. Cristo es la respuesta final a esa promesa. En El, Dios trae bendicion, perdon y esperanza a pueblos y naciones. La Navidad nos recuerda que el evangelio tiene alcance mundial y que la iglesia vive para anunciar esa bendicion.',
      reflectionQuestion: 'Tu gratitud por Cristo te mueve a desear que otros tambien le conozcan?',
      application: 'Ora hoy por una familia o persona que necesita recibir la bendicion del evangelio.',
      prayer: 'Dios fiel, bendice a las naciones por medio de Cristo y usa nuestra vida para anunciarlo. Amen.',
      keywords: ['abraham', 'bendicion', 'naciones', 'evangelio']
    },
    '2026-12-03': {
      title: 'Un nino nos es nacido',
      explanation: 'Isaias anuncia luz para un pueblo que caminaba en tinieblas. El hijo prometido llevaria nombres gloriosos: Admirable, Consejero, Dios fuerte, Padre eterno y Principe de paz. Esta promesa nos muestra que la esperanza de Dios no llega por poder humano, sino por el Rey dado por gracia. Jesus trae gobierno justo, paz verdadera y luz donde el pecado habia dejado oscuridad.',
      reflectionQuestion: 'Que area de tu vida necesita la luz y paz del Principe de paz?',
      application: 'Entrega hoy una preocupacion a Cristo, recordando que su gobierno es bueno y fiel.',
      prayer: 'Principe de paz, gobierna mi corazon y trae tu luz a mi vida. Amen.',
      keywords: ['isaias 9', 'paz', 'rey', 'luz']
    },
    '2026-12-04': {
      title: 'El Renuevo justo',
      explanation: 'Jeremias anuncia un Rey justo de la casa de David. En tiempos de fracaso y corrupcion, Dios promete levantar a uno que reinara con justicia y salvacion. Jesus es ese Renuevo justo. Su venida nos recuerda que Dios no abandona su pacto ni deja a su pueblo sin esperanza. La justicia que necesitamos no nace de nosotros; viene del Senor, nuestra justicia.',
      reflectionQuestion: 'Estas descansando en tu propia justicia o en la justicia de Cristo?',
      application: 'Confiesa a Dios tu necesidad de la justicia y salvacion que solo Cristo puede dar.',
      prayer: 'Senor, tu eres nuestra justicia. Haznos descansar en Cristo y vivir para tu gloria. Amen.',
      keywords: ['jeremias', 'justicia', 'renuevo', 'david']
    },
    '2026-12-05': {
      title: 'El Rey nacido en Belen',
      explanation: 'Miqueas anuncia que de Belen saldria un gobernante para Israel, uno cuyos origenes son desde la antiguedad. Dios escoge un lugar pequeno para revelar una gloria inmensa. La Navidad nos ensena que el reino de Dios no sigue los patrones de grandeza humana. El Rey prometido viene con humildad, pero trae paz, pastoreo y autoridad para su pueblo.',
      reflectionQuestion: 'Como corrige Belen tu idea de grandeza y poder?',
      application: 'Busca hoy servir con humildad, recordando al Rey que vino de manera sencilla.',
      prayer: 'Rey Jesus, ensename a valorar tu humildad y a confiar en tu gobierno. Amen.',
      keywords: ['belen', 'miqueas', 'rey', 'humildad']
    },
    '2026-12-06': {
      title: 'Nada es imposible para Dios',
      explanation: 'El anuncio a Maria revela que la venida de Cristo es obra de Dios de principio a fin. Maria recibe una promesa imposible desde la perspectiva humana, pero segura porque Dios la ha hablado. Su respuesta muestra fe humilde: hagase conforme a tu palabra. La iglesia tambien aprende a vivir confiando en la Palabra del Dios para quien nada es imposible.',
      reflectionQuestion: 'Que promesa de Dios necesitas creer con humildad hoy?',
      application: 'Responde a la Palabra de Dios con obediencia, aun cuando no entiendas todos los detalles.',
      prayer: 'Dios poderoso, aumenta mi fe y hazme obediente a tu Palabra. Amen.',
      keywords: ['lucas 1', 'maria', 'fe', 'promesa']
    },
    '2026-12-07': {
      title: 'El Dios que visita a su pueblo',
      explanation: 'Zacarias bendice a Dios porque ha visitado y redimido a su pueblo. La venida de Cristo no es una idea abstracta; es Dios acercandose para cumplir su pacto y traer salvacion. La misericordia prometida se vuelve realidad. En Cristo, Dios rompe la oscuridad y dirige nuestros pies por camino de paz.',
      reflectionQuestion: 'Como has visto la misericordia de Dios visitando tu vida?',
      application: 'Haz una lista breve de razones para bendecir a Dios por su salvacion.',
      prayer: 'Senor, gracias por visitarnos con misericordia y redencion en Cristo. Amen.',
      keywords: ['zacararias', 'redencion', 'misericordia', 'paz']
    },
    '2026-12-08': {
      title: 'La luz en tinieblas',
      explanation: 'Isaias llama al pueblo a levantarse porque la luz de Dios ha venido. La oscuridad no tiene la ultima palabra cuando el Senor manifiesta su gloria. Esta lectura nos prepara para contemplar a Cristo como la luz verdadera. En un mundo cansado y confundido, la iglesia no inventa esperanza; apunta a la luz que Dios ya ha dado en su Hijo.',
      reflectionQuestion: 'Donde necesitas caminar mas cerca de la luz de Cristo?',
      application: 'Rechaza hoy una obra de oscuridad y camina en una decision que honre a Cristo.',
      prayer: 'Senor, alumbra mi vida con tu gloria y hazme reflejar tu luz. Amen.',
      keywords: ['luz', 'isaias 60', 'gloria', 'esperanza']
    },
    '2026-12-09': {
      title: 'El Hijo de David',
      explanation: 'La genealogia de Mateo nos recuerda que Jesus entra en una historia real. Dios fue fiel a traves de generaciones, familias complicadas, reyes, exilio y espera. Jesus es el Hijo de David y el Hijo de Abraham, el cumplimiento de las promesas. Esta lista de nombres nos ensena que Dios trabaja con fidelidad aun cuando la historia parece lenta o desordenada.',
      reflectionQuestion: 'Como te anima saber que Dios obra fielmente a traves del tiempo?',
      application: 'Confia hoy una situacion lenta o incompleta a la fidelidad de Dios.',
      prayer: 'Dios fiel, gracias porque cumples tus promesas en Cristo. Amen.',
      keywords: ['genealogia', 'mateo 1', 'david', 'promesas']
    },
    '2026-12-10': {
      title: 'Dios con nosotros',
      explanation: 'Mateo anuncia que el nacimiento de Jesus cumple la promesa de Emmanuel: Dios con nosotros. Pero esta presencia viene con una mision clara: Jesus salvara a su pueblo de sus pecados. La Navidad no solo nos dice que Dios se acerca; nos dice por que se acerca. Cristo viene a rescatar, perdonar y restaurar a pecadores por pura gracia.',
      reflectionQuestion: 'Que significa para ti que Dios este con nosotros para salvar?',
      application: 'Da gracias hoy por el perdon de Cristo y comparte esa esperanza con alguien.',
      prayer: 'Emmanuel, gracias por venir a salvarnos de nuestros pecados. Amen.',
      keywords: ['emmanuel', 'mateo 1', 'salvacion', 'jesus']
    },
    '2026-12-11': {
      title: 'Preparar el camino',
      explanation: 'Juan el Bautista aparece llamando al pueblo al arrepentimiento y preparando el camino del Senor. La Navidad tambien nos llama a preparar el corazon. No basta celebrar externamente si seguimos resistiendo la voz de Dios. El Rey viene, y su pueblo responde enderezando caminos torcidos, confesando pecado y volviendo al Senor con sinceridad.',
      reflectionQuestion: 'Que camino torcido necesita ser enderezado delante de Dios?',
      application: 'Practica arrepentimiento concreto: confiesa, corrige y vuelve al Senor.',
      prayer: 'Senor, prepara mi corazon para recibirte con arrepentimiento y fe. Amen.',
      keywords: ['arrepentimiento', 'juan bautista', 'preparar', 'camino']
    },
    '2026-12-12': {
      title: 'El Cordero de Dios',
      explanation: 'Juan identifica a Jesus como el Cordero de Dios que quita el pecado del mundo. Esta declaracion nos lleva al centro de la mision de Cristo. El nino nacido en Belen vino para ser el sacrificio perfecto por pecadores. La Navidad apunta hacia la cruz. Nuestro gozo es profundo porque Cristo no vino solo a acompanarnos, sino a quitar nuestra culpa.',
      reflectionQuestion: 'Estas mirando a Cristo como el unico que puede quitar tu pecado?',
      application: 'Confiesa tu pecado y descansa en el sacrificio suficiente de Jesus.',
      prayer: 'Cordero de Dios, gracias por quitar nuestro pecado y darnos paz con Dios. Amen.',
      keywords: ['cordero', 'juan 1', 'pecado', 'cruz']
    },
    '2026-12-13': {
      title: 'Jesus salvara a su pueblo',
      explanation: 'El nombre Jesus anuncia su obra: El salvara a su pueblo de sus pecados. Esta salvacion es mas profunda que resolver problemas temporales. Cristo viene a tratar la raiz de nuestra separacion de Dios. Jose obedece por fe, y nosotros somos llamados a recibir con reverencia al Salvador prometido. La Navidad es buena noticia porque Dios mismo provee salvacion.',
      reflectionQuestion: 'De que necesitas ser rescatado por la gracia de Cristo?',
      application: 'Adora hoy a Jesus no solo como nino nacido, sino como Salvador suficiente.',
      prayer: 'Jesus, Salvador nuestro, libra nuestro corazon del pecado y haznos tuyos. Amen.',
      keywords: ['salvador', 'jesus', 'mateo 1', 'pecados']
    },
    '2026-12-14': {
      title: 'Buenas nuevas para los humildes',
      explanation: 'Los pastores reciben el anuncio celestial en medio de una noche ordinaria. Dios se complace en revelar su gloria a los humildes. Las buenas nuevas no son para una elite espiritual, sino para todo el pueblo. El Salvador ha nacido. Esta noticia rompe el temor y produce gozo, porque Cristo llega a personas comunes con gracia extraordinaria.',
      reflectionQuestion: 'Como recibes la buena noticia de Cristo: con rutina o con asombro?',
      application: 'Lee el anuncio de los angeles lentamente y responde con gratitud.',
      prayer: 'Senor, devuelveme el asombro y el gozo por las buenas nuevas de Cristo. Amen.',
      keywords: ['pastores', 'gozo', 'lucas 2', 'buenas nuevas']
    },
    '2026-12-15': {
      title: 'Los pastores adoran',
      explanation: 'Despues de escuchar el anuncio, los pastores van, ven y cuentan lo que les fue dicho. La verdadera adoracion no se queda inmovil; responde. Ellos vuelven glorificando y alabando a Dios. La Navidad nos invita a ese mismo movimiento: escuchar la Palabra, contemplar a Cristo, compartir la noticia y regresar a la vida diaria con alabanza.',
      reflectionQuestion: 'Tu adoracion te mueve a contar lo que Dios ha hecho?',
      application: 'Comparte hoy con alguien una razon por la que Cristo es buena noticia.',
      prayer: 'Dios, haz que mi adoracion se convierta en testimonio alegre. Amen.',
      keywords: ['adoracion', 'pastores', 'testimonio', 'gloria']
    },
    '2026-12-16': {
      title: 'Simeon espera la consolacion',
      explanation: 'Simeon esperaba la consolacion de Israel, y el Espiritu le permite ver al Cristo del Senor. Su espera no fue vacia; estaba sostenida por la promesa de Dios. Al tomar al nino Jesus, Simeon reconoce salvacion preparada para todos los pueblos. La fe aprende a esperar porque Dios cumple su Palabra en el tiempo correcto.',
      reflectionQuestion: 'Que espera necesitas entregar a la fidelidad de Dios?',
      application: 'Ora con paciencia por una promesa o necesidad que aun no ves cumplida.',
      prayer: 'Senor, ensename a esperar con fe y a reconocer tu salvacion en Cristo. Amen.',
      keywords: ['simeon', 'esperanza', 'consolacion', 'salvacion']
    },
    '2026-12-17': {
      title: 'Ana habla del Redentor',
      explanation: 'Ana perseveraba en adoracion, ayuno y oracion. Al ver a Jesus, da gracias y habla de El a quienes esperaban redencion. Su vida nos recuerda que la edad, la espera y el dolor no cancelan la utilidad espiritual. Quien ha visto la gracia de Dios en Cristo tiene razones para agradecer y hablar del Redentor.',
      reflectionQuestion: 'A quien puedes hablarle hoy del Redentor?',
      application: 'Da gracias por Cristo y comparte una palabra de esperanza con alguien que espera consuelo.',
      prayer: 'Senor, hazme perseverante en adoracion y valiente para hablar de Cristo. Amen.',
      keywords: ['ana', 'redencion', 'oracion', 'testimonio']
    },
    '2026-12-18': {
      title: 'La alegria del reino',
      explanation: 'El Salmo 98 llama a cantar al Senor porque ha hecho maravillas y ha mostrado su salvacion. La venida de Cristo es motivo de canto porque Dios ha recordado su misericordia y fidelidad. La creacion entera es invitada a celebrar al Rey. La alegria cristiana no ignora el dolor, pero mira al Senor que viene a juzgar con justicia y restaurar.',
      reflectionQuestion: 'Que maravilla de Dios necesitas celebrar hoy?',
      application: 'Canta, lee o comparte un salmo de alabanza como respuesta a la salvacion de Dios.',
      prayer: 'Senor, llena mi boca de alabanza por tu salvacion y fidelidad. Amen.',
      keywords: ['salmo 98', 'alegria', 'alabanza', 'reino']
    },
    '2026-12-19': {
      title: 'Venid, adoremos',
      explanation: 'El Salmo 95 nos llama a cantar, postrarnos y arrodillarnos delante del Senor nuestro Hacedor. La adoracion no es solo emocion; es reconocimiento humilde de quien es Dios. En Navidad, la iglesia no adora una idea tierna, sino al Rey y Pastor de su pueblo. Venimos con gozo porque somos ovejas de su mano.',
      reflectionQuestion: 'Tu adoracion reconoce a Dios como Rey y Pastor?',
      application: 'Aparta un momento para adorar sin pedir nada, solo reconociendo la grandeza de Dios.',
      prayer: 'Senor, eres nuestro Hacedor y Pastor. Recibe nuestra adoracion. Amen.',
      keywords: ['adoracion', 'salmo 95', 'pastor', 'gozo']
    },
    '2026-12-20': {
      title: 'Ha nacido un Salvador',
      explanation: 'Lucas presenta el nacimiento de Jesus en humildad, pero rodeado de gloria celestial. El Salvador nace en un pesebre, y los angeles proclaman paz y gozo. Esta escena une sencillez y majestad. Cristo vino a lugares bajos para levantar a pecadores. La respuesta correcta es recibir la noticia, glorificar a Dios y vivir anunciando que el Salvador ha nacido.',
      reflectionQuestion: 'Como responde tu corazon al Salvador nacido por ti?',
      application: 'Haz de esta semana una oportunidad para adorar y anunciar a Cristo con claridad.',
      prayer: 'Cristo el Senor, gracias por venir como Salvador. Recibe gloria en nuestra vida. Amen.',
      keywords: ['nacimiento', 'salvador', 'lucas 2', 'gloria']
    },
    '2026-12-21': {
      title: 'En el principio era el Verbo',
      explanation: 'Juan comienza mirando mas alla del pesebre: Jesus es el Verbo eterno, Dios mismo, por quien todas las cosas fueron hechas. La Navidad no comienza en Belen, sino en la eternidad del Hijo. El que vino a nosotros es Creador y vida. Esta verdad aumenta nuestra adoracion: el nino nacido es el Senor eterno que sostiene todo.',
      reflectionQuestion: 'Como cambia tu adoracion saber que Jesus es el Verbo eterno?',
      application: 'Adora a Cristo hoy como Creador, Sustentador y vida verdadera.',
      prayer: 'Verbo eterno, te adoramos como Dios verdadero y fuente de vida. Amen.',
      keywords: ['verbo', 'juan 1', 'eternidad', 'vida']
    },
    '2026-12-22': {
      title: 'La luz verdadera',
      explanation: 'Juan declara que la luz verdadera vino al mundo. Algunos le rechazaron, pero a quienes le recibieron les dio potestad de ser hechos hijos de Dios. La Navidad nos confronta con una respuesta: rechazar o recibir a Cristo. Recibirle no es solo admirar su historia, sino confiar en El y descansar en la gracia que nos hace hijos de Dios.',
      reflectionQuestion: 'Has recibido a Cristo con fe o solo lo conoces de lejos?',
      application: 'Renueva hoy tu confianza en Cristo como la luz verdadera.',
      prayer: 'Jesus, luz verdadera, hazme caminar como hijo de Dios por tu gracia. Amen.',
      keywords: ['luz', 'hijos de dios', 'juan 1', 'fe']
    },
    '2026-12-23': {
      title: 'El Verbo fue hecho carne',
      explanation: 'El Verbo eterno no solo visito desde lejos; se hizo carne y habito entre nosotros. En Jesus vemos la gloria del Padre llena de gracia y verdad. Dios se revela de manera personal, cercana y salvadora. La encarnacion nos asegura que Dios conoce nuestra debilidad y ha venido a rescatarnos, no con distancia, sino entrando en nuestra historia.',
      reflectionQuestion: 'Que te ensena la encarnacion sobre la cercania de Dios?',
      application: 'Acercate a Dios con confianza, recordando que Cristo vino lleno de gracia y verdad.',
      prayer: 'Padre, gracias por revelarnos tu gloria en Cristo, lleno de gracia y verdad. Amen.',
      keywords: ['encarnacion', 'gracia', 'verdad', 'juan 1']
    },
    '2026-12-24': {
      title: 'Cristo vino en humildad',
      explanation: 'Filipenses nos muestra que el Hijo eterno se humillo tomando forma de siervo. La Navidad revela humildad divina: Cristo no vino aferrandose a privilegios, sino entregandose por obediencia hasta la cruz. Celebrar su venida debe formar en nosotros la misma mente: humildad, servicio y obediencia para la gloria del Padre.',
      reflectionQuestion: 'Que actitud de orgullo necesita ser rendida ante la humildad de Cristo?',
      application: 'Practica hoy un acto de servicio humilde en honor a Cristo.',
      prayer: 'Jesus humilde, forma en mi tu mente de servicio y obediencia. Amen.',
      keywords: ['humildad', 'filipenses 2', 'servicio', 'obediencia']
    },
    '2026-12-25': {
      title: 'Dios envio a su Hijo',
      explanation: 'Galatas resume la Navidad con claridad: cuando vino el cumplimiento del tiempo, Dios envio a su Hijo para redimirnos y hacernos hijos. Cristo nace bajo la ley para rescatar a quienes estaban bajo condenacion. El regalo de Navidad es adopcion, libertad y comunion con el Padre por medio del Hijo y el Espiritu.',
      reflectionQuestion: 'Como cambia tu identidad saber que en Cristo eres hijo de Dios?',
      application: 'Celebra hoy la Navidad dando gracias por la redencion y adopcion en Cristo.',
      prayer: 'Padre, gracias por enviar a tu Hijo para redimirnos y hacernos tuyos. Amen.',
      keywords: ['navidad', 'galatas 4', 'adopcion', 'redencion']
    },
    '2026-12-26': {
      title: 'La gracia de Dios se manifesto',
      explanation: 'Tito declara que la gracia de Dios se manifesto para salvacion y tambien nos ensena a vivir. La gracia no solo perdona; forma un pueblo celoso de buenas obras mientras espera la esperanza bienaventurada. Despues de Navidad, no volvemos a la vida igual. La gracia manifestada en Cristo nos entrena para vivir con piedad, dominio propio y esperanza.',
      reflectionQuestion: 'Que esta ensenandote la gracia de Dios a cambiar?',
      application: 'Identifica una practica que debes abandonar y una buena obra que debes abrazar.',
      prayer: 'Gracia de Dios, salvame, ensename y formame para vivir esperando a Cristo. Amen.',
      keywords: ['gracia', 'tito 2', 'esperanza', 'buenas obras']
    },
    '2026-12-27': {
      title: 'Lleno de gracia y verdad',
      explanation: 'Juan nos invita a contemplar la gloria de Cristo, lleno de gracia y verdad. En Jesus no hay gracia sin verdad ni verdad sin gracia. El revela al Padre y trae vida a quienes estaban en tinieblas. Al mirar atras a la semana de Navidad, somos llamados a permanecer maravillados ante el Hijo que vino a habitar entre nosotros.',
      reflectionQuestion: 'Necesitas recibir hoy mas profundamente la gracia o la verdad de Cristo?',
      application: 'Lee Juan 1:14 lentamente y responde con adoracion personal.',
      prayer: 'Cristo, lleno de gracia y verdad, haznos vivir contemplando tu gloria. Amen.',
      keywords: ['juan 1', 'gracia', 'verdad', 'gloria']
    },
    '2026-12-28': {
      title: 'Mirar atras con gratitud',
      explanation: 'El Salmo 103 llama al alma a bendecir al Senor y no olvidar sus beneficios. Al acercarnos al final del ano, la gratitud nos ayuda a recordar perdon, misericordia, compasion y fidelidad. No todo habra sido facil, pero Dios ha sostenido a su pueblo. Mirar atras con gratitud prepara el corazon para seguir adelante con confianza.',
      reflectionQuestion: 'Que beneficios de Dios no quieres olvidar al cerrar el ano?',
      application: 'Escribe tres evidencias de la misericordia de Dios durante este ano.',
      prayer: 'Bendice, alma mia, al Senor. Gracias por tu perdon y misericordia. Amen.',
      keywords: ['gratitud', 'salmo 103', 'misericordia', 'ano']
    },
    '2026-12-29': {
      title: 'Confiar el camino al Senor',
      explanation: 'Proverbios nos recuerda que podemos hacer planes, pero el Senor dirige los pasos. Al pensar en un nuevo ano, no necesitamos controlar cada detalle. La sabiduria consiste en encomendar nuestras obras a Dios, buscar su voluntad y caminar con humildad. Nuestros planes son pequenos; la fidelidad del Senor es grande.',
      reflectionQuestion: 'Que plan necesitas someter a la direccion de Dios?',
      application: 'Ora por tus planes del nuevo ano y rendelos conscientemente al Senor.',
      prayer: 'Senor, dirige mis pasos y ordena mis planes segun tu voluntad. Amen.',
      keywords: ['planes', 'proverbios', 'confianza', 'direccion']
    },
    '2026-12-30': {
      title: 'Olvidando lo que queda atras',
      explanation: 'Pablo no vive atrapado en logros pasados ni derrotas antiguas. Prosigue hacia la meta en Cristo. Cerrar el ano requiere discernimiento: agradecer, aprender, arrepentirse y seguir adelante. La vida cristiana no se define por nostalgia ni culpa, sino por Cristo y su llamado. Seguimos corriendo porque El nos ha tomado por suyo.',
      reflectionQuestion: 'Que debes dejar atras para proseguir hacia Cristo?',
      application: 'Entrega a Dios una carga del ano y decide un paso concreto de obediencia.',
      prayer: 'Cristo, ayudame a proseguir hacia ti con fe, humildad y perseverancia. Amen.',
      keywords: ['filipenses 3', 'meta', 'perseverancia', 'nuevo ano']
    },
    '2026-12-31': {
      title: 'Yo hago nuevas todas las cosas',
      explanation: 'Apocalipsis 21 nos muestra una esperanza mas grande que cualquier resolucion de ano nuevo. Dios hara nuevas todas las cosas, habitara con su pueblo y quitara toda lagrima. Esta promesa nos permite cerrar el ano con esperanza firme. No sabemos todo lo que vendra, pero sabemos hacia donde va la historia: hacia la presencia plena de Dios con su pueblo.',
      reflectionQuestion: 'Como fortalece tu esperanza saber que Dios hara nuevas todas las cosas?',
      application: 'Cierra el ano orando con esperanza y entregando el futuro al Dios que reina.',
      prayer: 'Dios eterno, gracias porque haces nuevas todas las cosas. Mi futuro descansa en ti. Amen.',
      keywords: ['apocalipsis 21', 'esperanza', 'nuevo ano', 'renovacion']
    }
  };

  function findMonth(date) {
    return months.find((item) => date >= item.weeks[0].start && date <= item.weeks[item.weeks.length - 1].end) || months[0];
  }

  function findWeek(date) {
    const selectedMonth = findMonth(date);
    return selectedMonth.weeks.find((week) => date >= week.start && date <= week.end) || selectedMonth.weeks[selectedMonth.weeks.length - 1];
  }

  const readings = dailySeeds.map(([date, title, reference]) => {
    const selectedMonth = findMonth(date);
    const week = findWeek(date);
    const sunday = week.sunday.date === date;
    return {
      date,
      monthTheme: selectedMonth.theme,
      weekTheme: week.title,
      title: approvedReadings[date]?.title || `${title} (PLACEHOLDER)`,
      reference,
      version: BIBLE_VERSION,
      bibleText: '',
      bibleTextSource,
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
    version: 'RV1909-2026-12',
    months,
    readings
  };
})();
