(function () {
  const BIBLE_VERSION = 'RV1909 - Edicion de lectura PRFWB';
  const bibleTextSource = 'Texto basado en Reina-Valera 1909, dominio publico. Edicion de lectura PRFWB con actualizacion minima de ortografia/vocabulario.';
  const sundayTexts = {
    'Juan 15:1-8': `Yo soy la vid verdadera, y mi Padre es el labrador.
Todo pampano que en mi no lleva fruto, le quitara; y todo aquel que lleva fruto, le limpiara, para que lleve mas fruto.
Ya ustedes son limpios por la palabra que les he hablado.
Permanezcan en mi, y yo en ustedes. Como el pampano no puede llevar fruto de si mismo, si no permaneciere en la vid; asi ni ustedes, si no permanecen en mi.
Yo soy la vid, ustedes los pampanos: el que permanece en mi, y yo en el, este lleva mucho fruto; porque sin mi nada pueden hacer.
En esto es glorificado mi Padre, en que lleven mucho fruto, y sean asi mis discipulos.`,
    'Efesios 2:1-10': `Y el les dio vida a ustedes, cuando estaban muertos en delitos y pecados.
Pero Dios, que es rico en misericordia, por su mucho amor con que nos amo,
aun estando nosotros muertos en pecados, nos dio vida juntamente con Cristo; por gracia son salvos.
Y juntamente nos resucito, y asimismo nos hizo sentar en los cielos con Cristo Jesus,
para mostrar en los siglos venideros las abundantes riquezas de su gracia en su bondad para con nosotros en Cristo Jesus.
Porque por gracia son salvos por la fe; y esto no de ustedes, pues es don de Dios;
no por obras, para que nadie se glorie.
Porque somos hechura suya, creados en Cristo Jesus para buenas obras, las cuales Dios preparo para que anduviesemos en ellas.`,
    'Mateo 11:25-30': `En aquel tiempo, respondiendo Jesus, dijo: Te alabo, Padre, Senor del cielo y de la tierra, que hayas escondido estas cosas de los sabios y entendidos, y las hayas revelado a los ninos.
Si, Padre, porque asi te agrado.
Todas las cosas me son entregadas de mi Padre; y nadie conocio al Hijo, sino el Padre; ni al Padre conocio alguno, sino el Hijo, y aquel a quien el Hijo lo quisiere revelar.
Vengan a mi todos los que estan trabajados y cargados, que yo les hare descansar.
Lleven mi yugo sobre ustedes, y aprendan de mi, que soy manso y humilde de corazon; y hallaran descanso para sus almas.
Porque mi yugo es facil, y ligera mi carga.`,
    'Salmo 23': `Jehova es mi pastor; nada me faltara.
En lugares de delicados pastos me hara yacer; junto a aguas de reposo me pastoreara.
Confortara mi alma; me guiara por sendas de justicia por amor de su nombre.
Aunque ande en valle de sombra de muerte, no temere mal alguno; porque tu estaras conmigo: tu vara y tu cayado me infundiran aliento.
Aderezaras mesa delante de mi en presencia de mis angustiadores; ungiste mi cabeza con aceite; mi copa esta rebosando.
Ciertamente el bien y la misericordia me seguiran todos los dias de mi vida; y en la casa de Jehova morare por largos dias.`,
    'Romanos 8:31-39': `Que, pues, diremos a esto? Si Dios por nosotros, quien contra nosotros?
El que aun a su propio Hijo no perdono, antes le entrego por todos nosotros, como no nos dara tambien con el todas las cosas?
Quien acusara a los escogidos de Dios? Dios es el que justifica.
Quien es el que condenara? Cristo es el que murio; mas aun, el que tambien resucito, quien ademas esta a la diestra de Dios, el que tambien intercede por nosotros.
Quien nos apartara del amor de Cristo? tribulacion, o angustia, o persecucion, o hambre, o desnudez, o peligro, o espada?
Antes, en todas estas cosas somos mas que vencedores por medio de aquel que nos amo.
Por lo cual estoy cierto que ni la muerte, ni la vida, ni angeles, ni principados, ni potestades, ni lo presente, ni lo por venir,
ni lo alto, ni lo bajo, ni ninguna criatura nos podra apartar del amor de Dios, que es en Cristo Jesus Senor nuestro.`,
    'Hebreos 1:1-4': `Dios, habiendo hablado muchas veces y en muchas maneras en otro tiempo a los padres por los profetas,
en estos postreros dias nos ha hablado por el Hijo, al cual constituyo heredero de todo, por el cual asimismo hizo el universo.
El cual, siendo el resplandor de su gloria, y la imagen misma de su sustancia, y sustentando todas las cosas con la palabra de su potencia, habiendo hecho la purificacion de nuestros pecados por si mismo, se sento a la diestra de la Majestad en las alturas,
hecho tanto mas excelente que los angeles, cuanto alcanzo por herencia mas excelente nombre que ellos.`,
    'Romanos 12:1-2': `Asi que, hermanos, les ruego por las misericordias de Dios, que presenten sus cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional.
Y no se conformen a este siglo; mas sean transformados por la renovacion de vuestro entendimiento, para que experimenten cual sea la buena voluntad de Dios, agradable y perfecta.`,
    'Lucas 24:25-27': `Entonces el les dijo: Oh insensatos, y tardos de corazon para creer todo lo que los profetas han dicho!
No era necesario que el Cristo padeciera estas cosas, y que entrara en su gloria?
Y comenzando desde Moises, y de todos los profetas, les declaraba en todas las Escrituras lo que de el decian.`,
    'Santiago 1:22-25': `Pero sean hacedores de la palabra, y no tan solamente oidores, enganandose a ustedes mismos.
Porque si alguno oye la palabra, y no la pone por obra, este tal es semejante al hombre que considera en un espejo su rostro natural.
Porque el se considero a si mismo, y se fue, y luego se olvido que tal era.
Mas el que mira atentamente en la perfecta ley, que es la de la libertad, y persevera en ella, no siendo oidor olvidadizo, sino hacedor de la obra, este sera bienaventurado en lo que hace.`,
    '2 Timoteo 3:14-17': `Pero persiste tu en lo que has aprendido y te persuadiste, sabiendo de quien has aprendido;
y que desde la ninez has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvacion por la fe que es en Cristo Jesus.
Toda Escritura es inspirada divinamente y util para ensenar, para redarguir, para corregir, para instruir en justicia;
para que el hombre de Dios sea perfecto, enteramente instruido para toda buena obra.`,
    'Lucas 11:1-13': `Y acontecio que estando el orando en un lugar, cuando acabo, uno de sus discipulos le dijo: Senor, ensenanos a orar, como tambien Juan enseno a sus discipulos.
Y les dijo: Cuando oren, digan: Padre nuestro que estas en los cielos, santificado sea tu nombre. Venga tu reino. Sea hecha tu voluntad, como en el cielo, asi tambien en la tierra.
Danos hoy nuestro pan cotidiano. Y perdonanos nuestros pecados, porque tambien nosotros perdonamos a todos los que nos deben; y no nos metas en tentacion, mas libranos del mal.
Y les dijo: Quien de ustedes tendra un amigo, e ira a el a medianoche, y le dira: Amigo, prestame tres panes;
porque un amigo mio ha venido a mi de camino, y no tengo que ponerle delante;
y el de dentro respondiendo dijere: No me molestes; la puerta ya esta cerrada, y mis ninos estan conmigo en cama; no puedo levantarme a darte.
Les digo que aunque no se levante a darle por ser su amigo, cierto por su importunidad se levantara, y le dara todo lo que necesite.
Y yo les digo: Pidan, y se les dara; busquen, y hallaran; llamen, y se les abrira.
Porque todo aquel que pide, recibe; y el que busca, halla; y al que llama, se abre.
Pues si ustedes, siendo malos, saben dar buenas dadivas a sus hijos, cuanto mas vuestro Padre celestial dara el Espiritu Santo a los que se lo pidan?`,
    'Santiago 5:13-18': `Esta alguno entre ustedes afligido? haga oracion. Esta alguno alegre? cante salmos.
Esta alguno enfermo entre ustedes? llame a los ancianos de la iglesia, y oren por el, ungiendole con aceite en el nombre del Senor.
Y la oracion de fe salvara al enfermo, y el Senor lo levantara; y si estuviere en pecados, le seran perdonados.
Confiesen sus faltas unos a otros, y oren unos por otros, para que sean sanados; la oracion eficaz del justo puede mucho.
Elias era hombre sujeto a semejantes pasiones que nosotros, y rogo con oracion que no lloviese, y no llovio sobre la tierra por tres anos y seis meses.
Y otra vez oro, y el cielo dio lluvia, y la tierra produjo su fruto.`,
    'Hechos 4:23-31': `Y sueltos, vinieron a los suyos, y contaron todo lo que los principes de los sacerdotes y los ancianos les habian dicho.
Y ellos, habiendolo oido, alzaron unanimes la voz a Dios, y dijeron: Senor, tu eres el Dios que hiciste el cielo y la tierra, el mar y todo lo que en ellos hay.
Y ahora, Senor, mira sus amenazas, y da a tus siervos que con toda confianza hablen tu palabra;
extendiendo tu mano a que sanidades, senales y prodigios sean hechos por el nombre de tu santo Hijo Jesus.
Y como hubieron orado, el lugar en que estaban congregados temblo; y todos fueron llenos del Espiritu Santo, y hablaban la palabra de Dios con confianza.`,
    '2 Tesalonicenses 3:1-5': `Por lo demas, hermanos, oren por nosotros, que la palabra del Senor corra y sea glorificada, asi como entre ustedes;
y que seamos librados de hombres importunos y malos; porque no es de todos la fe.
Mas fiel es el Senor, que les confirmara y guardara del mal.
Y tenemos confianza de ustedes en el Senor, que hacen y haran lo que les hemos mandado.
Y el Senor dirija vuestros corazones en el amor de Dios, y en la paciencia de Cristo.`,
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
    'Colosenses 3:1-17': `Si pues han resucitado con Cristo, busquen las cosas de arriba, donde esta Cristo sentado a la diestra de Dios.
Pongan la mira en las cosas de arriba, no en las de la tierra.
Porque muertos son, y su vida esta escondida con Cristo en Dios.
Cuando Cristo, nuestra vida, se manifestare, entonces ustedes tambien seran manifestados con el en gloria.
Hagan morir, pues, lo terrenal en ustedes.
Vestanse, pues, como escogidos de Dios, santos y amados, de entranas de misericordia, de benignidad, de humildad, de mansedumbre, de paciencia;
soportandose unos a otros, y perdonandose unos a otros si alguno tuviere queja del otro; de la manera que Cristo les perdono, asi tambien haganlo ustedes.
Y sobre todas estas cosas vistanse de amor, que es el vinculo de perfeccion.
Y la paz de Dios gobierne en sus corazones, a la cual asimismo fueron llamados en un cuerpo; y sean agradecidos.
La palabra de Cristo habite en ustedes abundantemente en toda sabiduria, ensenandose y exhortandose unos a otros con salmos, himnos y canciones espirituales, con gracia cantando en sus corazones al Senor.
Y todo lo que hagan, sea de palabra o de hecho, haganlo todo en el nombre del Senor Jesus, dando gracias a Dios Padre por el.`,
    'Salmo 1': `Bienaventurado el varon que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado;
antes en la ley de Jehova esta su delicia, y en su ley medita de dia y de noche.
Y sera como el arbol plantado junto a arroyos de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace prosperara.
No asi los malos: sino como el tamo que arrebata el viento.
Por tanto no se levantaran los malos en el juicio, ni los pecadores en la congregacion de los justos.
Porque Jehova conoce el camino de los justos; mas la senda de los malos perecera.`,
    'Filipenses 4:4-9': `Regocijense en el Senor siempre; otra vez digo: Regocijense.
Vuestra modestia sea conocida de todos los hombres. El Senor esta cerca.
Por nada esten afanosos; sino sean conocidas vuestras peticiones delante de Dios en toda oracion y ruego, con accion de gracias.
Y la paz de Dios, que sobrepuja todo entendimiento, guardara vuestros corazones y vuestros entendimientos en Cristo Jesus.
Por lo demas, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si alguna alabanza, en esto piensen.
Lo que aprendieron, recibieron, oyeron y vieron en mi, esto hagan; y el Dios de paz sera con ustedes.`,
    'Hebreos 10:19-25': `Asi que, hermanos, teniendo libertad para entrar en el santuario por la sangre de Jesucristo,
por el camino que el nos consagro nuevo y vivo, por el velo, esto es, por su carne;
y teniendo un gran sacerdote sobre la casa de Dios,
lleguemonos con corazon verdadero, en plena certidumbre de fe, purificados los corazones de mala conciencia, y lavados los cuerpos con agua limpia.
Mantengamos firme la profesion de nuestra esperanza sin fluctuar; que fiel es el que prometio.
Y consideremonos los unos a los otros para provocarnos al amor y a las buenas obras;
no dejando nuestra congregacion, como algunos tienen por costumbre, sino exhortandonos; y tanto mas, cuanto ven que aquel dia se acerca.`,
    'Hebreos 12:1-3': `Por tanto nosotros tambien, teniendo en derredor nuestro una tan grande nube de testigos, dejando todo el peso del pecado que nos rodea, corramos con paciencia la carrera que nos es propuesta,
puestos los ojos en Jesus, el autor y consumador de la fe, el cual, habiendole sido propuesto gozo, sufrio la cruz, menospreciando la verguenza, y sentose a la diestra del trono de Dios.
Reduzcan, pues, a vuestro pensamiento a aquel que sufrio tal contradiccion de pecadores contra si mismo, para que no se fatiguen en vuestros animos desmayando.`,
    'Mateo 6:9-13': `Ustedes, pues, oren asi:

Padre nuestro que estas en los cielos, santificado sea tu nombre.
Venga tu reino. Sea hecha tu voluntad, como en el cielo, asi tambien en la tierra.
Danos hoy nuestro pan cotidiano.
Y perdonanos nuestras deudas, como tambien nosotros perdonamos a nuestros deudores.
Y no nos metas en tentacion, mas libranos del mal:
porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amen.`
  };

  const august = {
    year: 2026,
    month: 8,
    monthKey: '2026-08',
    monthName: 'Agosto',
    theme: 'Jesus, el Centro',
    description: 'Durante agosto, PRFWB sera animada a comenzar poniendo a Jesus en el centro: permanecer en El, descansar en su gracia, caminar bajo su cuidado y vivir seguros en su amor.',
    weeks: [
      {
        title: 'Permanecer en Cristo',
        start: '2026-08-01',
        end: '2026-08-02',
        sunday: {
          date: '2026-08-02',
          theme: 'Separados de mi nada pueden hacer',
          reference: 'Juan 15:1-8',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Juan 15:1-8'] || '',
          bibleTextSource,
          introduction: 'Comenzamos agosto mirando a Jesus como la vid verdadera. La vida cristiana no se sostiene por esfuerzo separado de Cristo, sino por permanecer en El. Todo fruto verdadero nace de la comunion con el Senor, de su Palabra limpiando nuestro corazon y de una dependencia diaria que glorifica al Padre.',
          mainTruth: 'El discipulo lleva fruto cuando permanece unido a Cristo.'
        }
      },
      {
        title: 'Salvos por gracia',
        start: '2026-08-03',
        end: '2026-08-09',
        sunday: {
          date: '2026-08-09',
          theme: 'Por gracia son salvos',
          reference: 'Efesios 2:1-10',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Efesios 2:1-10'] || '',
          bibleTextSource,
          introduction: 'Efesios nos recuerda que nuestra historia espiritual comienza con muerte, pero Dios interviene con misericordia. La salvacion no es premio por obras, sino regalo de gracia en Cristo. Esa misma gracia nos crea de nuevo para caminar en buenas obras que Dios preparo.',
          mainTruth: 'Somos salvos por gracia en Cristo y creados para vivir en buenas obras.'
        }
      },
      {
        title: 'Descansar en Jesus',
        start: '2026-08-10',
        end: '2026-08-16',
        sunday: {
          date: '2026-08-16',
          theme: 'Vengan a mi',
          reference: 'Mateo 11:25-30',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Mateo 11:25-30'] || '',
          bibleTextSource,
          introduction: 'Jesus llama a los cansados y cargados a venir a El. No ofrece una carga mas pesada, sino descanso para el alma. Aprender de Cristo significa recibir su mansedumbre, rendir nuestro orgullo y caminar bajo su yugo bueno. El descanso verdadero se encuentra en el Senor.',
          mainTruth: 'Jesus da descanso verdadero a los que vienen a El con humildad y fe.'
        }
      },
      {
        title: 'Guiados por el Pastor',
        start: '2026-08-17',
        end: '2026-08-23',
        sunday: {
          date: '2026-08-23',
          theme: 'Jehova es mi pastor',
          reference: 'Salmo 23',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Salmo 23'] || '',
          bibleTextSource,
          introduction: 'El Salmo 23 nos lleva a descansar en el cuidado personal del Senor. Dios guia, sustenta, corrige, acompana y consuela a su pueblo. Aun en valles oscuros, el creyente no camina solo. La bondad y misericordia del Pastor sostienen nuestra vida.',
          mainTruth: 'El Senor cuida, guia y acompana fielmente a su pueblo.'
        }
      },
      {
        title: 'Seguros en su amor',
        start: '2026-08-24',
        end: '2026-08-30',
        sunday: {
          date: '2026-08-30',
          theme: 'Nada nos separara',
          reference: 'Romanos 8:31-39',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Romanos 8:31-39'] || '',
          bibleTextSource,
          introduction: 'Romanos 8 afirma una seguridad profunda: Dios esta por nosotros en Cristo. Ninguna acusacion, condenacion, sufrimiento o poder creado puede separar al creyente del amor de Dios. Esta esperanza no niega las pruebas, pero nos sostiene en medio de ellas.',
          mainTruth: 'Nada puede separar al creyente del amor de Dios en Cristo Jesus.'
        }
      },
      {
        title: 'Preparados para escuchar',
        start: '2026-08-31',
        end: '2026-08-31',
        sunday: {
          date: '2026-09-06',
          theme: 'Dios nos ha hablado por su Palabra',
          reference: 'Hebreos 1:1-4',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hebreos 1:1-4'] || '',
          bibleTextSource,
          introduction: 'Agosto cierra preparando el corazon para septiembre: un mes enfocado en la Palabra. El Dios que cuida, salva y sostiene tambien habla. Su revelacion culmina en Cristo, el Hijo, a quien debemos escuchar con reverencia, fe y obediencia.',
          mainTruth: 'Dios ha hablado plenamente en su Hijo, y su pueblo responde escuchando y obedeciendo.'
        }
      }
    ]
  };

  const september = {
    year: 2026,
    month: 9,
    monthKey: '2026-09',
    monthName: 'Septiembre',
    theme: 'Firmes en la Palabra',
    description: 'Durante septiembre, PRFWB sera animada a conocer, creer, meditar y obedecer la Palabra de Dios, reconociendo que las Escrituras nos conducen a Cristo y forman nuestra vida como discipulos.',
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
          introduction: 'Durante esta semana hemos meditado en la Palabra que alumbra, discierne y transforma el corazon. Romanos nos llama a responder a las misericordias de Dios con una vida presentada a El. La renovacion verdadera no comienza copiando el molde del mundo, sino dejando que Dios transforme nuestra mente por su verdad.',
          mainTruth: 'La Palabra renueva nuestra mente para vivir conforme a la voluntad de Dios.'
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
          introduction: 'Jesus ensena a sus discipulos a leer las Escrituras con ojos abiertos al plan de Dios. Moises, los profetas y toda la historia biblica apuntan hacia el Cristo que padeceria y entraria en su gloria. La iglesia lee la Biblia correctamente cuando la Palabra nos conduce a adorar, confiar y obedecer a Jesus.',
          mainTruth: 'Toda la Escritura apunta al plan redentor de Dios cumplido en Cristo.'
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
          introduction: 'Santiago nos advierte contra una fe que escucha pero no responde. La Palabra es como espejo que muestra la verdad del corazon, pero Dios no nos llama a mirar y olvidar. La bendicion esta en perseverar como hacedores de la Palabra, obedeciendo con gozo lo que el Senor ha revelado.',
          mainTruth: 'La fe viva escucha la Palabra y responde con obediencia.'
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
          introduction: 'Al cerrar el enfasis de septiembre, recordamos que las Escrituras son inspiradas por Dios y suficientes para formar a su pueblo. La Palabra nos hace sabios para la salvacion en Cristo y nos instruye para vivir en justicia. Una iglesia firme en la verdad sera una iglesia preparada para toda buena obra.',
          mainTruth: 'Las Escrituras preparan al pueblo de Dios para toda buena obra.'
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
          introduction: 'Jesus no solo ensena palabras para repetir; forma en sus discipulos una confianza profunda en el Padre. La oracion cristiana se acerca con reverencia, dependencia y perseverancia. Podemos pedir, buscar y llamar porque el Padre escucha a sus hijos y da lo que verdaderamente necesitamos.',
          mainTruth: 'Dios llama a sus hijos a acercarse con confianza, perseverancia y dependencia.'
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
          introduction: 'Santiago presenta la oracion como respuesta natural del pueblo de Dios en toda circunstancia: afliccion, alegria, enfermedad, pecado y necesidad. La iglesia no ora porque controla los resultados, sino porque confia en la gracia y poder del Senor. La oracion eficaz nace de una fe humilde que depende de Dios.',
          mainTruth: 'La iglesia ora confiando en la gracia, el poder y la fidelidad de Dios.'
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
          introduction: 'Cuando la iglesia primitiva enfrento amenazas, no respondio primero con temor ni silencio, sino con oracion. Reconocieron al Dios Creador, pidieron valentia y confiaron en el nombre de Jesus. Una iglesia que ora con fe puede proclamar la Palabra con confianza aun en medio de oposicion.',
          mainTruth: 'Una iglesia llena del Espiritu ora y proclama la Palabra con valentia.'
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
          introduction: 'Pablo pide oracion para que la Palabra del Senor corra y sea glorificada. La mision de la iglesia necesita mas que estrategia; necesita dependencia de Dios. Al orar por la expansion del evangelio, nuestros corazones son dirigidos al amor de Dios y a la paciencia de Cristo.',
          mainTruth: 'La oracion impulsa a la iglesia a vivir y servir en la mision de Dios.'
        }
      }
    ]
  };

  const months = [august, september, october];

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
        title: 'Esperanza para un nuevo año',
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

  const january = {
    year: 2027,
    month: 1,
    monthKey: '2027-01',
    monthName: 'Enero',
    theme: 'Nuevo Año, Vida Renovada',
    description: 'Durante enero, PRFWB sera animada a comenzar el ano buscando primero a Cristo, renovando la mente en la Palabra, caminando en oracion, viviendo en comunidad y perseverando con esperanza.',
    weeks: [
      {
        title: 'Buscar primero a Cristo',
        start: '2027-01-01',
        end: '2027-01-03',
        sunday: {
          date: '2027-01-03',
          theme: 'Cristo, nuestra vida',
          reference: 'Colosenses 3:1-17',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Colosenses 3:1-17'] || '',
          bibleTextSource,
          introduction: 'Comenzamos el año recordando que la vida cristiana no se define por metas vacias, sino por union con Cristo. Si hemos resucitado con El, nuestra mirada, deseos, palabras y relaciones deben ser renovados. Cristo no es una parte del año nuevo; El es nuestra vida.',
          mainTruth: 'Una vida renovada comienza buscando a Cristo y viviendo en su nombre.'
        }
      },
      {
        title: 'Arraigados en la Palabra',
        start: '2027-01-04',
        end: '2027-01-10',
        sunday: {
          date: '2027-01-10',
          theme: 'Plantados junto a la Palabra',
          reference: 'Salmo 1',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Salmo 1'] || '',
          bibleTextSource,
          introduction: 'La Palabra de Dios nos muestra dos caminos. Uno se deja formar por voces que alejan de Dios; el otro se deleita en la ley del Senor y da fruto a su tiempo. Esta semana afirmamos que un ano fructifero comienza con raices profundas en la Palabra.',
          mainTruth: 'El pueblo de Dios florece cuando se deleita y medita en la Palabra del Senor.'
        }
      },
      {
        title: 'Caminar en oracion y paz',
        start: '2027-01-11',
        end: '2027-01-17',
        sunday: {
          date: '2027-01-17',
          theme: 'La paz de Dios guarda el corazon',
          reference: 'Filipenses 4:4-9',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Filipenses 4:4-9'] || '',
          bibleTextSource,
          introduction: 'La ansiedad puede acompanarnos al mirar responsabilidades, decisiones y cambios. Pero la iglesia aprende a llevar sus peticiones delante de Dios con gratitud. En Cristo, la paz de Dios guarda el corazon y la mente, y nos ensena a pensar y vivir de manera santa.',
          mainTruth: 'Dios guarda con su paz al pueblo que ora, agradece y piensa en lo que honra a Cristo.'
        }
      },
      {
        title: 'Crecer juntos en amor',
        start: '2027-01-18',
        end: '2027-01-24',
        sunday: {
          date: '2027-01-24',
          theme: 'Consideremonos unos a otros',
          reference: 'Hebreos 10:19-25',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hebreos 10:19-25'] || '',
          bibleTextSource,
          introduction: 'La vida renovada no se vive en aislamiento. Por la obra de Cristo tenemos acceso a Dios y somos llamados a mantener firme la esperanza, animandonos al amor y a las buenas obras. Enero nos recuerda que necesitamos congregarnos, exhortarnos y caminar juntos.',
          mainTruth: 'Cristo nos acerca a Dios y nos llama a perseverar juntos en amor, esperanza y buenas obras.'
        }
      },
      {
        title: 'Perseverar con esperanza',
        start: '2027-01-25',
        end: '2027-01-31',
        sunday: {
          date: '2027-01-31',
          theme: 'Puestos los ojos en Jesus',
          reference: 'Hebreos 12:1-3',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hebreos 12:1-3'] || '',
          bibleTextSource,
          introduction: 'El año nuevo tambien traera cansancio, tentaciones y pruebas. Hebreos nos llama a correr con paciencia, dejando el pecado y mirando a Jesus. La perseverancia cristiana no nace del esfuerzo vacio, sino de contemplar al Autor y Consumador de la fe.',
          mainTruth: 'Perseveramos en la carrera cristiana mirando a Jesus, quien sostiene nuestra fe.'
        }
      }
    ]
  };

  months.push(november, december, january);

  const dailySeeds = [
    ['2026-08-01', 'Jesus, el centro de todo', 'Colosenses 1:15-20'],
    ['2026-08-02', 'Separados de mi nada pueden hacer', 'Juan 15:1-8'],
    ['2026-08-03', 'Muertos, pero Dios nos dio vida', 'Efesios 2:1-5'],
    ['2026-08-04', 'Salvos por gracia', 'Efesios 2:6-10'],
    ['2026-08-05', 'Justificados por la fe', 'Romanos 5:1-5'],
    ['2026-08-06', 'Redimidos por su sangre', 'Efesios 1:3-10'],
    ['2026-08-07', 'Ninguna condenacion', 'Romanos 8:1-4'],
    ['2026-08-08', 'Adoptados como hijos', 'Romanos 8:14-17'],
    ['2026-08-09', 'Por gracia son salvos', 'Efesios 2:1-10'],
    ['2026-08-10', 'Vengan a mi', 'Mateo 11:25-30'],
    ['2026-08-11', 'Descansar en Dios', 'Salmo 62:1-8'],
    ['2026-08-12', 'No temas, yo estoy contigo', 'Isaias 41:8-13'],
    ['2026-08-13', 'Depositar las cargas', '1 Pedro 5:6-7'],
    ['2026-08-14', 'Paz en medio de la afliccion', 'Juan 16:31-33'],
    ['2026-08-15', 'El Senor renueva las fuerzas', 'Isaias 40:28-31'],
    ['2026-08-16', 'Descanso para el alma', 'Mateo 11:25-30'],
    ['2026-08-17', 'Jehova es mi pastor', 'Salmo 23'],
    ['2026-08-18', 'El buen Pastor da su vida', 'Juan 10:7-18'],
    ['2026-08-19', 'Dios guia con su consejo', 'Salmo 73:23-28'],
    ['2026-08-20', 'El Senor guarda tu salida y entrada', 'Salmo 121'],
    ['2026-08-21', 'El Pastor busca a la oveja perdida', 'Lucas 15:1-7'],
    ['2026-08-22', 'Cuidado bajo su poderosa mano', '1 Pedro 5:1-4'],
    ['2026-08-23', 'El Senor es mi Pastor', 'Salmo 23'],
    ['2026-08-24', 'Dios es por nosotros', 'Romanos 8:31-34'],
    ['2026-08-25', 'Nada nos separara', 'Romanos 8:35-39'],
    ['2026-08-26', 'Guardados por el poder de Dios', '1 Pedro 1:3-9'],
    ['2026-08-27', 'Fiel para completar su obra', 'Filipenses 1:3-11'],
    ['2026-08-28', 'El amor perfecto echa fuera el temor', '1 Juan 4:13-19'],
    ['2026-08-29', 'Seguros en la mano de Cristo', 'Juan 10:27-30'],
    ['2026-08-30', 'Mas que vencedores', 'Romanos 8:31-39'],
    ['2026-08-31', 'Preparados para escuchar', 'Hebreos 1:1-4'],
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
    ['2026-12-31', 'Yo hago nuevas todas las cosas', 'Apocalipsis 21:1-5'],
    ['2027-01-01', 'Buscar primero el reino', 'Mateo 6:25-34'],
    ['2027-01-02', 'Nueva criatura en Cristo', '2 Corintios 5:17'],
    ['2027-01-03', 'Cristo, nuestra vida', 'Colosenses 3:1-17'],
    ['2027-01-04', 'Meditar dia y noche', 'Salmo 1'],
    ['2027-01-05', 'Lampara para mis pies', 'Salmo 119:105-112'],
    ['2027-01-06', 'La Palabra en el corazon', 'Salmo 119:9-16'],
    ['2027-01-07', 'Renovados en la mente', 'Romanos 12:1-2'],
    ['2027-01-08', 'Recibir la Palabra con mansedumbre', 'Santiago 1:19-25'],
    ['2027-01-09', 'Permanecer en Cristo', 'Juan 15:1-8'],
    ['2027-01-10', 'Plantados junto a la Palabra', 'Salmo 1'],
    ['2027-01-11', 'Orar con confianza', 'Hebreos 4:14-16'],
    ['2027-01-12', 'Pedir sabiduria', 'Santiago 1:5-8'],
    ['2027-01-13', 'Echar la ansiedad sobre Dios', '1 Pedro 5:6-7'],
    ['2027-01-14', 'Paz en Cristo', 'Juan 14:25-27'],
    ['2027-01-15', 'Gratitud en toda circunstancia', '1 Tesalonicenses 5:16-18'],
    ['2027-01-16', 'Pensar en lo que edifica', 'Filipenses 4:8-9'],
    ['2027-01-17', 'La paz de Dios guarda el corazon', 'Filipenses 4:4-9'],
    ['2027-01-18', 'Un cuerpo en Cristo', 'Romanos 12:3-8'],
    ['2027-01-19', 'Amor sin fingimiento', 'Romanos 12:9-18'],
    ['2027-01-20', 'Sobrellevad las cargas', 'Galatas 6:1-5'],
    ['2027-01-21', 'Perdonarnos como Cristo', 'Efesios 4:25-32'],
    ['2027-01-22', 'Servir con amor', '1 Pedro 4:8-11'],
    ['2027-01-23', 'Estimularnos al amor', 'Hebreos 10:19-25'],
    ['2027-01-24', 'Consideremonos unos a otros', 'Hebreos 10:19-25'],
    ['2027-01-25', 'Correr con paciencia', 'Hebreos 12:1-3'],
    ['2027-01-26', 'No cansarnos de hacer el bien', 'Galatas 6:7-10'],
    ['2027-01-27', 'Fortalecidos en el Senor', 'Efesios 6:10-18'],
    ['2027-01-28', 'La buena obra que Dios comenzo', 'Filipenses 1:3-11'],
    ['2027-01-29', 'Fiel es el que prometio', 'Hebreos 10:23'],
    ['2027-01-30', 'Firmes hasta el fin', '1 Corintios 15:58'],
    ['2027-01-31', 'Puestos los ojos en Jesus', 'Hebreos 12:1-3']
  ];

  const approvedReadings = {
    '2026-08-01': {
      title: 'Jesus, el centro de todo',
      explanation: 'Colosenses presenta a Cristo como imagen del Dios invisible, Creador, sustentador y cabeza de la iglesia. Antes de comenzar cualquier plan espiritual, necesitamos recordar quien ocupa el centro. La vida cristiana no gira alrededor de nuestras metas, sino de la gloria de Jesus. Todo fue creado por El y para El, y solo en El todas las cosas encuentran su verdadero lugar.',
      reflectionQuestion: 'Que area de tu vida necesita volver a tener a Cristo en el centro?',
      application: 'Comienza el mes nombrando una decision que quieres someter al senorio de Jesus.',
      prayer: 'Cristo, se el centro de mi vida, mi iglesia y mis decisiones. Amen.',
      keywords: ['cristo', 'centro', 'colosenses', 'senorio']
    },
    '2026-08-02': {
      title: 'Separados de mi nada pueden hacer',
      explanation: 'Jesus se presenta como la vid verdadera y nos llama a permanecer en El. La rama no produce fruto por esfuerzo propio, sino por su union con la vid. Asi tambien, el discipulo no puede vivir una vida fructifera separado de Cristo. Permanecer en Jesus implica depender de su Palabra, buscar comunion con El y reconocer que todo fruto verdadero viene de su vida obrando en nosotros.',
      reflectionQuestion: 'Estas intentando producir fruto espiritual sin depender de Cristo?',
      application: 'Antes de tus tareas de hoy, ora reconociendo: Senor, sin ti nada puedo hacer.',
      prayer: 'Jesus, mantenme unido a ti y produce fruto que glorifique al Padre. Amen.',
      keywords: ['juan 15', 'permanecer', 'fruto', 'dependencia']
    },
    '2026-08-03': {
      title: 'Muertos, pero Dios nos dio vida',
      explanation: 'Efesios describe nuestra condicion sin Cristo con palabras serias: muertos en delitos y pecados. Pero la frase mas hermosa aparece con fuerza: pero Dios. El Senor interviene con misericordia y amor para dar vida juntamente con Cristo. La salvacion comienza en la gracia de Dios, no en nuestra capacidad. Esto produce humildad, gratitud y adoracion.',
      reflectionQuestion: 'Como cambia tu gratitud recordar de donde Dios te rescato?',
      application: 'Da gracias hoy por la misericordia de Dios que te dio vida en Cristo.',
      prayer: 'Dios rico en misericordia, gracias por darme vida cuando estaba muerto en pecado. Amen.',
      keywords: ['efesios 2', 'misericordia', 'vida', 'gracia']
    },
    '2026-08-04': {
      title: 'Salvos por gracia',
      explanation: 'La salvacion es por gracia mediante la fe. No nace de nosotros ni de nuestras obras, para que nadie se glorien. Esta verdad humilla el orgullo y fortalece la seguridad. Si la salvacion dependiera de nuestro rendimiento, nunca tendriamos paz. Pero Dios nos salva como regalo y luego nos crea en Cristo para buenas obras preparadas por El.',
      reflectionQuestion: 'Estas descansando en la gracia o tratando de ganarte el favor de Dios?',
      application: 'Sirve hoy desde gratitud, no desde culpa ni deseo de impresionar.',
      prayer: 'Padre, gracias por salvarme por gracia y prepararme para buenas obras. Amen.',
      keywords: ['gracia', 'fe', 'efesios 2', 'buenas obras']
    },
    '2026-08-05': {
      title: 'Justificados por la fe',
      explanation: 'Romanos nos anuncia paz con Dios por medio de nuestro Senor Jesucristo. La justificacion no es solo sentirse mejor; es ser declarado justo delante de Dios por la obra de Cristo. Por eso el creyente puede vivir con esperanza aun en tribulacion. La gracia nos coloca de pie y el amor de Dios es derramado en nuestros corazones.',
      reflectionQuestion: 'Que diferencia hace saber que tienes paz con Dios en Cristo?',
      application: 'Cuando venga culpa o temor, recuerda que tu paz con Dios descansa en Jesus.',
      prayer: 'Senor, gracias por justificarme por la fe y darme paz contigo. Amen.',
      keywords: ['justificacion', 'paz', 'romanos 5', 'fe']
    },
    '2026-08-06': {
      title: 'Redimidos por su sangre',
      explanation: 'En Cristo tenemos redencion por su sangre y perdon de pecados segun las riquezas de la gracia. Dios no nos bendice de manera superficial; nos escoge, adopta, perdona y une todas las cosas bajo Cristo. La redencion muestra el costo de nuestra salvacion y la abundancia de la gracia divina.',
      reflectionQuestion: 'Como te mueve a adorar saber que fuiste redimido por Cristo?',
      application: 'Haz una pausa para alabar a Dios por una bendicion espiritual en Cristo.',
      prayer: 'Padre, gracias por redimirme y perdonarme en tu Hijo amado. Amen.',
      keywords: ['redencion', 'perdon', 'efesios 1', 'sangre']
    },
    '2026-08-07': {
      title: 'Ninguna condenacion',
      explanation: 'Romanos 8 declara una verdad liberadora: ninguna condenacion hay para los que estan en Cristo Jesus. La ley del Espiritu de vida nos libra de la ley del pecado y de la muerte. Esto no produce indiferencia al pecado, sino gratitud y nueva obediencia. En Cristo, el creyente ya no vive bajo sentencia, sino bajo gracia.',
      reflectionQuestion: 'Que acusacion necesitas responder con la verdad del evangelio?',
      application: 'Confiesa tu pecado y descansa en que Cristo llevo tu condenacion.',
      prayer: 'Jesus, gracias porque en ti no hay condenacion para mi. Amen.',
      keywords: ['romanos 8', 'condenacion', 'libertad', 'gracia']
    },
    '2026-08-08': {
      title: 'Adoptados como hijos',
      explanation: 'El Espiritu da testimonio de que somos hijos de Dios. La salvacion no solo cambia nuestro destino; cambia nuestra familia e identidad. Ya no vivimos como esclavos del temor, sino como hijos que claman: Abba, Padre. Esta adopcion nos da seguridad, pertenencia y esperanza aun cuando pasamos por sufrimientos.',
      reflectionQuestion: 'Estas viviendo como hijo amado o como esclavo del temor?',
      application: 'Ora hoy llamando a Dios Padre, con confianza humilde.',
      prayer: 'Padre, gracias por adoptarme en Cristo y librarme del temor. Amen.',
      keywords: ['adopcion', 'romanos 8', 'hijos', 'espiritu']
    },
    '2026-08-09': {
      title: 'Por gracia son salvos',
      explanation: 'Efesios 2 resume el evangelio con claridad: estabamos muertos, pero Dios nos dio vida; eramos incapaces, pero fuimos salvos por gracia; no teniamos obras que ofrecer, pero ahora somos creados para buenas obras. La gracia no solo nos rescata del pasado, tambien nos dirige hacia una vida nueva preparada por Dios.',
      reflectionQuestion: 'Que buena obra preparada por Dios puedes caminar esta semana?',
      application: 'Identifica una oportunidad concreta para servir como respuesta a la gracia.',
      prayer: 'Senor, que tu gracia me haga humilde, agradecido y dispuesto a servir. Amen.',
      keywords: ['salvacion', 'gracia', 'efesios 2', 'servicio']
    },
    '2026-08-10': {
      title: 'Vengan a mi',
      explanation: 'Jesus no llama a los fuertes que pueden con todo, sino a los cansados y cargados. Su invitacion es personal: vengan a mi. El descanso que ofrece no es evadir responsabilidades, sino hallar alivio en su gracia, su mansedumbre y su senorio. El alma encuentra reposo cuando deja de cargar sola y aprende de Cristo.',
      reflectionQuestion: 'Que carga necesitas traer hoy a Jesus?',
      application: 'Nombra tu carga en oracion y entregasela al Senor con confianza.',
      prayer: 'Jesus, vengo a ti con mis cargas. Dame descanso para mi alma. Amen.',
      keywords: ['descanso', 'mateo 11', 'cargas', 'jesus']
    },
    '2026-08-11': {
      title: 'Descansar en Dios',
      explanation: 'El Salmo 62 nos llama a esperar solamente en Dios, porque de El viene la salvacion y la esperanza. El alma encuentra reposo cuando deja de depender de estabilidad humana y se apoya en la roca firme del Senor. Podemos derramar delante de El nuestro corazon porque Dios es refugio para su pueblo.',
      reflectionQuestion: 'En que estas buscando descanso fuera de Dios?',
      application: 'Derrama tu corazon delante del Senor en una oracion honesta.',
      prayer: 'Dios, tu eres mi roca y refugio. Haz descansar mi alma en ti. Amen.',
      keywords: ['salmo 62', 'descanso', 'refugio', 'esperanza']
    },
    '2026-08-12': {
      title: 'No temas, yo estoy contigo',
      explanation: 'Isaias anuncia la presencia fiel de Dios a su pueblo: no temas, porque yo estoy contigo. La seguridad del creyente no nace de la ausencia de problemas, sino de la presencia del Senor que fortalece, ayuda y sostiene. En momentos de debilidad, Dios no solo da instrucciones; ofrece su mano poderosa.',
      reflectionQuestion: 'Que temor necesitas enfrentar recordando que Dios esta contigo?',
      application: 'Cuando sientas temor hoy, responde con una frase de fe: Dios me sostiene.',
      prayer: 'Senor, sostenme con tu diestra y libra mi corazon del temor. Amen.',
      keywords: ['no temas', 'isaias 41', 'presencia', 'fortaleza']
    },
    '2026-08-13': {
      title: 'Depositar las cargas',
      explanation: 'Pedro une humildad y confianza: humillense bajo la mano poderosa de Dios, echando toda ansiedad sobre El. Entregar cargas requiere reconocer que no somos soberanos. Dios cuida de nosotros con poder y ternura. La fe no niega las preocupaciones, pero se niega a cargarlas como si Dios estuviera ausente.',
      reflectionQuestion: 'Que ansiedad estas cargando sin entregarla al Padre?',
      application: 'Escribe una preocupacion y ora entregandola al cuidado de Dios.',
      prayer: 'Padre, echo mi ansiedad sobre ti porque tu tienes cuidado de mi. Amen.',
      keywords: ['ansiedad', '1 pedro', 'cuidado', 'humildad']
    },
    '2026-08-14': {
      title: 'Paz en medio de la afliccion',
      explanation: 'Jesus no promete una vida sin afliccion, pero si promete paz en El. El mundo trae presion, dolor y oposicion, pero Cristo ha vencido al mundo. La paz cristiana no depende de que todo este bajo control, sino de pertenecer al Victorioso. Podemos cobrar animo porque la victoria final ya pertenece a Jesus.',
      reflectionQuestion: 'Como cambia tu animo saber que Cristo ha vencido al mundo?',
      application: 'Entrega una afliccion a Jesus y recuerda su victoria antes de responder.',
      prayer: 'Jesus, dame tu paz y animo en medio de la afliccion. Amen.',
      keywords: ['paz', 'juan 16', 'afliccion', 'victoria']
    },
    '2026-08-15': {
      title: 'El Senor renueva las fuerzas',
      explanation: 'Isaias nos muestra al Dios eterno que no se cansa ni se fatiga. Nosotros si nos cansamos, pero los que esperan en Jehova reciben nuevas fuerzas. Esperar en Dios no es pasividad vacia; es confianza activa en su caracter. El Senor levanta al debil y sostiene al que reconoce su necesidad.',
      reflectionQuestion: 'Donde necesitas esperar en Dios en lugar de agotarte solo?',
      application: 'Haz una pausa hoy para orar antes de seguir empujando en tus fuerzas.',
      prayer: 'Dios eterno, renueva mis fuerzas mientras espero en ti. Amen.',
      keywords: ['isaias 40', 'fuerzas', 'esperar', 'debilidad']
    },
    '2026-08-16': {
      title: 'Descanso para el alma',
      explanation: 'Jesus ofrece descanso a los cansados, pero tambien nos invita a tomar su yugo y aprender de El. Su descanso no es independencia de su autoridad, sino caminar bajo su senorio bueno. Cristo es manso y humilde de corazon; por eso podemos venir sin fingir fortaleza y aprender a vivir desde su gracia.',
      reflectionQuestion: 'Estas dispuesto a aprender de la mansedumbre y humildad de Jesus?',
      application: 'Practica hoy una respuesta mansa donde normalmente responderias con dureza.',
      prayer: 'Jesus, ensename tu mansedumbre y dame descanso verdadero. Amen.',
      keywords: ['mateo 11', 'descanso', 'mansedumbre', 'humildad']
    },
    '2026-08-17': {
      title: 'Jehova es mi pastor',
      explanation: 'El Salmo 23 comienza con una afirmacion profundamente personal: Jehova es mi pastor. El creyente no esta abandonado a su propia sabiduria. Dios provee, guia, restaura y acompana. Decir que nada me faltara no significa que tendremos todo lo que queremos, sino que el Pastor dara lo necesario para caminar con El.',
      reflectionQuestion: 'En que area necesitas confiar mas en el cuidado del Pastor?',
      application: 'Repite durante el dia: El Senor es mi Pastor; El sabe guiarme.',
      prayer: 'Pastor fiel, guia mi vida y restaura mi alma. Amen.',
      keywords: ['salmo 23', 'pastor', 'cuidado', 'guia']
    },
    '2026-08-18': {
      title: 'El buen Pastor da su vida',
      explanation: 'Jesus se presenta como el buen Pastor que da su vida por las ovejas. Su cuidado no es distante ni contratado; nace de amor sacrificial. El conoce a los suyos y los suyos le conocen. La seguridad del creyente descansa en un Pastor que no huye ante el peligro, sino que entrega su vida para salvar.',
      reflectionQuestion: 'Como te consuela saber que Jesus conoce y cuida a sus ovejas?',
      application: 'Descansa hoy en que Cristo no te cuida de lejos; te conoce por nombre.',
      prayer: 'Buen Pastor, gracias por dar tu vida y cuidar de los tuyos. Amen.',
      keywords: ['juan 10', 'buen pastor', 'sacrificio', 'ovejas']
    },
    '2026-08-19': {
      title: 'Dios guia con su consejo',
      explanation: 'El salmista reconoce que Dios le sostiene de la mano y le guia con su consejo. En medio de confusion, envidia o debilidad, la presencia de Dios es el bien supremo. La guia del Senor no es solo informacion para decisiones; es comunion con Aquel que es nuestra porcion para siempre.',
      reflectionQuestion: 'Buscas solo respuestas de Dios o tambien su presencia?',
      application: 'Pide guia para una decision, pero comienza adorando a Dios como tu porcion.',
      prayer: 'Senor, guiame con tu consejo y haz de ti mi mayor bien. Amen.',
      keywords: ['salmo 73', 'guia', 'presencia', 'porcion']
    },
    '2026-08-20': {
      title: 'El Senor guarda tu salida y entrada',
      explanation: 'El Salmo 121 dirige la mirada al Creador como nuestro guardador. Dios no duerme ni se descuida. Su cuidado abarca salida y entrada, presente y futuro. Esta promesa no elimina toda dificultad, pero asegura que nuestra vida esta bajo la vigilancia fiel del Senor.',
      reflectionQuestion: 'Que situacion necesitas confiar al Dios que no duerme?',
      application: 'Antes de salir o comenzar una tarea, encomienda tu camino al Senor.',
      prayer: 'Dios guardador, cuida mi vida y dirige mi camino. Amen.',
      keywords: ['salmo 121', 'proteccion', 'guardar', 'confianza']
    },
    '2026-08-21': {
      title: 'El Pastor busca a la oveja perdida',
      explanation: 'Jesus muestra el gozo del cielo cuando una oveja perdida es encontrada. El corazon de Dios no es indiferente ante el extraviado. El Pastor busca, carga y celebra. Esta lectura nos llama a recibir la gracia con humildad y a mirar a los perdidos con compasion, no con desprecio.',
      reflectionQuestion: 'A quien necesitas mirar con la compasion del Pastor?',
      application: 'Ora por una persona alejada y busca una forma sabia de acercarte con amor.',
      prayer: 'Senor, gracias por buscarme. Dame compasion por los que estan lejos. Amen.',
      keywords: ['lucas 15', 'oveja perdida', 'compasion', 'gracia']
    },
    '2026-08-22': {
      title: 'Cuidado bajo su poderosa mano',
      explanation: 'Pedro llama a los lideres a pastorear con humildad y al pueblo a confiar en el Principe de los pastores. Toda autoridad en la iglesia debe reflejar el cuidado de Cristo. Nadie es dueno del rebanio; la iglesia pertenece al Senor. Esto nos llama a servir, cuidar y someternos a Cristo con humildad.',
      reflectionQuestion: 'Como puedes reflejar el cuidado de Cristo hacia otros?',
      application: 'Anima o cuida hoy a alguien de tu congregacion de manera concreta.',
      prayer: 'Principe de los pastores, ensenanos a cuidar a tu pueblo con humildad. Amen.',
      keywords: ['1 pedro 5', 'pastores', 'humildad', 'cuidado']
    },
    '2026-08-23': {
      title: 'El Senor es mi Pastor',
      explanation: 'El Salmo 23 nos lleva desde pastos delicados hasta valles oscuros, y en todo lugar el Pastor esta presente. La confianza biblica no depende de estar siempre en lugares faciles. Podemos no temer mal alguno porque Dios esta con nosotros. Su bondad y misericordia siguen al creyente todos los dias.',
      reflectionQuestion: 'Que valle necesitas caminar recordando que Dios esta contigo?',
      application: 'Ora el Salmo 23 en primera persona, entregando tus temores al Pastor.',
      prayer: 'Jehova, mi Pastor, guia, restaura y acompana mi vida. Amen.',
      keywords: ['salmo 23', 'pastor', 'valle', 'misericordia']
    },
    '2026-08-24': {
      title: 'Dios es por nosotros',
      explanation: 'Pablo pregunta: Si Dios es por nosotros, quien contra nosotros? Esta seguridad se basa en la entrega del Hijo. Si Dios no escatimo a Cristo, podemos confiar en su gracia para sostenernos. Las acusaciones pierden su fuerza cuando recordamos que Dios justifica a los suyos en Cristo.',
      reflectionQuestion: 'Que acusacion o temor necesitas mirar a la luz de la cruz?',
      application: 'Responde hoy al temor con esta verdad: Dios es por mi en Cristo.',
      prayer: 'Padre, gracias porque en Cristo estas por nosotros. Amen.',
      keywords: ['romanos 8', 'seguridad', 'cruz', 'justificacion']
    },
    '2026-08-25': {
      title: 'Nada nos separara',
      explanation: 'Romanos 8 no promete ausencia de tribulacion, angustia o peligro. Promete algo mas firme: nada puede separarnos del amor de Cristo. El amor de Dios no es fragil ni dependiente de circunstancias. En medio de pruebas, el creyente puede descansar en una union segura con Cristo.',
      reflectionQuestion: 'Que circunstancia te ha hecho dudar del amor de Dios?',
      application: 'Lee Romanos 8:38-39 en voz alta y responde con adoracion.',
      prayer: 'Senor, afirma mi corazon en tu amor inseparable. Amen.',
      keywords: ['amor de dios', 'romanos 8', 'seguridad', 'cristo']
    },
    '2026-08-26': {
      title: 'Guardados por el poder de Dios',
      explanation: 'Pedro bendice a Dios por una esperanza viva mediante la resurreccion de Cristo. El creyente es guardado por el poder de Dios, aun en medio de pruebas que refinan la fe. Nuestra esperanza no es debil porque esta basada en una herencia incorruptible y en el Cristo resucitado.',
      reflectionQuestion: 'Como te sostiene saber que Dios guarda tu fe?',
      application: 'Da gracias por una prueba en la que Dios esta refinando tu confianza.',
      prayer: 'Dios, guardame por tu poder y fortalece mi esperanza viva. Amen.',
      keywords: ['1 pedro 1', 'esperanza', 'resurreccion', 'pruebas']
    },
    '2026-08-27': {
      title: 'Fiel para completar su obra',
      explanation: 'Pablo confia en que Dios completara la buena obra que comenzo. La vida cristiana no depende de arranques emocionales, sino de la fidelidad perseverante del Senor. Dios no abandona a los suyos a mitad del camino. Esto produce confianza humilde y nos anima a seguir creciendo en amor, discernimiento y fruto.',
      reflectionQuestion: 'Donde necesitas confiar en que Dios sigue obrando en ti?',
      application: 'Reconoce un area de crecimiento y pide a Dios que complete su obra.',
      prayer: 'Senor, completa en mi la obra que comenzaste por tu gracia. Amen.',
      keywords: ['filipenses 1', 'fidelidad', 'crecimiento', 'obra de dios']
    },
    '2026-08-28': {
      title: 'El amor perfecto echa fuera el temor',
      explanation: 'Juan ensena que conocemos el amor de Dios porque El nos amo primero. El amor perfecto echa fuera el temor, no porque ignore la santidad de Dios, sino porque descansa en la obra de Cristo. Quien ha recibido el amor de Dios aprende tambien a amar a otros con seguridad, gratitud y verdad.',
      reflectionQuestion: 'Que temor necesita ser confrontado por el amor de Dios?',
      application: 'Practica un acto de amor hacia alguien, recordando que Dios te amo primero.',
      prayer: 'Padre, afirma mi vida en tu amor y libra mi corazon del temor. Amen.',
      keywords: ['1 juan 4', 'amor', 'temor', 'seguridad']
    },
    '2026-08-29': {
      title: 'Seguros en la mano de Cristo',
      explanation: 'Jesus dice que sus ovejas oyen su voz, El las conoce y les da vida eterna. Nadie puede arrebatarlas de su mano. Esta seguridad no nos llama a descuido, sino a escuchar y seguir al Pastor con confianza. La mano de Cristo es mas fuerte que nuestras debilidades y temores.',
      reflectionQuestion: 'Estas escuchando y siguiendo la voz del Pastor?',
      application: 'Obedece hoy una instruccion clara de Cristo que ya conoces.',
      prayer: 'Jesus, gracias porque nadie puede arrebatarme de tu mano. Amen.',
      keywords: ['juan 10', 'seguridad', 'pastor', 'vida eterna']
    },
    '2026-08-30': {
      title: 'Mas que vencedores',
      explanation: 'Pablo no niega el sufrimiento, pero declara que en todas estas cosas somos mas que vencedores por medio de Aquel que nos amo. La victoria cristiana no siempre se ve como comodidad; muchas veces se ve como fidelidad sostenida en medio de la prueba. El amor de Dios en Cristo es nuestra seguridad final.',
      reflectionQuestion: 'Como puedes vivir con esperanza en medio de una prueba actual?',
      application: 'Anima a alguien con la verdad de Romanos 8: nada nos separa del amor de Dios.',
      prayer: 'Cristo, gracias porque tu amor nos hace mas que vencedores. Amen.',
      keywords: ['romanos 8', 'vencedores', 'amor', 'esperanza']
    },
    '2026-08-31': {
      title: 'Preparados para escuchar',
      explanation: 'Hebreos nos recuerda que Dios ha hablado de manera suprema por su Hijo. Despues de mirar a Cristo como centro, gracia, descanso, Pastor y seguridad, estamos listos para entrar a septiembre con hambre por la Palabra. El Dios que salva tambien habla, y su pueblo responde escuchando con fe y obediencia.',
      reflectionQuestion: 'Como prepararas tu corazon para escuchar la Palabra de Dios este mes?',
      application: 'Escoge un horario y lugar para leer la Biblia durante septiembre.',
      prayer: 'Padre, abre mis oidos y mi corazon para escuchar a Cristo en tu Palabra. Amen.',
      keywords: ['hebreos 1', 'escuchar', 'palabra', 'preparacion']
    },
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
      explanation: 'Proverbios nos recuerda que podemos hacer planes, pero el Senor dirige los pasos. Al pensar en un nuevo año, no necesitamos controlar cada detalle. La sabiduria consiste en encomendar nuestras obras a Dios, buscar su voluntad y caminar con humildad. Nuestros planes son pequenos; la fidelidad del Senor es grande.',
      reflectionQuestion: 'Que plan necesitas someter a la direccion de Dios?',
      application: 'Ora por tus planes del nuevo año y rendelos conscientemente al Senor.',
      prayer: 'Senor, dirige mis pasos y ordena mis planes segun tu voluntad. Amen.',
      keywords: ['planes', 'proverbios', 'confianza', 'direccion']
    },
    '2026-12-30': {
      title: 'Olvidando lo que queda atras',
      explanation: 'Pablo no vive atrapado en logros pasados ni derrotas antiguas. Prosigue hacia la meta en Cristo. Cerrar el ano requiere discernimiento: agradecer, aprender, arrepentirse y seguir adelante. La vida cristiana no se define por nostalgia ni culpa, sino por Cristo y su llamado. Seguimos corriendo porque El nos ha tomado por suyo.',
      reflectionQuestion: 'Que debes dejar atras para proseguir hacia Cristo?',
      application: 'Entrega a Dios una carga del ano y decide un paso concreto de obediencia.',
      prayer: 'Cristo, ayudame a proseguir hacia ti con fe, humildad y perseverancia. Amen.',
      keywords: ['filipenses 3', 'meta', 'perseverancia', 'nuevo año']
    },
    '2026-12-31': {
      title: 'Yo hago nuevas todas las cosas',
      explanation: 'Apocalipsis 21 nos muestra una esperanza mas grande que cualquier resolucion de año nuevo. Dios hara nuevas todas las cosas, habitara con su pueblo y quitara toda lagrima. Esta promesa nos permite cerrar el año con esperanza firme. No sabemos todo lo que vendra, pero sabemos hacia donde va la historia: hacia la presencia plena de Dios con su pueblo.',
      reflectionQuestion: 'Como fortalece tu esperanza saber que Dios hara nuevas todas las cosas?',
      application: 'Cierra el ano orando con esperanza y entregando el futuro al Dios que reina.',
      prayer: 'Dios eterno, gracias porque haces nuevas todas las cosas. Mi futuro descansa en ti. Amen.',
      keywords: ['apocalipsis 21', 'esperanza', 'nuevo año', 'renovacion']
    },
    '2027-01-01': {
      title: 'Buscar primero el reino',
      explanation: 'Jesus nos llama a comenzar con prioridades eternas. La ansiedad nos empuja a vivir centrados en necesidades, planes y temores, pero el Padre conoce lo que necesitamos. Buscar primero el reino no significa ignorar responsabilidades, sino ordenar el corazon bajo el gobierno de Dios. Un nuevo año comienza bien cuando Cristo ocupa el primer lugar en deseos, decisiones y confianza.',
      reflectionQuestion: 'Que prioridad necesita rendirse al reino de Dios este ano?',
      application: 'Escribe una decision practica que muestre que Cristo sera primero en tu agenda.',
      prayer: 'Padre, ordena mi corazon para buscar primero tu reino y tu justicia. Amen.',
      keywords: ['reino', 'prioridades', 'mateo 6', 'nuevo año']
    },
    '2027-01-02': {
      title: 'Nueva criatura en Cristo',
      explanation: 'El año nuevo puede inspirar cambios, pero solo Cristo hace nueva criatura. La renovacion verdadera no nace de fuerza de voluntad, sino de la obra de Dios en el evangelio. En Cristo, lo viejo pierde su dominio y una nueva vida comienza. Esta verdad nos libra de depender de promesas fragiles y nos invita a caminar en la gracia transformadora de Dios.',
      reflectionQuestion: 'Que aspecto de tu identidad necesitas ver a la luz de Cristo?',
      application: 'Repite hoy esta verdad: en Cristo soy nueva criatura y vivo por su gracia.',
      prayer: 'Senor, gracias por hacerme nuevo en Cristo. Forma mi vida conforme a tu gracia. Amen.',
      keywords: ['nueva criatura', 'cristo', 'identidad', 'gracia']
    },
    '2027-01-03': {
      title: 'Cristo, nuestra vida',
      explanation: 'Colosenses nos llama a poner la mira en las cosas de arriba porque nuestra vida esta escondida con Cristo en Dios. La fe cristiana no es solo abandonar malos habitos; es vivir desde una nueva union con Cristo. Si El es nuestra vida, entonces nuestras palabras, relaciones, gratitud y obediencia deben llevar su nombre.',
      reflectionQuestion: 'Que significa para ti vivir hoy como alguien unido a Cristo?',
      application: 'Haz una tarea ordinaria en el nombre del Senor Jesus, con gratitud.',
      prayer: 'Cristo, tu eres mi vida. Renueva mis deseos, palabras y acciones. Amen.',
      keywords: ['colosenses 3', 'vida nueva', 'cristo', 'gratitud']
    },
    '2027-01-04': {
      title: 'Meditar dia y noche',
      explanation: 'El Salmo 1 presenta al creyente como un arbol plantado junto a aguas. Su fruto no nace de prisa, sino de deleitarse y meditar en la ley del Senor. Enero nos recuerda que la vida espiritual necesita raices. La Palabra no debe ser visita ocasional, sino alimento constante que forma pensamientos, afectos y decisiones.',
      reflectionQuestion: 'Que ritmo de lectura biblica necesitas cultivar este mes?',
      application: 'Aparta un horario fijo para leer y meditar en la Palabra durante esta semana.',
      prayer: 'Senor, planta mi vida en tu Palabra y produce fruto para tu gloria. Amen.',
      keywords: ['salmo 1', 'meditacion', 'palabra', 'fruto']
    },
    '2027-01-05': {
      title: 'Lampara para mis pies',
      explanation: 'La Palabra de Dios alumbra el camino paso a paso. No siempre nos muestra todos los detalles del futuro, pero si nos da luz suficiente para obedecer hoy. En un nuevo año lleno de decisiones, necesitamos mas que intuicion; necesitamos la direccion del Senor. Su Palabra corrige, guia y sostiene al que desea caminar en fidelidad.',
      reflectionQuestion: 'Que decision necesitas someter a la luz de la Palabra?',
      application: 'Busca un principio biblico que ilumine una decision concreta de esta semana.',
      prayer: 'Dios, guia mis pasos con tu Palabra y librame de caminar en mi propia sabiduria. Amen.',
      keywords: ['salmo 119', 'guia', 'palabra', 'obediencia']
    },
    '2027-01-06': {
      title: 'La Palabra en el corazon',
      explanation: 'Guardar la Palabra en el corazon es una defensa contra el pecado y una fuente de deleite en Dios. No se trata solo de leer informacion, sino de atesorar verdad. Cuando la Palabra habita en nosotros, moldea lo que amamos y rechazamos. Un corazon lleno de Escritura esta mejor preparado para discernir, resistir y obedecer.',
      reflectionQuestion: 'Que versiculo necesitas guardar en tu corazon esta semana?',
      application: 'Memoriza una frase de la lectura y repitela durante el dia.',
      prayer: 'Senor, pon tu Palabra en mi corazon para vivir en santidad. Amen.',
      keywords: ['memorizacion', 'corazon', 'salmo 119', 'santidad']
    },
    '2027-01-07': {
      title: 'Renovados en la mente',
      explanation: 'Romanos 12 nos llama a no conformarnos a este siglo, sino a ser transformados por la renovacion de la mente. La vida renovada comienza cuando Dios cambia nuestra manera de pensar. No podemos vivir para Cristo alimentando la mente solo con las voces del mundo. Necesitamos presentar toda la vida como sacrificio vivo y discernir la voluntad de Dios.',
      reflectionQuestion: 'Que pensamiento necesita ser renovado por la verdad de Dios?',
      application: 'Identifica una voz que te esta moldeando y reemplazala hoy con Escritura.',
      prayer: 'Padre, renueva mi mente para conocer y obedecer tu voluntad. Amen.',
      keywords: ['romanos 12', 'mente', 'transformacion', 'voluntad']
    },
    '2027-01-08': {
      title: 'Recibir la Palabra con mansedumbre',
      explanation: 'Santiago ensena que no basta oir la Palabra; debemos recibirla con mansedumbre y practicarla. La Biblia funciona como espejo que revela la condicion del corazon. El peligro es escuchar y olvidar. Dios llama a su pueblo a mirar atentamente su Palabra y responder con obediencia concreta. La bendicion esta en hacer, no solo en saber.',
      reflectionQuestion: 'Que verdad has oido muchas veces pero necesitas practicar?',
      application: 'Convierte una ensenanza biblica en una accion especifica antes de terminar el dia.',
      prayer: 'Senor, hazme humilde para recibir tu Palabra y obedecerla. Amen.',
      keywords: ['santiago', 'obediencia', 'mansedumbre', 'hacedores']
    },
    '2027-01-09': {
      title: 'Permanecer en Cristo',
      explanation: 'Jesus usa la imagen de la vid y los pampanos para mostrar nuestra dependencia total de El. Separados de Cristo nada podemos hacer. La vida fructifera no nace de activismo religioso, sino de permanecer en comunion con el Senor. Enero es una buena oportunidad para revisar si estamos intentando producir fruto sin depender diariamente de Cristo.',
      reflectionQuestion: 'Que practica te ayuda a permanecer en Cristo cada dia?',
      application: 'Haz una pausa de oracion antes de tus tareas, reconociendo tu dependencia de Jesus.',
      prayer: 'Jesus, mantenme unido a ti y produce fruto en mi vida. Amen.',
      keywords: ['juan 15', 'permanecer', 'fruto', 'dependencia']
    },
    '2027-01-10': {
      title: 'Plantados junto a la Palabra',
      explanation: 'El arbol del Salmo 1 no se mueve con cada viento; esta plantado. Asi es la vida formada por la Palabra. Dios nos llama a echar raices profundas, no a vivir de impulsos espirituales pasajeros. El fruto llega en su tiempo cuando el corazon se deleita en Dios y aprende a rechazar caminos que alejan de El.',
      reflectionQuestion: 'Estas plantado en la Palabra o movido por cada circunstancia?',
      application: 'Revisa tu semana y protege un espacio real para la Palabra de Dios.',
      prayer: 'Senor, plantame en tu Palabra y haz mi vida estable y fructifera. Amen.',
      keywords: ['salmo 1', 'raices', 'estabilidad', 'palabra']
    },
    '2027-01-11': {
      title: 'Orar con confianza',
      explanation: 'Hebreos nos invita a acercarnos al trono de la gracia por medio de Cristo. No venimos confiando en meritos propios, sino en nuestro gran Sumo Sacerdote. La oracion cristiana descansa en la obra de Jesus. Podemos acercarnos con libertad para hallar misericordia y gracia en el momento oportuno.',
      reflectionQuestion: 'Que necesidad debes llevar hoy al trono de la gracia?',
      application: 'Ora con confianza por una necesidad concreta, descansando en Cristo.',
      prayer: 'Padre, me acerco por medio de Cristo para recibir misericordia y gracia. Amen.',
      keywords: ['oracion', 'hebreos 4', 'gracia', 'confianza']
    },
    '2027-01-12': {
      title: 'Pedir sabiduria',
      explanation: 'Santiago nos anima a pedir sabiduria a Dios, quien da abundantemente y sin reproche. La sabiduria biblica no es solo inteligencia; es vivir delante de Dios con discernimiento, fe y obediencia. Al comenzar el ano, necesitamos reconocer nuestra limitacion y pedir al Senor que guie decisiones, conversaciones y prioridades.',
      reflectionQuestion: 'En que situacion necesitas sabiduria de Dios ahora mismo?',
      application: 'Antes de decidir, ora especificamente pidiendo sabiduria y fe.',
      prayer: 'Dios generoso, dame sabiduria para caminar en tu voluntad. Amen.',
      keywords: ['sabiduria', 'santiago', 'decision', 'fe']
    },
    '2027-01-13': {
      title: 'Echar la ansiedad sobre Dios',
      explanation: 'Pedro nos llama a humillarnos bajo la mano poderosa de Dios y echar sobre El toda ansiedad, porque El tiene cuidado de nosotros. La ansiedad muchas veces revela nuestro deseo de controlar. La fe nos invita a entregar cargas al Padre. No porque todo sea facil, sino porque Dios cuida de sus hijos con poder y ternura.',
      reflectionQuestion: 'Que ansiedad estas cargando como si dependiera solo de ti?',
      application: 'Nombra esa carga en oracion y entregala conscientemente al cuidado de Dios.',
      prayer: 'Padre, echo mi ansiedad sobre ti porque tu tienes cuidado de mi. Amen.',
      keywords: ['ansiedad', '1 pedro', 'cuidado', 'humildad']
    },
    '2027-01-14': {
      title: 'Paz en Cristo',
      explanation: 'Jesus promete una paz distinta a la del mundo. No es una paz que depende de circunstancias perfectas, sino de su presencia, palabra y victoria. El corazon turbado encuentra descanso cuando recuerda que Cristo no abandona a los suyos. Esta paz nos sostiene aun cuando las responsabilidades del ano parezcan grandes.',
      reflectionQuestion: 'Estas buscando paz en circunstancias o en Cristo?',
      application: 'Cuando sientas inquietud hoy, repite la promesa de paz de Jesus.',
      prayer: 'Jesus, guarda mi corazon en tu paz y librame del temor. Amen.',
      keywords: ['paz', 'juan 14', 'cristo', 'temor']
    },
    '2027-01-15': {
      title: 'Gratitud en toda circunstancia',
      explanation: 'Pablo llama a regocijarnos, orar sin cesar y dar gracias en todo. La gratitud cristiana no niega el dolor, pero reconoce la presencia y fidelidad de Dios en medio de todo. Un corazon agradecido resiste la queja y aprende a mirar la vida bajo la gracia de Dios. La gratitud tambien mantiene viva la adoracion diaria.',
      reflectionQuestion: 'Que motivo de gratitud puedes reconocer aun en una situacion dificil?',
      application: 'Da gracias por tres evidencias de la fidelidad de Dios hoy.',
      prayer: 'Senor, ensename a vivir con gozo, oracion y gratitud. Amen.',
      keywords: ['gratitud', 'oracion', 'gozo', '1 tesalonicenses']
    },
    '2027-01-16': {
      title: 'Pensar en lo que edifica',
      explanation: 'Filipenses 4 nos llama a dirigir la mente hacia lo verdadero, justo, puro, amable y digno de alabanza. Lo que contemplamos nos forma. La paz de Dios tambien se relaciona con una mente entrenada por la verdad. En un mundo lleno de ruido, el creyente aprende a escoger pensamientos que honran a Cristo y fortalecen la obediencia.',
      reflectionQuestion: 'Que pensamiento o contenido necesitas dejar de alimentar?',
      application: 'Reemplaza hoy una fuente de ruido con una verdad biblica o un canto de adoracion.',
      prayer: 'Dios de paz, ordena mis pensamientos hacia lo que te honra. Amen.',
      keywords: ['mente', 'filipenses 4', 'pureza', 'paz']
    },
    '2027-01-17': {
      title: 'La paz de Dios guarda el corazon',
      explanation: 'La paz de Dios guarda el corazon y la mente en Cristo cuando presentamos nuestras peticiones con gratitud. La oracion no siempre cambia inmediatamente la circunstancia, pero cambia nuestra postura delante de Dios. El Senor cercano nos sostiene, dirige nuestros pensamientos y nos ensena a practicar lo que hemos recibido en su Palabra.',
      reflectionQuestion: 'Que peticion debes presentar hoy con gratitud?',
      application: 'Ora escribiendo una peticion y una accion de gracias relacionada con ella.',
      prayer: 'Senor, guarda mi corazon y mi mente con tu paz en Cristo Jesus. Amen.',
      keywords: ['paz de dios', 'filipenses 4', 'oracion', 'gratitud']
    },
    '2027-01-18': {
      title: 'Un cuerpo en Cristo',
      explanation: 'Romanos 12 ensena que la iglesia es un cuerpo con muchos miembros y diferentes dones. Nadie lo tiene todo, y nadie es innecesario. La vida renovada incluye pensar de nosotros con humildad y usar lo recibido para servir. Dios edifica su iglesia cuando cada creyente participa fielmente segun la gracia que ha recibido.',
      reflectionQuestion: 'Como puedes usar tu don para edificar a otros?',
      application: 'Identifica un area concreta donde puedas servir esta semana.',
      prayer: 'Senor, usame humildemente como parte del cuerpo de Cristo. Amen.',
      keywords: ['cuerpo', 'dones', 'romanos 12', 'servicio']
    },
    '2027-01-19': {
      title: 'Amor sin fingimiento',
      explanation: 'El amor cristiano debe ser sincero. Romanos 12 describe una vida marcada por honra, diligencia, paciencia, hospitalidad, bendicion y paz. No es amor de apariencia, sino una manera completa de tratar a otros bajo la gracia de Cristo. La comunidad de fe se fortalece cuando el amor deja de ser discurso y se vuelve practica diaria.',
      reflectionQuestion: 'Donde necesitas amar con mas sinceridad y menos apariencia?',
      application: 'Practica hoy una accion de honra o servicio hacia alguien.',
      prayer: 'Senor, purifica mi amor y hazlo sincero, paciente y servicial. Amen.',
      keywords: ['amor', 'romanos 12', 'comunidad', 'honra']
    },
    '2027-01-20': {
      title: 'Sobrellevad las cargas',
      explanation: 'Galatas llama a restaurar con mansedumbre y sobrellevar las cargas unos de otros. La iglesia no es un lugar para esconder debilidades, sino una familia donde la gracia ayuda a levantar al caido. Esto exige humildad, cuidado y vigilancia del propio corazon. Caminar juntos significa cargar, restaurar y sembrar en el Espiritu.',
      reflectionQuestion: 'De quien puedes ayudar a llevar una carga esta semana?',
      application: 'Ofrece ayuda concreta a alguien que este cansado o necesitado.',
      prayer: 'Padre, danos mansedumbre para restaurar y amor para cargar unos con otros. Amen.',
      keywords: ['cargas', 'galatas 6', 'restauracion', 'mansedumbre']
    },
    '2027-01-21': {
      title: 'Perdonarnos como Cristo',
      explanation: 'Efesios nos llama a desechar palabras corruptas, amargura, enojo y malicia, y a vestirnos de benignidad y perdon. La razon es clara: Dios nos perdono en Cristo. El perdon cristiano no minimiza el pecado, pero mira a la cruz como fundamento de una nueva manera de relacionarnos. La comunidad se sana cuando el evangelio gobierna nuestras respuestas.',
      reflectionQuestion: 'A quien necesitas perdonar o pedir perdon?',
      application: 'Da un paso humilde hacia reconciliacion, segun sea posible y sabio.',
      prayer: 'Senor, como me perdonaste en Cristo, ensename a perdonar con gracia. Amen.',
      keywords: ['perdon', 'efesios 4', 'reconciliacion', 'gracia']
    },
    '2027-01-22': {
      title: 'Servir con amor',
      explanation: 'Pedro ensena que el amor cubre multitud de pecados y que cada uno debe ministrar a otros segun el don recibido. El servicio cristiano es administracion de la gracia de Dios. No servimos para lucir, sino para que Dios sea glorificado por Jesucristo. Una iglesia saludable es una iglesia donde muchos sirven con amor practico.',
      reflectionQuestion: 'Tu servicio busca la gloria de Dios o reconocimiento personal?',
      application: 'Sirve hoy de manera sencilla y sin buscar aplausos.',
      prayer: 'Dios, que mi servicio administre tu gracia y te glorifique. Amen.',
      keywords: ['servicio', '1 pedro 4', 'amor', 'dones']
    },
    '2027-01-23': {
      title: 'Estimularnos al amor',
      explanation: 'Hebreos nos llama a considerarnos unos a otros para estimularnos al amor y a las buenas obras. Esto requiere atencion intencional. No basta coexistir en la iglesia; debemos pensar como animar a otros a seguir a Cristo. La comunidad se fortalece cuando cada creyente se convierte en instrumento de aliento, verdad y perseverancia.',
      reflectionQuestion: 'A quien puedes estimular al amor y buenas obras hoy?',
      application: 'Envia una palabra de animo biblico a alguien de tu congregacion.',
      prayer: 'Senor, usame para animar a otros a amar y obedecer. Amen.',
      keywords: ['hebreos 10', 'animo', 'buenas obras', 'iglesia']
    },
    '2027-01-24': {
      title: 'Consideremonos unos a otros',
      explanation: 'Por la sangre de Cristo tenemos acceso a Dios y una esperanza firme. Esa seguridad nos mueve hacia la comunidad, no hacia el aislamiento. Congregarnos, exhortarnos y cuidarnos unos a otros es parte de perseverar. La vida renovada reconoce que necesitamos hermanos y hermanas que nos ayuden a mirar a Cristo.',
      reflectionQuestion: 'Estas caminando la fe en comunidad o aislado?',
      application: 'Comprometete esta semana a congregarte y animar a alguien personalmente.',
      prayer: 'Cristo, gracias por acercarnos a Dios y unirnos como tu pueblo. Amen.',
      keywords: ['comunidad', 'hebreos 10', 'esperanza', 'congregacion']
    },
    '2027-01-25': {
      title: 'Correr con paciencia',
      explanation: 'Hebreos compara la vida cristiana con una carrera. Para correr bien, debemos dejar pesos y pecado, y hacerlo con paciencia. No todo lo que pesa parece malo al principio, pero puede impedir obediencia. La perseverancia requiere enfoque, disciplina y esperanza. No corremos solos ni sin meta; corremos delante de Dios.',
      reflectionQuestion: 'Que peso debes dejar para correr con mayor fidelidad?',
      application: 'Identifica una distraccion que debes limitar para buscar mejor a Cristo.',
      prayer: 'Senor, ayudame a dejar todo peso y correr con paciencia. Amen.',
      keywords: ['hebreos 12', 'perseverancia', 'carrera', 'disciplina']
    },
    '2027-01-26': {
      title: 'No cansarnos de hacer el bien',
      explanation: 'Galatas nos anima a no cansarnos de hacer el bien, porque a su tiempo segaremos si no desmayamos. La obediencia fiel muchas veces parece lenta. Dios llama a su pueblo a sembrar en el Espiritu, confiar en su tiempo y servir aun cuando no vea resultados inmediatos. La perseverancia es una forma de fe.',
      reflectionQuestion: 'Donde necesitas seguir haciendo el bien aunque estes cansado?',
      application: 'Renueva una responsabilidad de servicio que has querido abandonar.',
      prayer: 'Padre, dame fuerzas para sembrar bien y esperar tu fruto. Amen.',
      keywords: ['galatas 6', 'hacer bien', 'perseverancia', 'fruto']
    },
    '2027-01-27': {
      title: 'Fortalecidos en el Senor',
      explanation: 'Efesios nos llama a fortalecernos en el Senor y en el poder de su fuerza. La vida cristiana enfrenta lucha espiritual real, por eso necesitamos la armadura de Dios. No resistimos con recursos humanos solamente, sino con verdad, justicia, fe, salvacion, Palabra y oracion. La fortaleza viene del Senor.',
      reflectionQuestion: 'En que area necesitas depender mas de la fuerza de Dios?',
      application: 'Ora usando las piezas de la armadura de Dios como guia.',
      prayer: 'Senor, fortaleceme en tu poder para permanecer firme. Amen.',
      keywords: ['armadura', 'efesios 6', 'fortaleza', 'oracion']
    },
    '2027-01-28': {
      title: 'La buena obra que Dios comenzo',
      explanation: 'Pablo confia en que Dios completara la buena obra que comenzo en los creyentes. Nuestra esperanza de crecimiento no descansa en perfeccion personal, sino en la fidelidad de Dios. El mismo que salva tambien santifica. Esto nos anima a perseverar con humildad, sabiendo que Dios sigue obrando en nosotros para el dia de Cristo.',
      reflectionQuestion: 'Como te anima saber que Dios sigue obrando en ti?',
      application: 'Agradece a Dios por un area donde has visto crecimiento, aunque sea pequeno.',
      prayer: 'Dios fiel, completa la buena obra que comenzaste en mi. Amen.',
      keywords: ['filipenses 1', 'crecimiento', 'fidelidad', 'santificacion']
    },
    '2027-01-29': {
      title: 'Fiel es el que prometio',
      explanation: 'Hebreos llama a mantener firme la profesion de nuestra esperanza porque fiel es el que prometio. La estabilidad cristiana no se basa en la fuerza de nuestra mano, sino en la fidelidad de Dios. Cuando las emociones fluctuan, sus promesas permanecen. Podemos confesar esperanza porque Dios no falla.',
      reflectionQuestion: 'Que promesa de Dios necesitas recordar para mantenerte firme?',
      application: 'Escribe Hebreos 10:23 y colocalo donde puedas verlo hoy.',
      prayer: 'Senor fiel, afirma mi esperanza en tus promesas. Amen.',
      keywords: ['fidelidad', 'hebreos 10', 'esperanza', 'promesa']
    },
    '2027-01-30': {
      title: 'Firmes hasta el fin',
      explanation: 'Pablo llama a estar firmes y constantes, creciendo en la obra del Senor, porque nuestro trabajo en El no es vano. Esta verdad conecta resurreccion y servicio. Nada hecho para Cristo se pierde. Al terminar enero, somos animados a seguir sirviendo con estabilidad, gozo y esperanza, confiando en el Senor de la obra.',
      reflectionQuestion: 'Que obra del Senor necesitas continuar con firmeza?',
      application: 'Anima a alguien que sirve fielmente y recuerdale que su trabajo no es en vano.',
      prayer: 'Cristo resucitado, haznos firmes y constantes en tu obra. Amen.',
      keywords: ['firmeza', '1 corintios 15', 'servicio', 'resurreccion']
    },
    '2027-01-31': {
      title: 'Puestos los ojos en Jesus',
      explanation: 'Hebreos nos llama a mirar a Jesus, autor y consumador de la fe. El sufrio la cruz por el gozo puesto delante de El y ahora esta sentado a la diestra de Dios. Mirar a Jesus nos guarda del cansancio espiritual. No perseveramos mirando solo nuestras fuerzas, sino contemplando al Salvador que completo la carrera y sostiene la nuestra.',
      reflectionQuestion: 'Que te ha estado distrayendo de mirar a Jesus?',
      application: 'Aparta un momento para contemplar a Cristo en oracion antes de planificar la semana.',
      prayer: 'Jesus, autor y consumador de mi fe, sosten mi mirada en ti. Amen.',
      keywords: ['hebreos 12', 'jesus', 'perseverancia', 'fe']
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
    version: 'RV1909-2027-01-rev3',
    months,
    readings
  };
})();
