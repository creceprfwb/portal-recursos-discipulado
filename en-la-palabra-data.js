(function () {
  const BIBLE_VERSION = 'RV1909 - Edición de lectura PRFWB';
  const bibleTextSource = 'Texto basado en Reina-Valera 1909, dominio público. Edición de lectura PRFWB con actualización mínima de ortografía/vocabulario.';
  const sundayTexts = {
    'Juan 15:1-8': `Yo soy la vid verdadera, y mi Padre es el labrador.
Todo pampano que en mi no lleva fruto, le quitara; y todo aquel que lleva fruto, le limpiara, para que lleve mas fruto.
Ya ustedes son limpios por la palabra que les he hablado.
Permanezcan en mí, y yo en ustedes. Como el pampano no puede llevar fruto de sí mismo, si no permaneciere en la vid; así ni ustedes, si no permanecen en mí.
Yo soy la vid, ustedes los pampanos: el que permanece en mí, y yo en el, este lleva mucho fruto; porque sin mi nada pueden hacer.
En esto es glorificado mi Padre, en que lleven mucho fruto, y sean así mis discípulos.`,
    'Efesios 2:1-10': `Y el les dio vida a ustedes, cuando estaban muertos en delitos y pecados.
Pero Dios, que es rico en misericordia, por su mucho amor con que nos amó,
aun estando nosotros muertos en pecados, nos dio vida juntamente con Cristo; por gracia son salvos.
Y juntamente nos resucitó, y asimismo nos hizo sentar en los cielos con Cristo Jesús,
para mostrar en los siglos venideros las abundantes riquezas de su gracia en su bondad para con nosotros en Cristo Jesús.
Porque por gracia son salvos por la fe; y esto no de ustedes, pues es don de Dios;
no por obras, para que nadie se glorie.
Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó para que anduviesemos en ellas.`,
    'Mateo 11:25-30': `En aquel tiempo, respondiendo Jesús, dijo: Te alabo, Padre, Señor del cielo y de la tierra, que hayas escondido estas cosas de los sabios y entendidos, y las hayas revelado a los niños.
Si, Padre, porque así te agradó.
Todas las cosas me son entregadas de mi Padre; y nadie conoció al Hijo, sino el Padre; ni al Padre conoció alguno, sino el Hijo, y aquel a quien el Hijo lo quisiere revelar.
Vengan a mí todos los que están trabajados y cargados, que yo les haré descansar.
Lleven mi yugo sobre ustedes, y aprendan de mí, que soy manso y humilde de corazón; y hallarán descanso para sus almas.
Porque mi yugo es fácil, y ligera mi carga.`,
    'Salmo 23': `Jehová es mi pastor; nada me faltara.
En lugares de delicados pastos me hará yacer; junto a aguas de reposo me pastoreara.
Confortara mi alma; me guiara por sendas de justicia por amor de su nombre.
Aunque ande en valle de sombra de muerte, no temeré mal alguno; porque tu estaras conmigo: tu vara y tu cayado me infundirán aliento.
Aderezaras mesa delante de mi en presencia de mis angustiadores; ungiste mi cabeza con aceite; mi copa está rebosando.
Ciertamente el bien y la misericordia me seguirán todos los días de mi vida; y en la casa de Jehová moraré por largos días.`,
    'Romanos 8:31-39': `Qué, pues, diremos a esto? Si Dios por nosotros, quién contra nosotros?
El que aun a su propio Hijo no perdonó, antes le entregó por todos nosotros, como no nos dará también con él todas las cosas?
Quién acusara a los escogidos de Dios? Dios es el que justifica.
Quién es el que condenara? Cristo es el que murió; mas aun, el que también resucitó, quien además esta a la diestra de Dios, el que también intercede por nosotros.
Quién nos apartara del amor de Cristo? tribulación, o angustia, o persecucion, o hambre, o desnudez, o peligro, o espada?
Antes, en todas estas cosas somos más que vencedores por medio de aquel que nos amó.
Por lo cual estoy cierto que ni la muerte, ni la vida, ni angeles, ni principados, ni potestades, ni lo presente, ni lo por venir,
ni lo alto, ni lo bajo, ni ninguna criatura nos podrá apartar del amor de Dios, que es en Cristo Jesús Señor nuestro.`,
    'Hebreos 1:1-4': `Dios, habiendo hablado muchas veces y en muchas maneras en otro tiempo a los padres por los profetas,
en estos postreros días nos ha hablado por el Hijo, al cual constituyó heredero de todo, por el cual asimismo hizo el universo.
El cual, siendo el resplandor de su gloria, y la imagen misma de su sustancia, y sustentando todas las cosas con la palabra de su potencia, habiendo hecho la purificación de nuestros pecados por sí mismo, se sentó a la diestra de la Majestad en las alturas,
hecho tanto mas excelente que los angeles, cuanto alcanzó por herencia mas excelente nombre que ellos.`,
    'Romanos 12:1-2': `Así que, hermanos, les ruego por las misericordias de Dios, que presenten sus cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional.
Y no se conformen a este siglo; mas sean transformados por la renovación de vuestro entendimiento, para que experimenten cuál sea la buena voluntad de Dios, agradable y perfecta.`,
    'Lucas 24:25-27': `Entonces el les dijo: Oh insensatos, y tardos de corazón para creer todo lo que los profetas han dicho!
No era necesario que el Cristo padeciera estas cosas, y que entrara en su gloria?
Y comenzando desde Moisés, y de todos los profetas, les declaraba en todas las Escrituras lo que de él decían.`,
    'Santiago 1:22-25': `Pero sean hacedores de la palabra, y no tan solamente oidores, engañándose a ustedes mismos.
Porque si alguno oye la palabra, y no la pone por obra, este tal es semejante al hombre que considera en un espejo su rostro natural.
Porque el se consideró a sí mismo, y se fue, y luego se olvidó que tal era.
Mas el que mira atentamente en la perfecta ley, que es la de la libertad, y persevera en ella, no siendo oidor olvidadizo, sino hacedor de la obra, este será bienaventurado en lo que hace.`,
    '2 Timoteo 3:14-17': `Pero persiste tu en lo que has aprendido y te persuadiste, sabiendo de quien has aprendido;
y que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación por la fe que es en Cristo Jesús.
Toda Escritura es inspirada divinamente y útil para enseñar, para redarguir, para corregir, para instruir en justicia;
para que el hombre de Dios sea perfecto, enteramente instruido para toda buena obra.`,
    'Lucas 11:1-13': `Y aconteció que estando el orando en un lugar, cuando acabó, uno de sus discípulos le dijo: Señor, enséñanos a orar, como también Juan enseñó a sus discípulos.
Y les dijo: Cuando oren, digan: Padre nuestro que estás en los cielos, santificado sea tu nombre. Venga tu reino. Sea hecha tu voluntad, como en el cielo, así también en la tierra.
Danos hoy nuestro pan cotidiano. Y perdónanos nuestros pecados, porque también nosotros perdonamos a todos los que nos deben; y no nos metas en tentación, mas líbranos del mal.
Y les dijo: Quién de ustedes tendrá un amigo, e irá a él a medianoche, y le dirá: Amigo, prestame tres panes;
porque un amigo mio ha venido a mi de camino, y no tengo que ponerle delante;
y el de dentro respondiendo dijere: No me molestes; la puerta ya está cerrada, y mis niños están conmigo en cama; no puedo levantarme a darte.
Les digo que aunque no se levante a darle por ser su amigo, cierto por su importunidad se levantará, y le dará todo lo que necesite.
Y yo les digo: Pidan, y se les dará; busquen, y hallarán; llamen, y se les abrirá.
Porque todo aquel que pide, recibe; y el que busca, halla; y al que llama, se abre.
Pues si ustedes, siendo malos, saben dar buenas dádivas a sus hijos, cuanto mas vuestro Padre celestial dará el Espíritu Santo a los que se lo pidan?`,
    'Santiago 5:13-18': `Está alguno entre ustedes afligido? haga oración. Está alguno alegre? cante salmos.
Está alguno enfermo entre ustedes? llame a los ancianos de la iglesia, y oren por él, ungiendole con aceite en el nombre del Señor.
Y la oración de fe salvará al enfermo, y el Señor lo levantará; y si estuviere en pecados, le serán perdonados.
Confiesen sus faltas unos a otros, y oren unos por otros, para que sean sanados; la oración eficaz del justo puede mucho.
Elías era hombre sujeto a semejantes pasiones que nosotros, y rogó con oración que no lloviese, y no llovió sobre la tierra por tres años y seis meses.
Y otra vez oro, y el cielo dio lluvia, y la tierra produjo su fruto.`,
    'Hechos 4:23-31': `Y sueltos, vinieron a los suyos, y contaron todo lo que los principes de los sacerdotes y los ancianos les habían dicho.
Y ellos, habiéndolo oído, alzaron unánimes la voz a Dios, y dijeron: Señor, tu eres el Dios que hiciste el cielo y la tierra, el mar y todo lo que en ellos hay.
Y ahora, Señor, mira sus amenazas, y da a tus siervos que con toda confianza hablen tu palabra;
extendiendo tu mano a que sanidades, señales y prodigios sean hechos por el nombre de tu santo Hijo Jesús.
Y como hubieron orado, el lugar en que estaban congregados tembló; y todos fueron llenos del Espíritu Santo, y hablaban la palabra de Dios con confianza.`,
    '2 Tesalonicenses 3:1-5': `Por lo demás, hermanos, oren por nosotros, que la palabra del Señor corra y sea glorificada, así como entre ustedes;
y que seamos librados de hombres importunos y malos; porque no es de todos la fe.
Mas fiel es el Señor, que les confirmará y guardará del mal.
Y tenemos confianza de ustedes en el Señor, que hacen y haran lo que les hemos mandado.
Y el Señor dirija vuestros corazones en el amor de Dios, y en la paciencia de Cristo.`,
    'Isaías 6:1-8': `En el año que murió el rey Uzias vi yo al Señor sentado sobre un trono alto y sublime, y sus faldas llenaban el templo.
Y encima de él estaban serafines; cada uno tenia seis alas: con dos cubrian sus rostros, con dos cubrian sus pies, y con dos volaban.
Y el uno al otro daba voces, diciendo: Santo, santo, santo, Jehová de los ejércitos: toda la tierra está llena de su gloria.
Y los quiciales de las puertas se estremecieron con la voz del que clamaba, y la casa se llenó de humo.
Entonces dije: Ay de mi! que soy muerto; porque siendo hombre inmundo de labios, y habitando en medio de pueblo que tiene labios inmundos, han visto mis ojos al Rey, Jehová de los ejércitos.
Y voló hacia mí uno de los serafines, teniendo en su mano un carbon encendido, tomado del altar con unas tenazas.
Y tocando con él sobre mi boca, dijo: He aquí que esto tocó tus labios, y es quitada tu culpa, y limpio tu pecado.
Después oí la voz del Señor, que decía: A quién enviaré, y quién irá por nosotros? Entonces respondí yo: Heme aquí, envíame a mí.`,
    '2 Corintios 5:17-21': `De modo que si alguno está en Cristo, nueva criatura es: las cosas viejas pasaron; he aquí todas son hechas nuevas.
Y todo esto es de Dios, el cual nos reconcilió consigo por Cristo, y nos dio el ministerio de la reconciliación.
Porque ciertamente Dios estaba en Cristo reconciliando el mundo consigo, no imputándoles sus pecados, y puso en nosotros la palabra de la reconciliación.
Así que somos embajadores en nombre de Cristo, como si Dios rogase por medio de nosotros; les rogamos en nombre de Cristo: Reconciliense con Dios.
Al que no conoció pecado, por nosotros lo hizo pecado, para que nosotros fuesemos hechos justicia de Dios en Él.`,
    'Efesios 4:11-16': `Y el mismo dio unos, ciertamente apóstoles; y otros, profetas; y otros, evangelistas; y otros, pastores y maestros;
para perfeccion de los santos, para la obra del ministerio, para edificación del cuerpo de Cristo;
hasta que todos lleguemos a la unidad de la fe y del conocimiento del Hijo de Dios, a un varón perfecto, a la medida de la edad de la plenitud de Cristo.
Que ya no seamos niños fluctuantes, llevados por doquiera de todo viento de doctrina, por estratagema de hombres que, para enganar, emplean con astucia los artificios del error.
Antes siguiendo la verdad en amor, crezcamos en todas cosas en aquel que es la cabeza, a saber, Cristo;
del cual todo el cuerpo, bien concertado y unido entre sí por todas las coyunturas que se ayudan mutuamente, según la operación propia de cada miembro, recibe su crecimiento para ir edificándose en amor.`,
    'Filipenses 2:1-11': `Por tanto, si hay alguna consolación en Cristo, si algún consuelo de amor, si alguna comunión del Espíritu, si algún afecto y misericordia,
cumplan mi gozo, que sientan lo mismo, teniendo el mismo amor, unánimes, sintiendo una misma cosa.
Nada hagan por contienda o por vanagloria; antes bien con humildad, estimando cada uno a los demás como superiores a sí mismo.
No mire cada uno a lo suyo propio, sino cada cual también a lo de los otros.
Haya, pues, en ustedes este sentir que hubo también en Cristo Jesús:
El cual, siendo en forma de Dios, no estimo como cosa a que aferrarse el ser igual a Dios;
sino que se despojo a sí mismo, tomando forma de siervo, hecho semejante a los hombres;
y hallado en la condicion como hombre, se humillo a sí mismo, hecho obediente hasta la muerte, y muerte de cruz.
Por lo cual Dios también le ensalzó soberanamente, y le dio un nombre que es sobre todo nombre;
para que en el nombre de Jesús se doble toda rodilla de los que están en los cielos, y de los que están en la tierra, y de los que están debajo de la tierra;
y toda lengua confiese que Jesucristo es el Señor, a la gloria de Dios Padre.`,
    'Hechos 13:44-49': `Y el sábado siguiente se juntó casi toda la ciudad a oír la palabra de Dios.
Pero los judíos, viendo la multitud, se llenaron de celos, y se oponian a lo que Pablo decía, contradiciendo y blasfemando.
Entonces Pablo y Bernabé, usando de libertad, dijeron: A ustedes a la verdad era menester que se hablase primero la palabra de Dios; mas porque la desechan, y se juzgan indignos de la vida eterna, he aquí, nos volvemos a los gentiles.
Porque así nos ha mandado el Señor, diciendo: Te he puesto para luz de los gentiles, para que seas salvación hasta lo postrero de la tierra.
Y los gentiles, oyendo esto, se gozaban, y glorificaban la palabra del Señor; y creyeron todos los que estaban ordenados para vida eterna.
Y la palabra del Señor era sembrada por toda aquella provincia.`,
    '1 Corintios 15:58': `Así que, hermanos mios amados, estén firmes y constantes, creciendo en la obra del Señor siempre, sabiendo que su trabajo en el Señor no es vano.`,
    'Lucas 1:26-38': `Y al sexto mes, el ángel Gabriel fue enviado de Dios a una ciudad de Galilea, llamada Nazaret,
a una virgen desposada con un varón que se llamaba José, de la casa de David; y el nombre de la virgen era María.
Y entrando el ángel a donde ella estaba, dijo: Salve, muy favorecida; el Señor es contigo; bendita tu entre las mujeres.
Mas ella, cuando le vio, se turbó por sus palabras, y pensaba que salutacion fuese esta.
Entonces el ángel le dijo: María, no temas, porque has hallado gracia delante de Dios.
Y he aquí, concebirás en tu seno, y parirás un hijo, y llamarás su nombre Jesús.
Este será grande, y será llamado Hijo del Altísimo; y le dará el Señor Dios el trono de David su padre.
Y reinará en la casa de Jacob por siempre; y de su reino no habrá fin.
Entonces María dijo al ángel: Cómo será esto? porque no conozco varón.
Y respondiendo el ángel le dijo: El Espíritu Santo vendrá sobre ti, y la virtud del Altísimo te hará sombra; por lo cual también lo santo que nacerá será llamado Hijo de Dios.
Porque ninguna cosa es imposible para Dios.
Entonces María dijo: He aquí la sierva del Señor; hagase a mi conforme a tu palabra. Y el ángel se fue de ella.`,
    'Mateo 1:18-25': `Y el nacimiento de Jesucristo fue así: que siendo María su madre desposada con José, antes que se juntasen, se halló haber concebido del Espíritu Santo.
Y José su marido, como era justo, y no quisiese infamarla, quiso dejarla secretamente.
Y pensando el en esto, he aquí el ángel del Señor le aparece en sueños, diciendo: José, hijo de David, no temas recibir a María tu mujer, porque lo que en ella es engendrado, del Espíritu Santo es.
Y parirá un hijo, y llamarás su nombre Jesús, porque el salvará a su pueblo de sus pecados.
Todo esto aconteció para que se cumpliese lo que fue dicho por el Señor por el profeta, que dijo:
He aquí la virgen concebirá y parirá un hijo, y llamarás su nombre Emmanuel, que declarado es: Dios con nosotros.
Y despertando José del sueno, hizo como el ángel del Señor le había mandado, y recibió a su mujer.
Y no la conoció hasta que parió a su hijo primogenito; y llamó su nombre Jesús.`,
    'Lucas 2:1-20': `Y aconteció en aquellos días que salió edicto de parte de Augusto César, que toda la tierra fuese empadronada.
E iban todos para ser empadronados, cada uno a su ciudad.
Y subio José de Galilea, de la ciudad de Nazaret, a Judea, a la ciudad de David, que se llama Belén, por cuanto era de la casa y familia de David;
para ser empadronado con María su mujer, desposada con el, la cual estaba encinta.
Y aconteció que estando ellos alli, se cumplieron los días en que ella había de parir.
Y parió a su hijo primogenito, y le envolvió en pañales, y le acostó en un pesebre, porque no había lugar para ellos en el meson.
Y había pastores en la misma tierra, que velaban y guardaban las vigilias de la noche sobre su ganado.
Y he aquí el ángel del Señor vino sobre ellos, y la claridad de Dios los cercó de resplandor; y tuvieron gran temor.
Mas el ángel les dijo: No teman; porque he aquí les doy nuevas de gran gozo, que será para todo el pueblo:
que les ha nacido hoy, en la ciudad de David, un Salvador, que es Cristo el Señor.
Y esto les será por señal: hallarán al niño envuelto en pañales, echado en un pesebre.
Y repentinamente fue con el ángel una multitud de los ejércitos celestiales, que alababan a Dios, y decían:
Gloria en las alturas a Dios, y en la tierra paz, buena voluntad para con los hombres.
Y volvieron los pastores glorificando y alabando a Dios por todas las cosas que habían oído y visto, como les había sido dicho.`,
    'Juan 1:1-14': `En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.
Este era en el principio con Dios.
Todas las cosas por él fueron hechas; y sin el nada de lo que es hecho, fue hecho.
En él estaba la vida, y la vida era la luz de los hombres.
Y aquel Verbo fue hecho carne, y habitó entre nosotros; y vimos su gloria, gloria como del unigénito del Padre, llenó de gracia y de verdad.`,
    'Apocalipsis 21:1-5': `Y vi un cielo nuevo, y una tierra nueva; porque el primer cielo y la primera tierra se fueron, y el mar ya no es.
Y yo Juan vi la santa ciudad, Jerusalem nueva, que descendia del cielo, de Dios, dispuesta como una esposa ataviada para su marido.
Y oí una gran voz del cielo que decía: He aquí el tabernáculo de Dios con los hombres, y morará con ellos; y ellos serán su pueblo, y el mismo Dios será su Dios con ellos.
Y limpiara Dios toda lágrima de los ojos de ellos; y la muerte no será mas; y no habrá mas llanto, ni clamor, ni dolor; porque las primeras cosas son pasadas.
Y el que estaba sentado en el trono dijo: He aquí, yo hago nuevas todas las cosas.`,
    'Colosenses 3:1-17': `Si pues han resucitado con Cristo, busquen las cosas de arriba, donde está Cristo sentado a la diestra de Dios.
Pongan la mira en las cosas de arriba, no en las de la tierra.
Porque muertos son, y su vida esta escondida con Cristo en Dios.
Cuando Cristo, nuestra vida, se manifestare, entonces ustedes también serán manifestados con él en gloria.
Hagan morir, pues, lo terrenal en ustedes.
Vestanse, pues, como escogidos de Dios, santos y amados, de entranas de misericordia, de benignidad, de humildad, de mansedumbre, de paciencia;
soportándose unos a otros, y perdonándose unos a otros si alguno tuviere queja del otro; de la manera que Cristo les perdonó, así también háganlo ustedes.
Y sobre todas estas cosas vistanse de amor, que es el vínculo de perfeccion.
Y la paz de Dios gobierne en sus corazones, a la cual asimismo fueron llamados en un cuerpo; y sean agradecidos.
La palabra de Cristo habite en ustedes abundantemente en toda sabiduría, enseñándose y exhortándose unos a otros con salmos, himnos y canciones espirituales, con gracia cantando en sus corazones al Señor.
Y todo lo que hagan, sea de palabra o de hecho, háganlo todo en el nombre del Señor Jesús, dando gracias a Dios Padre por el.`,
    'Salmo 1': `Bienaventurado el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado;
antes en la ley de Jehová está su delicia, y en su ley medita de día y de noche.
Y será como el arbol plantado juntó a arroyos de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace prosperará.
No así los malos: sino como el tamo que arrebata el viento.
Por tanto no se levantaran los malos en el juicio, ni los pecadores en la congregación de los justos.
Porque Jehová conoce el camino de los justos; mas la senda de los malos perecerá.`,
    'Filipenses 4:4-9': `Regocíjense en el Señor siempre; otra vez digo: Regocíjense.
Vuestra modestia sea conocida de todos los hombres. El Señor está cerca.
Por nada estén afanosos; sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.
Y la paz de Dios, que sobrepuja todo entendimiento, guardará vuestros corazones y vuestros entendimientos en Cristo Jesús.
Por lo demás, hermanos, todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre; si hay virtud alguna, si alguna alabanza, en esto piensen.
Lo que aprendieron, recibieron, oyeron y vieron en mí, esto hagan; y el Dios de paz será con ustedes.`,
    'Hebreos 10:19-25': `Así que, hermanos, teniendo libertad para entrar en el santuario por la sangre de Jesucristo,
por el camino que él nos consagro nuevo y vivo, por el velo, esto es, por su carne;
y teniendo un gran sacerdote sobre la casa de Dios,
lleguémonos con corazón verdadero, en plena certidumbre de fe, purificados los corazones de mala conciencia, y lavados los cuerpos con agua limpia.
Mantengamos firme la profesión de nuestra esperanza sin fluctuar; que fiel es el que prometió.
Y consideremonos los unos a los otros para provocarnos al amor y a las buenas obras;
no dejando nuestra congregación, como algunos tienen por costumbre, sino exhortandonos; y tanto mas, cuanto ven que aquel día se acerca.`,
    'Hebreos 12:1-3': `Por tanto nosotros también, teniendo en derredor nuestro una tan grande nube de testigos, dejando todo el peso del pecado que nos rodea, corramos con paciencia la carrera que nos es propuesta,
puestos los ojos en Jesús, el autor y consumador de la fe, el cual, habiéndole sido propuesto gozo, sufrió la cruz, menospreciando la vergüenza, y sentose a la diestra del trono de Dios.
Reduzcan, pues, a vuestro pensamiento a aquel que sufrió tal contradicción de pecadores contra sí mismo, para que no se fatiguen en vuestros ánimos desmayando.`,
    'Mateo 6:9-13': `Ustedes, pues, oren así:

Padre nuestro que estás en los cielos, santificado sea tu nombre.
Venga tu reino. Sea hecha tu voluntad, como en el cielo, así también en la tierra.
Danos hoy nuestro pan cotidiano.
Y perdónanos nuestras deudas, como también nosotros perdonamos a nuestros deudores.
Y no nos metas en tentación, mas líbranos del mal:
porque tuyo es el reino, y el poder, y la gloria, por todos los siglos. Amén.`
  };

  const august = {
    year: 2026,
    month: 8,
    monthKey: '2026-08',
    monthName: 'Agosto',
    theme: 'Jesús, el Centro',
    description: 'Durante agosto, PRFWB será animada a comenzar poniendo a Jesús en el centro: permanecer en El, descansar en su gracia, caminar bajo su cuidado y vivir seguros en su amor.',
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
          introduction: 'Comenzamos agosto mirando a Jesús como la vid verdadera. La vida cristiana no se sostiene por esfuerzo separado de Cristo, sino por permanecer en Él. Todo fruto verdadero nace de la comunión con el Señor, de su Palabra limpiando nuestro corazón y de una dependencia diaria que glorifica al Padre.',
          mainTruth: 'El discípulo lleva fruto cuando permanece unido a Cristo.'
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
          introduction: 'Efesios nos recuerda que nuestra historia espiritual comienza con muerte, pero Dios interviene con misericordia. La salvación no es premio por obras, sino regalo de gracia en Cristo. Esa misma gracia nos crea de nuevo para caminar en buenas obras que Dios preparó.',
          mainTruth: 'Somos salvos por gracia en Cristo y creados para vivir en buenas obras.'
        }
      },
      {
        title: 'Descansar en Jesús',
        start: '2026-08-10',
        end: '2026-08-16',
        sunday: {
          date: '2026-08-16',
          theme: 'Vengan a mi',
          reference: 'Mateo 11:25-30',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Mateo 11:25-30'] || '',
          bibleTextSource,
          introduction: 'Jesús llama a los cansados y cargados a venir a El. No ofrece una carga más pesada, sino descanso para el alma. Aprender de Cristo significa recibir su mansedumbre, rendir nuestro orgullo y caminar bajo su yugo bueno. El descanso verdadero se encuentra en el Señor.',
          mainTruth: 'Jesús da descanso verdadero a los que vienen a El con humildad y fe.'
        }
      },
      {
        title: 'Guiados por el Pastor',
        start: '2026-08-17',
        end: '2026-08-23',
        sunday: {
          date: '2026-08-23',
          theme: 'Jehová es mi pastor',
          reference: 'Salmo 23',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Salmo 23'] || '',
          bibleTextSource,
          introduction: 'El Salmo 23 nos lleva a descansar en el cuidado personal del Señor. Dios guía, sustenta, corrige, acompaña y consuela a su pueblo. aun en valles oscuros, el creyente no camina solo. La bondad y misericordia del Pastor sostienen nuestra vida.',
          mainTruth: 'El Señor cuida, guía y acompaña fielmente a su pueblo.'
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
          introduction: 'Romanos 8 afirma una seguridad profunda: Dios esta por nosotros en Cristo. Ninguna acusación, condenación, sufrimiento o poder creado puede separar al creyente del amor de Dios. Esta esperanza no niega las pruebas, pero nos sostiene en medio de ellas.',
          mainTruth: 'Nada puede separar al creyente del amor de Dios en Cristo Jesús.'
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
          introduction: 'Agosto cierra preparando el corazón para septiembre: un mes enfocado en la Palabra. El Dios que cuida, salva y sostiene también habla. Su revelación culmina en Cristo, el Hijo, a quien debemos escuchar con reverencia, fe y obediencia.',
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
    description: 'Durante septiembre, PRFWB será animada a conocer, creer, meditar y obedecer la Palabra de Dios, reconociendo que las Escrituras nos conducen a Cristo y forman nuestra vida como discípulos.',
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
          introduction: 'Durante la semana hemos recordado que Dios no permanece en silencio. El Dios que creo por su palabra, sostiene su verdad y llama a su pueblo a escuchar, también se ha revelado de manera suprema en su Hijo. Esta lectura congregacional nos invita a recibir la Palabra de Dios con reverencia, fe y obediencia.',
          mainTruth: 'Dios nos ha hablado fielmente, y su revelación culmina en Jesucristo, a quien debemos escuchar y obedecer.'
        }
      },
      {
        title: 'La Palabra transforma nuestra mente y corazón',
        start: '2026-09-07',
        end: '2026-09-13',
        sunday: {
          date: '2026-09-13',
          theme: 'Transformados por la Palabra',
          reference: 'Romanos 12:1-2',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Romanos 12:1-2'] || '',
          bibleTextSource,
          introduction: 'Durante esta semana hemos meditado en la Palabra que alumbra, discierne y transforma el corazón. Romanos nos llama a responder a las misericordias de Dios con una vida presentada a El. La renovación verdadera no comienza copiando el molde del mundo, sino dejando que Dios transforme nuestra mente por su verdad.',
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
          introduction: 'Jesús enseña a sus discípulos a leer las Escrituras con ojos abiertos al plan de Dios. Moisés, los profetas y toda la historia bíblica apuntan hacia el Cristo que padecería y entraría en su gloria. La iglesia lee la Biblia correctamente cuando la Palabra nos conduce a adorar, confiar y obedecer a Jesús.',
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
          introduction: 'Santiago nos advierte contra una fe que escucha pero no responde. La Palabra es como espejo que muestra la verdad del corazón, pero Dios no nos llama a mirar y olvidar. La bendición esta en perseverar como hacedores de la Palabra, obedeciendo con gozo lo que el Señor ha revelado.',
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
          introduction: 'Al cerrar el énfasis de septiembre, recordamos que las Escrituras son inspiradas por Dios y suficientes para formar a su pueblo. La Palabra nos hace sabios para la salvación en Cristo y nos instruye para vivir en justicia. Una iglesia firme en la verdad será una iglesia preparada para toda buena obra.',
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
    theme: 'Caminando en Oración',
    description: 'Durante octubre, PRFWB será animada a crecer en una vida de oración bíblica, sincera y perseverante, aprendiendo a depender de Dios, buscar su voluntad, interceder por otros y vivir en comunión constante con el Padre por medio de Cristo.',
    weeks: [
      {
        title: 'Dios nos invita a buscarle',
        start: '2026-10-01',
        end: '2026-10-04',
        sunday: {
          date: '2026-10-04',
          theme: 'Señor, enséñanos a orar',
          reference: 'Mateo 6:9-13',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Mateo 6:9-13'] || '',
          bibleTextSource,
          introduction: 'Durante esta primera semana hemos visto que Dios invita a su pueblo a buscarle con sinceridad, confianza y reverencia. La oración no es una repetición vacía ni un intento de impresionar a otros; es comunión con el Padre que nos escucha. Al leer juntos el modelo de oración que Jesús enseñó, recordamos que toda oración cristiana comienza con Dios, su nombre, su reino y su voluntad.',
          mainTruth: 'Jesús nos enseña a orar buscando primero al Padre, su reino y su voluntad.'
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
          introduction: 'Jesús no solo enseña palabras para repetir; forma en sus discípulos una confianza profunda en el Padre. La oración cristiana se acerca con reverencia, dependencia y perseverancia. Podemos pedir, buscar y llamar porque el Padre escucha a sus hijos y da lo que verdaderamente necesitamos.',
          mainTruth: 'Dios llama a sus hijos a acercarse con confianza, perseverancia y dependencia.'
        }
      },
      {
        title: 'Interceder por otros',
        start: '2026-10-12',
        end: '2026-10-18',
        sunday: {
          date: '2026-10-18',
          theme: 'La oración eficaz del justo',
          reference: 'Santiago 5:13-18',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Santiago 5:13-18'] || '',
          bibleTextSource,
          introduction: 'Santiago presenta la oración como respuesta natural del pueblo de Dios en toda circunstancia: aflicción, alegria, enfermedad, pecado y necesidad. La iglesia no ora porque controla los resultados, sino porque confia en la gracia y poder del Señor. La oración eficaz nace de una fe humilde que depende de Dios.',
          mainTruth: 'La iglesia ora confiando en la gracia, el poder y la fidelidad de Dios.'
        }
      },
      {
        title: 'Perseverar en oración',
        start: '2026-10-19',
        end: '2026-10-25',
        sunday: {
          date: '2026-10-25',
          theme: 'Una iglesia que ora con valentía',
          reference: 'Hechos 4:23-31',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hechos 4:23-31'] || '',
          bibleTextSource,
          introduction: 'Cuando la iglesia primitiva enfrentó amenazas, no respondió primero con temor ni silencio, sino con oración. Reconocieron al Dios Creador, pidieron valentía y confiaron en el nombre de Jesús. Una iglesia que ora con fe puede proclamar la Palabra con confianza aún en medio de oposición.',
          mainTruth: 'Una iglesia llena del Espíritu ora y proclama la Palabra con valentía.'
        }
      },
      {
        title: 'Orar y vivir en misión',
        start: '2026-10-26',
        end: '2026-10-31',
        sunday: {
          date: '2026-11-01',
          theme: 'Orar para que corra la Palabra',
          reference: '2 Tesalonicenses 3:1-5',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['2 Tesalonicenses 3:1-5'] || '',
          bibleTextSource,
          introduction: 'Pablo pide oración para que la Palabra del Señor corra y sea glorificada. La misión de la iglesia necesita más que estrategia; necesita dependencia de Dios. Al orar por la expansión del evangelio, nuestros corazones son dirigidos al amor de Dios y a la paciencia de Cristo.',
          mainTruth: 'La oración impulsa a la iglesia a vivir y servir en la misión de Dios.'
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
    theme: 'Una Iglesia en Misión',
    description: 'Durante noviembre, PRFWB será animada a recordar que la iglesia existe para glorificar a Dios proclamando a Cristo, haciendo discípulos y sirviendo como testigo fiel del evangelio en su comunidad y hasta lo último de la tierra.',
    weeks: [
      {
        title: 'Dios envía a su pueblo',
        start: '2026-11-01',
        end: '2026-11-01',
        sunday: {
          date: '2026-11-01',
          theme: 'Heme aquí, envíame a mí',
          reference: 'Isaías 6:1-8',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Isaías 6:1-8'] || '',
          bibleTextSource,
          introduction: 'La misión comienza con una visión correcta de Dios. Isaías no se ofrece a servir porque se cree suficiente, sino porque ha visto la santidad del Señor, ha reconocido su pecado y ha recibido gracia. Solo un pueblo perdonado puede responder al llamado de Dios con humildad y disponibilidad.',
          mainTruth: 'Dios envía a los que primero han sido confrontados por su santidad y limpiados por su gracia.'
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
          introduction: 'Durante esta semana hemos recordado que la iglesia no anuncia ideas humanas ni proyectos personales; proclamamos a Cristo. El evangelio nos reconcilia con Dios y nos convierte en mensajeros de reconciliación. Somos enviados como embajadores, llamando a otros a responder a la gracia de Dios en Cristo.',
          mainTruth: 'La iglesia proclama a Cristo porque Dios nos reconcilió consigo y nos dio el ministerio de la reconciliación.'
        }
      },
      {
        title: 'Hacemos discípulos',
        start: '2026-11-09',
        end: '2026-11-15',
        sunday: {
          date: '2026-11-15',
          theme: 'Edificar el cuerpo de Cristo',
          reference: 'Efesios 4:11-16',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Efesios 4:11-16'] || '',
          bibleTextSource,
          introduction: 'Durante esta semana hemos visto que la misión también incluye formar discípulos maduros. Cristo no deja a su iglesia sin recursos; El equipa a su pueblo por medio de dones, liderazgo, verdad y amor. La iglesia crece cuando cada miembro sirve bajo la dirección de Cristo, la cabeza del cuerpo.',
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
          introduction: 'Servir a la comunidad requiere más que buenas ideas; requiere la mente de Cristo. La humildad de Jesús corrige nuestro orgullo y nos enseña a mirar por los demás. Al leer este pasaje, la iglesia recuerda que todo servicio cristiano nace de la obra, el ejemplo y el señorío de Cristo.',
          mainTruth: 'La iglesia sirve con humildad porque Cristo se humillo por nosotros.'
        }
      },
      {
        title: 'Hasta lo último de la tierra',
        start: '2026-11-23',
        end: '2026-11-29',
        sunday: {
          date: '2026-11-29',
          theme: 'La Palabra del Señor se difundia',
          reference: 'Hechos 13:44-49',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hechos 13:44-49'] || '',
          bibleTextSource,
          introduction: 'La Palabra de Dios avanza aún en medio de oposición. En Antioquia vemos rechazo, pero también gozo, fe y expansión del evangelio. Esta lectura anima a la iglesia a perseverar en la misión, confiando en que Dios sigue usando su Palabra para llamar a muchos a Cristo.',
          mainTruth: 'Dios extiende su Palabra para llamar pueblos y naciones a Cristo.'
        }
      },
      {
        title: 'Firmes en la obra del Señor',
        start: '2026-11-30',
        end: '2026-11-30',
        sunday: {
          date: '2026-12-06',
          theme: 'Firmes y constantes',
          reference: '1 Corintios 15:58',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['1 Corintios 15:58'] || '',
          bibleTextSource,
          introduction: 'Cerramos el enfoque de misión recordando que la resurrección de Cristo sostiene nuestro servicio. La iglesia puede trabajar, sembrar y perseverar porque el Señor vive. Nada hecho en Cristo y para Cristo es en vano, aun cuando el fruto no se vea de inmediato.',
          mainTruth: 'En Cristo, nuestro trabajo en el Señor no es en vano.'
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
    description: 'Durante diciembre, PRFWB será animada a contemplar la venida de Cristo, adorar al Salvador prometido, anunciar el gozo del evangelio y cerrar el año descansando en la esperanza segura del reino de Dios.',
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
          introduction: 'Diciembre comienza recordándonos que Dios cumple sus promesas de maneras que superan nuestra imaginación. El anuncio a María no es solo una escena navideña; es la declaración de que el Hijo del Altísimo viene a reinar para siempre. La respuesta de fe de María nos llama a rendirnos a la Palabra de Dios.',
          mainTruth: 'Dios cumple su promesa enviando a Jesús, el Rey cuyo reino no tendrá fin.'
        }
      },
      {
        title: 'Dios con nosotros',
        start: '2026-12-07',
        end: '2026-12-13',
        sunday: {
          date: '2026-12-13',
          theme: 'Jesús salvará a su pueblo',
          reference: 'Mateo 1:18-25',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Mateo 1:18-25'] || '',
          bibleTextSource,
          introduction: 'El nacimiento de Jesús revela el corazón del evangelio: Dios viene a nosotros para salvarnos de nuestros pecados. José obedece la Palabra del Señor, y el nombre de Jesús anuncia su misión. Emmanuel no es solo consuelo emocional; es la verdad gloriosa de Dios habitando con su pueblo para redimirlo.',
          mainTruth: 'Jesús es Dios con nosotros, enviado para salvar a su pueblo de sus pecados.'
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
          introduction: 'La noticia del nacimiento de Jesús no fue anunciada primero a los poderosos, sino a pastores en la noche. Dios revela que el Salvador ha nacido para traer gozo verdadero a todo el pueblo. Esta lectura nos invita a recibir, adorar y anunciar a Cristo con la misma alegria de los pastores.',
          mainTruth: 'El nacimiento de Cristo trae buenas nuevas de gran gozo para todo el pueblo.'
        }
      },
      {
        title: 'El Verbo hecho carne',
        start: '2026-12-21',
        end: '2026-12-27',
        sunday: {
          date: '2026-12-27',
          theme: 'lleno de gracia y verdad',
          reference: 'Juan 1:1-14',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Juan 1:1-14'] || '',
          bibleTextSource,
          introduction: 'Juan nos lleva al misterio profundo de la Navidad: el Verbo eterno se hizo carne y habitó entre nosotros. Jesús no es solo un maestro enviado por Dios; es Dios mismo revelado, llenó de gracia y verdad. Al cerrar la semana de Navidad, adoramos al Hijo que trae vida y luz.',
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
          introduction: 'El cierre del año no descansa en nostalgia ni temor, sino en la promesa de Dios. La historia camina hacia la renovación de todas las cosas en Cristo. Mientras esperamos ese día, vivimos con esperanza, consuelo y fidelidad, sabiendo que Dios morará con su pueblo para siempre.',
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
    theme: 'Nuevo AÃ±o, Vida Renovada',
    description: 'Durante enero, PRFWB será animada a comenzar el año buscando primero a Cristo, renovando la mente en la Palabra, caminando en oración, viviendo en comunidad y perseverando con esperanza.',
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
          introduction: 'Comenzamos el año recordando que la vida cristiana no se define por metas vacías, sino por union con Cristo. Si hemos resucitado con El, nuestra mirada, deseos, palabras y relaciones deben ser renovados. Cristo no es una parte del año nuevo; El es nuestra vida.',
          mainTruth: 'Una vida renovada comienza buscando a Cristo y viviendo en su nombre.'
        }
      },
      {
        title: 'Arraigados en la Palabra',
        start: '2027-01-04',
        end: '2027-01-10',
        sunday: {
          date: '2027-01-10',
          theme: 'Plantados juntó a la Palabra',
          reference: 'Salmo 1',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Salmo 1'] || '',
          bibleTextSource,
          introduction: 'La Palabra de Dios nos muestra dos caminos. Uno se deja formar por voces que alejan de Dios; el otro se deleita en la ley del Señor y da fruto a su tiempo. Esta semana afirmamos que un año fructífero comienza con raíces profundas en la Palabra.',
          mainTruth: 'El pueblo de Dios florece cuando se deleita y medita en la Palabra del Señor.'
        }
      },
      {
        title: 'Caminar en oración y paz',
        start: '2027-01-11',
        end: '2027-01-17',
        sunday: {
          date: '2027-01-17',
          theme: 'La paz de Dios guarda el corazón',
          reference: 'Filipenses 4:4-9',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Filipenses 4:4-9'] || '',
          bibleTextSource,
          introduction: 'La ansiedad puede acompanarnos al mirar responsabilidades, decisiones y cambios. Pero la iglesia aprende a llevar sus peticiones delante de Dios con gratitud. En Cristo, la paz de Dios guarda el corazón y la mente, y nos enseña a pensar y vivir de manera santa.',
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
          theme: 'Puestos los ojos en Jesús',
          reference: 'Hebreos 12:1-3',
          version: BIBLE_VERSION,
          bibleText: sundayTexts['Hebreos 12:1-3'] || '',
          bibleTextSource,
          introduction: 'El año nuevo también traerá cansancio, tentaciones y pruebas. Hebreos nos llama a correr con paciencia, dejando el pecado y mirando a Jesús. La perseverancia cristiana no nace del esfuerzo vacío, sino de contemplar al Autor y Consumador de la fe.',
          mainTruth: 'Perseveramos en la carrera cristiana mirando a Jesús, quien sostiene nuestra fe.'
        }
      }
    ]
  };

  months.push(november, december, january);

  const dailySeeds = [
    ['2026-08-01', 'Jesús, el centro de todo', 'Colosenses 1:15-20'],
    ['2026-08-02', 'Separados de mi nada pueden hacer', 'Juan 15:1-8'],
    ['2026-08-03', 'Muertos, pero Dios nos dio vida', 'Efesios 2:1-5'],
    ['2026-08-04', 'Salvos por gracia', 'Efesios 2:6-10'],
    ['2026-08-05', 'Justificados por la fe', 'Romanos 5:1-5'],
    ['2026-08-06', 'Redimidos por su sangre', 'Efesios 1:3-10'],
    ['2026-08-07', 'Ninguna condenación', 'Romanos 8:1-4'],
    ['2026-08-08', 'Adoptados como hijos', 'Romanos 8:14-17'],
    ['2026-08-09', 'Por gracia son salvos', 'Efesios 2:1-10'],
    ['2026-08-10', 'Vengan a mi', 'Mateo 11:25-30'],
    ['2026-08-11', 'Descansar en Dios', 'Salmo 62:1-8'],
    ['2026-08-12', 'No temas, yo estoy contigo', 'Isaías 41:8-13'],
    ['2026-08-13', 'Depositar las cargas', '1 Pedro 5:6-7'],
    ['2026-08-14', 'Paz en medio de la aflicción', 'Juan 16:31-33'],
    ['2026-08-15', 'El Señor renueva las fuerzas', 'Isaías 40:28-31'],
    ['2026-08-16', 'Descanso para el alma', 'Mateo 11:25-30'],
    ['2026-08-17', 'Jehová es mi pastor', 'Salmo 23'],
    ['2026-08-18', 'El buen Pastor da su vida', 'Juan 10:7-18'],
    ['2026-08-19', 'Dios guía con su consejo', 'Salmo 73:23-28'],
    ['2026-08-20', 'El Señor guarda tu salida y entrada', 'Salmo 121'],
    ['2026-08-21', 'El Pastor busca a la oveja perdida', 'Lucas 15:1-7'],
    ['2026-08-22', 'Cuidado bajo su poderosa mano', '1 Pedro 5:1-4'],
    ['2026-08-23', 'El Señor es mi Pastor', 'Salmo 23'],
    ['2026-08-24', 'Dios es por nosotros', 'Romanos 8:31-34'],
    ['2026-08-25', 'Nada nos separara', 'Romanos 8:35-39'],
    ['2026-08-26', 'Guardados por el poder de Dios', '1 Pedro 1:3-9'],
    ['2026-08-27', 'Fiel para completar su obra', 'Filipenses 1:3-11'],
    ['2026-08-28', 'El amor perfecto echa fuera el temor', '1 Juan 4:13-19'],
    ['2026-08-29', 'Seguros en la mano de Cristo', 'Juan 10:27-30'],
    ['2026-08-30', 'Mas que vencedores', 'Romanos 8:31-39'],
    ['2026-08-31', 'Preparados para escuchar', 'Hebreos 1:1-4'],
    ['2026-09-01', 'Dios habla', 'Genesis 1:1-5'],
    ['2026-09-02', 'La palabra de Dios permanece', 'Isaías 40:6-8'],
    ['2026-09-03', 'La Palabra es verdad', 'Juan 17:17'],
    ['2026-09-04', 'Escuchar con fe', 'Romanos 10:14-17'],
    ['2026-09-05', 'Guardar la Palabra', 'Salmo 119:9-11'],
    ['2026-09-06', 'Dios nos ha hablado por su Hijo', 'Hebreos 1:1-4'],
    ['2026-09-07', 'Meditar día y noche', 'Salmo 1:1-3'],
    ['2026-09-08', 'Lampara para mis pies', 'Salmo 119:105'],
    ['2026-09-09', 'Renovados en la mente', 'Romanos 12:1-2'],
    ['2026-09-10', 'La Palabra discierne el corazón', 'Hebreos 4:12-13'],
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
    ['2026-09-24', 'EnseÃ±ar y amonestar', 'Colosenses 3:16'],
    ['2026-09-25', 'Practicar la justicia', '1 Juan 3:16-18'],
    ['2026-09-26', 'Perseverar en la doctrina', 'Hechos 2:42-47'],
    ['2026-09-27', 'Obedecer la Palabra', 'Santiago 1:22-25'],
    ['2026-09-28', 'Continúa en lo aprendido', '2 Timoteo 3:14-15'],
    ['2026-09-29', 'Inspirada por Dios', '2 Timoteo 3:16-17'],
    ['2026-09-30', 'Reten la forma de las sanas palabras', '2 Timoteo 1:13-14'],
    ['2026-10-01', 'Buscar a Dios de todo corazón', 'Jeremías 29:11-13'],
    ['2026-10-02', 'El corazón que busca el rostro de Dios', 'Salmo 27:7-14'],
    ['2026-10-03', 'Orar delante del Padre', 'Mateo 6:5-8'],
    ['2026-10-04', 'Señor, enséñanos a orar', 'Mateo 6:9-13'],
    ['2026-10-05', 'Reconocer a Dios en todos los caminos', 'Proverbios 3:5-6'],
    ['2026-10-06', 'Presentar nuestras peticiones con gratitud', 'Filipenses 4:4-7'],
    ['2026-10-07', 'Echar nuestra ansiedad sobre Dios', '1 Pedro 5:6-7'],
    ['2026-10-08', 'Estar quietos delante de Dios', 'Salmo 46:1-11'],
    ['2026-10-09', 'No mi voluntad, sino la tuya', 'Mateo 26:36-46'],
    ['2026-10-10', 'Acercarnos al trono de la gracia', 'Hebreos 4:14-16'],
    ['2026-10-11', 'El Padre escucha a sus hijos', 'Lucas 11:1-13'],
    ['2026-10-12', 'Interceder con amor por el pueblo', 'Éxodo 32:7-14'],
    ['2026-10-13', 'No cesar de orar por otros', '1 Samuel 12:20-25'],
    ['2026-10-14', 'Orar para conocer mejor a Dios', 'Efesios 1:15-23'],
    ['2026-10-15', 'Orar por fortaleza espiritual', 'Efesios 3:14-21'],
    ['2026-10-16', 'Orar por crecimiento y fruto', 'Colosenses 1:9-14'],
    ['2026-10-17', 'Orar por todos', '1 Timoteo 2:1-6'],
    ['2026-10-18', 'La oración eficaz del justo', 'Santiago 5:13-18'],
    ['2026-10-19', 'Orar siempre y no desmayar', 'Lucas 18:1-8'],
    ['2026-10-20', 'Constantes en la oración', 'Romanos 12:9-12'],
    ['2026-10-21', 'Perseverar velando con acción de gracias', 'Colosenses 4:2-6'],
    ['2026-10-22', 'Orar sin cesar', '1 Tesalonicenses 5:16-18'],
    ['2026-10-23', 'Orar en medio de la espera', 'Salmo 13'],
    ['2026-10-24', 'Confiar aunque no veamos', 'Habacuc 3:17-19'],
    ['2026-10-25', 'Una iglesia que ora con valentía', 'Hechos 4:23-31'],
    ['2026-10-26', 'Rogar por obreros', 'Mateo 9:35-38'],
    ['2026-10-27', 'Unidos en oración', 'Hechos 1:12-14'],
    ['2026-10-28', 'Orar antes de enviar', 'Hechos 13:1-3'],
    ['2026-10-29', 'Orar para que corra la Palabra', '2 Tesalonicenses 3:1-5'],
    ['2026-10-30', 'Orar en el Espíritu', 'Judas 20-21'],
    ['2026-10-31', 'Las oraciones delante del Cordero', 'Apocalipsis 5:8-10'],
    ['2026-11-01', 'Heme aquí, envíame a mí', 'Isaías 6:1-8'],
    ['2026-11-02', 'Hacer discípulos de todas las naciones', 'Mateo 28:16-20'],
    ['2026-11-03', 'Predicar el evangelio', 'Marcos 16:15-16'],
    ['2026-11-04', 'Testigos de Cristo', 'Lucas 24:44-49'],
    ['2026-11-05', 'Enviados por el Señor', 'Juan 20:19-23'],
    ['2026-11-06', 'Recibir poder para testificar', 'Hechos 1:6-8'],
    ['2026-11-07', 'No avergonzarnos del evangelio', 'Romanos 1:14-17'],
    ['2026-11-08', 'Embajadores de Cristo', '2 Corintios 5:17-21'],
    ['2026-11-09', 'Una comunidad que persevera', 'Hechos 2:42-47'],
    ['2026-11-10', 'Presentar a todo hombre perfecto en Cristo', 'Colosenses 1:24-29'],
    ['2026-11-11', 'Encargar a otros fieles', '2 Timoteo 2:1-7'],
    ['2026-11-12', 'Enseñar sana doctrina', 'Tito 2:1-8'],
    ['2026-11-13', 'Estimularnos al amor y buenas obras', 'Hebreos 10:19-25'],
    ['2026-11-14', 'Servir con los dones recibidos', '1 Pedro 4:8-11'],
    ['2026-11-15', 'Edificar el cuerpo de Cristo', 'Efesios 4:11-16'],
    ['2026-11-16', 'Sal y luz', 'Mateo 5:13-16'],
    ['2026-11-17', 'Amar al prójimo', 'Lucas 10:25-37'],
    ['2026-11-18', 'Hacer bien a todos', 'Gálatas 6:7-10'],
    ['2026-11-19', 'Una fe que sirve', 'Santiago 2:14-18'],
    ['2026-11-20', 'Amar con hechos y verdad', '1 Juan 3:16-18'],
    ['2026-11-21', 'Buscar el bienestar de la ciudad', 'Jeremías 29:4-7'],
    ['2026-11-22', 'Servir con la mente de Cristo', 'Filipenses 2:1-11'],
    ['2026-11-23', 'Que las naciones conozcan a Dios', 'Salmo 67'],
    ['2026-11-24', 'Luz para las naciones', 'Isaías 49:5-6'],
    ['2026-11-25', 'Rogar por obreros', 'Mateo 9:35-38'],
    ['2026-11-26', 'Enviados por el Espíritu', 'Hechos 13:1-3'],
    ['2026-11-27', 'Hermosos son los pies de los que anuncian', 'Romanos 10:11-15'],
    ['2026-11-28', 'Una multitud de toda nación', 'Apocalipsis 7:9-12'],
    ['2026-11-29', 'La Palabra del Señor se difundia', 'Hechos 13:44-49'],
    ['2026-11-30', 'Firmes y constantes en la obra del Señor', '1 Corintios 15:58'],
    ['2026-12-01', 'La promesa de la simiente', 'Genesis 3:14-15'],
    ['2026-12-02', 'Bendicion para todas las familias', 'Genesis 12:1-3'],
    ['2026-12-03', 'Un niño nos es nacido', 'Isaías 9:1-7'],
    ['2026-12-04', 'El Renuevo justo', 'Jeremías 23:5-6'],
    ['2026-12-05', 'El Rey nacido en Belén', 'Miqueas 5:2-5'],
    ['2026-12-06', 'Nada es imposible para Dios', 'Lucas 1:26-38'],
    ['2026-12-07', 'El Dios que visita a su pueblo', 'Lucas 1:67-79'],
    ['2026-12-08', 'La luz en tinieblas', 'Isaías 60:1-3'],
    ['2026-12-09', 'El Hijo de David', 'Mateo 1:1-17'],
    ['2026-12-10', 'Dios con nosotros', 'Mateo 1:18-25'],
    ['2026-12-11', 'Preparar el camino', 'Lucas 3:1-6'],
    ['2026-12-12', 'El Cordero de Dios', 'Juan 1:29-34'],
    ['2026-12-13', 'Jesús salvará a su pueblo', 'Mateo 1:18-25'],
    ['2026-12-14', 'Buenas nuevas para los humildes', 'Lucas 2:8-14'],
    ['2026-12-15', 'Los pastores adoran', 'Lucas 2:15-20'],
    ['2026-12-16', 'Simeon espera la consolación', 'Lucas 2:25-35'],
    ['2026-12-17', 'Ana habla del Redentor', 'Lucas 2:36-38'],
    ['2026-12-18', 'La alegria del reino', 'Salmo 98'],
    ['2026-12-19', 'Venid, adoremos', 'Salmo 95:1-7'],
    ['2026-12-20', 'Ha nacido un Salvador', 'Lucas 2:1-20'],
    ['2026-12-21', 'En el principio era el Verbo', 'Juan 1:1-5'],
    ['2026-12-22', 'La luz verdadera', 'Juan 1:6-13'],
    ['2026-12-23', 'El Verbo fue hecho carne', 'Juan 1:14-18'],
    ['2026-12-24', 'Cristo vino en humildad', 'Filipenses 2:5-11'],
    ['2026-12-25', 'Dios envió a su Hijo', 'Gálatas 4:4-7'],
    ['2026-12-26', 'La gracia de Dios se manifestó', 'Tito 2:11-14'],
    ['2026-12-27', 'lleno de gracia y verdad', 'Juan 1:1-14'],
    ['2026-12-28', 'Mirar atrás con gratitud', 'Salmo 103:1-14'],
    ['2026-12-29', 'Confiar el camino al Señor', 'Proverbios 16:1-9'],
    ['2026-12-30', 'Olvidando lo que queda atrás', 'Filipenses 3:12-16'],
    ['2026-12-31', 'Yo hago nuevas todas las cosas', 'Apocalipsis 21:1-5'],
    ['2027-01-01', 'Buscar primero el reino', 'Mateo 6:25-34'],
    ['2027-01-02', 'Nueva criatura en Cristo', '2 Corintios 5:17'],
    ['2027-01-03', 'Cristo, nuestra vida', 'Colosenses 3:1-17'],
    ['2027-01-04', 'Meditar día y noche', 'Salmo 1'],
    ['2027-01-05', 'Lampara para mis pies', 'Salmo 119:105-112'],
    ['2027-01-06', 'La Palabra en el corazón', 'Salmo 119:9-16'],
    ['2027-01-07', 'Renovados en la mente', 'Romanos 12:1-2'],
    ['2027-01-08', 'Recibir la Palabra con mansedumbre', 'Santiago 1:19-25'],
    ['2027-01-09', 'Permanecer en Cristo', 'Juan 15:1-8'],
    ['2027-01-10', 'Plantados juntó a la Palabra', 'Salmo 1'],
    ['2027-01-11', 'Orar con confianza', 'Hebreos 4:14-16'],
    ['2027-01-12', 'Pedir sabiduría', 'Santiago 1:5-8'],
    ['2027-01-13', 'Echar la ansiedad sobre Dios', '1 Pedro 5:6-7'],
    ['2027-01-14', 'Paz en Cristo', 'Juan 14:25-27'],
    ['2027-01-15', 'Gratitud en toda circunstancia', '1 Tesalonicenses 5:16-18'],
    ['2027-01-16', 'Pensar en lo que edifica', 'Filipenses 4:8-9'],
    ['2027-01-17', 'La paz de Dios guarda el corazón', 'Filipenses 4:4-9'],
    ['2027-01-18', 'Un cuerpo en Cristo', 'Romanos 12:3-8'],
    ['2027-01-19', 'Amor sin fingimiento', 'Romanos 12:9-18'],
    ['2027-01-20', 'Sobrellevad las cargas', 'Gálatas 6:1-5'],
    ['2027-01-21', 'Perdonarnos como Cristo', 'Efesios 4:25-32'],
    ['2027-01-22', 'Servir con amor', '1 Pedro 4:8-11'],
    ['2027-01-23', 'Estimularnos al amor', 'Hebreos 10:19-25'],
    ['2027-01-24', 'Consideremonos unos a otros', 'Hebreos 10:19-25'],
    ['2027-01-25', 'Correr con paciencia', 'Hebreos 12:1-3'],
    ['2027-01-26', 'No cansarnos de hacer el bien', 'Gálatas 6:7-10'],
    ['2027-01-27', 'Fortalecidos en el Señor', 'Efesios 6:10-18'],
    ['2027-01-28', 'La buena obra que Dios comenzo', 'Filipenses 1:3-11'],
    ['2027-01-29', 'Fiel es el que prometió', 'Hebreos 10:23'],
    ['2027-01-30', 'Firmes hasta el fin', '1 Corintios 15:58'],
    ['2027-01-31', 'Puestos los ojos en Jesús', 'Hebreos 12:1-3']
  ];

  const approvedReadings = {
    '2026-08-01': {
      title: 'Jesús, el centro de todo',
      explanation: 'Colosenses presenta a Cristo como imagen del Dios invisible, Creador, sustentador y cabeza de la iglesia. Antes de comenzar cualquier plan espiritual, necesitamos recordar quién ocupa el centro. La vida cristiana no gira alrededor de nuestras metas, sino de la gloria de Jesús. Todo fue creado por Él y para Él, y solo en Él todas las cosas encuentran su verdadero lugar.',
      reflectionQuestion: 'Que area de tu vida necesita volver a tener a Cristo en el centro?',
      application: 'Comienza el mes nombrando una decision que quieres someter al señorío de Jesús.',
      prayer: 'Cristo, sé el centro de mi vida, mi iglesia y mis decisiones. Amén.',
      keywords: ['cristo', 'centro', 'colosenses', 'señorío']
    },
    '2026-08-02': {
      title: 'Separados de mi nada pueden hacer',
      explanation: 'Jesús se presenta como la vid verdadera y nos llama a permanecer en Él. La rama no produce fruto por esfuerzo propio, sino por su union con la vid. Así también, el discípulo no puede vivir una vida fructífera separado de Cristo. Permanecer en Jesús implica depender de su Palabra, buscar comunión con El y reconocer que todo fruto verdadero viene de su vida obrando en nosotros.',
      reflectionQuestion: 'Estás intentando producir fruto espiritual sin depender de Cristo?',
      application: 'Antes de tus tareas de hoy, ora reconociendo: Señor, sin ti nada puedo hacer.',
      prayer: 'Jesús, mantenme unido a ti y produce fruto que glorifique al Padre. Amén.',
      keywords: ['juan 15', 'permanecer', 'fruto', 'dependencia']
    },
    '2026-08-03': {
      title: 'Muertos, pero Dios nos dio vida',
      explanation: 'Efesios describe nuestra condicion sin Cristo con palabras serias: muertos en delitos y pecados. Pero la frase mas hermosa aparece con fuerza: pero Dios. El Señor interviene con misericordia y amor para dar vida juntamente con Cristo. La salvación comienza en la gracia de Dios, no en nuestra capacidad. Esto produce humildad, gratitud y adoración.',
      reflectionQuestion: 'Cómo cambia tu gratitud recordar de donde Dios te rescato?',
      application: 'Da gracias hoy por la misericordia de Dios que te dio vida en Cristo.',
      prayer: 'Dios rico en misericordia, gracias por darme vida cuando estaba muerto en pecado. Amén.',
      keywords: ['efesios 2', 'misericordia', 'vida', 'gracia']
    },
    '2026-08-04': {
      title: 'Salvos por gracia',
      explanation: 'La salvación es por gracia mediante la fe. No nace de nosotros ni de nuestras obras, para que nadie se glorien. Esta verdad humilla el orgullo y fortalece la seguridad. Si la salvación dependiera de nuestro rendimiento, nunca tendriamos paz. Pero Dios nos salva como regalo y luego nos crea en Cristo para buenas obras preparadas por El.',
      reflectionQuestion: 'Estas descansando en la gracia o tratando de ganarte el favor de Dios?',
      application: 'Sirve hoy desde gratitud, no desde culpa ni deseo de impresionar.',
      prayer: 'Padre, gracias por salvarme por gracia y prepararme para buenas obras. Amén.',
      keywords: ['gracia', 'fe', 'efesios 2', 'buenas obras']
    },
    '2026-08-05': {
      title: 'Justificados por la fe',
      explanation: 'Romanos nos anuncia paz con Dios por medio de nuestro Señor Jesucristo. La justificación no es solo sentirse mejor; es ser declarado justo delante de Dios por la obra de Cristo. Por eso el creyente puede vivir con esperanza aun en tribulación. La gracia nos coloca de pie y el amor de Dios es derramado en nuestros corazones.',
      reflectionQuestion: 'Que diferencia hace saber que tienes paz con Dios en Cristo?',
      application: 'Cuando venga culpa o temor, recuerda que tu paz con Dios descansa en Jesús.',
      prayer: 'Señor, gracias por justificarme por la fe y darme paz contigo. Amén.',
      keywords: ['justificación', 'paz', 'romanos 5', 'fe']
    },
    '2026-08-06': {
      title: 'Redimidos por su sangre',
      explanation: 'En Cristo tenemos redención por su sangre y perdón de pecados según las riquezas de la gracia. Dios no nos bendice de manera superficial; nos escoge, adopta, perdona y une todas las cosas bajo Cristo. La redención muestra el costo de nuestra salvación y la abundancia de la gracia divina.',
      reflectionQuestion: 'Como te mueve a adorar saber que fuiste redimido por Cristo?',
      application: 'Haz una pausa para alabar a Dios por una bendición espiritual en Cristo.',
      prayer: 'Padre, gracias por redimirme y perdonarme en tu Hijo amado. Amén.',
      keywords: ['redención', 'perdón', 'efesios 1', 'sangre']
    },
    '2026-08-07': {
      title: 'Ninguna condenación',
      explanation: 'Romanos 8 declara una verdad liberadora: ninguna condenación hay para los que están en Cristo Jesús. La ley del Espíritu de vida nos libra de la ley del pecado y de la muerte. Esto no produce indiferencia al pecado, sino gratitud y nueva obediencia. En Cristo, el creyente ya no vive bajo sentencia, sino bajo gracia.',
      reflectionQuestion: 'Que acusación necesitas responder con la verdad del evangelio?',
      application: 'Confiesa tu pecado y descansa en que Cristo llevo tu condenación.',
      prayer: 'Jesús, gracias porque en ti no hay condenación para mi. Amén.',
      keywords: ['romanos 8', 'condenación', 'libertad', 'gracia']
    },
    '2026-08-08': {
      title: 'Adoptados como hijos',
      explanation: 'El Espíritu da testimonio de que somos hijos de Dios. La salvación no solo cambia nuestro destino; cambia nuestra familia e identidad. Ya no vivimos como esclavos del temor, sino como hijos que claman: Abba, Padre. Esta adopción nos da seguridad, pertenencia y esperanza aun cuando pasamos por sufrimientos.',
      reflectionQuestion: 'Estas viviendo como hijo amado o como esclavo del temor?',
      application: 'Ora hoy llamando a Dios Padre, con confianza humilde.',
      prayer: 'Padre, gracias por adoptarme en Cristo y librarme del temor. Amén.',
      keywords: ['adopción', 'romanos 8', 'hijos', 'espiritu']
    },
    '2026-08-09': {
      title: 'Por gracia son salvos',
      explanation: 'Efesios 2 resume el evangelio con claridad: estabamos muertos, pero Dios nos dio vida; eramos incapaces, pero fuimos salvos por gracia; no teníamos obras que ofrecer, pero ahora somos creados para buenas obras. La gracia no solo nos rescata del pasado, también nos dirige hacia una vida nueva preparada por Dios.',
      reflectionQuestion: 'Que buena obra preparada por Dios puedes caminar esta semana?',
      application: 'Identifica una oportunidad concreta para servir como respuesta a la gracia.',
      prayer: 'Señor, que tu gracia me haga humilde, agradecido y dispuesto a servir. Amén.',
      keywords: ['salvación', 'gracia', 'efesios 2', 'servicio']
    },
    '2026-08-10': {
      title: 'Vengan a mi',
      explanation: 'Jesús no llama a los fuertes que pueden con todo, sino a los cansados y cargados. Su invitacion es personal: vengan a mi. El descanso que ofrece no es evadir responsabilidades, sino hallar alivio en su gracia, su mansedumbre y su señorío. El alma encuentra reposo cuando deja de cargar sola y aprende de Cristo.',
      reflectionQuestion: 'Que carga necesitas traer hoy a Jesús?',
      application: 'Nombra tu carga en oración y entregasela al Señor con confianza.',
      prayer: 'Jesús, vengo a ti con mis cargas. Dame descanso para mi alma. Amén.',
      keywords: ['descanso', 'mateo 11', 'cargas', 'jesus']
    },
    '2026-08-11': {
      title: 'Descansar en Dios',
      explanation: 'El Salmo 62 nos llama a esperar solamente en Dios, porque de Él viene la salvación y la esperanza. El alma encuentra reposo cuando deja de depender de estabilidad humana y se apoya en la roca firme del Señor. Podemos derramar delante de Él nuestro corazón porque Dios es refugio para su pueblo.',
      reflectionQuestion: 'En que estas buscando descanso fuera de Dios?',
      application: 'Derrama tu corazón delante del Señor en una oración honesta.',
      prayer: 'Dios, tu eres mi roca y refugio. Haz descansar mi alma en ti. Amén.',
      keywords: ['salmo 62', 'descanso', 'refugio', 'esperanza']
    },
    '2026-08-12': {
      title: 'No temas, yo estoy contigo',
      explanation: 'Isaías anuncia la presencia fiel de Dios a su pueblo: no temas, porque yo estoy contigo. La seguridad del creyente no nace de la ausencia de problemas, sino de la presencia del Señor que fortalece, ayuda y sostiene. En momentos de debilidad, Dios no solo da instrucciones; ofrece su mano poderosa.',
      reflectionQuestion: 'Que temor necesitas enfrentar recordando que Dios esta contigo?',
      application: 'Cuando sientas temor hoy, responde con una frase de fe: Dios me sostiene.',
      prayer: 'Señor, sostenme con tu diestra y libra mi corazón del temor. Amén.',
      keywords: ['no temas', 'isaias 41', 'presencia', 'fortaleza']
    },
    '2026-08-13': {
      title: 'Depositar las cargas',
      explanation: 'Pedro une humildad y confianza: humillense bajo la mano poderosa de Dios, echando toda ansiedad sobre El. Entregar cargas requiere reconocer que no somos soberanos. Dios cuida de nosotros con poder y ternura. La fe no niega las preocupaciones, pero se niega a cargarlas como si Dios estuviera ausente.',
      reflectionQuestion: 'Que ansiedad estas cargando sin entregarla al Padre?',
      application: 'Escribe una preocupacion y ora entregandola al cuidado de Dios.',
      prayer: 'Padre, echo mi ansiedad sobre ti porque tu tienes cuidado de mi. Amén.',
      keywords: ['ansiedad', '1 pedro', 'cuidado', 'humildad']
    },
    '2026-08-14': {
      title: 'Paz en medio de la aflicción',
      explanation: 'Jesús no promete una vida sin aflicción, pero si promete paz en Él. El mundo trae presion, dolor y oposición, pero Cristo ha vencido al mundo. La paz cristiana no depende de que todo este bajo control, sino de pertenecer al Victorioso. Podemos cobrar animo porque la victoria final ya pertenece a Jesús.',
      reflectionQuestion: 'Cómo cambia tu animo saber que Cristo ha vencido al mundo?',
      application: 'Entrega una aflicción a Jesús y recuerda su victoria antes de responder.',
      prayer: 'Jesús, dame tu paz y animo en medio de la aflicción. Amén.',
      keywords: ['paz', 'juan 16', 'aflicción', 'victoria']
    },
    '2026-08-15': {
      title: 'El Señor renueva las fuerzas',
      explanation: 'Isaías nos muestra al Dios eterno que no se cansa ni se fatiga. Nosotros si nos cansamos, pero los que esperan en Jehová reciben nuevas fuerzas. Esperar en Dios no es pasividad vacía; es confianza activa en su carácter. El Señor levanta al débil y sostiene al que reconoce su necesidad.',
      reflectionQuestion: 'Donde necesitas esperar en Dios en lugar de agotarte solo?',
      application: 'Haz una pausa hoy para orar antes de seguir empujando en tus fuerzas.',
      prayer: 'Dios eterno, renueva mis fuerzas mientras espero en ti. Amén.',
      keywords: ['isaias 40', 'fuerzas', 'esperar', 'debilidad']
    },
    '2026-08-16': {
      title: 'Descanso para el alma',
      explanation: 'Jesús ofrece descanso a los cansados, pero también nos invita a tomar su yugo y aprender de El. Su descanso no es independencia de su autoridad, sino caminar bajo su señorío bueno. Cristo es manso y humilde de corazón; por eso podemos venir sin fingir fortaleza y aprender a vivir desde su gracia.',
      reflectionQuestion: 'Estas dispuesto a aprender de la mansedumbre y humildad de Jesús?',
      application: 'Practica hoy una respuesta mansa donde normalmente responderias con dureza.',
      prayer: 'Jesús, enséñame tu mansedumbre y dame descanso verdadero. Amén.',
      keywords: ['mateo 11', 'descanso', 'mansedumbre', 'humildad']
    },
    '2026-08-17': {
      title: 'Jehová es mi pastor',
      explanation: 'El Salmo 23 comienza con una afirmación profundamente personal: Jehová es mi pastor. El creyente no esta abandonado a su propia sabiduría. Dios provee, guía, restaura y acompaña. Decir que nada me faltara no significa que tendremos todo lo que queremos, sino que el Pastor dará lo necesario para caminar con Él.',
      reflectionQuestion: 'En que area necesitas confiar mas en el cuidado del Pastor?',
      application: 'Repite durante el día: El Señor es mi Pastor; El sabe guiarme.',
      prayer: 'Pastor fiel, guía mi vida y restaura mi alma. Amén.',
      keywords: ['salmo 23', 'pastor', 'cuidado', 'guía']
    },
    '2026-08-18': {
      title: 'El buen Pastor da su vida',
      explanation: 'Jesús se presenta como el buen Pastor que da su vida por las ovejas. Su cuidado no es distante ni contratado; nace de amor sacrificial. El conoce a los suyos y los suyos le conocen. La seguridad del creyente descansa en un Pastor que no huye ante el peligro, sino que entrega su vida para salvar.',
      reflectionQuestion: 'Como te consuela saber que Jesús conoce y cuida a sus ovejas?',
      application: 'Descansa hoy en que Cristo no te cuida de lejos; te conoce por nombre.',
      prayer: 'Buen Pastor, gracias por dar tu vida y cuidar de los tuyos. Amén.',
      keywords: ['juan 10', 'buen pastor', 'sacrificio', 'ovejas']
    },
    '2026-08-19': {
      title: 'Dios guía con su consejo',
      explanation: 'El salmista reconoce que Dios le sostiene de la mano y le guía con su consejo. En medio de confusion, envidia o debilidad, la presencia de Dios es el bien supremo. La guía del Señor no es solo información para decisiones; es comunión con Aquel que es nuestra porcion para siempre.',
      reflectionQuestion: 'Buscas solo respuestas de Dios o también su presencia?',
      application: 'Pide guía para una decision, pero comienza adorando a Dios como tu porcion.',
      prayer: 'Señor, guíame con tu consejo y haz de ti mi mayor bien. Amén.',
      keywords: ['salmo 73', 'guía', 'presencia', 'porcion']
    },
    '2026-08-20': {
      title: 'El Señor guarda tu salida y entrada',
      explanation: 'El Salmo 121 dirige la mirada al Creador como nuestro guardador. Dios no duerme ni se descuida. Su cuidado abarca salida y entrada, presente y futuro. Esta promesa no elimina toda dificultad, pero asegura que nuestra vida esta bajo la vigilancia fiel del Señor.',
      reflectionQuestion: 'Que situacion necesitas confiar al Dios que no duerme?',
      application: 'Antes de salir o comenzar una tarea, encomienda tu camino al Señor.',
      prayer: 'Dios guardador, cuida mi vida y dirige mi camino. Amén.',
      keywords: ['salmo 121', 'proteccion', 'guardar', 'confianza']
    },
    '2026-08-21': {
      title: 'El Pastor busca a la oveja perdida',
      explanation: 'Jesús muestra el gozo del cielo cuando una oveja perdida es encontrada. El corazón de Dios no es indiferente ante el extraviado. El Pastor busca, carga y celebra. Esta lectura nos llama a recibir la gracia con humildad y a mirar a los perdidos con compasión, no con desprecio.',
      reflectionQuestion: 'A quién necesitas mirar con la compasión del Pastor?',
      application: 'Ora por una persona alejada y busca una forma sabia de acercarte con amor.',
      prayer: 'Señor, gracias por buscarme. Dame compasión por los que están lejos. Amén.',
      keywords: ['lucas 15', 'oveja perdida', 'compasión', 'gracia']
    },
    '2026-08-22': {
      title: 'Cuidado bajo su poderosa mano',
      explanation: 'Pedro llama a los líderes a pastorear con humildad y al pueblo a confiar en el Príncipe de los pastores. Toda autoridad en la iglesia debe reflejar el cuidado de Cristo. Nadie es dueno del rebanio; la iglesia pertenece al Señor. Esto nos llama a servir, cuidar y someternos a Cristo con humildad.',
      reflectionQuestion: 'Como puedes reflejar el cuidado de Cristo hacia otros?',
      application: 'Anima o cuida hoy a alguien de tu congregación de manera concreta.',
      prayer: 'Príncipe de los pastores, enséñanos a cuidar a tu pueblo con humildad. Amén.',
      keywords: ['1 pedro 5', 'pastores', 'humildad', 'cuidado']
    },
    '2026-08-23': {
      title: 'El Señor es mi Pastor',
      explanation: 'El Salmo 23 nos lleva desde pastos delicados hasta valles oscuros, y en todo lugar el Pastor esta presente. La confianza bíblica no depende de estar siempre en lugares fáciles. Podemos no temer mal alguno porque Dios está con nosotros. Su bondad y misericordia siguen al creyente todos los días.',
      reflectionQuestion: 'Que valle necesitas caminar recordando que Dios esta contigo?',
      application: 'Ora el Salmo 23 en primera persona, entregando tus temores al Pastor.',
      prayer: 'Jehová, mi Pastor, guía, restaura y acompaña mi vida. Amén.',
      keywords: ['salmo 23', 'pastor', 'valle', 'misericordia']
    },
    '2026-08-24': {
      title: 'Dios es por nosotros',
      explanation: 'Pablo pregunta: Si Dios es por nosotros, quien contra nosotros? Esta seguridad se basa en la entrega del Hijo. Si Dios no escatimo a Cristo, podemos confiar en su gracia para sostenernos. Las acusaciones pierden su fuerza cuando recordamos que Dios justifica a los suyos en Cristo.',
      reflectionQuestion: 'Que acusación o temor necesitas mirar a la luz de la cruz?',
      application: 'Responde hoy al temor con esta verdad: Dios es por mi en Cristo.',
      prayer: 'Padre, gracias porque en Cristo estas por nosotros. Amén.',
      keywords: ['romanos 8', 'seguridad', 'cruz', 'justificación']
    },
    '2026-08-25': {
      title: 'Nada nos separara',
      explanation: 'Romanos 8 no promete ausencia de tribulación, angustia o peligro. Promete algo mas firme: nada puede separarnos del amor de Cristo. El amor de Dios no es fragil ni dependiente de circunstancias. En medio de pruebas, el creyente puede descansar en una union segura con Cristo.',
      reflectionQuestion: 'Que circunstancia te ha hecho dudar del amor de Dios?',
      application: 'Lee Romanos 8:38-39 en voz alta y responde con adoración.',
      prayer: 'Señor, afirma mi corazón en tu amor inseparable. Amén.',
      keywords: ['amor de dios', 'romanos 8', 'seguridad', 'cristo']
    },
    '2026-08-26': {
      title: 'Guardados por el poder de Dios',
      explanation: 'Pedro bendice a Dios por una esperanza viva mediante la resurrección de Cristo. El creyente es guardado por el poder de Dios, aún en medio de pruebas que refinan la fe. Nuestra esperanza no es débil porque esta basada en una herencia incorruptible y en el Cristo resucitado.',
      reflectionQuestion: 'Como te sostiene saber que Dios guarda tu fe?',
      application: 'Da gracias por una prueba en la que Dios esta refinando tu confianza.',
      prayer: 'Dios, guárdame por tu poder y fortalece mi esperanza viva. Amén.',
      keywords: ['1 pedro 1', 'esperanza', 'resurrección', 'pruebas']
    },
    '2026-08-27': {
      title: 'Fiel para completar su obra',
      explanation: 'Pablo confia en que Dios completara la buena obra que comenzo. La vida cristiana no depende de arranques emocionales, sino de la fidelidad perseverante del Señor. Dios no abandona a los suyos a mitad del camino. Esto produce confianza humilde y nos anima a seguir creciendo en amor, discernimiento y fruto.',
      reflectionQuestion: 'Donde necesitas confiar en que Dios sigue obrando en ti?',
      application: 'Reconoce un area de crecimiento y pide a Dios que complete su obra.',
      prayer: 'Señor, completa en mi la obra que comenzaste por tu gracia. Amén.',
      keywords: ['filipenses 1', 'fidelidad', 'crecimiento', 'obra de dios']
    },
    '2026-08-28': {
      title: 'El amor perfecto echa fuera el temor',
      explanation: 'Juan enseña que conocemos el amor de Dios porque El nos amó primero. El amor perfecto echa fuera el temor, no porque ignore la santidad de Dios, sino porque descansa en la obra de Cristo. Quién ha recibido el amor de Dios aprende también a amar a otros con seguridad, gratitud y verdad.',
      reflectionQuestion: 'Que temor necesita ser confrontado por el amor de Dios?',
      application: 'Practica un acto de amor hacia alguien, recordando que Dios te amó primero.',
      prayer: 'Padre, afirma mi vida en tu amor y libra mi corazón del temor. Amén.',
      keywords: ['1 juan 4', 'amor', 'temor', 'seguridad']
    },
    '2026-08-29': {
      title: 'Seguros en la mano de Cristo',
      explanation: 'Jesús dice que sus ovejas oyen su voz, El las conoce y les da vida eterna. Nadie puede arrebatarlas de su mano. Esta seguridad no nos llama a descuido, sino a escuchar y seguir al Pastor con confianza. La mano de Cristo es mas fuerte que nuestras debilidades y temores.',
      reflectionQuestion: 'Estas escuchando y siguiendo la voz del Pastor?',
      application: 'Obedece hoy una instruccion clara de Cristo que ya conoces.',
      prayer: 'Jesús, gracias porque nadie puede arrebatarme de tu mano. Amén.',
      keywords: ['juan 10', 'seguridad', 'pastor', 'vida eterna']
    },
    '2026-08-30': {
      title: 'Mas que vencedores',
      explanation: 'Pablo no niega el sufrimiento, pero declara que en todas estas cosas somos más que vencedores por medio de Aquel que nos amó. La victoria cristiana no siempre se ve como comodidad; muchas veces se ve como fidelidad sostenida en medio de la prueba. El amor de Dios en Cristo es nuestra seguridad final.',
      reflectionQuestion: 'Como puedes vivir con esperanza en medio de una prueba actual?',
      application: 'Anima a alguien con la verdad de Romanos 8: nada nos separa del amor de Dios.',
      prayer: 'Cristo, gracias porque tu amor nos hace más que vencedores. Amén.',
      keywords: ['romanos 8', 'vencedores', 'amor', 'esperanza']
    },
    '2026-08-31': {
      title: 'Preparados para escuchar',
      explanation: 'Hebreos nos recuerda que Dios ha hablado de manera suprema por su Hijo. Después de mirar a Cristo como centro, gracia, descanso, Pastor y seguridad, estamos listos para entrar a septiembre con hambre por la Palabra. El Dios que salva también habla, y su pueblo responde escuchando con fe y obediencia.',
      reflectionQuestion: 'Como prepararas tu corazón para escuchar la Palabra de Dios este mes?',
      application: 'Escoge un horario y lugar para leer la Biblia durante septiembre.',
      prayer: 'Padre, abre mis oídos y mi corazón para escuchar a Cristo en tu Palabra. Amén.',
      keywords: ['hebreos 1', 'escuchar', 'palabra', 'preparacion']
    },
    '2026-09-01': {
      title: 'Dios habla',
      explanation: 'La Biblia comienza presentandonos a Dios como Creador y Rey. Antes de que exista orden, luz o vida, Dios habla. Su palabra no es débil ni incierta; cumple lo que manda. Esta lectura nos recuerda que la Palabra de Dios no nace de la opinion humana, sino del Dios vivo que gobierna todo. Si Dios crea por su palabra, también puede formar, corregir, sostener y renovar a su pueblo por esa misma Palabra.',
      reflectionQuestion: 'Que revela Genesis 1 sobre la autoridad de la Palabra de Dios?',
      application: 'Comienza hoy reconociendo que Dios tiene la primera palabra sobre tu vida, tus decisiones y tu manera de ver el mundo.',
      prayer: 'Señor, ayúdame a escuchar tu Palabra con reverencia. Que mi corazón descanse en tu autoridad y responda con obediencia. Amén.',
      keywords: ['creacion', 'autoridad', 'dios habla', 'genesis']
    },
    '2026-09-02': {
      title: 'La Palabra de Dios permanece',
      explanation: 'Todo lo humano es fragil. Nuestros planes, fuerzas y logros son temporales, pero la Palabra de Dios permanece. Isaías nos lleva a mirar más allá de lo pasajero y confiar en lo eterno. La iglesia necesita esta verdad porque vivimos rodeados de voces cambiantes, opiniones rapidas y promesas inseguras. La Palabra del Señor no envejece ni pierde poder. Lo que Dios ha dicho sigue siendo firme, confiable y suficiente para sostener la fe.',
      reflectionQuestion: 'En que areas has estado confiando mas en lo pasajero que en la Palabra permanente de Dios?',
      application: 'Memoriza o anota una verdad bíblica que necesites recordar cuando todo a tu alrededor cambie.',
      prayer: 'Dios eterno, afírmame en tu Palabra. Líbrame de depender de lo pasajero y enséñame a confiar en lo que permanece para siempre. Amén.',
      keywords: ['permanecer', 'isaias', 'confianza', 'eterno']
    },
    '2026-09-03': {
      title: 'La Palabra es verdad',
      explanation: 'Jesús ora al Padre y afirma que su Palabra es verdad. Esta declaración nos da seguridad: la verdad no depende de la cultura, de emociones cambiantes ni de preferencias personales. Dios mismo define la verdad y la entrega a su pueblo por medio de su Palabra. Ser santificados en la verdad significa que Dios usa las Escrituras para apartarnos, limpiarnos y formarnos para su gloria. La Palabra no solo informa; transforma.',
      reflectionQuestion: 'Que voz compite con la verdad de Dios en tu mente o en tu corazón?',
      application: 'Antes de tomar una decision hoy, preguntate: que dice la Palabra de Dios sobre esto?',
      prayer: 'Padre, santifícame en tu verdad. Que tu Palabra corrija mis pensamientos, ordene mis deseos y dirija mis pasos. Amén.',
      keywords: ['verdad', 'santificacion', 'juan', 'palabra']
    },
    '2026-09-04': {
      title: 'Escuchar con fe',
      explanation: 'La fe no surge de la nada. Dios ha establecido que su pueblo escuche el mensaje de Cristo y responda con confianza. Romanos nos recuerda la importancia de anunciar, oír y creer la Palabra. Esto debe despertar gratitud y responsabilidad. Gratitud, porque alguien nos anunció el evangelio. Responsabilidad, porque otros necesitan escuchar. La Palabra predicada y compartida sigue siendo el medio por el cual Dios llama personas a la fe en Cristo.',
      reflectionQuestion: 'A quién puedes animar esta semana compartiendo una verdad del evangelio?',
      application: 'Ora por una persona especifica y busca una oportunidad sencilla para hablarle de Cristo o invitarle a escuchar la Palabra.',
      prayer: 'Señor, gracias por permitirme escuchar el evangelio. Dame amor y valentía para compartir tu Palabra con otros. Amén.',
      keywords: ['fe', 'evangelio', 'romanos', 'predicación']
    },
    '2026-09-05': {
      title: 'Guardar la Palabra',
      explanation: 'El salmista no trata la Palabra como información distante, sino como tesoro guardado en el corazón. La santidad práctica comienza cuando la Palabra de Dios ocupa el centro de nuestros afectos, pensamientos y decisiones. Guardarla no significa solamente leerla, sino recibirla, recordarla y permitir que gobierne nuestra conducta. Una iglesia firme en la Palabra será una iglesia que aprende a amar lo que Dios ama y rechazar lo que Dios llama pecado.',
      reflectionQuestion: 'Que práctica puede ayudarte a guardar la Palabra en tu corazón esta semana?',
      application: 'Escoge un versiculo de la lectura, escribelo y vuelve a leerlo varias veces durante el día.',
      prayer: 'Señor, guarda mi vida por medio de tu Palabra. Que no solo la lea, sino que la atesore y la obedezca. Amén.',
      keywords: ['guardar', 'salmo 119', 'corazón', 'santidad']
    },
    '2026-09-06': {
      title: 'Dios nos ha hablado por su Hijo',
      explanation: 'Hebreos nos lleva al centro de la revelación de Dios: Jesucristo. Dios hablo de muchas maneras, pero su Palabra final y suprema se revela en el Hijo. Cristo no es simplemente otro mensajero; es el resplandor de la gloria de Dios y quien sostiene todas las cosas. Por eso, leer la Biblia correctamente nos conduce a adorarlo, confiar en su obra y obedecer su voz. La Palabra escrita nos dirige al Verbo vivo.',
      reflectionQuestion: 'Cómo cambia tu lectura bíblica al recordar que las Escrituras nos conducen a Cristo?',
      application: 'Participa hoy en la lectura congregacional escuchando con fe, reverencia y disposicion a obedecer a Cristo.',
      prayer: 'Padre, gracias por hablarnos en tu Hijo. Abre nuestros oídos para escuchar a Cristo y nuestros corazones para obedecerle. Amén.',
      keywords: ['hebreos', 'cristo', 'revelación', 'hijo']
    },
    '2026-10-01': {
      title: 'Buscar a Dios de todo corazón',
      explanation: 'La oración comienza con una invitacion: Dios llama a su pueblo a buscarle. Jeremías habla a personas que necesitaban esperanza en medio de una temporada dificil, y les recuerda que Dios no esta lejos de quienes le buscan con todo el corazón. Buscar a Dios no es usar la oración solo para recibir cosas; es volver el corazón al Señor, confiar en sus promesas y rendir nuestros caminos delante de Él.',
      reflectionQuestion: 'Estas buscando a Dios mismo o solo buscando lo que quieres que El resuelva?',
      application: 'Aparta hoy un momento sin distracciones para buscar a Dios con sinceridad, no solo para pedir, sino para rendirte a El.',
      prayer: 'Señor, enséñame a buscarte de todo corazón. Que mi oración nazca de confianza, humildad y deseo de caminar contigo. Amén.',
      keywords: ['oración', 'buscar a dios', 'jeremias', 'corazón']
    },
    '2026-10-02': {
      title: 'El corazón que busca el rostro de Dios',
      explanation: 'El salmista no solo pide ayuda; desea el rostro de Dios. Esta lectura nos recuerda que la oración bíblica es relacion antes que rutina. En medio de temores, espera y necesidad, el creyente aprende a decir: tu rostro buscare. Dios no llama a su pueblo a una fe fria, sino a una comunión viva donde el corazón descansa en su presencia, espera en su bondad y encuentra fortaleza para seguir.',
      reflectionQuestion: 'Que significa para ti buscar el rostro de Dios en medio de tus circunstancias actuales?',
      application: 'Convierte una preocupacion especifica en una oración que exprese confianza en la presencia y bondad de Dios.',
      prayer: 'Padre, quiero buscar tu rostro más que tus regalos. Fortalece mi corazón para esperar en ti con fe. Amén.',
      keywords: ['salmo 27', 'rostro de dios', 'esperar', 'confianza']
    },
    '2026-10-03': {
      title: 'Orar delante del Padre',
      explanation: 'Jesús corrige una forma de orar centrada en la apariencia. La oración no es teatro espiritual ni una manera de impresionar a otros. El Padre ve en secreto y conoce nuestras necesidades antes de que hablemos. Esto nos libra de la hipocresía y de las repeticiones vacías. Podemos acercarnos a Dios con sencillez, reverencia y confianza, sabiendo que somos escuchados por un Padre que conoce el corazón.',
      reflectionQuestion: 'Que motivaciones necesitas revisar cuando oras?',
      application: 'Ora hoy en privado con palabras sencillas y honestas, recordando que tu Padre te escucha.',
      prayer: 'Padre, limpia mis motivaciones. Ensename a orar con humildad, sinceridad y confianza delante de ti. Amén.',
      keywords: ['mateo 6', 'padre', 'secreto', 'sinceridad']
    },
    '2026-10-04': {
      title: 'Señor, enséñanos a orar',
      explanation: 'Jesús no solo manda a orar; también enseña como hacerlo. La oración modelo comienza con Dios: su nombre, su reino y su voluntad. Luego nos enseña a depender del Padre para el pan diario, el perdón, la santidad y la proteccion. Esta lectura ordena nuestros deseos y nos recuerda que la oración cristiana no gira alrededor de nuestro control, sino de la gloria de Dios y nuestra dependencia diaria de El.',
      reflectionQuestion: 'Cual peticion de la oración del Señor necesitas practicar con mas conciencia esta semana?',
      application: 'Ora lentamente usando las peticiones de Mateo 6:9-13 como guía para tu tiempo con Dios.',
      prayer: 'Padre nuestro, ordena mi corazón según tu reino y tu voluntad. Dame dependencia diaria, perdón y fortaleza para vivir para tu gloria. Amén.',
      keywords: ['padre nuestro', 'mateo 6', 'reino', 'voluntad']
    },
    '2026-11-01': {
      title: 'Heme aquí, envíame a mí',
      explanation: 'Isaías no comienza su llamado mirando la necesidad del mundo, sino contemplando la santidad de Dios. Antes de ser enviado, es quebrantado por su pecado y limpiado por gracia. La misión cristiana nace de esta misma verdad: Dios envía a personas que han sido alcanzadas por su misericordia. No servimos porque somos suficientes; servimos porque el Rey santo nos perdona, nos levanta y nos llama a participar en su obra.',
      reflectionQuestion: 'Como la santidad y la gracia de Dios preparan tu corazón para servir?',
      prayer: 'Señor santo, limpia mi corazón y hazme disponible para tu misión. Que mi servicio nazca de tu gracia y sea para tu gloria. Amén.',
      application: 'Presentate hoy delante de Dios con disponibilidad sincera: Señor, aquí estoy; usame donde tu quieras.',
      keywords: ['misión', 'envió', 'isaias', 'santidad', 'gracia']
    },
    '2026-11-02': {
      title: 'Hacer discípulos de todas las naciones',
      explanation: 'Jesús resucitado envía a su iglesia con una comisión clara: hacer discípulos. La misión no es simplemente llenar actividades religiosas, sino llamar personas a seguir a Cristo, bautizarlas y enseñarles a obedecer todo lo que Él mandó. Esta tarea descansa en la autoridad de Jesús y en su promesa de presencia continua. La iglesia va, enseña y discipula porque Cristo reina y está con su pueblo todos los días.',
      reflectionQuestion: 'A Quién estas ayudando, intencionalmente, a seguir y obedecer a Cristo?',
      application: 'Ora por una persona a quien puedas discipular, animar o invitar a caminar mas cerca de Jesús.',
      prayer: 'Cristo resucitado, gracias por tu autoridad y tu presencia. Ayudanos a hacer discípulos fieles para tu gloria. Amén.',
      keywords: ['gran comisión', 'discípulos', 'mateo 28', 'naciones']
    },
    '2026-11-03': {
      title: 'Predicar el evangelio',
      explanation: 'El evangelio es buena noticia que debe ser anunciada. La iglesia no existe para guardar el mensaje en privado, sino para proclamar a Cristo con fidelidad. Predicar el evangelio incluye hablar de la gracia de Dios, el pecado humano, la obra de Cristo y el llamado a responder con fe. Aunque no todos predican desde un pulpito, todo creyente puede dar testimonio de la esperanza que ha recibido en Jesús.',
      reflectionQuestion: 'Que te impide hablar con mas claridad del evangelio?',
      application: 'Resume el evangelio en tus propias palabras y preparate para compartirlo con alguien esta semana.',
      prayer: 'Señor, dame claridad, amor y valentía para anunciar el evangelio de Cristo sin vergüenza. Amén.',
      keywords: ['evangelio', 'predicar', 'marcos', 'testimonio']
    },
    '2026-11-04': {
      title: 'Testigos de Cristo',
      explanation: 'Jesús muestra que las Escrituras apuntan a su muerte y resurrección, y luego envía a sus discípulos como testigos. La misión cristiana no se basa en opiniones religiosas, sino en hechos: Cristo padecio, resucitó y ahora se proclama en su nombre arrepentimiento y perdón. Ser testigos significa anunciar lo que Dios ha hecho en Cristo y vivir como personas transformadas por esa verdad.',
      reflectionQuestion: 'Que aspecto de la obra de Cristo necesitas recordar con mas gratitud hoy?',
      application: 'Comparte con alguien una manera concreta en que Cristo ha traido perdón, esperanza o cambio a tu vida.',
      prayer: 'Jesús, hazme un testigo fiel de tu muerte, resurrección y perdón. Que mi vida apunte a ti. Amén.',
      keywords: ['testigos', 'lucas 24', 'resurrección', 'perdón']
    },
    '2026-11-05': {
      title: 'Enviados por el Señor',
      explanation: 'El Cristo resucitado se presenta a sus discípulos con paz y propósito. No solo calma sus temores; también los envía. La misión nace de la paz que Jesús da y de la autoridad con que Él comisiona. La iglesia no sale al mundo por iniciativa propia, sino como pueblo enviado por su Señor. Nuestra presencia en la comunidad debe reflejar el carácter, la verdad y la gracia de Aquel que nos envió.',
      reflectionQuestion: 'Cómo cambia tu manera de servir saber que Jesús mismo envía a su pueblo?',
      application: 'Piensa en tu trabajo, escuela, vecindario o familia como un lugar donde Cristo te ha enviado a representarlo.',
      prayer: 'Señor Jesús, gracias por tu paz. Enviame con humildad, amor y fidelidad para representarte donde me has puesto. Amén.',
      keywords: ['enviados', 'juan 20', 'paz', 'cristo resucitado']
    },
    '2026-11-06': {
      title: 'Recibir poder para testificar',
      explanation: 'Jesús promete poder para ser testigos. La misión de la iglesia no depende de carisma humano, estrategias perfectas o fuerza propia, sino del poder del Espíritu Santo. El alcance es amplio: cerca y lejos, en nuestra comunidad y hasta lo último de la tierra. Esta lectura nos recuerda que la iglesia debe depender del Espíritu mientras proclama a Cristo con fidelidad y esperanza.',
      reflectionQuestion: 'Estás intentando servir en tus fuerzas o dependiendo del Espíritu Santo?',
      application: 'Antes de servir o hablar de Cristo hoy, ora pidiendo al Espíritu Santo poder, sabiduría y amor.',
      prayer: 'Espíritu Santo, capacítanos para ser testigos fieles de Cristo en nuestra comunidad y hasta lo último de la tierra. Amén.',
      keywords: ['hechos 1', 'espiritu santo', 'testigos', 'poder']
    },
    '2026-11-07': {
      title: 'No avergonzarnos del evangelio',
      explanation: 'Pablo declara que no se averguenza del evangelio porque es poder de Dios para salvación. La iglesia necesita esta convicción. El evangelio puede parecer débil ante los valores del mundo, pero es el mensaje por el cual Dios salva. No anunciamos a Cristo porque sea popular, sino porque es verdadero y poderoso. Nuestra confianza no esta en nuestra habilidad, sino en el poder de Dios obrando por su Palabra.',
      reflectionQuestion: 'En que situaciones sientes tentación de callar o suavizar el evangelio?',
      application: 'Pide a Dios valentía para identificarte claramente con Cristo y su evangelio esta semana.',
      prayer: 'Padre, librame de avergonzarme del evangelio. Aumenta mi confianza en tu poder para salvar. Amén.',
      keywords: ['romanos 1', 'poder de dios', 'salvación', 'evangelio']
    },
    '2026-11-08': {
      title: 'Embajadores de Cristo',
      explanation: 'En Cristo somos nueva creacion y hemos sido reconciliados con Dios. Pero esa gracia no termina en nosotros: Dios nos confia el ministerio y la palabra de reconciliación. La iglesia representa a Cristo ante el mundo, llamando a otros a reconciliarse con Dios. Ser embajadores no es promover nuestra imagen, sino hablar y vivir de tal manera que Cristo sea anunciado con fidelidad, humildad y urgencia.',
      reflectionQuestion: 'Estas representando a Cristo con tus palabras, decisiones y relaciones?',
      application: 'Busca una oportunidad concreta para practicar reconciliación: pedir perdón, perdonar o invitar a alguien a mirar a Cristo.',
      prayer: 'Señor, gracias por reconciliarme contigo en Cristo. Hazme un embajador fiel de tu gracia y tu verdad. Amén.',
      keywords: ['embajadores', 'reconciliación', '2 corintios 5', 'nueva creacion']
    },
    '2026-11-09': {
      title: 'Una comunidad que persevera',
      explanation: 'La iglesia primitiva perseveraba en la doctrina, la comunión, el partimiento del pan y las oraciones. La misión no se sostiene con eventos aislados, sino con una comunidad formada por la Palabra y unida en Cristo. Cuando la iglesia vive el evangelio en comunión real, su testimonio se vuelve visible. Dios usa una iglesia fiel, sencilla y perseverante para mostrar al mundo la belleza de su gracia.',
      reflectionQuestion: 'En que práctica necesitas perseverar con mas fidelidad juntó a tu iglesia?',
      application: 'Participa esta semana en una acción concreta de comunión, servicio u oración con otros creyentes.',
      prayer: 'Señor, forma en nosotros una comunidad perseverante, generosa y fiel a tu Palabra. Amén.',
      keywords: ['iglesia', 'comunión', 'hechos 2', 'perseverancia']
    },
    '2026-11-10': {
      title: 'Presentar a todo hombre perfecto en Cristo',
      explanation: 'Pablo describe su ministerio como una labor enfocada en anunciar a Cristo, amonestar y enseñar para presentar a cada creyente maduro en Él. El discipulado no es entretenimiento religioso; es formación espiritual centrada en Cristo. La meta no es que las personas dependan de líderes, sino que crezcan en conocimiento, obediencia y madurez. Toda enseñanza fiel debe apuntar a Cristo como suficiente Salvador y Señor.',
      reflectionQuestion: 'Tu servicio ayuda a otros a depender mas de Cristo?',
      application: 'Ora por alguien especifico y busca animarle con una verdad bíblica que le ayude a crecer.',
      prayer: 'Cristo, que todo lo que enseñamos y hacemos lleve a otros a madurar en ti. Amén.',
      keywords: ['discipulado', 'madurez', 'colosenses', 'cristo']
    },
    '2026-11-11': {
      title: 'Encargar a otros fieles',
      explanation: 'El discipulado saludable piensa en generaciones. Pablo anima a Timoteo a confiar la verdad a personas fieles que también puedan enseñar a otros. La iglesia no debe guardar el ministerio en pocas manos; debe formar, acompanar y levantar obreros fieles. Esta visión requiere paciencia, confianza y responsabilidad. Lo que hemos recibido por gracia debe ser transmitido con fidelidad para que otros también sirvan a Cristo.',
      reflectionQuestion: 'A quién puedes ayudar a prepararse para servir con fidelidad?',
      application: 'Identifica una persona que puedas animar, entrenar o incluir en un area de servicio.',
      prayer: 'Señor, danos obreros fieles y corazones dispuestos a formar a otros para tu obra. Amén.',
      keywords: ['formación', 'obreros', '2 timoteo', 'fidelidad']
    },
    '2026-11-12': {
      title: 'Enseñar sana doctrina',
      explanation: 'La sana doctrina produce una vida sana. Tito recibe instrucciones para enseñar de manera que hombres, mujeres, jovenes y toda la comunidad vivan de acuerdo con el evangelio. La misión de la iglesia no separa verdad y conducta. Lo que creemos debe verse en la forma en que hablamos, servimos, amamos y perseveramos. Una iglesia que enseña bien también aprende a vivir bien delante de Dios y de los demás.',
      reflectionQuestion: 'Que verdad bíblica necesitas obedecer de manera mas visible?',
      application: 'Escoge una acción práctica que haga visible hoy lo que dices creer.',
      prayer: 'Padre, que nuestra doctrina sea sana y nuestra conducta honre el evangelio. Amén.',
      keywords: ['sana doctrina', 'tito', 'conducta', 'enseñanza']
    },
    '2026-11-13': {
      title: 'Estimularnos al amor y buenas obras',
      explanation: 'Hebreos nos llama a acercarnos a Dios, mantener firme la esperanza y considerarnos unos a otros para estimularnos al amor y a las buenas obras. La vida cristiana no fue diseñada para caminarse en soledad. Necesitamos una comunidad que anime, corrija y sostenga. Una iglesia en misión se congrega con propósito: adorar a Cristo y ayudarse mutuamente a vivir para su gloria.',
      reflectionQuestion: 'A quién puedes animar hoy a seguir firme en Cristo?',
      application: 'Envia un mensaje, haz una llamada o comparte una palabra bíblica de animo con alguien de tu iglesia.',
      prayer: 'Señor, úsanos para animar a otros al amor, la esperanza y las buenas obras. Amén.',
      keywords: ['comunidad', 'hebreos', 'buenas obras', 'esperanza']
    },
    '2026-11-14': {
      title: 'Servir con los dones recibidos',
      explanation: 'Pedro enseña que cada creyente ha recibido dones para ministrar a otros como buen administrador de la gracia de Dios. Los dones no son trofeos personales, sino herramientas de servicio. La iglesia crece cuando cada miembro usa lo que Dios le ha dado para bendecir al cuerpo. Servir con los dones recibidos exige amor, hospitalidad, humildad y dependencia de la fuerza que Dios provee.',
      reflectionQuestion: 'Que don o capacidad puedes usar para servir mejor esta semana?',
      application: 'Ofrece ayuda concreta en un ministerio, necesidad o persona donde puedas servir con gozo.',
      prayer: 'Dios de gracia, ayúdame a administrar fielmente lo que me has dado para servir a otros. Amén.',
      keywords: ['dones', 'servicio', '1 pedro', 'gracia']
    },
    '2026-11-15': {
      title: 'Edificar el cuerpo de Cristo',
      explanation: 'Cristo equipa a su iglesia para que el cuerpo crezca en madurez, verdad y amor. La meta no es solo tener mas actividad, sino parecernos mas a Cristo. Cada miembro tiene una parte en la edificación del cuerpo. Cuando hablamos la verdad en amor y servimos unidos bajo la cabeza que es Cristo, la iglesia se fortalece y puede cumplir su misión con mayor fidelidad.',
      reflectionQuestion: 'Estas contribuyendo a la unidad y madurez de tu iglesia?',
      application: 'Practica hoy hablar la verdad con amor en una conversacion importante.',
      prayer: 'Cristo, cabeza de la iglesia, edificanos en verdad, amor y madurez para servirte. Amén.',
      keywords: ['efesios 4', 'cuerpo de cristo', 'madurez', 'unidad']
    },
    '2026-11-16': {
      title: 'Sal y luz',
      explanation: 'Jesús llama a sus discípulos sal de la tierra y luz del mundo. La misión también se vive en la presencia cotidiana del creyente en su comunidad. La sal preserva y da sabor; la luz alumbra y dirige la mirada a Dios. Nuestras buenas obras no deben buscar aplauso personal, sino que otros glorifiquen al Padre. La vida de la iglesia debe hacer visible el carácter del reino.',
      reflectionQuestion: 'Que parte de tu vida necesita reflejar con mas claridad la luz de Cristo?',
      application: 'Haz una obra buena en secreto o con humildad, buscando que Dios sea glorificado.',
      prayer: 'Padre, haznos sal y luz en nuestra comunidad para que otros te glorifiquen. Amén.',
      keywords: ['sal', 'luz', 'mateo 5', 'testimonio']
    },
    '2026-11-17': {
      title: 'Amar al prójimo',
      explanation: 'La parábola del buen samaritano nos confronta con una pregunta práctica: Quién esta actuando como prójimo? Jesús muestra que el amor verdadero no se queda en teoría, sino que se acerca, se compadece y sirve. La misión local comienza cuando vemos a las personas no como interrupciones, sino como oportunidades para mostrar misericordia. Amar al prójimo refleja el corazón de Dios hacia nosotros.',
      reflectionQuestion: 'A quién te esta llamando Dios a mirar con misericordia?',
      application: 'Identifica una necesidad cercana y responde con una acción concreta de amor.',
      prayer: 'Señor, abre mis ojos para ver al prójimo y servir con compasión verdadera. Amén.',
      keywords: ['prójimo', 'misericordia', 'lucas 10', 'servicio']
    },
    '2026-11-18': {
      title: 'Hacer bien a todos',
      explanation: 'Gálatas nos recuerda que no debemos cansarnos de hacer el bien. La misión de la iglesia incluye sembrar con paciencia, aun cuando el fruto tarde en verse. Hacer bien a todos, especialmente a la familia de la fe, expresa una vida guiada por el Espíritu. El servicio cristiano requiere perseverancia porque se sostiene en la promesa de Dios, no en resultados inmediatos.',
      reflectionQuestion: 'Donde te has cansado de hacer el bien?',
      application: 'Continúa una obra buena que habias pensado abandonar, confiando en el tiempo de Dios.',
      prayer: 'Padre, dame perseverancia para sembrar el bien con fe y amor. Amén.',
      keywords: ['hacer bien', 'galatas', 'perseverancia', 'servicio']
    },
    '2026-11-19': {
      title: 'Una fe que sirve',
      explanation: 'Santiago enseña que una fe viva se expresa en obras. Las obras no compran la salvación, pero muestran que la fe es real. Si vemos necesidad y solo respondemos con palabras vacías, algo está mal. La misión de la iglesia debe unir proclamacion y compasión. Creemos en Cristo y por eso amamos, compartimos, servimos y respondemos a las necesidades con obediencia práctica.',
      reflectionQuestion: 'Tu fe se esta viendo en acciones concretas de amor?',
      application: 'Convierte una intencion buena en una acción concreta antes de terminar el día.',
      prayer: 'Señor, que mi fe sea viva, humilde y visible en obras de amor. Amén.',
      keywords: ['fe', 'obras', 'santiago', 'compasión']
    },
    '2026-11-20': {
      title: 'Amar con hechos y verdad',
      explanation: 'Juan nos llama a amar no solo de palabra, sino con hechos y en verdad. El amor cristiano se mide por el ejemplo de Cristo, quien puso su vida por nosotros. La iglesia no debe conformarse con discursos de compasión; debe practicar el amor sacrificial. Cuando el pueblo de Dios ama con hechos, el evangelio se vuelve tangible ante una comunidad que necesita ver la gracia de Cristo.',
      reflectionQuestion: 'Que diferencia hay entre decir que amas y amar con hechos?',
      application: 'Haz una acción especifica que demuestre amor sacrificial hacia alguien en necesidad.',
      prayer: 'Jesús, enséñame a amar como tu amas: con verdad, sacrificio y acción. Amén.',
      keywords: ['amor', 'hechos', '1 juan', 'sacrificio']
    },
    '2026-11-21': {
      title: 'Buscar el bienestar de la ciudad',
      explanation: 'Jeremías llama al pueblo en exilio a buscar el bienestar de la ciudad y orar por ella. Aunque el contexto era dificil, Dios queria que su pueblo viviera con responsabilidad y bendición en el lugar donde estaba. La iglesia también está llamada a orar por su comunidad, trabajar por su bien y dar testimonio de la esperanza de Dios en medio de la sociedad.',
      reflectionQuestion: 'Como puedes orar y trabajar por el bienestar de tu comunidad?',
      application: 'Ora hoy por tu barrio, pueblo o ciudad, y piensa en una manera concreta de servirle.',
      prayer: 'Señor, bendice nuestra comunidad y úsanos como instrumentos de paz, verdad y esperanza. Amén.',
      keywords: ['ciudad', 'jeremias', 'comunidad', 'oración']
    },
    '2026-11-22': {
      title: 'Servir con la mente de Cristo',
      explanation: 'Filipenses nos lleva al ejemplo supremo del servicio: Cristo se humillo y obedecio hasta la muerte de cruz. La misión cristiana no puede caminar con orgullo, competencia o vanagloria. Servimos con la mente de Cristo cuando miramos por los demás, preferimos la humildad y buscamos la gloria del Padre. Una iglesia que sirve como Cristo proclama el evangelio con su actitud y sus acciones.',
      reflectionQuestion: 'En que relacion necesitas practicar la humildad de Cristo?',
      application: 'Sirve hoy a alguien sin buscar reconocimiento, recordando la humildad de Jesús.',
      prayer: 'Señor Jesús, forma en nosotros tu mente humilde y obediente para servir con amor. Amén.',
      keywords: ['filipenses 2', 'humildad', 'servicio', 'cristo']
    },
    '2026-11-23': {
      title: 'Que las naciones conozcan a Dios',
      explanation: 'El Salmo 67 une bendición y misión. Dios bendice a su pueblo para que su camino sea conocido en la tierra y su salvación entre todas las naciones. La gracia recibida no debe encerrarse en nosotros. Cuando pedimos la bendición de Dios, también debemos desear que otros pueblos le conozcan, le alaben y se gocen en su justicia.',
      reflectionQuestion: 'Tus oraciones incluyen el deseo de que las naciones conozcan a Dios?',
      application: 'Ora por un país, misionero o comunidad que necesite escuchar el evangelio.',
      prayer: 'Dios, haz conocido tu camino en la tierra y tu salvación entre todas las naciones. Amén.',
      keywords: ['naciones', 'salmo 67', 'misión', 'bendición']
    },
    '2026-11-24': {
      title: 'Luz para las naciones',
      explanation: 'Isaías presenta el propósito de Dios de llevar salvación hasta lo último de la tierra. La misión no es una idea secundaria; esta en el corazón del plan de Dios. Cristo es la luz prometida, y su iglesia participa anunciando esa salvación. Esta verdad ensancha nuestra visión: Dios no solo esta obrando en nuestro circulo cercano, sino llamando pueblos a la luz de Cristo.',
      reflectionQuestion: 'Tu visión de la obra de Dios es local solamente o también global?',
      application: 'Lee o investiga una necesidad misionera y ora por puertas abiertas para el evangelio.',
      prayer: 'Señor, extiende la luz de Cristo hasta lo último de la tierra y usa nuestras vidas en tu misión. Amén.',
      keywords: ['isaias', 'luz', 'naciones', 'salvación']
    },
    '2026-11-25': {
      title: 'Rogar por obreros',
      explanation: 'Jesús ve a las multitudes con compasión y llama a sus discípulos a rogar al Señor de la mies que envíe obreros. La misión comienza con ver como Cristo ve. Las personas no son números, problemas o interrupciones; son ovejas necesitadas de pastor. La iglesia debe orar por mas obreros y estar dispuesta a ser parte de la respuesta de Dios a esa oración.',
      reflectionQuestion: 'Estas dispuesto a ser parte de la respuesta a la oración por obreros?',
      application: 'Ora por maestros, pastores, líderes, evangelistas y nuevos servidores en tu iglesia.',
      prayer: 'Señor de la mies, envía obreros fieles y danos compasión por las multitudes. Amén.',
      keywords: ['obreros', 'mateo 9', 'compasión', 'mies']
    },
    '2026-11-26': {
      title: 'Enviados por el Espíritu',
      explanation: 'En Hechos 13 la iglesia adora, ayuna y escucha la dirección del Espíritu Santo. La misión nace en una comunidad que busca a Dios y obedece su voz. Bernabé y Saulo son apartados y enviados, no por impulso humano, sino por dirección divina. Una iglesia misionera ora, discierne, confirma llamados y envía obreros con dependencia del Espíritu.',
      reflectionQuestion: 'Como puede tu iglesia discernir y apoyar mejor a quienes Dios llama a servir?',
      application: 'Ora por alguien que esté sirviendo o preparándose para servir en la obra del Señor.',
      prayer: 'Espíritu Santo, guía a tu iglesia, aparta obreros y envíanos en obediencia a Cristo. Amén.',
      keywords: ['hechos 13', 'espiritu santo', 'enviados', 'iglesia']
    },
    '2026-11-27': {
      title: 'Hermosos son los pies de los que anuncian',
      explanation: 'Romanos 10 muestra la necesidad de enviar, predicar, oír y creer. Nadie invoca a Cristo si no ha oído de El. Esta cadena nos recuerda que la misión requiere mensajeros. Dios se complace en usar personas comunes para llevar buenas nuevas. Cada iglesia debe valorar, apoyar y participar en la proclamacion del evangelio para que otros puedan escuchar y creer.',
      reflectionQuestion: 'Que parte puedes tomar en enviar, apoyar o anunciar el evangelio?',
      application: 'Apoya hoy la misión con oración, generosidad o una conversacion evangelistica.',
      prayer: 'Señor, levanta mensajeros fieles y haznos parte de tu obra de anunciar buenas nuevas. Amén.',
      keywords: ['romanos 10', 'anunciar', 'evangelio', 'enviar']
    },
    '2026-11-28': {
      title: 'Una multitud de toda nación',
      explanation: 'Apocalipsis nos muestra el final glorioso de la misión: una multitud de toda nación, tribu, pueblo y lengua adorando al Cordero. La obra misionera tiene esperanza porque Dios cumplirá su propósito. Cada esfuerzo fiel, cada oración, cada testimonio y cada envío participa en una historia que termina en adoración. La meta de la misión es que Cristo sea adorado por todos los pueblos.',
      reflectionQuestion: 'Como esta visión futura fortalece tu perseverancia en la misión?',
      application: 'Adora hoy a Cristo recordando que Él está reuniendo un pueblo de todas las naciones.',
      prayer: 'Cordero de Dios, recibe adoración de todos los pueblos. Usa nuestras vidas para tu gloria. Amén.',
      keywords: ['apocalipsis', 'naciones', 'adoración', 'cordero']
    },
    '2026-11-29': {
      title: 'La Palabra del Señor se difundia',
      explanation: 'En Hechos 13 vemos oposición, gozo y expansión de la Palabra. La misión nunca avanza sin resistencia, pero Dios abre puertas y llama a los que responden con fe. Los gentiles se gozaban y glorificaban la Palabra del Señor. Esta lectura anima a la iglesia a no desanimarse ante el rechazo, sino a seguir anunciando a Cristo con confianza en el poder de Dios.',
      reflectionQuestion: 'Como respondes cuando el evangelio es rechazado o resistido?',
      application: 'Ora por perseverancia y por puertas abiertas para que la Palabra del Señor siga difundiendose.',
      prayer: 'Señor, que tu Palabra corra, sea glorificada y produzca fruto en muchos corazones. Amén.',
      keywords: ['hechos 13', 'palabra', 'misión', 'perseverancia']
    },
    '2026-11-30': {
      title: 'Firmes y constantes en la obra del Señor',
      explanation: 'Pablo cierra su gran enseñanza sobre la resurrección llamando a la iglesia a estar firme y constante en la obra del Señor. La misión tiene sentido porque Cristo resucitó. Nuestro trabajo no es en vano cuando se hace en Él. Aunque a veces el fruto parezca lento, la resurrección garantiza esperanza. La iglesia puede servir con estabilidad, gozo y perseverancia porque Cristo vive y reina.',
      reflectionQuestion: 'Que te anima a permanecer firme cuando el servicio parece dificil?',
      application: 'Renueva hoy tu compromiso con una obra concreta del Señor, confiando en que no es en vano.',
      prayer: 'Cristo resucitado, afirma nuestro corazón y haznos constantes en tu obra. Amén.',
      keywords: ['1 corintios 15', 'resurrección', 'firmeza', 'obra del senor']
    },
    '2026-12-01': {
      title: 'La promesa de la simiente',
      explanation: 'Desde el comienzo, Dios anunció esperanza en medio de la caida. Genesis 3:15 apunta a la victoria final de la simiente prometida sobre el mal. Diciembre nos invita a mirar la Navidad no como una tradicion sentimental, sino como el cumplimiento de una promesa antigua. Cristo vino para enfrentar el pecado, vencer al enemigo y traer redención a un mundo quebrantado.',
      reflectionQuestion: 'Como te ayuda saber que Dios prometió redención desde el principio?',
      application: 'Comienza diciembre adorando a Cristo como el cumplimiento de la promesa de Dios.',
      prayer: 'Señor, gracias porque desde el principio preparaste salvación en Cristo. Amén.',
      keywords: ['promesa', 'genesis', 'redención', 'cristo']
    },
    '2026-12-02': {
      title: 'Bendicion para todas las familias',
      explanation: 'La promesa dada a Abraham no era pequena ni privada. Dios anunció que por medio de su descendencia serían benditas todas las familias de la tierra. Cristo es la respuesta final a esa promesa. En El, Dios trae bendición, perdón y esperanza a pueblos y naciones. La Navidad nos recuerda que el evangelio tiene alcance mundial y que la iglesia vive para anunciar esa bendición.',
      reflectionQuestion: 'Tu gratitud por Cristo te mueve a desear que otros también le conozcan?',
      application: 'Ora hoy por una familia o persona que necesita recibir la bendición del evangelio.',
      prayer: 'Dios fiel, bendice a las naciones por medio de Cristo y usa nuestra vida para anunciarlo. Amén.',
      keywords: ['abraham', 'bendición', 'naciones', 'evangelio']
    },
    '2026-12-03': {
      title: 'Un niño nos es nacido',
      explanation: 'Isaías anuncia luz para un pueblo que caminaba en tinieblas. el Hijo prometido llevaria nombres gloriosos: Admirable, Consejero, Dios fuerte, Padre eterno y Príncipe de paz. Esta promesa nos muestra que la esperanza de Dios no llega por poder humano, sino por el Rey dado por gracia. Jesús trae gobierno justo, paz verdadera y luz donde el pecado había dejado oscuridad.',
      reflectionQuestion: 'Que area de tu vida necesita la luz y paz del Príncipe de paz?',
      application: 'Entrega hoy una preocupacion a Cristo, recordando que su gobierno es bueno y fiel.',
      prayer: 'Príncipe de paz, gobierna mi corazón y trae tu luz a mi vida. Amén.',
      keywords: ['isaias 9', 'paz', 'rey', 'luz']
    },
    '2026-12-04': {
      title: 'El Renuevo justo',
      explanation: 'Jeremías anuncia un Rey justo de la casa de David. En tiempos de fracaso y corrupcion, Dios promete levantar a uno que reinará con justicia y salvación. Jesús es ese Renuevo justo. Su venida nos recuerda que Dios no abandona su pacto ni deja a su pueblo sin esperanza. La justicia que necesitamos no nace de nosotros; viene del Señor, nuestra justicia.',
      reflectionQuestion: 'Estas descansando en tu propia justicia o en la justicia de Cristo?',
      application: 'Confiesa a Dios tu necesidad de la justicia y salvación que solo Cristo puede dar.',
      prayer: 'Señor, tu eres nuestra justicia. Haznos descansar en Cristo y vivir para tu gloria. Amén.',
      keywords: ['jeremias', 'justicia', 'renuevo', 'david']
    },
    '2026-12-05': {
      title: 'El Rey nacido en Belén',
      explanation: 'Miqueas anuncia que de Belén saldria un gobernante para Israel, uno cuyos origenes son desde la antiguedad. Dios escoge un lugar pequeno para revelar una gloria inmensa. La Navidad nos enseña que el reino de Dios no sigue los patrones de grandeza humana. El Rey prometido viene con humildad, pero trae paz, pastoreo y autoridad para su pueblo.',
      reflectionQuestion: 'Como corrige Belén tu idea de grandeza y poder?',
      application: 'Busca hoy servir con humildad, recordando al Rey que vino de manera sencilla.',
      prayer: 'Rey Jesús, enséñame a valorar tu humildad y a confiar en tu gobierno. Amén.',
      keywords: ['belen', 'miqueas', 'rey', 'humildad']
    },
    '2026-12-06': {
      title: 'Nada es imposible para Dios',
      explanation: 'El anuncio a María revela que la venida de Cristo es obra de Dios de principio a fin. María recibe una promesa imposible desde la perspectiva humana, pero segura porque Dios la ha hablado. Su respuesta muestra fe humilde: hagase conforme a tu palabra. La iglesia también aprende a vivir confiando en la Palabra del Dios para quien nada es imposible.',
      reflectionQuestion: 'Que promesa de Dios necesitas creer con humildad hoy?',
      application: 'Responde a la Palabra de Dios con obediencia, aun cuando no entiendas todos los detalles.',
      prayer: 'Dios poderoso, aumenta mi fe y hazme obediente a tu Palabra. Amén.',
      keywords: ['lucas 1', 'maria', 'fe', 'promesa']
    },
    '2026-12-07': {
      title: 'El Dios que visita a su pueblo',
      explanation: 'Zacarias bendice a Dios porque ha visitado y redimido a su pueblo. La venida de Cristo no es una idea abstracta; es Dios acercandose para cumplir su pacto y traer salvación. La misericordia prometida se vuelve realidad. En Cristo, Dios rompe la oscuridad y dirige nuestros pies por camino de paz.',
      reflectionQuestion: 'Como has visto la misericordia de Dios visitando tu vida?',
      application: 'Haz una lista breve de razones para bendecir a Dios por su salvación.',
      prayer: 'Señor, gracias por visitarnos con misericordia y redención en Cristo. Amén.',
      keywords: ['zacararias', 'redención', 'misericordia', 'paz']
    },
    '2026-12-08': {
      title: 'La luz en tinieblas',
      explanation: 'Isaías llama al pueblo a levantarse porque la luz de Dios ha venido. La oscuridad no tiene la ultima palabra cuando el Señor manifiesta su gloria. Esta lectura nos prepara para contemplar a Cristo como la luz verdadera. En un mundo cansado y confundido, la iglesia no inventa esperanza; apunta a la luz que Dios ya ha dado en su Hijo.',
      reflectionQuestion: 'Donde necesitas caminar mas cerca de la luz de Cristo?',
      application: 'Rechaza hoy una obra de oscuridad y camina en una decision que honre a Cristo.',
      prayer: 'Señor, alumbra mi vida con tu gloria y hazme reflejar tu luz. Amén.',
      keywords: ['luz', 'isaias 60', 'gloria', 'esperanza']
    },
    '2026-12-09': {
      title: 'El Hijo de David',
      explanation: 'La genealogia de Mateo nos recuerda que Jesús entra en una historia real. Dios fue fiel a traves de generaciones, familias complicadas, reyes, exilio y espera. Jesús es el Hijo de David y el Hijo de Abraham, el cumplimiento de las promesas. Esta lista de nombres nos enseña que Dios trabaja con fidelidad aun cuando la historia parece lenta o desordenada.',
      reflectionQuestion: 'Como te anima saber que Dios obra fielmente a traves del tiempo?',
      application: 'Confia hoy una situacion lenta o incompleta a la fidelidad de Dios.',
      prayer: 'Dios fiel, gracias porque cumples tus promesas en Cristo. Amén.',
      keywords: ['genealogia', 'mateo 1', 'david', 'promesas']
    },
    '2026-12-10': {
      title: 'Dios con nosotros',
      explanation: 'Mateo anuncia que el nacimiento de Jesús cumple la promesa de Emmanuel: Dios con nosotros. Pero esta presencia viene con una misión clara: Jesús salvará a su pueblo de sus pecados. La Navidad no solo nos dice que Dios se acerca; nos dice por qué se acerca. Cristo viene a rescatar, perdonar y restaurar a pecadores por pura gracia.',
      reflectionQuestion: 'Que significa para ti que Dios este con nosotros para salvar?',
      application: 'Da gracias hoy por el perdón de Cristo y comparte esa esperanza con alguien.',
      prayer: 'Emmanuel, gracias por venir a salvarnos de nuestros pecados. Amén.',
      keywords: ['emmanuel', 'mateo 1', 'salvación', 'jesus']
    },
    '2026-12-11': {
      title: 'Preparar el camino',
      explanation: 'Juan el Bautista aparece llamando al pueblo al arrepentimiento y preparando el camino del Señor. La Navidad también nos llama a preparar el corazón. No basta celebrar externamente si seguimos resistiendo la voz de Dios. El Rey viene, y su pueblo responde enderezando caminos torcidos, confesando pecado y volviendo al Señor con sinceridad.',
      reflectionQuestion: 'Que camino torcido necesita ser enderezado delante de Dios?',
      application: 'Practica arrepentimiento concreto: confiesa, corrige y vuelve al Señor.',
      prayer: 'Señor, prepara mi corazón para recibirte con arrepentimiento y fe. Amén.',
      keywords: ['arrepentimiento', 'juan bautista', 'preparar', 'camino']
    },
    '2026-12-12': {
      title: 'El Cordero de Dios',
      explanation: 'Juan identifica a Jesús como el Cordero de Dios que quita el pecado del mundo. Esta declaración nos lleva al centro de la misión de Cristo. El niño nacido en Belén vino para ser el sacrificio perfecto por pecadores. La Navidad apunta hacia la cruz. Nuestro gozo es profundo porque Cristo no vino solo a acompanarnos, sino a quitar nuestra culpa.',
      reflectionQuestion: 'Estas mirando a Cristo como el unico que puede quitar tu pecado?',
      application: 'Confiesa tu pecado y descansa en el sacrificio suficiente de Jesús.',
      prayer: 'Cordero de Dios, gracias por quitar nuestro pecado y darnos paz con Dios. Amén.',
      keywords: ['cordero', 'juan 1', 'pecado', 'cruz']
    },
    '2026-12-13': {
      title: 'Jesús salvará a su pueblo',
      explanation: 'El nombre Jesús anuncia su obra: El salvará a su pueblo de sus pecados. Esta salvación es más profunda que resolver problemas temporales. Cristo viene a tratar la raiz de nuestra separacion de Dios. José obedece por fe, y nosotros somos llamados a recibir con reverencia al Salvador prometido. La Navidad es buena noticia porque Dios mismo provee salvación.',
      reflectionQuestion: 'De que necesitas ser rescatado por la gracia de Cristo?',
      application: 'Adora hoy a Jesús no solo como niño nacido, sino como Salvador suficiente.',
      prayer: 'Jesús, Salvador nuestro, libra nuestro corazón del pecado y haznos tuyos. Amén.',
      keywords: ['salvador', 'jesus', 'mateo 1', 'pecados']
    },
    '2026-12-14': {
      title: 'Buenas nuevas para los humildes',
      explanation: 'Los pastores reciben el anuncio celestial en medio de una noche ordinaria. Dios se complace en revelar su gloria a los humildes. Las buenas nuevas no son para una elite espiritual, sino para todo el pueblo. El Salvador ha nacido. Esta noticia rompe el temor y produce gozo, porque Cristo llega a personas comunes con gracia extraordinaria.',
      reflectionQuestion: 'Como recibes la buena noticia de Cristo: con rutina o con asombro?',
      application: 'Lee el anuncio de los angeles lentamente y responde con gratitud.',
      prayer: 'Señor, devuélveme el asombro y el gozo por las buenas nuevas de Cristo. Amén.',
      keywords: ['pastores', 'gozo', 'lucas 2', 'buenas nuevas']
    },
    '2026-12-15': {
      title: 'Los pastores adoran',
      explanation: 'Después de escuchar el anuncio, los pastores van, ven y cuentan lo que les fue dicho. La verdadera adoración no se queda inmovil; responde. Ellos vuelven glorificando y alabando a Dios. La Navidad nos invita a ese mismo movimiento: escuchar la Palabra, contemplar a Cristo, compartir la noticia y regresar a la vida diaria con alabanza.',
      reflectionQuestion: 'Tu adoración te mueve a contar lo que Dios ha hecho?',
      application: 'Comparte hoy con alguien una razón por la que Cristo es buena noticia.',
      prayer: 'Dios, haz que mi adoración se convierta en testimonio alegre. Amén.',
      keywords: ['adoración', 'pastores', 'testimonio', 'gloria']
    },
    '2026-12-16': {
      title: 'Simeon espera la consolación',
      explanation: 'Simeon esperaba la consolación de Israel, y el Espíritu le permite ver al Cristo del Señor. Su espera no fue vacía; estaba sostenida por la promesa de Dios. Al tomar al niño Jesús, Simeon reconoce salvación preparada para todos los pueblos. La fe aprende a esperar porque Dios cumple su Palabra en el tiempo correcto.',
      reflectionQuestion: 'Que espera necesitas entregar a la fidelidad de Dios?',
      application: 'Ora con paciencia por una promesa o necesidad que aun no ves cumplida.',
      prayer: 'Señor, enséñame a esperar con fe y a reconocer tu salvación en Cristo. Amén.',
      keywords: ['simeon', 'esperanza', 'consolación', 'salvación']
    },
    '2026-12-17': {
      title: 'Ana habla del Redentor',
      explanation: 'Ana perseveraba en adoración, ayuno y oración. Al ver a Jesús, da gracias y habla de Él a quienes esperaban redención. Su vida nos recuerda que la edad, la espera y el dolor no cancelan la utilidad espiritual. Quién ha visto la gracia de Dios en Cristo tiene razones para agradecer y hablar del Redentor.',
      reflectionQuestion: 'A quién puedes hablarle hoy del Redentor?',
      application: 'Da gracias por Cristo y comparte una palabra de esperanza con alguien que espera consuelo.',
      prayer: 'Señor, hazme perseverante en adoración y valiente para hablar de Cristo. Amén.',
      keywords: ['ana', 'redención', 'oración', 'testimonio']
    },
    '2026-12-18': {
      title: 'La alegria del reino',
      explanation: 'El Salmo 98 llama a cantar al Señor porque ha hecho maravillas y ha mostrado su salvación. La venida de Cristo es motivo de canto porque Dios ha recordado su misericordia y fidelidad. La creacion entera es invitada a celebrar al Rey. La alegria cristiana no ignora el dolor, pero mira al Señor que viene a juzgar con justicia y restaurar.',
      reflectionQuestion: 'Que maravilla de Dios necesitas celebrar hoy?',
      application: 'Canta, lee o comparte un salmo de alabanza como respuesta a la salvación de Dios.',
      prayer: 'Señor, llena mi boca de alabanza por tu salvación y fidelidad. Amén.',
      keywords: ['salmo 98', 'alegria', 'alabanza', 'reino']
    },
    '2026-12-19': {
      title: 'Venid, adoremos',
      explanation: 'El Salmo 95 nos llama a cantar, postrarnos y arrodillarnos delante del Señor nuestro Hacedor. La adoración no es solo emocion; es reconocimiento humilde de Quién es Dios. En Navidad, la iglesia no adora una idea tierna, sino al Rey y Pastor de su pueblo. Venimos con gozo porque somos ovejas de su mano.',
      reflectionQuestion: 'Tu adoración reconoce a Dios como Rey y Pastor?',
      application: 'Aparta un momento para adorar sin pedir nada, solo reconociendo la grandeza de Dios.',
      prayer: 'Señor, eres nuestro Hacedor y Pastor. Recibe nuestra adoración. Amén.',
      keywords: ['adoración', 'salmo 95', 'pastor', 'gozo']
    },
    '2026-12-20': {
      title: 'Ha nacido un Salvador',
      explanation: 'Lucas presenta el nacimiento de Jesús en humildad, pero rodeado de gloria celestial. El Salvador nace en un pesebre, y los angeles proclaman paz y gozo. Esta escena une sencillez y majestad. Cristo vino a lugares bajos para levantar a pecadores. La respuesta correcta es recibir la noticia, glorificar a Dios y vivir anunciando que el Salvador ha nacido.',
      reflectionQuestion: 'Como responde tu corazón al Salvador nacido por ti?',
      application: 'Haz de esta semana una oportunidad para adorar y anunciar a Cristo con claridad.',
      prayer: 'Cristo el Señor, gracias por venir como Salvador. Recibe gloria en nuestra vida. Amén.',
      keywords: ['nacimiento', 'salvador', 'lucas 2', 'gloria']
    },
    '2026-12-21': {
      title: 'En el principio era el Verbo',
      explanation: 'Juan comienza mirando más allá del pesebre: Jesús es el Verbo eterno, Dios mismo, por quien todas las cosas fueron hechas. La Navidad no comienza en Belén, sino en la eternidad del Hijo. El que vino a nosotros es Creador y vida. Esta verdad aumenta nuestra adoración: el niño nacido es el Señor eterno que sostiene todo.',
      reflectionQuestion: 'Cómo cambia tu adoración saber que Jesús es el Verbo eterno?',
      application: 'Adora a Cristo hoy como Creador, Sustentador y vida verdadera.',
      prayer: 'Verbo eterno, te adoramos como Dios verdadero y fuente de vida. Amén.',
      keywords: ['verbo', 'juan 1', 'eternidad', 'vida']
    },
    '2026-12-22': {
      title: 'La luz verdadera',
      explanation: 'Juan declara que la luz verdadera vino al mundo. Algunos le rechazaron, pero a quienes le recibieron les dio potestad de ser hechos hijos de Dios. La Navidad nos confronta con una respuesta: rechazar o recibir a Cristo. Recibirle no es solo admirar su historia, sino confiar en El y descansar en la gracia que nos hace hijos de Dios.',
      reflectionQuestion: 'Has recibido a Cristo con fe o solo lo conoces de lejos?',
      application: 'Renueva hoy tu confianza en Cristo como la luz verdadera.',
      prayer: 'Jesús, luz verdadera, hazme caminar como hijo de Dios por tu gracia. Amén.',
      keywords: ['luz', 'hijos de dios', 'juan 1', 'fe']
    },
    '2026-12-23': {
      title: 'El Verbo fue hecho carne',
      explanation: 'El Verbo eterno no solo visitó desde lejos; se hizo carne y habitó entre nosotros. En Jesús vemos la gloria del Padre llena de gracia y verdad. Dios se revela de manera personal, cercana y salvadora. La encarnación nos asegura que Dios conoce nuestra debilidad y ha venido a rescatarnos, no con distancia, sino entrando en nuestra historia.',
      reflectionQuestion: 'Qué te enseña la encarnación sobre la cercanía de Dios?',
      application: 'Acercate a Dios con confianza, recordando que Cristo vino llenó de gracia y verdad.',
      prayer: 'Padre, gracias por revelarnos tu gloria en Cristo, llenó de gracia y verdad. Amén.',
      keywords: ['encarnación', 'gracia', 'verdad', 'juan 1']
    },
    '2026-12-24': {
      title: 'Cristo vino en humildad',
      explanation: 'Filipenses nos muestra que el Hijo eterno se humillo tomando forma de siervo. La Navidad revela humildad divina: Cristo no vino aferrandose a privilegios, sino entregandose por obediencia hasta la cruz. Celebrar su venida debe formar en nosotros la misma mente: humildad, servicio y obediencia para la gloria del Padre.',
      reflectionQuestion: 'Que actitud de orgullo necesita ser rendida ante la humildad de Cristo?',
      application: 'Practica hoy un acto de servicio humilde en honor a Cristo.',
      prayer: 'Jesús humilde, forma en mi tu mente de servicio y obediencia. Amén.',
      keywords: ['humildad', 'filipenses 2', 'servicio', 'obediencia']
    },
    '2026-12-25': {
      title: 'Dios envió a su Hijo',
      explanation: 'Gálatas resume la Navidad con claridad: cuando vino el cumplimiento del tiempo, Dios envió a su Hijo para redimirnos y hacernos hijos. Cristo nace bajo la ley para rescatar a quienes estaban bajo condenación. El regalo de Navidad es adopción, libertad y comunión con el Padre por medio del Hijo y el Espíritu.',
      reflectionQuestion: 'Cómo cambia tu identidad saber que en Cristo eres hijo de Dios?',
      application: 'Celebra hoy la Navidad dando gracias por la redención y adopción en Cristo.',
      prayer: 'Padre, gracias por enviar a tu Hijo para redimirnos y hacernos tuyos. Amén.',
      keywords: ['navidad', 'galatas 4', 'adopción', 'redención']
    },
    '2026-12-26': {
      title: 'La gracia de Dios se manifestó',
      explanation: 'Tito declara que la gracia de Dios se manifestó para salvación y también nos enseña a vivir. La gracia no solo perdona; forma un pueblo celoso de buenas obras mientras espera la esperanza bienaventurada. Después de Navidad, no volvemos a la vida igual. La gracia manifestada en Cristo nos entrena para vivir con piedad, dominio propio y esperanza.',
      reflectionQuestion: 'Que esta enseñándote la gracia de Dios a cambiar?',
      application: 'Identifica una práctica que debes abandonar y una buena obra que debes abrazar.',
      prayer: 'Gracia de Dios, sálvame, enséñame y fórmame para vivir esperando a Cristo. Amén.',
      keywords: ['gracia', 'tito 2', 'esperanza', 'buenas obras']
    },
    '2026-12-27': {
      title: 'lleno de gracia y verdad',
      explanation: 'Juan nos invita a contemplar la gloria de Cristo, llenó de gracia y verdad. En Jesús no hay gracia sin verdad ni verdad sin gracia. El revela al Padre y trae vida a quienes estaban en tinieblas. Al mirar atrás a la semana de Navidad, somos llamados a permanecer maravillados ante el Hijo que vino a habitar entre nosotros.',
      reflectionQuestion: '¿Necesitas recibir hoy más profundamente la gracia o la verdad de Cristo?',
      application: 'Lee Juan 1:14 lentamente y responde con adoración personal.',
      prayer: 'Cristo, llenó de gracia y verdad, haznos vivir contemplando tu gloria. Amén.',
      keywords: ['juan 1', 'gracia', 'verdad', 'gloria']
    },
    '2026-12-28': {
      title: 'Mirar atrás con gratitud',
      explanation: 'El Salmo 103 llama al alma a bendecir al Señor y no olvidar sus beneficios. Al acercarnos al final del año, la gratitud nos ayuda a recordar perdón, misericordia, compasión y fidelidad. No todo habrá sido fácil, pero Dios ha sostenido a su pueblo. Mirar atrás con gratitud prepara el corazón para seguir adelante con confianza.',
      reflectionQuestion: 'Que beneficios de Dios no quieres olvidar al cerrar el año?',
      application: 'Escribe tres evidencias de la misericordia de Dios durante este año.',
      prayer: 'Bendice, alma mía, al Señor. Gracias por tu perdón y misericordia. Amén.',
      keywords: ['gratitud', 'salmo 103', 'misericordia', 'año']
    },
    '2026-12-29': {
      title: 'Confiar el camino al Señor',
      explanation: 'Proverbios nos recuerda que podemos hacer planes, pero el Señor dirige los pasos. Al pensar en un nuevo año, no necesitamos controlar cada detalle. La sabiduría consiste en encomendar nuestras obras a Dios, buscar su voluntad y caminar con humildad. Nuestros planes son pequeños; la fidelidad del Señor es grande.',
      reflectionQuestion: 'Que plan necesitas someter a la dirección de Dios?',
      application: 'Ora por tus planes del nuevo año y ríndelos conscientemente al Señor.',
      prayer: 'Señor, dirige mis pasos y ordena mis planes según tu voluntad. Amén.',
      keywords: ['planes', 'proverbios', 'confianza', 'dirección']
    },
    '2026-12-30': {
      title: 'Olvidando lo que queda atrás',
      explanation: 'Pablo no vive atrapado en logros pasados ni derrotas antiguas. Prosigue hacia la meta en Cristo. Cerrar el año requiere discernimiento: agradecer, aprender, arrepentirse y seguir adelante. La vida cristiana no se define por nostalgia ni culpa, sino por Cristo y su llamado. Seguimos corriendo porque El nos ha tomado por suyo.',
      reflectionQuestion: 'Que debes dejar atrás para proseguir hacia Cristo?',
      application: 'Entrega a Dios una carga del año y decide un paso concreto de obediencia.',
      prayer: 'Cristo, ayúdame a proseguir hacia ti con fe, humildad y perseverancia. Amén.',
      keywords: ['filipenses 3', 'meta', 'perseverancia', 'nuevo año']
    },
    '2026-12-31': {
      title: 'Yo hago nuevas todas las cosas',
      explanation: 'Apocalipsis 21 nos muestra una esperanza más grande que cualquier resolución de año nuevo. Dios hará nuevas todas las cosas, habitará con su pueblo y quitara toda lágrima. Esta promesa nos permite cerrar el año con esperanza firme. No sabemos todo lo que vendrá, pero sabemos hacia dónde va la historia: hacia la presencia plena de Dios con su pueblo.',
      reflectionQuestion: 'Como fortalece tu esperanza saber que Dios hará nuevas todas las cosas?',
      application: 'Cierra el año orando con esperanza y entregando el futuro al Dios que reina.',
      prayer: 'Dios eterno, gracias porque haces nuevas todas las cosas. Mi futuro descansa en ti. Amén.',
      keywords: ['apocalipsis 21', 'esperanza', 'nuevo año', 'renovación']
    },
    '2027-01-01': {
      title: 'Buscar primero el reino',
      explanation: 'Jesús nos llama a comenzar con prioridades eternas. La ansiedad nos empuja a vivir centrados en necesidades, planes y temores, pero el Padre conoce lo que necesitamos. Buscar primero el reino no significa ignorar responsabilidades, sino ordenar el corazón bajo el gobierno de Dios. Un nuevo año comienza bien cuando Cristo ocupa el primer lugar en deseos, decisiones y confianza.',
      reflectionQuestion: 'Que prioridad necesita rendirse al reino de Dios este año?',
      application: 'Escribe una decision práctica que muestre que Cristo será primero en tu agenda.',
      prayer: 'Padre, ordena mi corazón para buscar primero tu reino y tu justicia. Amén.',
      keywords: ['reino', 'prioridades', 'mateo 6', 'nuevo año']
    },
    '2027-01-02': {
      title: 'Nueva criatura en Cristo',
      explanation: 'El año nuevo puede inspirar cambios, pero solo Cristo hace nueva criatura. La renovación verdadera no nace de fuerza de voluntad, sino de la obra de Dios en el evangelio. En Cristo, lo viejo pierde su dominio y una nueva vida comienza. Esta verdad nos libra de depender de promesas fragiles y nos invita a caminar en la gracia transformadora de Dios.',
      reflectionQuestion: 'Que aspecto de tu identidad necesitas ver a la luz de Cristo?',
      application: 'Repite hoy esta verdad: en Cristo soy nueva criatura y vivo por su gracia.',
      prayer: 'Señor, gracias por hacerme nuevo en Cristo. Forma mi vida conforme a tu gracia. Amén.',
      keywords: ['nueva criatura', 'cristo', 'identidad', 'gracia']
    },
    '2027-01-03': {
      title: 'Cristo, nuestra vida',
      explanation: 'Colosenses nos llama a poner la mira en las cosas de arriba porque nuestra vida esta escondida con Cristo en Dios. La fe cristiana no es solo abandonar malos habitos; es vivir desde una nueva union con Cristo. Si El es nuestra vida, entonces nuestras palabras, relaciones, gratitud y obediencia deben llevar su nombre.',
      reflectionQuestion: 'Que significa para ti vivir hoy como alguien unido a Cristo?',
      application: 'Haz una tarea ordinaria en el nombre del Señor Jesús, con gratitud.',
      prayer: 'Cristo, tu eres mi vida. Renueva mis deseos, palabras y acciones. Amén.',
      keywords: ['colosenses 3', 'vida nueva', 'cristo', 'gratitud']
    },
    '2027-01-04': {
      title: 'Meditar día y noche',
      explanation: 'El Salmo 1 presenta al creyente como un arbol plantado juntó a aguas. Su fruto no nace de prisa, sino de deleitarse y meditar en la ley del Señor. Enero nos recuerda que la vida espiritual necesita raíces. La Palabra no debe ser visita ocasional, sino alimento constante que forma pensamientos, afectos y decisiones.',
      reflectionQuestion: 'Que ritmo de lectura bíblica necesitas cultivar este mes?',
      application: 'Aparta un horario fijo para leer y meditar en la Palabra durante esta semana.',
      prayer: 'Señor, planta mi vida en tu Palabra y produce fruto para tu gloria. Amén.',
      keywords: ['salmo 1', 'meditacion', 'palabra', 'fruto']
    },
    '2027-01-05': {
      title: 'Lampara para mis pies',
      explanation: 'La Palabra de Dios alumbra el camino paso a paso. No siempre nos muestra todos los detalles del futuro, pero si nos da luz suficiente para obedecer hoy. En un nuevo año llenó de decisiones, necesitamos más que intuicion; necesitamos la dirección del Señor. Su Palabra corrige, guía y sostiene al que desea caminar en fidelidad.',
      reflectionQuestion: 'Que decision necesitas someter a la luz de la Palabra?',
      application: 'Busca un principio bíblico que ilumine una decision concreta de esta semana.',
      prayer: 'Dios, guía mis pasos con tu Palabra y librame de caminar en mi propia sabiduría. Amén.',
      keywords: ['salmo 119', 'guía', 'palabra', 'obediencia']
    },
    '2027-01-06': {
      title: 'La Palabra en el corazón',
      explanation: 'Guardar la Palabra en el corazón es una defensa contra el pecado y una fuente de deleite en Dios. No se trata solo de leer información, sino de atesorar verdad. Cuando la Palabra habita en nosotros, moldea lo que amamos y rechazamos. Un corazón llenó de Escritura esta mejor preparado para discernir, resistir y obedecer.',
      reflectionQuestion: 'Que versiculo necesitas guardar en tu corazón esta semana?',
      application: 'Memoriza una frase de la lectura y repitela durante el día.',
      prayer: 'Señor, pon tu Palabra en mi corazón para vivir en santidad. Amén.',
      keywords: ['memorizacion', 'corazón', 'salmo 119', 'santidad']
    },
    '2027-01-07': {
      title: 'Renovados en la mente',
      explanation: 'Romanos 12 nos llama a no conformarnos a este siglo, sino a ser transformados por la renovación de la mente. La vida renovada comienza cuando Dios cambia nuestra manera de pensar. No podemos vivir para Cristo alimentando la mente solo con las voces del mundo. Necesitamos presentar toda la vida como sacrificio vivo y discernir la voluntad de Dios.',
      reflectionQuestion: 'Que pensamiento necesita ser renovado por la verdad de Dios?',
      application: 'Identifica una voz que te esta moldeando y reemplazala hoy con Escritura.',
      prayer: 'Padre, renueva mi mente para conocer y obedecer tu voluntad. Amén.',
      keywords: ['romanos 12', 'mente', 'transformacion', 'voluntad']
    },
    '2027-01-08': {
      title: 'Recibir la Palabra con mansedumbre',
      explanation: 'Santiago enseña que no basta oír la Palabra; debemos recibirla con mansedumbre y practicarla. La Biblia funciona como espejo que revela la condicion del corazón. El peligro es escuchar y olvidar. Dios llama a su pueblo a mirar atentamente su Palabra y responder con obediencia concreta. La bendición esta en hacer, no solo en saber.',
      reflectionQuestion: 'Que verdad has oído muchas veces pero necesitas practicar?',
      application: 'Convierte una enseñanza bíblica en una acción especifica antes de terminar el día.',
      prayer: 'Señor, hazme humilde para recibir tu Palabra y obedecerla. Amén.',
      keywords: ['santiago', 'obediencia', 'mansedumbre', 'hacedores']
    },
    '2027-01-09': {
      title: 'Permanecer en Cristo',
      explanation: 'Jesús usa la imagen de la vid y los pampanos para mostrar nuestra dependencia total de El. Separados de Cristo nada podemos hacer. La vida fructífera no nace de activismo religioso, sino de permanecer en comunión con el Señor. Enero es una buena oportunidad para revisar si estamos intentando producir fruto sin depender diariamente de Cristo.',
      reflectionQuestion: 'Que práctica te ayuda a permanecer en Cristo cada día?',
      application: 'Haz una pausa de oración antes de tus tareas, reconociendo tu dependencia de Jesús.',
      prayer: 'Jesús, mantenme unido a ti y produce fruto en mi vida. Amén.',
      keywords: ['juan 15', 'permanecer', 'fruto', 'dependencia']
    },
    '2027-01-10': {
      title: 'Plantados juntó a la Palabra',
      explanation: 'El arbol del Salmo 1 no se mueve con cada viento; está plantado. Así es la vida formada por la Palabra. Dios nos llama a echar raíces profundas, no a vivir de impulsos espirituales pasajeros. El fruto llega en su tiempo cuando el corazón se deleita en Dios y aprende a rechazar caminos que alejan de El.',
      reflectionQuestion: 'Estas plantado en la Palabra o movido por cada circunstancia?',
      application: 'Revisa tu semana y protege un espacio real para la Palabra de Dios.',
      prayer: 'Señor, plantame en tu Palabra y haz mi vida estable y fructífera. Amén.',
      keywords: ['salmo 1', 'raíces', 'estabilidad', 'palabra']
    },
    '2027-01-11': {
      title: 'Orar con confianza',
      explanation: 'Hebreos nos invita a acercarnos al trono de la gracia por medio de Cristo. No venimos confiando en meritos propios, sino en nuestro gran Sumo Sacerdote. La oración cristiana descansa en la obra de Jesús. Podemos acercarnos con libertad para hallar misericordia y gracia en el momento oportuno.',
      reflectionQuestion: 'Que necesidad debes llevar hoy al trono de la gracia?',
      application: 'Ora con confianza por una necesidad concreta, descansando en Cristo.',
      prayer: 'Padre, me acerco por medio de Cristo para recibir misericordia y gracia. Amén.',
      keywords: ['oración', 'hebreos 4', 'gracia', 'confianza']
    },
    '2027-01-12': {
      title: 'Pedir sabiduría',
      explanation: 'Santiago nos anima a pedir sabiduría a Dios, quien da abundantemente y sin reproche. La sabiduría bíblica no es solo inteligencia; es vivir delante de Dios con discernimiento, fe y obediencia. Al comenzar el año, necesitamos reconocer nuestra limitacion y pedir al Señor que guie decisiones, conversaciones y prioridades.',
      reflectionQuestion: 'En que situacion necesitas sabiduría de Dios ahora mismo?',
      application: 'Antes de decidir, ora específicamente pidiendo sabiduría y fe.',
      prayer: 'Dios generoso, dame sabiduría para caminar en tu voluntad. Amén.',
      keywords: ['sabiduría', 'santiago', 'decision', 'fe']
    },
    '2027-01-13': {
      title: 'Echar la ansiedad sobre Dios',
      explanation: 'Pedro nos llama a humillarnos bajo la mano poderosa de Dios y echar sobre El toda ansiedad, porque El tiene cuidado de nosotros. La ansiedad muchas veces revela nuestro deseo de controlar. La fe nos invita a entregar cargas al Padre. No porque todo sea fácil, sino porque Dios cuida de sus hijos con poder y ternura.',
      reflectionQuestion: 'Que ansiedad estas cargando como si dependiera solo de ti?',
      application: 'Nombra esa carga en oración y entregala conscientemente al cuidado de Dios.',
      prayer: 'Padre, echo mi ansiedad sobre ti porque tu tienes cuidado de mi. Amén.',
      keywords: ['ansiedad', '1 pedro', 'cuidado', 'humildad']
    },
    '2027-01-14': {
      title: 'Paz en Cristo',
      explanation: 'Jesús promete una paz distinta a la del mundo. No es una paz que depende de circunstancias perfectas, sino de su presencia, palabra y victoria. El corazón turbado encuentra descanso cuando recuerda que Cristo no abandona a los suyos. Esta paz nos sostiene aun cuando las responsabilidades del año parezcan grandes.',
      reflectionQuestion: 'Estas buscando paz en circunstancias o en Cristo?',
      application: 'Cuando sientas inquietud hoy, repite la promesa de paz de Jesús.',
      prayer: 'Jesús, guarda mi corazón en tu paz y librame del temor. Amén.',
      keywords: ['paz', 'juan 14', 'cristo', 'temor']
    },
    '2027-01-15': {
      title: 'Gratitud en toda circunstancia',
      explanation: 'Pablo llama a regocijarnos, orar sin cesar y dar gracias en todo. La gratitud cristiana no niega el dolor, pero reconoce la presencia y fidelidad de Dios en medio de todo. Un corazón agradecido resiste la queja y aprende a mirar la vida bajo la gracia de Dios. La gratitud también mantiene viva la adoración diaria.',
      reflectionQuestion: 'Que motivo de gratitud puedes reconocer aun en una situacion dificil?',
      application: 'Da gracias por tres evidencias de la fidelidad de Dios hoy.',
      prayer: 'Señor, enséñame a vivir con gozo, oración y gratitud. Amén.',
      keywords: ['gratitud', 'oración', 'gozo', '1 tesalonicenses']
    },
    '2027-01-16': {
      title: 'Pensar en lo que edifica',
      explanation: 'Filipenses 4 nos llama a dirigir la mente hacia lo verdadero, justo, puro, amable y digno de alabanza. Lo que contemplamos nos forma. La paz de Dios también se relaciona con una mente entrenada por la verdad. En un mundo llenó de ruido, el creyente aprende a escoger pensamientos que honran a Cristo y fortalecen la obediencia.',
      reflectionQuestion: 'Que pensamiento o contenido necesitas dejar de alimentar?',
      application: 'Reemplaza hoy una fuente de ruido con una verdad bíblica o un canto de adoración.',
      prayer: 'Dios de paz, ordena mis pensamientos hacia lo que te honra. Amén.',
      keywords: ['mente', 'filipenses 4', 'pureza', 'paz']
    },
    '2027-01-17': {
      title: 'La paz de Dios guarda el corazón',
      explanation: 'La paz de Dios guarda el corazón y la mente en Cristo cuando presentamos nuestras peticiones con gratitud. La oración no siempre cambia inmediatamente la circunstancia, pero cambia nuestra postura delante de Dios. El Señor cercano nos sostiene, dirige nuestros pensamientos y nos enseña a practicar lo que hemos recibido en su Palabra.',
      reflectionQuestion: 'Que peticion debes presentar hoy con gratitud?',
      application: 'Ora escribiendo una peticion y una acción de gracias relacionada con ella.',
      prayer: 'Señor, guarda mi corazón y mi mente con tu paz en Cristo Jesús. Amén.',
      keywords: ['paz de dios', 'filipenses 4', 'oración', 'gratitud']
    },
    '2027-01-18': {
      title: 'Un cuerpo en Cristo',
      explanation: 'Romanos 12 enseña que la iglesia es un cuerpo con muchos miembros y diferentes dones. Nadie lo tiene todo, y nadie es innecesario. La vida renovada incluye pensar de nosotros con humildad y usar lo recibido para servir. Dios edifica su iglesia cuando cada creyente participa fielmente según la gracia que ha recibido.',
      reflectionQuestion: 'Como puedes usar tu don para edificar a otros?',
      application: 'Identifica un area concreta donde puedas servir esta semana.',
      prayer: 'Señor, usame humildemente como parte del cuerpo de Cristo. Amén.',
      keywords: ['cuerpo', 'dones', 'romanos 12', 'servicio']
    },
    '2027-01-19': {
      title: 'Amor sin fingimiento',
      explanation: 'El amor cristiano debe ser sincero. Romanos 12 describe una vida marcada por honra, diligencia, paciencia, hospitalidad, bendición y paz. No es amor de apariencia, sino una manera completa de tratar a otros bajo la gracia de Cristo. La comunidad de fe se fortalece cuando el amor deja de ser discurso y se vuelve práctica diaria.',
      reflectionQuestion: 'Donde necesitas amar con mas sinceridad y menos apariencia?',
      application: 'Practica hoy una acción de honra o servicio hacia alguien.',
      prayer: 'Señor, purifica mi amor y hazlo sincero, paciente y servicial. Amén.',
      keywords: ['amor', 'romanos 12', 'comunidad', 'honra']
    },
    '2027-01-20': {
      title: 'Sobrellevad las cargas',
      explanation: 'Gálatas llama a restaurar con mansedumbre y sobrellevar las cargas unos de otros. La iglesia no es un lugar para esconder debilidades, sino una familia donde la gracia ayuda a levantar al caido. Esto exige humildad, cuidado y vigilancia del propio corazón. Caminar juntos significa cargar, restaurar y sembrar en el Espíritu.',
      reflectionQuestion: 'De quien puedes ayudar a llevar una carga esta semana?',
      application: 'Ofrece ayuda concreta a alguien que este cansado o necesitado.',
      prayer: 'Padre, danos mansedumbre para restaurar y amor para cargar unos con otros. Amén.',
      keywords: ['cargas', 'galatas 6', 'restauracion', 'mansedumbre']
    },
    '2027-01-21': {
      title: 'Perdonarnos como Cristo',
      explanation: 'Efesios nos llama a desechar palabras corruptas, amargura, enojo y malicia, y a vestirnos de benignidad y perdón. La razón es clara: Dios nos perdonó en Cristo. El perdón cristiano no minimiza el pecado, pero mira a la cruz como fundamento de una nueva manera de relacionarnos. La comunidad se sana cuando el evangelio gobierna nuestras respuestas.',
      reflectionQuestion: 'A quién necesitas perdonar o pedir perdón?',
      application: 'Da un paso humilde hacia reconciliación, según sea posible y sabio.',
      prayer: 'Señor, como me perdonaste en Cristo, enséñame a perdonar con gracia. Amén.',
      keywords: ['perdón', 'efesios 4', 'reconciliación', 'gracia']
    },
    '2027-01-22': {
      title: 'Servir con amor',
      explanation: 'Pedro enseña que el amor cubre multitud de pecados y que cada uno debe ministrar a otros según el don recibido. El servicio cristiano es administración de la gracia de Dios. No servimos para lucir, sino para que Dios sea glorificado por Jesucristo. Una iglesia saludable es una iglesia donde muchos sirven con amor practico.',
      reflectionQuestion: 'Tu servicio busca la gloria de Dios o reconocimiento personal?',
      application: 'Sirve hoy de manera sencilla y sin buscar aplausos.',
      prayer: 'Dios, que mi servicio administre tu gracia y te glorifique. Amén.',
      keywords: ['servicio', '1 pedro 4', 'amor', 'dones']
    },
    '2027-01-23': {
      title: 'Estimularnos al amor',
      explanation: 'Hebreos nos llama a considerarnos unos a otros para estimularnos al amor y a las buenas obras. Esto requiere atencion intencional. No basta coexistir en la iglesia; debemos pensar como animar a otros a seguir a Cristo. La comunidad se fortalece cuando cada creyente se convierte en instrumento de aliento, verdad y perseverancia.',
      reflectionQuestion: 'A quién puedes estimular al amor y buenas obras hoy?',
      application: 'Envia una palabra de animo bíblico a alguien de tu congregación.',
      prayer: 'Señor, usame para animar a otros a amar y obedecer. Amén.',
      keywords: ['hebreos 10', 'animo', 'buenas obras', 'iglesia']
    },
    '2027-01-24': {
      title: 'Consideremonos unos a otros',
      explanation: 'Por la sangre de Cristo tenemos acceso a Dios y una esperanza firme. Esa seguridad nos mueve hacia la comunidad, no hacia el aislamiento. Congregarnos, exhortarnos y cuidarnos unos a otros es parte de perseverar. La vida renovada reconoce que necesitamos hermanos y hermanas que nos ayuden a mirar a Cristo.',
      reflectionQuestion: 'Estas caminando la fe en comunidad o aislado?',
      application: 'Comprometete esta semana a congregarte y animar a alguien personalmente.',
      prayer: 'Cristo, gracias por acercarnos a Dios y unirnos como tu pueblo. Amén.',
      keywords: ['comunidad', 'hebreos 10', 'esperanza', 'congregación']
    },
    '2027-01-25': {
      title: 'Correr con paciencia',
      explanation: 'Hebreos compara la vida cristiana con una carrera. Para correr bien, debemos dejar pesos y pecado, y hacerlo con paciencia. No todo lo que pesa parece malo al principio, pero puede impedir obediencia. La perseverancia requiere enfoque, disciplina y esperanza. No corremos solos ni sin meta; corremos delante de Dios.',
      reflectionQuestion: 'Que peso debes dejar para correr con mayor fidelidad?',
      application: 'Identifica una distraccion que debes limitar para buscar mejor a Cristo.',
      prayer: 'Señor, ayúdame a dejar todo peso y correr con paciencia. Amén.',
      keywords: ['hebreos 12', 'perseverancia', 'carrera', 'disciplina']
    },
    '2027-01-26': {
      title: 'No cansarnos de hacer el bien',
      explanation: 'Gálatas nos anima a no cansarnos de hacer el bien, porque a su tiempo segaremos si no desmayamos. La obediencia fiel muchas veces parece lenta. Dios llama a su pueblo a sembrar en el Espíritu, confiar en su tiempo y servir aun cuando no vea resultados inmediatos. La perseverancia es una forma de fe.',
      reflectionQuestion: 'Donde necesitas seguir haciendo el bien aunque estes cansado?',
      application: 'Renueva una responsabilidad de servicio que has querido abandonar.',
      prayer: 'Padre, dame fuerzas para sembrar bien y esperar tu fruto. Amén.',
      keywords: ['galatas 6', 'hacer bien', 'perseverancia', 'fruto']
    },
    '2027-01-27': {
      title: 'Fortalecidos en el Señor',
      explanation: 'Efesios nos llama a fortalecernos en el Señor y en el poder de su fuerza. La vida cristiana enfrenta lucha espiritual real, por eso necesitamos la armadura de Dios. No resistimos con recursos humanos solamente, sino con verdad, justicia, fe, salvación, Palabra y oración. La fortaleza viene del Señor.',
      reflectionQuestion: 'En que area necesitas depender mas de la fuerza de Dios?',
      application: 'Ora usando las piezas de la armadura de Dios como guía.',
      prayer: 'Señor, fortaleceme en tu poder para permanecer firme. Amén.',
      keywords: ['armadura', 'efesios 6', 'fortaleza', 'oración']
    },
    '2027-01-28': {
      title: 'La buena obra que Dios comenzo',
      explanation: 'Pablo confia en que Dios completara la buena obra que comenzo en los creyentes. Nuestra esperanza de crecimiento no descansa en perfeccion personal, sino en la fidelidad de Dios. El mismo que salva también santifica. Esto nos anima a perseverar con humildad, sabiendo que Dios sigue obrando en nosotros para el día de Cristo.',
      reflectionQuestion: 'Como te anima saber que Dios sigue obrando en ti?',
      application: 'Agradece a Dios por un area donde has visto crecimiento, aunque sea pequeno.',
      prayer: 'Dios fiel, completa la buena obra que comenzaste en mí. Amén.',
      keywords: ['filipenses 1', 'crecimiento', 'fidelidad', 'santificacion']
    },
    '2027-01-29': {
      title: 'Fiel es el que prometió',
      explanation: 'Hebreos llama a mantener firme la profesión de nuestra esperanza porque fiel es el que prometió. La estabilidad cristiana no se basa en la fuerza de nuestra mano, sino en la fidelidad de Dios. Cuando las emociones fluctuan, sus promesas permanecen. Podemos confesar esperanza porque Dios no falla.',
      reflectionQuestion: 'Que promesa de Dios necesitas recordar para mantenerte firme?',
      application: 'Escribe Hebreos 10:23 y colocalo donde puedas verlo hoy.',
      prayer: 'Señor fiel, afirma mi esperanza en tus promesas. Amén.',
      keywords: ['fidelidad', 'hebreos 10', 'esperanza', 'promesa']
    },
    '2027-01-30': {
      title: 'Firmes hasta el fin',
      explanation: 'Pablo llama a estar firmes y constantes, creciendo en la obra del Señor, porque nuestro trabajo en El no es vano. Esta verdad conecta resurrección y servicio. Nada hecho para Cristo se pierde. Al terminar enero, somos animados a seguir sirviendo con estabilidad, gozo y esperanza, confiando en el Señor de la obra.',
      reflectionQuestion: 'Qué obra del Señor necesitas continuar con firmeza?',
      application: 'Anima a alguien que sirve fielmente y recuerdale que su trabajo no es en vano.',
      prayer: 'Cristo resucitado, haznos firmes y constantes en tu obra. Amén.',
      keywords: ['firmeza', '1 corintios 15', 'servicio', 'resurrección']
    },
    '2027-01-31': {
      title: 'Puestos los ojos en Jesús',
      explanation: 'Hebreos nos llama a mirar a Jesús, autor y consumador de la fe. El sufrió la cruz por el gozo puesto delante de Él y ahora esta sentado a la diestra de Dios. Mirar a Jesús nos guarda del cansancio espiritual. No perseveramos mirando solo nuestras fuerzas, sino contemplando al Salvador que completó la carrera y sostiene la nuestra.',
      reflectionQuestion: 'Que te ha estado distrayendo de mirar a Jesús?',
      application: 'Aparta un momento para contemplar a Cristo en oración antes de planificar la semana.',
      prayer: 'Jesús, autor y consumador de mi fe, sosten mi mirada en ti. Amén.',
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
      explanation: approvedReadings[date]?.explanation || 'PLACEHOLDER: Explicacion bíblica breve de 70 a 130 palabras. Este espacio será reemplazado por contenido pastoral revisado antes de publicarse como definitivo.',
      reflectionQuestion: approvedReadings[date]?.reflectionQuestion || 'PLACEHOLDER: Pregunta breve para meditar en el pasaje.',
      application: approvedReadings[date]?.application || 'PLACEHOLDER: Aplicacion práctica para vivir esta verdad hoy.',
      prayer: approvedReadings[date]?.prayer || 'Pendiente: Oración breve relacionada directamente con la lectura.',
      keywords: ['palabra', 'discipulado', 'prfwb', week.title.toLowerCase(), ...(approvedReadings[date]?.keywords || [])],
      sunday,
      sundayReading: sunday ? week.sunday : undefined
    };
  });

  window.enLaPalabraData = {
    version: 'RV1909-2027-01-rev4',
    months,
    readings
  };
})();
