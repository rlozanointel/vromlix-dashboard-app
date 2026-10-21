// =========================================================================
// VROMLIX OS - LIBRO DE MORMÓN: MNEMOTECNIA & GUÍA DE MINISTRACIÓN
// 15 Libros (Colapsados por defecto) • 239 Capítulos • 106 Pasajes Quirúrgicos
// =========================================================================

(function() {
    'use strict';

    const MINISTERIO_CATEGORIES = [
  {
    "id": "salud_mental",
    "icon": "🧠",
    "label": "Salud Mental",
    "desc": "Ansiedad, depresión, pánico, sobrecarga, soledad y desánimo"
  },
  {
    "id": "duelo_dolor",
    "icon": "🖤",
    "label": "Duelo & Pérdida",
    "desc": "Muerte de seres queridos, hijos, enfermedad física y consuelo eterno"
  },
  {
    "id": "culpa_perdon",
    "icon": "🕊️",
    "label": "Culpa & Perdón",
    "desc": "Arrepentimiento sincero, recaídas, vergüenza ante Dios y paz interior"
  },
  {
    "id": "relaciones_hogar",
    "icon": "🤝",
    "label": "Familia & Hogar",
    "desc": "Insultos, rencor, chismes de barrio, matrimonio en crisis e hijos rebeldes"
  },
  {
    "id": "fe_dudas",
    "icon": "💡",
    "label": "Fe & Dudas",
    "desc": "Dudas doctrinales/históricas, oraciones frías, falta de deseo y testimonio"
  },
  {
    "id": "habitos_ataduras",
    "icon": "🔗",
    "label": "Adicciones",
    "desc": "Pornografía, ataduras progresivas, falta de autocontrol y murallas de defensa"
  },
  {
    "id": "decisiones_futuro",
    "icon": "🧭",
    "label": "Decisiones",
    "desc": "Empleo, miedo al futuro, pagar diezmo en crisis, orientación y Liahona"
  },
  {
    "id": "convenios_capilla",
    "icon": "⛪",
    "label": "Convenios",
    "desc": "Significado real de la Santa Cena, congregarse, ayuno y perseverancia"
  }
];
    const MINISTERIO_TOPICS = [
  {
    "id": "ansiedad_panico",
    "category": "salud_mental",
    "title": "Ansiedad, angustia profunda o ataques de pánico",
    "keywords": [
      "ansiedad",
      "panico",
      "angustia",
      "miedo",
      "palpitaciones",
      "ahogo",
      "estres",
      "crisis nerviosa",
      "taquicardia"
    ],
    "scriptureRef": "Alma 7:11-13",
    "scriptureQuote": "Y él saldrá, sufriendo dolores, aflicciones y tentaciones de todas clases; y esto para que se cumpla la palabra que dice: Tomará sobre sí los dolores y las enfermedades de su pueblo... y tomará sobre sí sus flaquezas, a fin de que sus entrañas sean llenas de misericordia... para saber cómo socorrer a su pueblo según las flaquezas de ellos.",
    "pastoralInsight": "Recuérdale que el Salvador experimentó en Su propia carne y espíritu la sensación exacta de ahogo y angustia que siente hoy. No es una debilidad de fe, y Cristo sabe íntimamente cómo socorrerle.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/7?lang=spa&id=p11-p13#p11",
    "bookId": "alma",
    "chapterNum": 7,
    "shortTitle": "Ansiedad y Pánico"
  },
  {
    "id": "depresion_desanimo_salmo_nefi",
    "category": "salud_mental",
    "title": "Depresión profunda, tristeza continua y el llanto del alma",
    "keywords": [
      "depresion",
      "tristeza",
      "llanto",
      "bajon",
      "abatimiento",
      "desanimo",
      "desesperanza",
      "triste"
    ],
    "scriptureRef": "2 Nefi 4:16-19, 26-28",
    "scriptureQuote": "Mi corazón se apesadumbra a causa de mis aflicciones... ¡Oh, miserable hombre que soy!... ¿Por qué ha de quebrantarse mi corazón, y languidecer mi alma, y gemir en el valle del dolor?... ¡Despierta, alma mía! No te abatas más en el pecado. ¡Regocíjate, oh corazón mío, y no des más lugar al enemigo de mi alma!",
    "pastoralInsight": "Nefi, un profeta gigante, también experimentó días oscuros de llanto y abatimiento. La salida no es fingir estar bien, sino desahogar el alma y recordar en Quién hemos confiado.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/4?lang=spa&id=p16-p19,p26-p28#p16",
    "bookId": "2-ne",
    "chapterNum": 4,
    "shortTitle": "Depresión y Desánimo"
  },
  {
    "id": "cargas_pesadas_alivio",
    "category": "salud_mental",
    "title": "Sentirse abrumado y aplastado por las cargas de la vida",
    "keywords": [
      "cargas",
      "abrumado",
      "cansancio",
      "agotamiento",
      "opresion",
      "pesadez",
      "no puedo mas",
      "pesado"
    ],
    "scriptureRef": "Mosíah 24:14-15",
    "scriptureQuote": "Y también aliviaré las cargas que pongan sobre vuestros hombros, de manera que no las podréis sentir sobre vuestras espaldas... para que sepáis de seguro que yo, el Señor Dios, visito a mi pueblo en sus aflicciones. Y aconteció que las cargas que se imponían sobre Alma y sus hermanos fueron aliviadas; sí, el Señor los fortaleció de modo que pudieron soportar sus cargas con facilidad.",
    "pastoralInsight": "El Señor a veces no quita la prueba de inmediato, pero fortalece las espaldas de manera que la carga se vuelve ligera. Pregúntale: '¿Cómo podemos orar hoy para que sientas ese sostén?'",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/24?lang=spa&id=p14-p15#p14",
    "bookId": "mosiah",
    "chapterNum": 24,
    "shortTitle": "Cargas Pesadas"
  },
  {
    "id": "soledad_sensacion_abandono",
    "category": "salud_mental",
    "title": "Sentimiento desgarrador de soledad y abandono",
    "keywords": [
      "soledad",
      "solo",
      "aislado",
      "abandono",
      "nadie me quiere",
      "invisible",
      "olvidado"
    ],
    "scriptureRef": "1 Nefi 21:14-16",
    "scriptureQuote": "Pero Sión ha dicho: El Señor me ha desamparado, y mi Señor se ha olvidado de mí. ¿Puede una mujer olvidar a su niño de pecho, para dejar de compadecerse del hijo de su vientre? Pues aunque ellas olviden, yo no me olvidaré de ti. He aquí, en las palmas de mis manos te tengo grabado.",
    "pastoralInsight": "Dios jamás nos olvida. Las marcas de los clavos en las manos del Salvador son el recordatorio eterno de que tu nombre está grabado indeleblemente en Su corazón.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/21?lang=spa&id=p14-p16#p14",
    "bookId": "1-ne",
    "chapterNum": 21,
    "shortTitle": "Soledad y Abandono"
  },
  {
    "id": "agotamiento_burnout_prisa",
    "category": "salud_mental",
    "title": "Burnout espiritual y agotamiento: correr más rápido de las fuerzas",
    "keywords": [
      "burnout",
      "agotamiento",
      "fatiga",
      "no doy mas",
      "colapso",
      "exigencia",
      "perfeccionismo",
      "estres"
    ],
    "scriptureRef": "Mosíah 4:27",
    "scriptureQuote": "Y mirad que se hagan todas estas cosas con prudencia y orden; porque no se exige que un hombre corra más aprisa de lo que sus fuerzas le permiten. Y además, es conveniente que sea diligente, para que así gane el galardón.",
    "pastoralInsight": "El Evangelio no te pide que colapses por auto-exigencia. El Señor pide prudencia, ritmo sostenible y descanso mental. Validar su fatiga es el primer paso del consuelo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p27#p27",
    "bookId": "mosiah",
    "chapterNum": 4,
    "shortTitle": "Agotamiento / Burnout"
  },
  {
    "id": "miedo_futuro_terror",
    "category": "salud_mental",
    "title": "Miedo paralizante al futuro y a lo que vendrá",
    "keywords": [
      "miedo",
      "temor",
      "terror",
      "panico al futuro",
      "inseguridad",
      "incertidumbre",
      "preocupacion"
    ],
    "scriptureRef": "2 Nefi 22:2",
    "scriptureQuote": "He aquí, Dios es mi salvación; confiaré y no temeré, porque el Señor Jehová es mi fortaleza y mi cántico; él también ha llegado a ser mi salvación.",
    "pastoralInsight": "El miedo anticipa desgracias que el Señor promete disipar con Su presencia. Ayúdale a enfocar su energía solo en el día de hoy con la certeza de que Dios ya está en su mañana.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=spa&id=p2#p2",
    "bookId": "2-ne",
    "chapterNum": 22,
    "shortTitle": "Miedo al Futuro"
  },
  {
    "id": "perdida_deseo_vivir",
    "category": "salud_mental",
    "title": "Pérdida del deseo de vivir / Desesperanza existencial",
    "keywords": [
      "deseo de morir",
      "no quiero vivir",
      "suicidio",
      "desesperanza",
      "tormento",
      "oscuridad",
      "vacio",
      "suicidio",
      "suicida",
      "quitarse la vida",
      "no quiero vivir",
      "morir"
    ],
    "scriptureRef": "Alma 36:18-20",
    "scriptureQuote": "¡Oh Jesús, Hijo de Dios, ten misericordia de mí!... Y cuando pensé en esto, ya no me pude acordar más de mis dolores... ¡Y oh qué gozo, y qué luz tan maravillosa fue la que vi! Sí, mi alma se llenó de un gozo tan profundo como lo había sido mi dolor.",
    "pastoralInsight": "Cuando el dolor es desgarrador, una sola súplica al nombre de Jesucristo puede ser el inicio del rescate. Escucha sin juzgar, ofrece apoyo profesional médico de inmediato y acompáñale con amor incondicional.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p18-p20#p18",
    "bookId": "alma",
    "chapterNum": 36,
    "shortTitle": "Suicidio y Desesperanza"
  },
  {
    "id": "autoestima_inutil_desprecio",
    "category": "salud_mental",
    "title": "Sentirse inútil, indigno o con baja autoestima personal",
    "keywords": [
      "autoestima",
      "inutil",
      "no valgo nada",
      "rechazo a mi mismo",
      "desprecio",
      "complejo",
      "fracasado"
    ],
    "scriptureRef": "2 Nefi 4:34-35",
    "scriptureQuote": "¡Oh Señor, en ti he confiado, y en ti confiaré para siempre! No pondré mi confianza en el brazo de la carne... Sí, clamaré a ti, mi Dios, roca de mi justicia. He aquí, mi voz ascenderá para siempre a ti, mi roca y mi Dios eterno.",
    "pastoralInsight": "Tu valor no se mide por tus debilidades ni por la opinión humana, sino por el precio infinito que el Salvador pagó por ti en Getsemaní.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/4?lang=spa&id=p34-p35#p34",
    "bookId": "2-ne",
    "chapterNum": 4,
    "shortTitle": "Baja Autoestima"
  },
  {
    "id": "ira_interna_refrenar_pasiones",
    "category": "salud_mental",
    "title": "Ira desbordada, frustración y enojo que amarga el corazón",
    "keywords": [
      "ira",
      "enojo",
      "rabia",
      "coraje",
      "furia",
      "rencor",
      "frustracion",
      "odio"
    ],
    "scriptureRef": "Alma 38:12",
    "scriptureQuote": "Usa de moderación en todas las cosas; procura también refrenar todas tus pasiones para que estés lleno de amor; procura evitar la ociosidad.",
    "pastoralInsight": "Alma le enseñó a su hijo que 'refrenar' las pasiones como a un caballo no es reprimirse enfermizamente, sino encauzar la energía para que el corazón pueda llenarse de amor y paz.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p12#p12",
    "bookId": "alma",
    "chapterNum": 38,
    "shortTitle": "Ira y Enojo"
  },
  {
    "id": "tristeza_rechazo_vilipendios",
    "category": "salud_mental",
    "title": "Tristeza y dolor por el rechazo social, burlas o calumnias",
    "keywords": [
      "rechazo",
      "burlas",
      "bullying",
      "calumnias",
      "vilipendios",
      "oprobio",
      "desprecio social"
    ],
    "scriptureRef": "2 Nefi 8:7",
    "scriptureQuote": "Escuchadme, los que conocéis la rectitud, pueblo en cuyo corazón he puesto mi ley: No temáis el oprobio de los hombres, ni tengáis miedo de sus vilipendios.",
    "pastoralInsight": "El dolor del rechazo duele en lo profundo, pero el Señor nos pide que no dejemos que las opiniones humanas definan nuestra paz. Dios aprueba tu caminar honesto.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/8?lang=spa&id=p7#p7",
    "bookId": "2-ne",
    "chapterNum": 8,
    "shortTitle": "Rechazo y Burlas"
  },
  {
    "id": "paz_conciencia_gozo",
    "category": "salud_mental",
    "title": "Recuperar la paz de conciencia y la tranquilidad interior",
    "keywords": [
      "paz",
      "tranquilidad",
      "serenidad",
      "conciencia limpia",
      "calma",
      "sosiego",
      "armonia"
    ],
    "scriptureRef": "Mosíah 4:3",
    "scriptureQuote": "Y aconteció que después de haber pronunciado estas palabras, el Espíritu del Señor vino sobre ellos, y fueron llenos de gozo, habiendo recibido la remisión de sus pecados y teniendo paz de conciencia a causa de la gran fe que tenían en Jesucristo.",
    "pastoralInsight": "La paz de conciencia no es ausencia de problemas externos, sino la dulce calma espiritual que Jesucristo entrega al corazón cuando descansamos en Su misericordia.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p3#p3",
    "bookId": "mosiah",
    "chapterNum": 4,
    "shortTitle": "Paz de Conciencia"
  },
  {
    "id": "confianza_sostenido_dificultad",
    "category": "salud_mental",
    "title": "Fortaleza cuando sientes que ya no puedes soportar otra prueba",
    "keywords": [
      "no puedo mas",
      "resistencia",
      "sostener",
      "fortaleza",
      "tribulaciones",
      "dificultades",
      "aguante"
    ],
    "scriptureRef": "Alma 36:3",
    "scriptureQuote": "Quienquiera que ponga su confianza en Dios será sostenido en sus tribulaciones, y sus dificultades y aflicciones, y será enaltecido en el postrer día.",
    "pastoralInsight": "No necesitas tener todas las respuestas hoy ni resolver el mes completo; solo poner tu confianza en Dios para dar el siguiente paso de fe. Él te sostiene.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p3#p3",
    "bookId": "alma",
    "chapterNum": 36,
    "shortTitle": "Sostén en Aflicción"
  },
  {
    "id": "debilidad_humildad_eter",
    "category": "salud_mental",
    "title": "Frustración por debilidades personales constantes",
    "keywords": [
      "debilidad",
      "imperfeccion",
      "limitacion",
      "torpeza",
      "defectos",
      "humildad",
      "debil"
    ],
    "scriptureRef": "Éter 12:27",
    "scriptureQuote": "Doy a los hombres debilidad para que sean humildes; y basta mi gracia a todos los hombres que se humillan ante mí; porque si se humillan ante mí, y tienen fe en mí, entonces haré que las cosas débiles sean fuertes para ellos.",
    "pastoralInsight": "La debilidad no es tu enemiga: es el taller donde Dios forja tu humildad. Su gracia es suficiente para suplir exactamente lo que te falta.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12?lang=spa&id=p27#p27",
    "bookId": "ether",
    "chapterNum": 12,
    "shortTitle": "Debilidad Personal"
  },
  {
    "id": "gozo_proposito_vida",
    "category": "salud_mental",
    "title": "Recordar el propósito de la existencia: los hombres existen para tener gozo",
    "keywords": [
      "gozo",
      "felicidad",
      "proposito",
      "sentido",
      "para que vivo",
      "existencia",
      "alegria"
    ],
    "scriptureRef": "2 Nefi 2:25",
    "scriptureQuote": "Adán cayó para que los hombres existiesen, y existen los hombres para que tengan gozo.",
    "pastoralInsight": "Dios no diseñó esta vida para que vivamos en miseria o culpa constante; el objetivo supremo del Plan de Salvación es el gozo verdadero en Cristo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2?lang=spa&id=p25#p25",
    "bookId": "2-ne",
    "chapterNum": 2,
    "shortTitle": "El Propósito: Gozo"
  },
  {
    "id": "desesperacion_pruebas_fe",
    "category": "salud_mental",
    "title": "Cuando sientes que tus oraciones se estrellan contra el techo",
    "keywords": [
      "desesperacion",
      "cielo de bronce",
      "dios no responde",
      "silencio de dios",
      "oracion sin respuesta"
    ],
    "scriptureRef": "Alma 31:31-33",
    "scriptureQuote": "¡Oh Señor, da consuelo a mi alma en Cristo!... ¡Da fortaleza a mi alma para que sufra con paciencia estas aflicciones que han de venir sobre mí a causa de la iniquidad de este pueblo!... ¡Concédeles que tengan éxito, sí, para que de nuevo te traigamos a nuestros hermanos en Cristo!",
    "pastoralInsight": "Incluso profetas como Alma oraron en medio de lágrimas y dolor agudo pidiendo consuelo para su propia alma. El silencio temporal de Dios no es ausencia, es preparación de Su respuesta.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/31?lang=spa&id=p31-p33#p31",
    "bookId": "alma",
    "chapterNum": 31,
    "shortTitle": "Oración en el Dolor"
  },
  {
    "id": "muerte_hijo_pequeno",
    "category": "duelo_dolor",
    "title": "Muerte desgarradora de un niño pequeño, bebé o hijo",
    "keywords": [
      "muerte de un hijo",
      "bebe",
      "nino fallecido",
      "muerte infantil",
      "duelo maternal",
      "luto hijo"
    ],
    "scriptureRef": "Moroni 8:12, 17, 22",
    "scriptureQuote": "Los niños pequeños no pueden pecar... viven en Cristo aun desde la fundación del mundo... Todos los niños pequeños viven en Cristo, y también todos aquellos que están sin ley. Porque el poder de la redención surte efecto en todos los que no tienen ley.",
    "pastoralInsight": "Los niños pequeños son puros y van directo a la presencia del Padre por los méritos de Cristo. Su salvación es completa y la promesa del sellamiento eterno les devolverá a sus brazos.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/8?lang=spa&id=p12,p17,p22#p12",
    "bookId": "moro",
    "chapterNum": 8,
    "shortTitle": "Muerte de un Hijo"
  },
  {
    "id": "fallecimiento_conyuge_padres",
    "category": "duelo_dolor",
    "title": "Fallecimiento de cónyuge, padre, madre o ser querido íntimo",
    "keywords": [
      "muerte conyuge",
      "fallecio mi esposo",
      "murio mi madre",
      "padre fallecido",
      "luto",
      "viudez",
      "paraiso"
    ],
    "scriptureRef": "Alma 40:11-12",
    "scriptureQuote": "El espíritu de todos los hombres, luego que se separa de este cuerpo mortal... es llevado de regreso a ese Dios que les dio la vida... los espíritus de los que son justos son recibidos en un estado de felicidad que se llama paraíso: un estado de descanso, un estado de paz, donde descansarán de todos sus afanes, y de todo cuidado y pesar.",
    "pastoralInsight": "Tu ser querido no ha dejado de existir; ha entrado en un estado de descanso absoluto donde no hay dolor, enfermedad ni angustia terrenal, a la espera del abrazo glorioso de la resurrección.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/40?lang=spa&id=p11-p12#p11",
    "bookId": "alma",
    "chapterNum": 40,
    "shortTitle": "Luto Conyugal / Padres"
  },
  {
    "id": "tragedia_repentina_luto",
    "category": "duelo_dolor",
    "title": "Tragedia inesperada o pérdida repentina de un familiar",
    "keywords": [
      "accidente",
      "muerte repentina",
      "tragedia",
      "shock",
      "luto repentino",
      "dolor agudo"
    ],
    "scriptureRef": "Alma 28:11-12",
    "scriptureQuote": "Y hubo grandes lamentos y llantos por la pérdida de sus parientes... Mas ¡ay!, sabían que tenían motivo para afligirse, según las promesas del Señor... y otros de verdad se regocijaban y se llenaban de gozo a causa de las promesas del Señor de que serían levantados para habitar a la diestra de Dios.",
    "pastoralInsight": "Llorar una pérdida es sagrado; el llanto no contradice la fe. El Evangelio abraza las lágrimas mientras nos sostiene con la certeza inquebrantable de la vida eterna.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/28?lang=spa&id=p11-p12#p11",
    "bookId": "alma",
    "chapterNum": 28,
    "shortTitle": "Tragedia Inesperada"
  },
  {
    "id": "miedo_propia_muerte",
    "category": "duelo_dolor",
    "title": "Miedo o terror a la propia muerte y al más allá",
    "keywords": [
      "miedo a morir",
      "temor a la muerte",
      "morir",
      "agonia",
      "fin de la vida",
      "mas alla"
    ],
    "scriptureRef": "Alma 27:28",
    "scriptureQuote": "Y jamás miraban la muerte con ningún grado de terror, a causa de su esperanza y sus puntos de vista en cuanto a Cristo y la resurrección; por tanto, para ellos la muerte era consumida por la victoria de Cristo sobre ella.",
    "pastoralInsight": "Para el discípulo de Jesucristo, la muerte no es un abismo oscuro sino una puerta de entrada a la paz, donde toda lágrima será enjugada.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/27?lang=spa&id=p28#p28",
    "bookId": "alma",
    "chapterNum": 27,
    "shortTitle": "Miedo a la Muerte"
  },
  {
    "id": "resurreccion_perfecta_cuerpo",
    "category": "duelo_dolor",
    "title": "Certeza de la resurrección: el cuerpo restaurado a su perfección",
    "keywords": [
      "resurreccion",
      "cuerpo perfecto",
      "tumba",
      "restauracion corporal",
      "volver a vivir"
    ],
    "scriptureRef": "Alma 11:43-44",
    "scriptureQuote": "El espíritu y el cuerpo serán reunidos otra vez en su perfecta forma; los miembros así como las coyunturas serán restaurados a su propia forma, tal como nos hallamos ahora... y esta restauración vendrá sobre todos, tanto viejos como jóvenes, esclavos así como libres, varones así como mujeres... ni un solo cabello de sus cabezas se perderá.",
    "pastoralInsight": "Todo cuerpo mutilado, enfermo, desgastado por la edad o los achaques se levantará con vigor y esplendor eterno. Volverás a abrazar a tus seres queridos cara a cara.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/11?lang=spa&id=p43-p44#p43",
    "bookId": "alma",
    "chapterNum": 11,
    "shortTitle": "Resurrección del Cuerpo"
  },
  {
    "id": "dolor_fisico_cronico",
    "category": "duelo_dolor",
    "title": "Dolor corporal crónico, enfermedad degenerativa o discapacidad",
    "keywords": [
      "dolor cronico",
      "enfermedad",
      "discapacidad",
      "degenerativa",
      "postrado",
      "padecimiento corporal"
    ],
    "scriptureRef": "Alma 7:11-12",
    "scriptureQuote": "Y él saldrá, sufriendo dolores, aflicciones y tentaciones de todas clases... Tomará sobre sí los dolores y las enfermedades de su pueblo... para que sus entrañas sean llenas de misericordia, según la carne, a fin de que según la carne sepa cómo socorrer a su pueblo.",
    "pastoralInsight": "Cristo sabe lo que siente cada nervio, cada articulación y cada noche de insomnio por el dolor. Él está presente a tu lado en cada minuto de tu aflicción corporal.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/7?lang=spa&id=p11-p12#p11",
    "bookId": "alma",
    "chapterNum": 7,
    "shortTitle": "Dolor Físico Crónico"
  },
  {
    "id": "bendicion_sin_sanidad_inmediata",
    "category": "duelo_dolor",
    "title": "Cuando una bendición del sacerdocio no trae sanidad inmediata",
    "keywords": [
      "bendicion sacerdocio",
      "no sano",
      "por que no sana",
      "voluntad de dios",
      "fe para no ser sanado"
    ],
    "scriptureRef": "2 Nefi 2:1-2",
    "scriptureQuote": "Jacob, mi primogénito en el desierto: Tú has padecido aflicciones y mucho dolor por causa de la dureza de tus hermanos. No obstante, tú conoces la grandeza de Dios; y él consagrará tus aflicciones para tu provecho.",
    "pastoralInsight": "A veces la respuesta de Dios no es quitar el cáliz al instante, sino consagrar el dolor para refinar nuestra alma de forma santa. Su poder sigue obrando en ti.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2?lang=spa&id=p1-p2#p1",
    "bookId": "2-ne",
    "chapterNum": 2,
    "shortTitle": "Cuando no Hay Sanidad"
  },
  {
    "id": "cuidar_enfermo_prolongado",
    "category": "duelo_dolor",
    "title": "Fatiga del cuidador: sostener a un enfermo por meses o años",
    "keywords": [
      "cuidador",
      "cuidar a mi madre",
      "cuidar enfermo",
      "fatiga del cuidador",
      "abnegacion"
    ],
    "scriptureRef": "Mosíah 18:8-9",
    "scriptureQuote": "Deseáis entrar en el redil de Dios y ser llamados su pueblo, y estáis dispuestos a llevar las cargas los unos de los otros para que sean ligeras; sí, y estáis dispuestos a llorar con los que lloran y a consolar a los que necesitan de consuelo...",
    "pastoralInsight": "Tu servicio silencioso al pie de la cama es una de las expresiones más sagradas del convenio bautismal. Dios ve cada noche de desvelo y te sostendrá.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p8-p9#p8",
    "bookId": "mosiah",
    "chapterNum": 18,
    "shortTitle": "Fatiga del Cuidador"
  },
  {
    "id": "llorar_con_los_que_lloran",
    "category": "duelo_dolor",
    "title": "Acompañar sin juzgar: llorar con los que lloran",
    "keywords": [
      "llorar",
      "empatia",
      "consolar",
      "afliccion ajena",
      "acompanar",
      "silencio comprensivo"
    ],
    "scriptureRef": "Mosíah 18:9",
    "scriptureQuote": "Y ser testigos de Dios en todo tiempo, y en todas las cosas y en todo lugar en que estuvieseis, aun hasta la muerte, para que seáis redimidos por Dios, y seáis contados con los de la primera resurrección...",
    "pastoralInsight": "No necesitas tener sermones preparados. Muchas veces el acto de ministración más poderoso es sentarse en silencio al lado de la persona y dejar que llore.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p9#p9",
    "bookId": "mosiah",
    "chapterNum": 18,
    "shortTitle": "Llorar con el Afligido"
  },
  {
    "id": "aguijon_muerte_consumido",
    "category": "duelo_dolor",
    "title": "El aguijón de la muerte es consumido en la victoria de Cristo",
    "keywords": [
      "aguijon de la muerte",
      "victoria",
      "tumba vacia",
      "triunfo sobre la muerte"
    ],
    "scriptureRef": "Mosíah 16:7-8",
    "scriptureQuote": "Y si Cristo no hubiese resucitado de entre los muertos... no habría habido resurrección. Mas hay una resurrección; por tanto, la tumba no tiene victoria, y el aguijón de la muerte es consumido en Cristo.",
    "pastoralInsight": "La tumba no es el final de la historia. El dolor de la separación es temporal; la reunión venidera será eterna y llena de gozo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/16?lang=spa&id=p7-p8#p7",
    "bookId": "mosiah",
    "chapterNum": 16,
    "shortTitle": "Victoria sobre la Tumba"
  },
  {
    "id": "perdidas_materiales_fuego_robo",
    "category": "duelo_dolor",
    "title": "Pérdida material devastadora: quiebra, incendio, robo o ruina",
    "keywords": [
      "quiebra",
      "perdi todo",
      "ruina",
      "incendio",
      "robo",
      "perdida patrimonial"
    ],
    "scriptureRef": "Jacob 2:18-19",
    "scriptureQuote": "Pero antes de buscar riquezas, buscad el reino de Dios; y cuando hayáis obtenido una esperanza en Cristo, obtendréis riquezas si las buscáis... para vestir al desnudo y alimentar al hambriento y libertar al cautivo y suministrar auxilio al enfermo y afligido.",
    "pastoralInsight": "Las posesiones terrenales vienen y van, pero tu valor y tus tesoros en el cielo están intactos. Dios te dará la sabiduría y la fuerza para levantarte de nuevo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/2?lang=spa&id=p18-p19#p18",
    "bookId": "jacob",
    "chapterNum": 2,
    "shortTitle": "Pérdida Material / Ruina"
  },
  {
    "id": "paz_que_sobrepuja_todo",
    "category": "duelo_dolor",
    "title": "Buscar la paz que sobrepuja todo entendimiento humano",
    "keywords": [
      "paz de dios",
      "serenidad en el dolor",
      "calma en la tormenta",
      "consuelo supremo"
    ],
    "scriptureRef": "Alma 38:5",
    "scriptureQuote": "Y ahora bien, hijo mío, Shiblon, quisiera que supieses que en tanto que pongas tu confianza en Dios, en esa misma medida serás librado de tus pruebas y tus dificultades y tus aflicciones, y serás enaltecido en el postrer día.",
    "pastoralInsight": "La paz no significa que la tormenta haya cesado alrededor, sino que dentro de tu alma tienes anclada la mano del Príncipe de Paz.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p5#p5",
    "bookId": "alma",
    "chapterNum": 38,
    "shortTitle": "Paz Inexplicable"
  },
  {
    "id": "pecado_demasiado_grave",
    "category": "culpa_perdon",
    "title": "Sentir que mi pecado es demasiado grave para ser perdonado",
    "keywords": [
      "pecado grave",
      "no merezco perdon",
      "dios no me perdonara",
      "inmunda",
      "inmundo",
      "manchado",
      "irredimible"
    ],
    "scriptureRef": "Mosíah 26:30",
    "scriptureQuote": "Sí, y cuantas veces mi pueblo se arrepienta, le perdonaré sus ofensas contra mí.",
    "pastoralInsight": "No existe pecado que sobrepase el alcance infinito de la Expiación de Jesucristo si hay arrepentimiento sincero. La palabra de Dios dice 'cuantas veces se arrepienta, le perdonaré'.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/26?lang=spa&id=p30#p30",
    "bookId": "mosiah",
    "chapterNum": 26,
    "shortTitle": "¿Pecado Irredimible?"
  },
  {
    "id": "recaidas_constantes_mismo_error",
    "category": "culpa_perdon",
    "title": "Desesperanza tras recaídas constantes en el mismo error",
    "keywords": [
      "recai",
      "otra vez cai",
      "recaida",
      "fracaso moral",
      "no cambio nunca",
      "siempre lo mismo"
    ],
    "scriptureRef": "Moroni 6:8",
    "scriptureQuote": "Pero cuantas veces se arrepentían y pedían perdón, con verdadera intención, se les perdonaba.",
    "pastoralInsight": "La recaída duele, pero rendirse es la verdadera trampa del adversario. El Salvador te invita a levantarte, sacudirte el polvo y volver a acudir a Él.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/6?lang=spa&id=p8#p8",
    "bookId": "moro",
    "chapterNum": 6,
    "shortTitle": "Recaídas Constantes"
  },
  {
    "id": "verguenza_miedo_obispo",
    "category": "culpa_perdon",
    "title": "Vergüenza y pavor de confesar y hablar con el Obispo",
    "keywords": [
      "miedo al obispo",
      "verguenza confesar",
      "confesion",
      "que va a pensar de mi",
      "terror de confesar"
    ],
    "scriptureRef": "Alma 36:17-19",
    "scriptureQuote": "Y aconteció que mientras me atormentaba el recuerdo de mis muchos pecados... me acordé de haber oído a mi padre profetizar al pueblo concerniente a la venida de un Jesucristo... ¡Oh Jesús, Hijo de Dios, ten misericordia de mí!... Y cuando pensé en esto, ya no me pude acordar más de mis dolores.",
    "pastoralInsight": "El obispo no es un verdugo, es un médico espiritual llamado para ayudarte a vendar las heridas. La confesión abre la puerta para que el tormento se transforme en gozo puro.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p17-p19#p17",
    "bookId": "alma",
    "chapterNum": 36,
    "shortTitle": "Miedo a Confesar al Obispo"
  },
  {
    "id": "perdonarse_a_uno_mismo",
    "category": "culpa_perdon",
    "title": "Incapacidad de perdonarse a uno mismo habiendo recibido el perdón",
    "keywords": [
      "no me perdono",
      "odio a mi mismo",
      "culpa del pasado",
      "remordimiento eterno",
      "perdonarse"
    ],
    "scriptureRef": "Enós 1:5-8",
    "scriptureQuote": "Y vino a mí una voz, diciendo: Enós, tus pecados te son perdonados, y serás bendecido. Y yo, Enós, sabía que Dios no podía mentir; por tanto, mi culpa fue desterrada. Y dije yo: Señor, ¿cómo se lleva esto a efecto? Y él me dijo: Por tu fe en Cristo... ve, pues; tu fe te ha salvado.",
    "pastoralInsight": "Si Dios ya perdonó y olvidó tu pecado, insistir en seguir flagelándote es dudar de la suficiencia del sacrificio de Su Hijo. Deja que tu culpa sea desterrada hoy.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/enos/1?lang=spa&id=p5-p8#p5",
    "bookId": "enos",
    "chapterNum": 1,
    "shortTitle": "Perdonarse a sí Mismo"
  },
  {
    "id": "tristeza_segun_dios_vs_mundana",
    "category": "culpa_perdon",
    "title": "Distinguir entre la tristeza según Dios y el remordimiento destructivo",
    "keywords": [
      "tristeza segun dios",
      "remordimiento",
      "autodestruccion",
      "desesperacion por pecar"
    ],
    "scriptureRef": "Alma 42:29-30",
    "scriptureQuote": "Y ahora bien, hijo mío, quisiera que no te dejaras turbar más por estas cosas, y solo deja que te turben tus pecados, con esa turbación que te ha de llevar al arrepentimiento... ¡Oh hijo mío, no niegues más la justicia de Dios!",
    "pastoralInsight": "La culpa sana te empuja hacia Cristo para cambiar; la culpa del adversario te dice que no vales nada y que deberías esconderte. Quédate solo con la que te lleva a la luz.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/42?lang=spa&id=p29-p30#p29",
    "bookId": "alma",
    "chapterNum": 42,
    "shortTitle": "Tristeza según Dios"
  },
  {
    "id": "potente_cambio_corazon",
    "category": "culpa_perdon",
    "title": "El milagro del potente cambio de corazón y deseos",
    "keywords": [
      "cambio de corazon",
      "nuevo ser",
      "deseo de pecar",
      "transformacion espiritual",
      "nacer de nuevo"
    ],
    "scriptureRef": "Mosíah 5:2",
    "scriptureQuote": "El Espíritu del Señor Omnipotente ha obrado en nosotros... un potente cambio, de modo que ya no tenemos más disposición a obrar mal, sino a hacer lo bueno continuamente.",
    "pastoralInsight": "El Evangelio no es solo modificación de conducta externa; es una re-creación interna de tus afectos. Pídele al Señor ese potente cambio hoy.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/5?lang=spa&id=p2#p2",
    "bookId": "mosiah",
    "chapterNum": 5,
    "shortTitle": "Cambio de Corazón"
  },
  {
    "id": "vestidos_blancos_sangre_cordero",
    "category": "culpa_perdon",
    "title": "Purificación total: lavados en la sangre del Cordero",
    "keywords": [
      "limpio",
      "puro",
      "sin mancha",
      "vestidos blancos",
      "purificacion",
      "lavado"
    ],
    "scriptureRef": "Alma 5:21",
    "scriptureQuote": "Nadie puede ser salvo a menos que sus vestidos sean lavados sin mancha; sí, sus vestidos deben ser purificados hasta que queden limpios de toda mancha, mediante la sangre de aquel de quien nuestros padres han hablado, que ha de venir para redimir a su pueblo.",
    "pastoralInsight": "No importa cuán oscuras hayan sido tus manchas; el poder limpiador del Salvador tiene la potencia de dejar tus vestiduras más blancas que la nieve.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/5?lang=spa&id=p21#p21",
    "bookId": "alma",
    "chapterNum": 5,
    "shortTitle": "Purificación Total"
  },
  {
    "id": "confesar_abandonar_pecado",
    "category": "culpa_perdon",
    "title": "El valor para confesar y abandonar el pecado definitivamente",
    "keywords": [
      "confesar",
      "abandonar",
      "dejar el pecado",
      "honestidad espiritual",
      "romper con el pasado"
    ],
    "scriptureRef": "Mosíah 27:35",
    "scriptureQuote": "Y viajaron por toda la tierra... confesando todos sus pecados y proclamando todas las cosas que habían visto, y explicando las profecías y las escrituras a todos los que deseaban oírlas.",
    "pastoralInsight": "Confesar no te debilita; te quita la máscara y te devuelve el poder. Al abandonar el pecado y ser transparente, el Espíritu regresa con plenitud.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p35#p35",
    "bookId": "mosiah",
    "chapterNum": 27,
    "shortTitle": "Confesar y Abandonar"
  },
  {
    "id": "restitucion_maldad_nunca_felicidad",
    "category": "culpa_perdon",
    "title": "Restituir el daño causado: la maldad nunca fue felicidad",
    "keywords": [
      "maldad nunca fue felicidad",
      "restitucion",
      "reparar dano",
      "pedir perdon al projimo"
    ],
    "scriptureRef": "Alma 41:10, 14",
    "scriptureQuote": "La maldad nunca fue felicidad... Por tanto, hijo mío, mira que seas misericordioso con tus hermanos; trata con justicia, juzga con rectitud, y haz el bien continuamente; y si haces todas estas cosas, entonces recibirás tu galardón.",
    "pastoralInsight": "El pecado deja un rastro amargo. Cuando nos humillamos a reparar lo dañado y actuar con justicia hacia quienes herimos, el gozo celestial regresa.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/41?lang=spa&id=p10,p14#p10",
    "bookId": "alma",
    "chapterNum": 41,
    "shortTitle": "Maldad Nunca Fue Felicidad"
  },
  {
    "id": "trampa_posponer_arrepentimiento",
    "category": "culpa_perdon",
    "title": "El peligro de posponer el arrepentimiento: 'mañana cambiaré'",
    "keywords": [
      "posponer",
      "procrastinacion espiritual",
      "manana me arrepiento",
      "tiempo de prepararse"
    ],
    "scriptureRef": "Alma 34:32-34",
    "scriptureQuote": "Porque he aquí, esta vida es cuando el hombre debe prepararse para comparecer ante Dios... os ruego, por tanto, que no demoréis el día de vuestro arrepentimiento hasta el fin... porque el mismo espíritu que posea vuestros cuerpos al salir de esta vida, ese mismo espíritu tendrá poder para poseer vuestro cuerpo en aquel mundo eterno.",
    "pastoralInsight": "El mañana no está garantizado. El momento de ser libre, de pedir perdón y de respirar en paz con Dios es hoy mismo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/34?lang=spa&id=p32-p34#p32",
    "bookId": "alma",
    "chapterNum": 34,
    "shortTitle": "No Posponer el Cambio"
  },
  {
    "id": "enterrar_armas_guerra",
    "category": "culpa_perdon",
    "title": "Enterrar las armas de rebelión en lo profundo para no volver a pecar",
    "keywords": [
      "enterrar armas",
      "anti nefi lehi",
      "pacto de no volver a pecar",
      "romper tentacion"
    ],
    "scriptureRef": "Alma 24:15-18",
    "scriptureQuote": "Enterremos nuestras armas en lo profundo de la tierra para que se conserven lustrosas, como testimonio a nuestro Dios en el postrer día... Y esto hicieron, estimando que era un testimonio a Dios... de que nunca jamás usarían armas.",
    "pastoralInsight": "Para no volver a caer, hay que deshacerse de los accesos, contraseñas, ambientes o amistades que nos incitaban. Enterrar las armas es un acto de amor a Dios.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/24?lang=spa&id=p15-p18#p15",
    "bookId": "alma",
    "chapterNum": 24,
    "shortTitle": "Enterrar Armas de Pecado"
  },
  {
    "id": "brazo_misericordia_extendido",
    "category": "culpa_perdon",
    "title": "El Salvador te espera con los brazos abiertos sin reproches",
    "keywords": [
      "brazos abiertos",
      "brazo de misericordia",
      "acogida",
      "recibir",
      "no me rechaza"
    ],
    "scriptureRef": "3 Nefi 9:14",
    "scriptureQuote": "He aquí, mi brazo de misericordia se extiende hacia vosotros; y el que viniere, yo lo recibiré; y benditos son los que vienen a mí.",
    "pastoralInsight": "Cristo no te está esperando con un ceño fruncido o una lista de acusaciones. Su brazo está abierto y extendido hacia ti ahora mismo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/9?lang=spa&id=p14#p14",
    "bookId": "3-ne",
    "chapterNum": 9,
    "shortTitle": "Brazos Abiertos de Cristo"
  },
  {
    "id": "salvados_por_gracia_esfuerzo",
    "category": "culpa_perdon",
    "title": "La gracia de Cristo suple donde terminan tus fuerzas humanas",
    "keywords": [
      "gracia",
      "meritos de cristo",
      "esfuerzo humano",
      "insuficiencia",
      "salvados por gracia"
    ],
    "scriptureRef": "2 Nefi 25:23",
    "scriptureQuote": "Porque nosotros trabajamos diligentemente para escribir, a fin de persuadir a nuestros hijos, así como a nuestros hermanos, a creer en Cristo y a reconciliarse con Dios; pues sabemos que es por la gracia por la que nos salvamos, después de hacer cuanto podamos.",
    "pastoralInsight": "Hacer 'cuanto podamos' no significa alcanzar la perfección por cuenta propia, sino dar nuestro sincero empeño y dejar que la gracia de Cristo haga el resto.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/25?lang=spa&id=p23#p23",
    "bookId": "2-ne",
    "chapterNum": 25,
    "shortTitle": "Gracia Suficiente"
  },
  {
    "id": "paz_interior_incomprensible",
    "category": "culpa_perdon",
    "title": "El gozo que sobrepasa el entendimiento tras el perdón de pecados",
    "keywords": [
      "gozo del perdon",
      "alivio inmenso",
      "liberacion espiritual",
      "paz interior"
    ],
    "scriptureRef": "Alma 36:20-21",
    "scriptureQuote": "Sí, te digo, hijo mío, que no puede haber cosa tan exquisita y tan dulce como lo fue mi gozo... sí, y nada puede haber tan exquisito y amargo como fueron mis dolores.",
    "pastoralInsight": "La medida de tu tristeza actual será la medida del gozo que experimentarás cuando permitas que el Salvador disuelva tu culpa. Ten fe.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p20-p21#p20",
    "bookId": "alma",
    "chapterNum": 36,
    "shortTitle": "Gozo del Perdón"
  },
  {
    "id": "orgullo_humillacion_espiritual",
    "category": "culpa_perdon",
    "title": "Vencer el orgullo que impide pedir perdón o agachar la cabeza",
    "keywords": [
      "orgullo",
      "soberbia",
      "agachar la cabeza",
      "pedir perdon",
      "humillacion voluntaria"
    ],
    "scriptureRef": "Alma 5:27-28",
    "scriptureQuote": "¿Habéis caminado, conservándoos irreprensibles delante de Dios? ¿Podríais decir, si se os llamara a morir en este momento... que vuestros vestidos han sido lavados y blanqueados mediante la sangre de Cristo?... ¿Os halláis despojados del orgullo? Os digo que si no, no estáis preparados para comparecer ante Dios.",
    "pastoralInsight": "El orgullo es la gran barrera del alma. Humillarse ante Dios y ante nuestro prójimo no es debilidad; es la mayor demostración de nobleza espiritual.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/5?lang=spa&id=p27-p28#p27",
    "bookId": "alma",
    "chapterNum": 5,
    "shortTitle": "Vencer el Orgullo"
  },
  {
    "id": "insultos_ataques_contencion",
    "category": "relaciones_hogar",
    "title": "Cómo responder ante ataques verbales, agresiones o provocaciones",
    "keywords": [
      "insultos",
      "agresion",
      "ataque verbal",
      "contencion",
      "odio",
      "provocacion",
      "pacificadores"
    ],
    "scriptureRef": "3 Nefi 11:29-30",
    "scriptureQuote": "Porque en verdad, en verdad os digo que aquel que tiene el espíritu de contención no es mío, sino es del diablo, que es el padre de la contención, y él incita los corazones de los hombres a contender con ira, unos con otros. He aquí, esta no es mi doctrina, agitar con ira los corazones de los hombres, el uno contra el otro; antes bien, mi doctrina es esta: que se ponga fin a tales cosas.",
    "pastoralInsight": "Responder al insulto con ira es darle la victoria al adversario. El pacificador no es débil; tiene la fuerza de Cristo para desarmar la contención con silencio o mansedumbre.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/11?lang=spa&id=p29-p30#p29",
    "bookId": "3-ne",
    "chapterNum": 11,
    "shortTitle": "Insultos y Agresiones"
  },
  {
    "id": "perdonar_traicion_grave",
    "category": "relaciones_hogar",
    "title": "Perdonar a quien te traicionó o te causó una herida profunda",
    "keywords": [
      "traicion",
      "herida profunda",
      "perdonar al enemigo",
      "rencor",
      "venganza",
      "amargura"
    ],
    "scriptureRef": "Mosíah 26:31",
    "scriptureQuote": "Y también debéis perdonaros vuestras ofensas unos a otros; porque en verdad os digo que el que no perdona las ofensas de su prójimo, cuando este dice que se arrepiente, ese tal se ha puesto bajo condenación.",
    "pastoralInsight": "Perdonar no es justificar la maldad del otro ni exponerte a más daño; es soltar el veneno del rencor para que tu propia alma no quede envenenada.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/26?lang=spa&id=p31#p31",
    "bookId": "mosiah",
    "chapterNum": 26,
    "shortTitle": "Perdonar Traición Grave"
  },
  {
    "id": "chismes_juicios_barrio",
    "category": "relaciones_hogar",
    "title": "Chismes, murmuración y juicios injustos en la capilla o familia",
    "keywords": [
      "chismes",
      "murmuracion",
      "juicios",
      "criticas",
      "hablar a espaldas",
      "ofensa en el barrio"
    ],
    "scriptureRef": "Alma 1:30",
    "scriptureQuote": "Y en su estado de prosperidad, no enviaban a nadie que estuviese desnudo, o que tuviese hambre... ni hacían distinción de personas en lo que tocaba a los necesitados... y eran bondadosos con todos los hombres, ya fueran viejos o jóvenes, esclavos o libres, varones o mujeres, perteneciesen o no a la iglesia.",
    "pastoralInsight": "Cuando en el barrio o familia abundan las críticas, tu ministerio debe ser el antídoto: bondad incondicional, silencio ante el chisme y brazos abiertos al necesitado.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/1?lang=spa&id=p30#p30",
    "bookId": "alma",
    "chapterNum": 1,
    "shortTitle": "Chismes en el Barrio"
  },
  {
    "id": "matrimonio_corazones_quebrantados",
    "category": "relaciones_hogar",
    "title": "Matrimonio en crisis, infidelidad o quebrantamiento conyugal",
    "keywords": [
      "matrimonio",
      "esposo",
      "esposa",
      "divorcio",
      "infidelidad",
      "desamor",
      "crisis matrimonial"
    ],
    "scriptureRef": "Jacob 2:31-35",
    "scriptureQuote": "Porque he aquí, yo, el Señor, he visto el dolor y oído el lamento de las hijas de mi pueblo... a causa de las iniquidades y abominaciones de sus maridos... Habéis quebrantado los corazones de vuestras tiernas esposas y perdido la confianza de vuestros hijos, por causa de vuestros malos ejemplos delante de ellos.",
    "pastoralInsight": "El Señor ama y defiende la ternura en el hogar. Sanar un matrimonio exige verdad absoluta, abandono de egoísmos y reconstrucción de la confianza con hechos concretos.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/2?lang=spa&id=p31-p35#p31",
    "bookId": "jacob",
    "chapterNum": 2,
    "shortTitle": "Matrimonio en Crisis"
  },
  {
    "id": "amor_conyugal_ternura",
    "category": "relaciones_hogar",
    "title": "El modelo de amor conyugal: amar al cónyuge y a los hijos",
    "keywords": [
      "amor conyugal",
      "ternura",
      "cuidar a la esposa",
      "amar al esposo",
      "familia unida"
    ],
    "scriptureRef": "Jacob 3:7",
    "scriptureQuote": "He aquí, sus maridos aman a sus esposas, y sus esposas aman a sus maridos; y sus esposas y sus maridos aman a sus hijos; y su incredulidad y su odio contra vosotros se debe a la iniquidad de sus padres.",
    "pastoralInsight": "El mayor legado que un padre o madre puede dejar a sus hijos es ver cómo se aman, se respetan y se perdonan mutuamente en el día a día.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/3?lang=spa&id=p7#p7",
    "bookId": "jacob",
    "chapterNum": 3,
    "shortTitle": "Ternura Conyugal"
  },
  {
    "id": "hijos_rebeldes_alejados",
    "category": "relaciones_hogar",
    "title": "Dolor por hijos descarriados que se han alejado del Evangelio",
    "keywords": [
      "hijos rebeldes",
      "hijo apartado",
      "hijo inactivo",
      "dolor de padres",
      "oracion por los hijos"
    ],
    "scriptureRef": "Mosíah 27:14",
    "scriptureQuote": "He aquí, el Señor ha oído las oraciones de su pueblo, y también las oraciones de su siervo Alma, que es tu padre; porque él ha orado con mucha fe en cuanto a ti, para que seas traído al conocimiento de la verdad; por tanto, con este fin he venido para convencerte del poder y la autoridad de Dios.",
    "pastoralInsight": "Las oraciones de un padre y una madre con fe tienen un alcance sagrado. Nunca dejes de orar con fe por ese hijo; el Señor no lo ha perdido de vista.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p14#p14",
    "bookId": "mosiah",
    "chapterNum": 27,
    "shortTitle": "Hijos Descarriados"
  },
  {
    "id": "ensenar_hijos_sin_renas",
    "category": "relaciones_hogar",
    "title": "Crianza con amor: enseñar a los hijos sin gritos ni riñas",
    "keywords": [
      "crianza",
      "educar hijos",
      "no gritar",
      "paciencia con hijos",
      "armonia en casa"
    ],
    "scriptureRef": "Mosíah 4:14-15",
    "scriptureQuote": "Ni permitiréis que vuestros hijos anden hambrientos ni desnudos; ni consentiréis que quebranten las leyes de Dios, ni que luchen y riñan entre sí, y sirvan al diablo... antes bien, les enseñaréis a andar por las vías de la verdad y la seriedad; les enseñaréis a amarse mutuamente y a servirse el uno al otro.",
    "pastoralInsight": "Enseñar a los hijos no es imponer mediante el miedo, sino modelar la rectitud y enseñarles a amarse mutuamente bajo el espíritu de Cristo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p14-p15#p14",
    "bookId": "mosiah",
    "chapterNum": 4,
    "shortTitle": "Educar sin Gritos"
  },
  {
    "id": "envidia_celos_hermanos",
    "category": "relaciones_hogar",
    "title": "Vencer la envidia y la comparación con amigos o hermanos",
    "keywords": [
      "envidia",
      "celos",
      "comparacion",
      "rivalidad",
      "jactancia"
    ],
    "scriptureRef": "Alma 38:11",
    "scriptureQuote": "Procura no ser altivo; sí, procura no jactarte de tu propia sabiduría, ni de tus muchas riquezas.",
    "pastoralInsight": "La comparación es el ladrón del gozo. Dios no tiene hijos favoritos; Él tiene un plan a la medida exacta para ti que no compite con el de nadie más.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p11#p11",
    "bookId": "alma",
    "chapterNum": 38,
    "shortTitle": "Envidia y Comparación"
  },
  {
    "id": "caridad_amor_puro_cristo",
    "category": "relaciones_hogar",
    "title": "Aprender a amar a las personas difíciles: la caridad pura",
    "keywords": [
      "caridad",
      "amor puro",
      "tolerancia",
      "amar a los dificiles",
      "paciencia con otros"
    ],
    "scriptureRef": "Moroni 7:45-48",
    "scriptureQuote": "La caridad es sufrida y es benigna, y no tiene envidia, ni se ensancha, no busca lo suyo, no se irrita fácilmente, no piensa el mal, no se regocija en la iniquidad, sino se regocija en la verdad; todo lo sufre, todo lo cree, todo lo espera, todo lo soporta... la caridad es el amor puro de Cristo, y permanece para siempre.",
    "pastoralInsight": "Amar a quien nos trata bien es fácil; la caridad de Cristo se demuestra cuando somos benignos y pacientes con aquel que es tosco o antipático.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7?lang=spa&id=p45-p48#p45",
    "bookId": "moro",
    "chapterNum": 7,
    "shortTitle": "Amar al Difícil (Caridad)"
  },
  {
    "id": "amistades_toxicas_presion",
    "category": "relaciones_hogar",
    "title": "Poner límites a malas amistades o influencias tóxicas",
    "keywords": [
      "malas amistades",
      "presion social",
      "influencias toxicas",
      "limites",
      "amistad sana"
    ],
    "scriptureRef": "2 Nefi 28:14-16",
    "scriptureQuote": "Pues ellos siguen los preceptos de los hombres... y a causa del orgullo, y por haber aprendido falsas doctrinas, y a causa de las riquezas de este mundo... se han descarriado.",
    "pastoralInsight": "El amor ministerial no implica dejar que otros destruyan tu testimonio o tu integridad. Saber decir 'no' y elegir amigos que te eleven es un mandamiento sabio.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/28?lang=spa&id=p14-p16#p14",
    "bookId": "2-ne",
    "chapterNum": 28,
    "shortTitle": "Amistades Tóxicas"
  },
  {
    "id": "albedrio_respeto_decisiones_ajenas",
    "category": "relaciones_hogar",
    "title": "Respetar el albedrío ajeno cuando no eligen lo correcto",
    "keywords": [
      "albedrio",
      "no puedo obligar",
      "eleccion libre",
      "libertad ajena",
      "soltar el control"
    ],
    "scriptureRef": "Alma 29:4",
    "scriptureQuote": "Porque sé que él concede a los hombres según lo que deseen, ya sea para muerte o para vida; sí, sé que él concede a los hombres según sus deseos, ya sea para salvación o para destrucción.",
    "pastoralInsight": "No puedes obligar a nadie a ser feliz o a obedecer. Ama, enseña con el ejemplo, ora sin cesar y suelta la necesidad de controlar lo que solo Dios y ellos pueden decidir.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/29?lang=spa&id=p4#p4",
    "bookId": "alma",
    "chapterNum": 29,
    "shortTitle": "Respetar el Albedrío"
  },
  {
    "id": "desacuerdos_mansedumbre",
    "category": "relaciones_hogar",
    "title": "Resolver desacuerdos sin gritos: moderación y dominio propio",
    "keywords": [
      "discusiones",
      "pleitos",
      "peleas",
      "desacuerdos",
      "mansedumbre",
      "dialogo pacífico"
    ],
    "scriptureRef": "Alma 38:12",
    "scriptureQuote": "Usa de moderación en todas las cosas; procura también refrenar todas tus pasiones para que estés lleno de amor...",
    "pastoralInsight": "En cualquier desacuerdo conyugal o familiar, el que baja la voz y busca entender antes de tener la razón es quien gana la verdadera victoria de Cristo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p12#p12",
    "bookId": "alma",
    "chapterNum": 38,
    "shortTitle": "Resolver Desacuerdos"
  },
  {
    "id": "unidad_corazones_entrelazados",
    "category": "relaciones_hogar",
    "title": "Unidad de corazón: tener los corazones entrelazados con amor",
    "keywords": [
      "unidad",
      "corazones entrelazados",
      "sociedad de socorro",
      "cuorum",
      "armonia comunitaria"
    ],
    "scriptureRef": "Mosíah 18:21",
    "scriptureQuote": "Y les mandó que no hubiese contenciones entre uno y otro, sino que fijasen su vista hacia adelante con una sola mira, teniendo una fe y un bautismo, teniendo entrelazados sus corazones con unidad y amor el uno hacia el otro.",
    "pastoralInsight": "La iglesia florece cuando no hay bandos ni favoritismos, sino un solo corazón entrelazado para socorrer al que está caído.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p21#p21",
    "bookId": "mosiah",
    "chapterNum": 18,
    "shortTitle": "Unidad de Corazón"
  },
  {
    "id": "perdonar_padres_errores",
    "category": "relaciones_hogar",
    "title": "Perdonar a los padres por heridas y equivocaciones del pasado",
    "keywords": [
      "perdonar a mis padres",
      "padres imperfectos",
      "heridas de infancia",
      "resentimiento familiar"
    ],
    "scriptureRef": "1 Nefi 2:16",
    "scriptureQuote": "Y aconteció que yo, Nefi... teniendo grandes deseos de conocer los misterios de Dios, clamé por tanto al Señor; y he aquí que él me visitó y enterneció mi corazón, de modo que creí todas las palabras que mi padre había hablado; así que no me rebelé contra él como lo habían hecho mis hermanos.",
    "pastoralInsight": "Tus padres fueron personas imperfectas enfrentando sus propias tormentas. Pedirle al Señor que enternezca tu corazón te liberará del peso amargo del reproche.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/2?lang=spa&id=p16#p16",
    "bookId": "1-ne",
    "chapterNum": 2,
    "shortTitle": "Perdonar a los Padres"
  },
  {
    "id": "servir_desinteresado_projimo",
    "category": "relaciones_hogar",
    "title": "Cuando estás sirviendo a tus semejantes, estás al servicio de Dios",
    "keywords": [
      "servicio",
      "servir al projimo",
      "rey benjamin",
      "ayudar",
      "solidaridad"
    ],
    "scriptureRef": "Mosíah 2:17",
    "scriptureQuote": "Y he aquí, os digo estas cosas para que aprendáis sabiduría; para que sepáis que cuando os halláis al servicio de vuestros semejantes, solo os halláis al servicio de vuestro Dios.",
    "pastoralInsight": "La cura más rápida para la autocompasión o el aislamiento es salir a servir a alguien que tiene una carga mayor. Al bendecir a otros, Dios te sana a ti.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/2?lang=spa&id=p17#p17",
    "bookId": "mosiah",
    "chapterNum": 2,
    "shortTitle": "Servicio Desinteresado"
  },
  {
    "id": "experimento_semilla_dudas",
    "category": "fe_dudas",
    "title": "«No sé si Dios existe realmente o si sólo es una ilusión»",
    "keywords": [
      "dudas de fe",
      "dios existe",
      "no se si creo",
      "escepticismo",
      "semilla",
      "experimentar"
    ],
    "scriptureRef": "Alma 32:27-28",
    "scriptureQuote": "Pero he aquí, si despertáis y aviváis vuestras facultades hasta experimentar con mis palabras, y ejercitáis un poco de fe, sí, aunque no tengáis más que un deseo de creer, dejad que este deseo obre en vosotros... Ahora bien, compararemos la palabra a una semilla. Si dais cabida para que una semilla sea sembrada en vuestro corazón... empezará a hincharse en vuestro pecho.",
    "pastoralInsight": "Dios no exige certeza absoluta el primer día. Basta con un pequeño deseo de creer. Siembras la semilla orando con sinceridad y observando el fruto de paz en tu vida.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/32?lang=spa&id=p27-p28#p27",
    "bookId": "alma",
    "chapterNum": 32,
    "shortTitle": "¿Existe Dios? (Semilla)"
  },
  {
    "id": "dudas_historia_doctrina_iglesia",
    "category": "fe_dudas",
    "title": "Dudas por historia de la Iglesia, ataques en internet o confusión",
    "keywords": [
      "dudas historicas",
      "internet",
      "ataques a la iglesia",
      "crisis de fe",
      "prueba de fe"
    ],
    "scriptureRef": "Éter 12:6",
    "scriptureQuote": "Y ahora yo, Moroni, quisiera hablar algo concerniente a estas cosas. Quisiera mostrar al mundo que la fe es las cosas que se esperan y no se ven; por tanto, no contendáis porque no veis, porque no recibís testimonio sino hasta después de la prueba de vuestra fe.",
    "pastoralInsight": "Tener preguntas no es pecado; el Evangelio nació de la pregunta honesta de un joven de 14 años. Lo importante es no abandonar lo que ya sabes por lo que aún no entiendes.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12?lang=spa&id=p6#p6",
    "bookId": "ether",
    "chapterNum": 12,
    "shortTitle": "Dudas de Historia / Internet"
  },
  {
    "id": "oraciones_frias_enemigo_no_orar",
    "category": "fe_dudas",
    "title": "Sentir que las oraciones no pasan del techo / No querer orar",
    "keywords": [
      "no quiero orar",
      "oracion fria",
      "no siento nada",
      "oraciones vacias",
      "desgano espiritual"
    ],
    "scriptureRef": "2 Nefi 32:8-9",
    "scriptureQuote": "Y ahora bien, mis amados hermanos, percibo que aún estáis meditando en vuestros corazones; y me duele tener que hablaros concerniente a esto. Porque si escuchaseis al Espíritu que enseña al hombre a orar, sabríais que os es menester orar; porque el espíritu malo no enseña al hombre a orar, sino le enseña que no debe orar. Mas he aquí, os digo que debéis orar siempre...",
    "pastoralInsight": "Cuando sientas que no quieres orar, ese es exactamente el momento en que más necesitas ponerte de rodillas. El adversario busca cortar tu línea directa con Dios.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/32?lang=spa&id=p8-p9#p8",
    "bookId": "2-ne",
    "chapterNum": 32,
    "shortTitle": "Oraciones Frías / Desgano"
  },
  {
    "id": "orar_con_hambre_alma_enos",
    "category": "fe_dudas",
    "title": "Cómo orar de verdad: cuando el alma tiene hambre de respuestas",
    "keywords": [
      "hambre en el alma",
      "oracion profunda",
      "suplica ferviente",
      "enos",
      "clamor a dios"
    ],
    "scriptureRef": "Enós 1:4",
    "scriptureQuote": "Y mi alma tuvo hambre; y me arrodillé ante mi Hacedor, y clamé a él con ferviente oración y súplica por mi propia alma; y clamé a él todo el día; sí, y cuando anocheció, todavía elevaba mi voz a lo alto, hasta que llegó a los cielos.",
    "pastoralInsight": "La oración que transforma no es una lista apresurada de pedidos, sino abrir el alma vulnerable y transparente ante el Padre.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/enos/1?lang=spa&id=p4#p4",
    "bookId": "enos",
    "chapterNum": 1,
    "shortTitle": "Hambre en el Alma (Enós)"
  },
  {
    "id": "sequia_espiritual_hipocrita",
    "category": "fe_dudas",
    "title": "Sequía espiritual: ir a la capilla sintiéndose frío o hipócrita",
    "keywords": [
      "sequia espiritual",
      "frialdad",
      "hipocrita",
      "no siento el espiritu",
      "vaciedad en la capilla"
    ],
    "scriptureRef": "2 Nefi 31:13",
    "scriptureQuote": "Por tanto, amados hermanos míos, sé que si seguís al Hijo con íntegro propósito de corazón, sin hipocresía y sin engaño ante Dios, sino con verdadera intención, arrepintiéndoos de vuestros pecados... he aquí, entonces recibiréis el Espíritu Santo.",
    "pastoralInsight": "Estar en la capilla sintiéndote débil no te hace hipócrita; te hace un paciente sincero en el hospital del Señor. Sé honesto con Dios y Él renovará tu fuego.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31?lang=spa&id=p13#p13",
    "bookId": "2-ne",
    "chapterNum": 31,
    "shortTitle": "Sentirse Frío en la Capilla"
  },
  {
    "id": "por_que_dios_permite_maldad",
    "category": "fe_dudas",
    "title": "¿Por qué un Dios amoroso permite el sufrimiento de los inocentes?",
    "keywords": [
      "por que dios permite el mal",
      "sufrimiento inocente",
      "maldad en el mundo",
      "injusticia"
    ],
    "scriptureRef": "Alma 14:10-11",
    "scriptureQuote": "Y aconteció que cuando Amulek vio los dolores de las mujeres y niños que se consumían en la hoguera... dijo a Alma: ¿Cómo podemos presenciar esta escena tan horrible?... Pero Alma le dijo: El Espíritu me constriñe a no extender la mano; pues he aquí, el Señor los recibe para sí en gloria; y él permite que el pueblo haga esto... a fin de que los juicios que dicte sobre ellos en su ira sean justos.",
    "pastoralInsight": "Dios respeta el albedrío humano aun cuando los hombres eligen causar daño atroz. Su justicia es perfecta y Él recibe a los que sufren en gloria eterna.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/14?lang=spa&id=p10-p11#p10",
    "bookId": "alma",
    "chapterNum": 14,
    "shortTitle": "¿Por qué Sufre el Inocente?"
  },
  {
    "id": "discernir_voz_espiritu",
    "category": "fe_dudas",
    "title": "Cómo saber si una impresión proviene de Dios o de mi propia mente",
    "keywords": [
      "discernimiento",
      "voz del espiritu",
      "es de dios o mio",
      "inspiracion",
      "moroni 7"
    ],
    "scriptureRef": "Moroni 7:16-17",
    "scriptureQuote": "Pues he aquí, a todo hombre se da el Espíritu de Cristo para que sepa discernir el bien del mal... toda cosa que invita e induce a hacer lo bueno, y a amar a Dios y a servirle, es inspirada por Dios... pero todo lo que persuade a los hombres a hacer lo malo... es del diablo.",
    "pastoralInsight": "La prueba es sencilla: si una idea te impulsa a hacer el bien, ser bondadoso, perdonar y acercarte a Cristo, viene de Dios. Actúa sobre ella sin dudar.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7?lang=spa&id=p16-p17#p16",
    "bookId": "moro",
    "chapterNum": 7,
    "shortTitle": "Discernir la Voz del Espíritu"
  },
  {
    "id": "desgano_leer_escrituras",
    "category": "fe_dudas",
    "title": "Falta de ganas de leer las Escrituras / La barra de hierro",
    "keywords": [
      "leer escrituras",
      "flojera leer",
      "no tengo tiempo",
      "barra de hierro",
      "palabra de dios"
    ],
    "scriptureRef": "1 Nefi 15:23-24",
    "scriptureQuote": "Y les dije que era la palabra de Dios; y que quienes escucharan la palabra de Dios y se aferraran a ella, no perecerían jamás; ni los vencerían las tentaciones ni los ardientes dardos del adversario para cegarlos y llevarlos a la destrucción.",
    "pastoralInsight": "Las Escrituras no son una tarea para tachar de una lista; son el escudo cotidiano que apaga los dardos inflamados de ansiedad y tentación que el mundo te lanza.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/15?lang=spa&id=p23-p24#p23",
    "bookId": "1-ne",
    "chapterNum": 15,
    "shortTitle": "Desgano por las Escrituras"
  },
  {
    "id": "orar_en_todo_lugar_campo_casa",
    "category": "fe_dudas",
    "title": "Aprender a orar en todo momento y lugar: campo, casa y secretos",
    "keywords": [
      "orar siempre",
      "oracion familiar",
      "oracion secreta",
      "clamar a dios",
      "amulek oracion"
    ],
    "scriptureRef": "Alma 34:18-27",
    "scriptureQuote": "Sí, clamad a él por misericordia, porque es poderoso para salvar... clamad a él en vuestras casas, sí, por todas las de vuestra casa, tanto por la mañana, como al mediodía y al atardecer... reposen vuestros corazones, inundados continuamente de ferviente oración hacia él por vuestro bienestar y por el bienestar de aquellos que os rodean.",
    "pastoralInsight": "Dios está interesado en cada detalle de tu vida: tu trabajo, tus finanzas, tus miedos y tu hogar. Habla con Él con la confianza de un hijo amado.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/34?lang=spa&id=p18-p27#p18",
    "bookId": "alma",
    "chapterNum": 34,
    "shortTitle": "Orar en Todo Momento"
  },
  {
    "id": "fe_pequena_como_semilla",
    "category": "fe_dudas",
    "title": "Sentir que mi fe es demasiado pequeña e insuficiente",
    "keywords": [
      "poca fe",
      "fe pequena",
      "duda",
      "deseo de creer",
      "semilla de fe"
    ],
    "scriptureRef": "Alma 32:27",
    "scriptureQuote": "Pero he aquí, si despertáis y aviváis vuestras facultades hasta experimentar con mis palabras, y ejercitáis un poco de fe, sí, aunque no tengáis más que un deseo de creer, dejad que este deseo obre en vosotros, sí, hasta que creáis de tal modo que deis cabida a una porción de mis palabras.",
    "pastoralInsight": "No necesitas mover montañas hoy; solo necesitas darle un lugar pequeño a la palabra en tu corazón. El Salvador se encarga de hacerla crecer.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/32?lang=spa&id=p27#p27",
    "bookId": "alma",
    "chapterNum": 32,
    "shortTitle": "Fe Pequeña"
  },
  {
    "id": "sabios_en_su_propia_opinion",
    "category": "fe_dudas",
    "title": "El peligro del intelectualismo soberbio que apaga el testimonio",
    "keywords": [
      "intelectualismo",
      "soberbia intelectual",
      "creerse sabios",
      "apoyarse en la carne"
    ],
    "scriptureRef": "2 Nefi 9:28-29",
    "scriptureQuote": "¡Oh ese sutil plan del maligno! ¡Oh las vanidades, y las flaquezas, y las necedades de los hombres! Cuando son instruidos se creen sabios, y no escuchan el consejo de Dios... Pero bueno es ser instruido, si hacen caso de los consejos de Dios.",
    "pastoralInsight": "El Evangelio ama el estudio y la verdad, pero la razón sin humildad espiritual se vuelve ciega. Estudia con la mente y cree con el corazón.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/9?lang=spa&id=p28-p29#p28",
    "bookId": "2-ne",
    "chapterNum": 9,
    "shortTitle": "Intelectualismo Soberbio"
  },
  {
    "id": "promesa_moroni_libro_mormon",
    "category": "fe_dudas",
    "title": "La promesa de Moroni: saber por ti mismo que el Libro es verdad",
    "keywords": [
      "promesa de moroni",
      "oracion libro de mormon",
      "saber la verdad",
      "espiritu santo testimonio"
    ],
    "scriptureRef": "Moroni 10:4-5",
    "scriptureQuote": "Y cuando recibáis estas cosas, quisiera exhortaros a que preguntéis a Dios, el Eterno Padre, en el nombre de Cristo, si no son verdaderas estas cosas; y si pedís con un corazón sincero, con verdadera intención, teniendo fe en Cristo, él os manifestará la verdad de ellas por el poder del Espíritu Santo; y por el poder del Espíritu Santo podréis conocer la verdad de todas las cosas.",
    "pastoralInsight": "Tu testimonio no tiene que depender del de tus padres o líderes. El Espíritu Santo puede confirmar directamente a tu corazón que Jesucristo vive y este libro es Su palabra.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/10?lang=spa&id=p4-p5#p4",
    "bookId": "moro",
    "chapterNum": 10,
    "shortTitle": "La Promesa de Moroni"
  },
  {
    "id": "permanecer_arbol_vida_burlas",
    "category": "fe_dudas",
    "title": "Mantenerse firme junto al Árbol de la Vida frente a las burlas del mundo",
    "keywords": [
      "gran y espacioso edificio",
      "arbol de la vida",
      "burlas del mundo",
      "verguenza del evangelio"
    ],
    "scriptureRef": "1 Nefi 8:33",
    "scriptureQuote": "Y grande era la multitud que entraba en aquel edificio extraño. Y después de haber entrado en ese edificio, nos señalaban con dedo de escarnio a mí y a los que también estábamos comiendo del fruto; pero no les hicimos caso.",
    "pastoralInsight": "La clave de Lehi y los fieles fue una sola frase: 'no les hicimos caso'. No discutas con el edificio espacioso de las redes sociales; sigue saboreando el amor de Dios.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/8?lang=spa&id=p33#p33",
    "bookId": "1-ne",
    "chapterNum": 8,
    "shortTitle": "Burlas del Mundo (Edificio)"
  },
  {
    "id": "pedir_senales_korihor",
    "category": "fe_dudas",
    "title": "Cuando alguien exige una señal milagrosa para poder creer",
    "keywords": [
      "pedir senales",
      "korihor",
      "todas las cosas testifican",
      "evidencias de dios"
    ],
    "scriptureRef": "Alma 30:44",
    "scriptureQuote": "Todas las cosas indican que hay un Dios, sí, aun la tierra y todo cuanto hay sobre ella, sí, y su movimiento, sí, y también todos los planetas que se mueven en su orden regular testifican que hay un Creador Supremo.",
    "pastoralInsight": "Las señales no engendran fe duradera; la fe nace de la humildad del corazón. La creación entera y el latido de tu pecho testifican de la bondad de Dios.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/30?lang=spa&id=p44#p44",
    "bookId": "alma",
    "chapterNum": 30,
    "shortTitle": "Exigir Señales (Korihor)"
  },
  {
    "id": "liahona_palabras_cristo",
    "category": "fe_dudas",
    "title": "La Liahona espiritual: las palabras de Cristo nos guían paso a paso",
    "keywords": [
      "liahona",
      "direccion paso a paso",
      "brujula espiritual",
      "palabras de cristo"
    ],
    "scriptureRef": "Alma 37:44-46",
    "scriptureQuote": "Porque he aquí, tan fácil es prestar atención a la palabra de Cristo, que te señalará un curso directo a la felicidad eterna, como lo fue para nuestros padres prestar atención a esta brújula, que les señalaba un curso directo a la tierra prometida... No seamos perezosos por causa de la facilidad de la senda.",
    "pastoralInsight": "La guía diaria de Dios es simple pero requiere constancia. Unos minutos al día en las Escrituras operan como tu Liahona para no perder el rumbo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37?lang=spa&id=p44-p46#p44",
    "bookId": "alma",
    "chapterNum": 37,
    "shortTitle": "La Liahona Espiritual"
  },
  {
    "id": "pornografia_inmoralidad_crucificate",
    "category": "habitos_ataduras",
    "title": "Lucha contra la pornografía o la inmoralidad sexual",
    "keywords": [
      "pornografia",
      "impureza",
      "lujuria",
      "castidad",
      "inmoralidad",
      "adiccion sexual",
      "corianton"
    ],
    "scriptureRef": "Alma 39:9, 11",
    "scriptureQuote": "Quisiera que te arrepintieses y abandonases tus pecados, y no te dejases llevar más por las concupiscencias de tus ojos, sino que te crucificases a ti mismo de todas estas cosas... Vuélvete al Señor con toda tu mente, alma y fuerza.",
    "pastoralInsight": "Alma no condenó a su hijo Coriantón para siempre; le mostró con amor firme que debía cortar de raíz los estímulos que alimentaban la tentación y refugiarse en el Señor.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/39?lang=spa&id=p9,p11#p9",
    "bookId": "alma",
    "chapterNum": 39,
    "shortTitle": "Pornografía e Impureza"
  },
  {
    "id": "engano_cordel_lino_adormecer",
    "category": "habitos_ataduras",
    "title": "El engaño gradual del adversario: cordeles de lino hasta atar",
    "keywords": [
      "engano",
      "cordel de lino",
      "adormecer",
      "todo va bien",
      "seguridad carnal",
      "trampa suave"
    ],
    "scriptureRef": "2 Nefi 28:21-22",
    "scriptureQuote": "Y a otros los pacificará y los adormecerá con seguridad carnal, de modo que dirán: Todo va bien en Sión; sí, Sión prospera, todo va bien. Y así el diablo engaña sus almas, y los conduce astutamente al infierno... los guía del cuello con cordel de lino, hasta que los ata con sus fuertes cuerdas para siempre.",
    "pastoralInsight": "Las adicciones casi nunca empiezan con una cuerda gruesa, sino con un 'cordel suave de lino' (solo una vez, nadie me ve). Reconocer la trampa a tiempo salva la vida.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/28?lang=spa&id=p21-p22#p21",
    "bookId": "2-ne",
    "chapterNum": 28,
    "shortTitle": "El Engaño Suave (Lino)"
  },
  {
    "id": "fortificar_puntos_debiles_moroni",
    "category": "habitos_ataduras",
    "title": "Estrategia de defensa: fortificar tus puntos débiles de antemano",
    "keywords": [
      "defensas",
      "fortificaciones",
      "puntos debiles",
      "capitan moroni",
      "prevencion"
    ],
    "scriptureRef": "Alma 48:8-9",
    "scriptureQuote": "Y aconteció que Moroni no cesó de hacer preparativos para la guerra, o sea, para defender a su pueblo de los lamanitas; porque mandó que sus ejércitos... erigiesen fuertes alrededor de cada ciudad en toda la tierra circundante.",
    "pastoralInsight": "No esperes a que la tentación golpee para decidir qué harás. Pon filtros, cambia de hábitos, duerme temprano y establece barreras claras cuando estás fuerte.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/48?lang=spa&id=p8-p9#p8",
    "bookId": "alma",
    "chapterNum": 48,
    "shortTitle": "Fortificar Puntos Débiles"
  },
  {
    "id": "roca_cristo_fundamento_helaman",
    "category": "habitos_ataduras",
    "title": "Fundamento inquebrantable: edificar sobre la roca de Cristo",
    "keywords": [
      "roca de cristo",
      "fundamento seguro",
      "torbellinos del diablo",
      "helaman 5 12",
      "firmeza"
    ],
    "scriptureRef": "Helamán 5:12",
    "scriptureQuote": "Y ahora bien, recordad, hijos míos, recordad que es sobre la roca de nuestro Redentor, el cual es Cristo, el Hijo de Dios, donde debéis establecer vuestro fundamento, para que cuando el diablo lance sus impetuosos vientos... sus dardos en el torbellino... no tenga poder para arrastraros al abismo de miseria y angustia sin fin.",
    "pastoralInsight": "Las tormentas vendrán a todos, pero si tus pies están anclados al Salvador a través de convenios diarios, ninguna adicción ni torbellino podrá derribarte.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/hel/5?lang=spa&id=p12#p12",
    "bookId": "hel",
    "chapterNum": 5,
    "shortTitle": "La Roca de Cristo"
  },
  {
    "id": "cuidar_templo_cuerpo_salud",
    "category": "habitos_ataduras",
    "title": "Cuidado del cuerpo físico y pureza: la Palabra de Sabiduría",
    "keywords": [
      "salud",
      "palabra de sabiduria",
      "cuerpo templo",
      "alcohol",
      "drogas",
      "sustancias",
      "alcohol",
      "alcoholico",
      "alcoholismo",
      "bebida",
      "borracho",
      "vicio",
      "drogas",
      "tabaco",
      "sustancias"
    ],
    "scriptureRef": "Alma 46:40",
    "scriptureQuote": "Y hubo algunos que murieron de fiebres, que en ciertas estaciones del año eran muy frecuentes en esa región... pero no tantos como los que murieron a causa de las fiebres, por motivo de las excelentes cualidades de las muchas plantas y raíces que Dios había preparado para extirpar la causa de las enfermedades...",
    "pastoralInsight": "Dios proveyó cosas saludables para nuestro sustento y nos mandó cuidar el cuerpo. Mantener el templo corporal libre de sustancias destructivas despeja la mente para recibir revelación.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/46?lang=spa&id=p40#p40",
    "bookId": "alma",
    "chapterNum": 46,
    "shortTitle": "Alcohol, Drogas y Salud"
  },
  {
    "id": "redimido_del_abismo_cambio",
    "category": "habitos_ataduras",
    "title": "Nadie está tan hundido que no pueda ser rescatado por Dios",
    "keywords": [
      "redimido del abismo",
      "alma hijo",
      "rescate",
      "salvacion de lo profundo",
      "esperanza de cambio"
    ],
    "scriptureRef": "Mosíah 27:28",
    "scriptureQuote": "No obstante, después de vadear a través de mucha tribulación, arrepintiéndome casi hasta la muerte, el Señor en su misericordia ha tenido a bien arrebatarme de una llama eterna, y he nacido de Dios.",
    "pastoralInsight": "Alma hijo era el mayor perseguidor de la Iglesia de su época. Si Dios pudo transformar su vida, puede transformar la tuya o la de cualquier ser querido.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p28#p28",
    "bookId": "mosiah",
    "chapterNum": 27,
    "shortTitle": "Rescate del Abismo"
  },
  {
    "id": "perezosos_facilidad_senda",
    "category": "habitos_ataduras",
    "title": "Vencer la apatía espiritual y la pereza que abre la puerta al mal",
    "keywords": [
      "pereza",
      "apatia",
      "letargo espiritual",
      "facilidad de la senda",
      "descuido"
    ],
    "scriptureRef": "Alma 37:46",
    "scriptureQuote": "¡Oh hijo mío, no seamos perezosos por causa de la facilidad de la senda! Porque así fue con nuestros padres; pues así les fue preparado: que si miraban, vivían; así es con nosotros. La vía está preparada; y si queremos mirar, podremos vivir para siempre.",
    "pastoralInsight": "La mayoría de las caídas no ocurren por rebelión violenta, sino por dejar de orar y leer por pura pereza. Mantén tus hábitos espirituales vivos hoy.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37?lang=spa&id=p46#p46",
    "bookId": "alma",
    "chapterNum": 37,
    "shortTitle": "Pereza Espiritual"
  },
  {
    "id": "cortar_ambientes_armas_guerra",
    "category": "habitos_ataduras",
    "title": "Deshacerse de raíz de los detonantes de la adicción",
    "keywords": [
      "detonantes",
      "cortar de raiz",
      "armas de rebelion",
      "entorno sano",
      "cero recaida"
    ],
    "scriptureRef": "Alma 24:17-18",
    "scriptureQuote": "Y enterraron las armas que habían empleado para derramar sangre humana... y esto hicieron como testimonio a Dios de que nunca jamás emplearían armas; y de este modo atestiguaron su amor hacia Dios.",
    "pastoralInsight": "Si tienes que borrar una aplicación, cambiar de número, botar objetos o alejarte de un lugar, hazlo hoy. Tu paz eterna vale más que cualquier apego terrenal.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/24?lang=spa&id=p17-p18#p17",
    "bookId": "alma",
    "chapterNum": 24,
    "shortTitle": "Cortar Detonantes de Raíz"
  },
  {
    "id": "velar_y_orar_siempre_redes",
    "category": "habitos_ataduras",
    "title": "Velar y orar continuamente para no caer en las trampas sutiles",
    "keywords": [
      "velar y orar",
      "vigilancia",
      "trampas del diablo",
      "oracion preventiva"
    ],
    "scriptureRef": "3 Nefi 18:18",
    "scriptureQuote": "He aquí, de cierto, de cierto os digo que debéis velar y orar siempre, no sea que el diablo os tiente y seáis llevados cautivos por él.",
    "pastoralInsight": "La oración no es solo para pedir perdón tras el error; es el radar que te avisa del peligro antes de que caigas en él.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/18?lang=spa&id=p18#p18",
    "bookId": "3-ne",
    "chapterNum": 18,
    "shortTitle": "Velar y Orar contra Redes"
  },
  {
    "id": "romper_cadenas_saturnino",
    "category": "habitos_ataduras",
    "title": "Sacudirse el polvo y romper las pesadas cadenas del cautiverio",
    "keywords": [
      "romper cadenas",
      "sacudete el polvo",
      "cautiverio",
      "libertad en cristo",
      "lehi despertar"
    ],
    "scriptureRef": "2 Nefi 1:23",
    "scriptureQuote": "¡Despertad, hijos míos, y ceñíos la armadura de la rectitud! ¡Sacudíos las cadenas con que estáis atados, y salid de la obscuridad, y levantaos del polvo!",
    "pastoralInsight": "El Padre te llama a despertar con dignidad. No naciste para ser esclavo de una pantalla ni de un vicio; naciste para reinar en rectitud.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/1?lang=spa&id=p23#p23",
    "bookId": "2-ne",
    "chapterNum": 1,
    "shortTitle": "Romper las Cadenas"
  },
  {
    "id": "consulta_al_senor_todos_hechos",
    "category": "decisiones_futuro",
    "title": "Elegir empleo, profesión o tomar una gran decisión de vida",
    "keywords": [
      "empleo",
      "trabajo",
      "carrera",
      "decision dificil",
      "consulta al senor",
      "que debo hacer"
    ],
    "scriptureRef": "Alma 37:37",
    "scriptureQuote": "Consulta al Señor en todos tus hechos, y él te dirigirá para bien; sí, cuando te acuestes por la noche, acuéstate en el Señor, para que él te guarde en tu sueño; y cuando te levantes por la mañana, rebose tu corazón de gratitud a Dios; y si haces estas cosas, serás enaltecido en el postrer día.",
    "pastoralInsight": "No tomes decisiones importantes a solas con tu ansiedad. Presenta tus opciones en oración, pide confirmación y Él dirigirá tus pasos para bien.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37?lang=spa&id=p37#p37",
    "bookId": "alma",
    "chapterNum": 37,
    "shortTitle": "Elegir Empleo / Carrera"
  },
  {
    "id": "crisis_economica_dios_provee",
    "category": "decisiones_futuro",
    "title": "Miedo a la ruina económica, desempleo o falta de sustento",
    "keywords": [
      "desempleo",
      "sin dinero",
      "crisis economica",
      "falta de sustento",
      "pobreza",
      "deudas"
    ],
    "scriptureRef": "1 Nefi 17:3",
    "scriptureQuote": "Y así vemos que los mandamientos de Dios se deben cumplir. Y si los hijos de los hombres guardan los mandamientos de Dios, él los nutre y los fortalece, y les proporciona los medios para que puedan cumplir lo que les ha mandado.",
    "pastoralInsight": "Si estás esforzándote por ser justo, Dios no te abandonará en la escasez. Él proveyó alimento en el desierto y proveerá los medios para tu familia.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/17?lang=spa&id=p3#p3",
    "bookId": "1-ne",
    "chapterNum": 17,
    "shortTitle": "Desempleo y Sustento"
  },
  {
    "id": "diezmo_ventanas_de_cielos",
    "category": "decisiones_futuro",
    "title": "Pagar el diezmo y las ofrendas cuando el dinero apenas alcanza",
    "keywords": [
      "diezmo",
      "ofrendas",
      "ventanas de los cielos",
      "dinero",
      "probar a dios"
    ],
    "scriptureRef": "3 Nefi 24:10",
    "scriptureQuote": "Traed todos los diezmos al alfolí, para que haya alimento en mi casa; y probadme ahora en esto, dice el Señor de los Ejércitos, si no os abriré las ventanas de los cielos y derramaré sobre vosotros bendición tal que no haya donde contenerla.",
    "pastoralInsight": "El diezmo no se paga con dinero, sino con fe. Es la ley de la prosperidad espiritual que asegura la protección celestial sobre tu hogar.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/24?lang=spa&id=p10#p10",
    "bookId": "3-ne",
    "chapterNum": 24,
    "shortTitle": "Pagar el Diezmo en Crisis"
  },
  {
    "id": "guiado_por_espiritu_sin_saber",
    "category": "decisiones_futuro",
    "title": "Dar el paso en la oscuridad sin saber de antemano el camino",
    "keywords": [
      "dar el paso",
      "oscuridad",
      "guiado por el espiritu",
      "sin saber de antemano",
      "nefi laban"
    ],
    "scriptureRef": "1 Nefi 4:6",
    "scriptureQuote": "E iba guiado por el Espíritu, no sabiendo de antemano lo que tendría que hacer.",
    "pastoralInsight": "La revelación casi nunca llega en un mapa completo; llega como una linterna que alumbra solo el siguiente paso. Confía y camina.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/4?lang=spa&id=p6#p6",
    "bookId": "1-ne",
    "chapterNum": 4,
    "shortTitle": "Dar el Paso a Ciegas"
  },
  {
    "id": "riquezas_para_hacer_el_bien",
    "category": "decisiones_futuro",
    "title": "Buscar primero el reino de Dios antes que el dinero o la fama",
    "keywords": [
      "riquezas",
      "dinero",
      "ambicion",
      "buscar el reino de dios",
      "hacer el bien"
    ],
    "scriptureRef": "Jacob 2:18-19",
    "scriptureQuote": "Pero antes de buscar riquezas, buscad el reino de Dios; y cuando hayáis obtenido una esperanza en Cristo, obtendréis riquezas si las buscáis; y las buscaréis con el fin de hacer el bien...",
    "pastoralInsight": "Tener bienes no es pecado si el corazón está puesto en bendecir al necesitado y no en el orgullo terrenal.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/2?lang=spa&id=p18-p19#p18",
    "bookId": "jacob",
    "chapterNum": 2,
    "shortTitle": "Riquezas para el Bien"
  },
  {
    "id": "integridad_deudas_devolver",
    "category": "decisiones_futuro",
    "title": "Honradez en los negocios: devolver lo prestado y evitar trampas",
    "keywords": [
      "deudas",
      "prestamos",
      "honradez",
      "integridad",
      "devolver lo prestado"
    ],
    "scriptureRef": "Mosíah 4:28",
    "scriptureQuote": "Y quisiera que recordaseis que cualquiera de entre vosotros que pida prestado a su vecino debe devolver la cosa que tomó prestada, según haya convenido; de lo contrario, cometerás pecado, y tal vez hagas que tu vecino peque también.",
    "pastoralInsight": "La integridad en tus tratos económicos es testimonio puro del Evangelio. Un discípulo de Cristo honra su palabra aun a costa de su propia comodidad.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p28#p28",
    "bookId": "mosiah",
    "chapterNum": 4,
    "shortTitle": "Honradez y Devolver Deudas"
  },
  {
    "id": "compartir_con_pobre_aunque_poco",
    "category": "decisiones_futuro",
    "title": "Generosidad: compartir con el necesitado aunque tengamos poco",
    "keywords": [
      "generosidad",
      "ayudar al pobre",
      "compartir alimentos",
      "solidaridad",
      "rey benjamin"
    ],
    "scriptureRef": "Mosíah 4:21-22",
    "scriptureQuote": "Y si Dios... os da todo cuanto tenéis... ¡cuánto más debéis vosotros impartir de vuestros bienes los unos a los otros!... Y si juzgáis al hombre que os pide de vuestros bienes para no perecer... ¡cuánto más justa será vuestra condenación por retener vuestros bienes!",
    "pastoralInsight": "El Señor bendice las manos que dan. No esperes a tener abundancia para ser generoso; la ofrenda del que tiene poco tiene un valor incalculable en el cielo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p21-p22#p21",
    "bookId": "mosiah",
    "chapterNum": 4,
    "shortTitle": "Generosidad con el Pobre"
  },
  {
    "id": "planes_frustrados_consagrar",
    "category": "decisiones_futuro",
    "title": "Cuando tus mejores planes se derrumban inesperadamente",
    "keywords": [
      "planes frustrados",
      "fracaso de proyecto",
      "cambio de planes",
      "voluntad divina"
    ],
    "scriptureRef": "2 Nefi 2:2",
    "scriptureQuote": "No obstante, tú conoces la grandeza de Dios; y él consagrará tus aflicciones para tu provecho.",
    "pastoralInsight": "A veces una puerta cerrada es la mayor bendición de protección que Dios te da. Confía en Su visión panorámica.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2?lang=spa&id=p2#p2",
    "bookId": "2-ne",
    "chapterNum": 2,
    "shortTitle": "Cuando los Planes Fracasan"
  },
  {
    "id": "palabras_cristo_haran_saber",
    "category": "decisiones_futuro",
    "title": "Las palabras de Cristo os dirán todas las cosas que debéis hacer",
    "keywords": [
      "que debo hacer",
      "orientacion divina",
      "palabras de cristo",
      "direccion espiritual"
    ],
    "scriptureRef": "2 Nefi 32:3, 5",
    "scriptureQuote": "Deleitaos en las palabras de Cristo; porque he aquí, las palabras de Cristo os dirán todas las cosas que debéis hacer... Si entráis por la vía y recibís el Espíritu Santo, él os mostrará todas las cosas que debéis hacer.",
    "pastoralInsight": "Cuando no sepas qué decisión tomar, sumérgete en las Escrituras buscando principios. El Espíritu te dará la claridad exacta que necesitas.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/32?lang=spa&id=p3,p5#p3",
    "bookId": "2-ne",
    "chapterNum": 32,
    "shortTitle": "Dirección por la Palabra"
  },
  {
    "id": "no_tengo_pero_si_tuviera_daria",
    "category": "decisiones_futuro",
    "title": "Tranquilidad para quien no tiene recursos para dar a otros",
    "keywords": [
      "no tengo para dar",
      "deseo del corazon",
      "pobreza digna",
      "sin recursos"
    ],
    "scriptureRef": "Mosíah 4:24",
    "scriptureQuote": "Y también a los pobres me refiero... que no tenéis y sin embargo tenéis suficiente para subsistir día tras día: Quisiera que dijeseis en vuestros corazones: No doy porque no tengo, pero si tuviera, daría.",
    "pastoralInsight": "Dios mira el deseo íntimo de tu corazón. Si tus intenciones son puras, Él acepta tu deseo como si hubieses dado en abundancia.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p24#p24",
    "bookId": "mosiah",
    "chapterNum": 4,
    "shortTitle": "Deseo del Corazón sin Recursos"
  },
  {
    "id": "trabajar_propias_manos_ocio",
    "category": "decisiones_futuro",
    "title": "Trabajar con empeño y laboriosidad con nuestras propias manos",
    "keywords": [
      "trabajo duro",
      "laboriosidad",
      "propias manos",
      "autonomia",
      "autosuficiencia"
    ],
    "scriptureRef": "Mosíah 27:3-4",
    "scriptureQuote": "Y no debía haber orgullo ni soberbia entre ellos... antes bien, todo sacerdote y maestro debía trabajar con sus propias manos para su sostén en todos los casos, salvo en caso de enfermedad...",
    "pastoralInsight": "El trabajo honesto dignifica el alma y es el cimiento de la autosuficiencia espiritual y temporal. Dios bendice el sudor honesto.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p3-p4#p3",
    "bookId": "mosiah",
    "chapterNum": 27,
    "shortTitle": "Laboriosidad vs Ocio"
  },
  {
    "id": "gratitud_continua_misericordias",
    "category": "decisiones_futuro",
    "title": "Vivir cada día en acción de gracias por las misericordias recibidas",
    "keywords": [
      "gratitud",
      "accion de gracias",
      "bendiciones diarias",
      "misericordia"
    ],
    "scriptureRef": "Alma 34:38",
    "scriptureQuote": "Que no contendáis más contra el Espíritu Santo, sino que lo recibáis y toméis sobre vosotros el nombre de Cristo; que os humilléis hasta el polvo y adoréis a Dios en cualquier lugar en que estéis, en espíritu y en verdad; y que viváis cada día en acción de gracias por las muchas misericordias y bendiciones que él os concede.",
    "pastoralInsight": "Un corazón agradecido es inmune al desánimo. Empezar el día agradeciendo 3 cosas sencillas cambia por completo la perspectiva ante el futuro.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/34?lang=spa&id=p38#p38",
    "bookId": "alma",
    "chapterNum": 34,
    "shortTitle": "Gratitud Diaria"
  },
  {
    "id": "significado_santa_cena_semanal",
    "category": "convenios_capilla",
    "title": "El verdadero significado de la Santa Cena semanal: renovar convenios",
    "keywords": [
      "santa cena",
      "sacramento",
      "oracion del pan",
      "oracion del agua",
      "recordarle siempre",
      "espiritu santo"
    ],
    "scriptureRef": "Moroni 4:3; 5:2",
    "scriptureQuote": "Oh Dios, Padre Eterno, en el nombre de Jesucristo, tu Hijo, te pedimos que bendigas y santifiques este pan... para que testifiquen ante ti, oh Dios, Padre Eterno, que están dispuestos a tomar sobre sí el nombre de tu Hijo, y a recordarle siempre, y a guardar sus mandamientos que él les ha dado, para que siempre puedan tener su Espíritu consigo.",
    "pastoralInsight": "La Santa Cena no es para personas perfectas, sino para personas que están arrepintiéndose. Cada domingo es un nuevo comienzo donde tu bautismo se renueva por completo.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/4?lang=spa&id=p3#p3",
    "bookId": "moro",
    "chapterNum": 4,
    "shortTitle": "La Santa Cena Semanal"
  },
  {
    "id": "por_que_asistir_capilla_reunirse",
    "category": "convenios_capilla",
    "title": "¿Por qué es indispensable congregarse en la capilla los domingos?",
    "keywords": [
      "asistir a la capilla",
      "por que ir a la iglesia",
      "reunirse a menudo",
      "hermandad",
      "comunion"
    ],
    "scriptureRef": "Moroni 6:5-6",
    "scriptureQuote": "Y la iglesia se reunía a menudo para ayunar y orar, y para hablar unos con otros concerniente al bienestar de sus almas. Y se reunían a menudo para participar del pan y del vino, en memoria del Señor Jesús.",
    "pastoralInsight": "No vamos a la capilla porque todos sean perfectos; vamos para recordar a Cristo juntos, tomar la Santa Cena y cuidar del bienestar de nuestras almas.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/6?lang=spa&id=p5-p6#p5",
    "bookId": "moro",
    "chapterNum": 6,
    "shortTitle": "¿Por qué ir a la Capilla?"
  },
  {
    "id": "convenio_bautismal_aguas_mormon",
    "category": "convenios_capilla",
    "title": "El convenio bautismal: entrar en el redil y llevar cargas mutuas",
    "keywords": [
      "bautismo",
      "aguas de mormon",
      "convenio bautismal",
      "llevar cargas",
      "alma"
    ],
    "scriptureRef": "Mosíah 18:8-10",
    "scriptureQuote": "He aquí las aguas de Mormón... ya que deseáis entrar en el redil de Dios y ser llamados su pueblo... ¿qué os impide ser bautizados en el nombre del Señor, como testimonio ante él de que habéis concertado un convenio con él de que lo serviréis y guardaréis sus mandamientos, para que él derrame su Espíritu más abundantemente sobre vosotros?",
    "pastoralInsight": "El bautismo es sellar tu pertenencia a la familia de Dios. Haces la promesa de servirle y Él te promete Su Espíritu como compañero constante.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p8-p10#p8",
    "bookId": "mosiah",
    "chapterNum": 18,
    "shortTitle": "El Convenio Bautismal"
  },
  {
    "id": "don_espiritu_santo_lengua_angeles",
    "category": "convenios_capilla",
    "title": "El don del Espíritu Santo y hablar con lengua de ángeles",
    "keywords": [
      "espiritu santo",
      "don del espiritu santo",
      "fuego purificador",
      "lengua de angeles"
    ],
    "scriptureRef": "2 Nefi 31:13-14",
    "scriptureQuote": "Y entonces viene el bautismo de fuego y del Espíritu Santo; y entonces podéis hablar con lengua de ángeles y prorrumpir en alabanzas al Santo de Israel... porque las palabras de Cristo os dirán todas las cosas que debéis hacer.",
    "pastoralInsight": "El Espíritu Santo no es solo una voz tenue; es un fuego purificador que limpia tu corazón y te da palabras de consuelo para ministrar a otros.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31?lang=spa&id=p13-p14#p13",
    "bookId": "2-ne",
    "chapterNum": 31,
    "shortTitle": "Don del Espíritu Santo"
  },
  {
    "id": "templo_casa_del_senor_nefi",
    "category": "convenios_capilla",
    "title": "La santidad del Templo: centro de adoración y convenios eternos",
    "keywords": [
      "templo",
      "casa del senor",
      "convenios eternos",
      "adoracion sagrada",
      "nefi templo"
    ],
    "scriptureRef": "2 Nefi 5:16",
    "scriptureQuote": "Y yo, Nefi, edifiqué un templo; y lo construí según el modelo del templo de Salomón, salvo que no se construyó de tantos materiales preciosos... pero la confección fue semejante a la del templo de Salomón; y su obra fue sumamente fina.",
    "pastoralInsight": "Aun en medio del desierto y con pocos recursos, el pueblo de Nefi priorizó edificar un templo. En el templo encontramos refugio del ruido del mundo y poder celestial.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/5?lang=spa&id=p16#p16",
    "bookId": "2-ne",
    "chapterNum": 5,
    "shortTitle": "El Templo y Adoración"
  },
  {
    "id": "poder_espiritual_del_ayuno",
    "category": "convenios_capilla",
    "title": "El poder del ayuno sincero: espíritu de revelación y fortaleza",
    "keywords": [
      "ayuno",
      "ayunar",
      "revelacion",
      "poder espiritual",
      "hijos de mosiah"
    ],
    "scriptureRef": "Alma 17:2-3",
    "scriptureQuote": "Y lo que aún añade más a su gozo: eran todavía sus hermanos en el Señor; sí, y se habían fortalecido en el conocimiento de la verdad; porque eran hombres de sano juicio, y habían escudriñado diligentemente las Escrituras... Mas esto no es todo; se habían dedicado a mucha oración y ayuno; por tanto, tenían el espíritu de profecía y el espíritu de revelación...",
    "pastoralInsight": "El ayuno con propósito abre las compuertas de la revelación y rompe las ataduras de la duda. Cuando tengas una necesidad urgente, une tu oración al ayuno.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/17?lang=spa&id=p2-p3#p2",
    "bookId": "alma",
    "chapterNum": 17,
    "shortTitle": "Poder del Ayuno Sincero"
  },
  {
    "id": "sostener_lideres_servicio_humilde",
    "category": "convenios_capilla",
    "title": "Sostener a los líderes de la Iglesia y entender el liderazgo de servicio",
    "keywords": [
      "lideres",
      "obispo",
      "presidente de estaca",
      "rey benjamin",
      "sostener lideres"
    ],
    "scriptureRef": "Mosíah 2:11-14",
    "scriptureQuote": "No he mandado que me pagaseis dinero, ni yo mismo he buscado ninguna clase de riquezas... sino que yo mismo he trabajado con mis propias manos a fin de poder serviros, y para que no fueseis cargados con tributos... y de todas estas cosas que he dicho, vosotros mismos sois testigos este día.",
    "pastoralInsight": "En la Iglesia no hay clero pagado; nuestros líderes son vecinos y hermanos que sirven con sacrificio. Sostenerlos con nuestras oraciones fortalece al barrio entero.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/2?lang=spa&id=p11-p14#p11",
    "bookId": "mosiah",
    "chapterNum": 2,
    "shortTitle": "Sostener a los Líderes"
  },
  {
    "id": "aplicar_escrituras_hogar",
    "category": "convenios_capilla",
    "title": "Aplicar las Escrituras a nosotros mismos para provecho e instrucción",
    "keywords": [
      "aplicar las escrituras",
      "estudio familiar",
      "instruccion",
      "nefi isaias"
    ],
    "scriptureRef": "1 Nefi 19:23",
    "scriptureQuote": "Y les leí muchas cosas que estaban escritas en los libros de Moisés; pero a fin de persuadirlos más plenamente a creer en el Señor su Redentor, les leí lo que fue escrito por el profeta Isaías; porque apliqué todas las escrituras a nosotros mismos, para nuestro provecho e instrucción.",
    "pastoralInsight": "El Libro de Mormón no fue escrito para los antiguos; fue escrito para nuestros días. Cuando lo lees preguntando '¿cómo aplica esto a mi problema de hoy?', cobra vida.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/19?lang=spa&id=p23#p23",
    "bookId": "1-ne",
    "chapterNum": 19,
    "shortTitle": "Aplicar las Escrituras"
  },
  {
    "id": "dia_de_reposo_reverencia",
    "category": "convenios_capilla",
    "title": "El Día de Reposo: delicia de adoración, descanso y devoción",
    "keywords": [
      "dia de reposo",
      "domingo",
      "santificar el domingo",
      "descanso espiritual",
      "reverencia"
    ],
    "scriptureRef": "Mosíah 18:23, 25",
    "scriptureQuote": "Y les mandó que observaran el día de reposo y lo santificaran... Y había un día a la semana señalado en que debían reunirse para enseñar al pueblo y adorar al Señor su Dios; y también debían congregarse tan a menudo como estuviese en su poder.",
    "pastoralInsight": "El domingo es un oasis en el desierto de la semana. No es un día de prohibiciones, sino una oportunidad de recargar el espíritu y reconectar con la familia y con Dios.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p23,p25#p23",
    "bookId": "mosiah",
    "chapterNum": 18,
    "shortTitle": "El Día de Reposo"
  },
  {
    "id": "ministrar_uno_por_uno_cristo",
    "category": "convenios_capilla",
    "title": "El modelo divino de la ministración: cuidar a las almas uno por uno",
    "keywords": [
      "ministracion",
      "uno por uno",
      "visita de ministracion",
      "cuidar al projimo",
      "jesus ninos"
    ],
    "scriptureRef": "3 Nefi 17:21",
    "scriptureQuote": "Y aconteció que cuando hubo hablado estas palabras, lloró, y la multitud dio testimonio de ello; y tomó a sus niños pequeños, uno por uno, y los bendijo, y oró al Padre por ellos.",
    "pastoralInsight": "Jesús nunca ministró a bulto; se detuvo a mirar a los ojos y bendecir a cada uno por su nombre. Ese es el estándar de oro de nuestra ministración.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/17?lang=spa&id=p21#p21",
    "bookId": "3-ne",
    "chapterNum": 17,
    "shortTitle": "Ministrar Uno por Uno"
  },
  {
    "id": "perseverar_hasta_el_fin_esperanza",
    "category": "convenios_capilla",
    "title": "Seguir adelante con firmeza en Cristo: perseverar hasta el fin con gozo",
    "keywords": [
      "perseverar hasta el fin",
      "seguir adelante",
      "fulgor de esperanza",
      "firmeza en cristo"
    ],
    "scriptureRef": "2 Nefi 31:20",
    "scriptureQuote": "Por tanto, debéis seguir adelante con firmeza en Cristo, teniendo un fulgor perfecto de esperanza y amor por Dios y por todos los hombres. Por tanto, si marcháis adelante, deleitándoos en la palabra de Cristo, y perseveráis hasta el fin, he aquí, así dice el Padre: Tendréis la vida eterna.",
    "pastoralInsight": "Perseverar no es apretar los dientes con amargura hasta morir; es caminar con los ojos puestos en Cristo, con una sonrisa de esperanza y amor por los demás.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31?lang=spa&id=p20#p20",
    "bookId": "2-ne",
    "chapterNum": 31,
    "shortTitle": "Perseverar hasta el Fin"
  },
  {
    "id": "caridad_amor_puro_permanece",
    "category": "convenios_capilla",
    "title": "Pedir al Padre con toda la energía del corazón para ser llenos de amor",
    "keywords": [
      "pedir caridad",
      "energia del corazon",
      "amor puro de cristo",
      "moroni 7"
    ],
    "scriptureRef": "Moroni 7:47-48",
    "scriptureQuote": "Pero la caridad es el amor puro de Cristo, y permanece para siempre; y a quien la posea en el postrer día, le irá bien. Por consiguiente, amados hermanos míos, pedid al Padre con toda la energía de vuestros corazones, que seáis llenos de este amor que él ha otorgado a todos los que son verdaderos discípulos de su Hijo Jesucristo...",
    "pastoralInsight": "La caridad no es algo que fabricamos solos; es un don que se ruega de rodillas al Padre. Cuando ministres, pide primero ser lleno de ese amor puro por esa persona.",
    "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7?lang=spa&id=p47-p48#p47",
    "bookId": "moro",
    "chapterNum": 7,
    "shortTitle": "La Caridad Pura de Cristo"
  }
];
    const MORMON_BOOKS = [
  {
    "id": "1-ne",
    "title": "1 Nefi",
    "author": "Nefi",
    "period": "600 a.C. — 592 a.C.",
    "icon": "📜",
    "summary": "Éxodo de Jerusalén al desierto, obtención de las planchas de bronce, visión del Árbol de la Vida, la Liahona y la construcción del barco hacia la tierra prometida.",
    "url_slug": "1-ne",
    "chapters": [
      {
        "ch": 1,
        "fact": "Lehi ve un pilar de fuego y un libro profético",
        "summary": "advierte con valentía al pueblo de Jerusalén de la inminente destrucción y alaba la misericordia infinita de Dios.",
        "tags": [
          "oracion_ayuno",
          "decisiones_guia"
        ],
        "keywords": "lehi jerusalen pilar de fuego libro profecia misericordia destruccion",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "Lehi abandona sus riquezas y sale al desierto con su familia",
        "summary": "Lamán y Lemuel murmuran amargamente, pero el corazón humilde de Nefi es conmovido y consolado por el Señor.",
        "tags": [
          "familia_crisis",
          "decisiones_guia",
          "consuelo_afliccion"
        ],
        "keywords": "desierto riquezas murmullo laman lemuel corazon ablandado obediencia",
        "topics": [
          {
            "id": "perdonar_padres_errores",
            "category": "relaciones_hogar",
            "title": "Perdonar a los padres por heridas y equivocaciones del pasado",
            "keywords": [
              "perdonar a mis padres",
              "padres imperfectos",
              "heridas de infancia",
              "resentimiento familiar"
            ],
            "scriptureRef": "1 Nefi 2:16",
            "scriptureQuote": "Y aconteció que yo, Nefi... teniendo grandes deseos de conocer los misterios de Dios, clamé por tanto al Señor; y he aquí que él me visitó y enterneció mi corazón, de modo que creí todas las palabras que mi padre había hablado; así que no me rebelé contra él como lo habían hecho mis hermanos.",
            "pastoralInsight": "Tus padres fueron personas imperfectas enfrentando sus propias tormentas. Pedirle al Señor que enternezca tu corazón te liberará del peso amargo del reproche.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/2?lang=spa&id=p16#p16",
            "bookId": "1-ne",
            "chapterNum": 2,
            "shortTitle": "Perdonar a los Padres"
          }
        ]
      },
      {
        "ch": 3,
        "fact": "Nefi pronuncia su emblemático 'Iré y haré'",
        "summary": "regresando a Jerusalén con sus hermanos tras dos intentos fallidos para obtener las planchas de bronce de manos de Labán.",
        "tags": [
          "barco_imposibles",
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "ire y hare mandamiento laban planchas bronce oro plata sorteo",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "Nefi guiado por el Espíritu sin saber de antemano lo que haría",
        "summary": "encuentra a Labán ebrio, cumple el mandato del Señor para salvar a una nación y rescata al siervo Zoram.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "guiado espiritu espada laban zoram justificacion perecer incredulidad",
        "topics": [
          {
            "id": "guiado_por_espiritu_sin_saber",
            "category": "decisiones_futuro",
            "title": "Dar el paso en la oscuridad sin saber de antemano el camino",
            "keywords": [
              "dar el paso",
              "oscuridad",
              "guiado por el espiritu",
              "sin saber de antemano",
              "nefi laban"
            ],
            "scriptureRef": "1 Nefi 4:6",
            "scriptureQuote": "E iba guiado por el Espíritu, no sabiendo de antemano lo que tendría que hacer.",
            "pastoralInsight": "La revelación casi nunca llega en un mapa completo; llega como una linterna que alumbra solo el siguiente paso. Confía y camina.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/4?lang=spa&id=p6#p6",
            "bookId": "1-ne",
            "chapterNum": 4,
            "shortTitle": "Dar el Paso a Ciegas"
          }
        ]
      },
      {
        "ch": 5,
        "fact": "Sariah se consuela al abrazar a sus hijos sanos y salvos",
        "summary": "Lehi escudriña con gratitud las planchas de bronce, descubriendo su linaje de José y la plenitud de los cinco libros de Moisés.",
        "tags": [
          "familia_crisis",
          "consuelo_afliccion"
        ],
        "keywords": "sariah consuelo luto regreso gozo genealogia jose egipto escrituras",
        "topics": []
      },
      {
        "ch": 6,
        "fact": "Nefi define el propósito sagrado de sus anales",
        "summary": "no ocuparse de genealogías mundanas sino persuadir a todos los hombres a venir a Cristo y ser salvos.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "proposito anales venir a cristo dios de abraham salvacion",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Nefi perdona de todo corazón a sus hermanos tras ser atado",
        "summary": "luego de regresar a Jerusalén para convencer a la familia de Ismael de unirse a la travesía hacia la tierra prometida.",
        "tags": [
          "ira_ataque",
          "familia_crisis",
          "arrepentimiento_perdon"
        ],
        "keywords": "ismael rebelion atado cuerdas oracion perdon corazon hijas matrimonio",
        "topics": []
      },
      {
        "ch": 8,
        "fact": "Lehi contempla la sublime visión del Árbol de la Vida",
        "summary": "su fruto blanco y dulce que llena el alma de gozo inmenso, la barra de hierro y el gran y espacioso edificio de los soberbios.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas",
          "tentacion_ataduras"
        ],
        "keywords": "arbol de la vida barra de hierro fruto blanco gran y espacioso edificio rio vapor tinieblas",
        "topics": [
          {
            "id": "permanecer_arbol_vida_burlas",
            "category": "fe_dudas",
            "title": "Mantenerse firme junto al Árbol de la Vida frente a las burlas del mundo",
            "keywords": [
              "gran y espacioso edificio",
              "arbol de la vida",
              "burlas del mundo",
              "verguenza del evangelio"
            ],
            "scriptureRef": "1 Nefi 8:33",
            "scriptureQuote": "Y grande era la multitud que entraba en aquel edificio extraño. Y después de haber entrado en ese edificio, nos señalaban con dedo de escarnio a mí y a los que también estábamos comiendo del fruto; pero no les hicimos caso.",
            "pastoralInsight": "La clave de Lehi y los fieles fue una sola frase: 'no les hicimos caso'. No discutas con el edificio espacioso de las redes sociales; sigue saboreando el amor de Dios.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/8?lang=spa&id=p33#p33",
            "bookId": "1-ne",
            "chapterNum": 8,
            "shortTitle": "Burlas del Mundo (Edificio)"
          }
        ]
      },
      {
        "ch": 9,
        "fact": "Nefi recibe el mandato de labrar dos juegos de planchas",
        "summary": "para un sabio propósito del Señor que él todavía no comprende pero obedece con absoluta fe.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "dos juegos planchas sabio proposito obediencia preparacion",
        "topics": []
      },
      {
        "ch": 10,
        "fact": "Lehi profetiza el bautismo del Mesías por Juan el Bautista",
        "summary": "la dispersión y el recogimiento de Israel, y promete que quien busque con diligencia hallará los misterios de Dios por el Espíritu Santo.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "juan bautista bautismo mesias espiritu santo olivo recogimiento",
        "topics": []
      },
      {
        "ch": 11,
        "fact": "Nefi contempla la condescendencia de Dios y el amor del Redentor",
        "summary": "viendo a María, el nacimiento del Cordero de Dios, Su bautismo, ministerio terrenal y Su crucifixión por los pecados del mundo.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "condescendencia maria cordero de dios amor de dios cruz salvacion",
        "topics": []
      },
      {
        "ch": 12,
        "fact": "Nefi ve en visión la visita de Cristo resucitado a sus descendientes",
        "summary": "la era de paz en América y la posterior decadencia y aniquilación final nefita por causa del orgullo.",
        "tags": [
          "fe_semilla_dudas",
          "tentacion_ataduras"
        ],
        "keywords": "visita cristo america doce discipulos guerra orgullo destruccion",
        "topics": []
      },
      {
        "ch": 13,
        "fact": "Nefi observa la formación de la gran iglesia abominable",
        "summary": "la pérdida de verdades claras y preciosas de la Biblia, el viaje de Colón y la gloriosa Restauración en los últimos días.",
        "tags": [
          "fe_semilla_dudas",
          "capilla_comunion"
        ],
        "keywords": "iglesia abominable verdades claras y preciosas biblia colon restauracion gentiles",
        "topics": []
      },
      {
        "ch": 14,
        "fact": "Nefi contempla los dos únicos poderes (el Cordero vs el diablo)",
        "summary": "y ve a los santos del convenio de Dios armados con rectitud y el supremo poder divino sobre la faz de la tierra.",
        "tags": [
          "tentacion_ataduras",
          "capilla_comunion",
          "consuelo_afliccion"
        ],
        "keywords": "dos iglesias cordero diablo santos armados poder rectitud apocalipsis juan",
        "topics": []
      },
      {
        "ch": 15,
        "fact": "Nefi reprende a sus hermanos preguntándoles: '¿Habéis consultado al Señor?'",
        "summary": "y les explica con paciencia que la barra de hierro es la palabra viva de Dios que apaga los dardos de fuego del enemigo.",
        "tags": [
          "fe_semilla_dudas",
          "oracion_ayuno",
          "tentacion_ataduras"
        ],
        "keywords": "consultar al señor barra de hierro palabra de dios dardos fuego olivo",
        "topics": [
          {
            "id": "desgano_leer_escrituras",
            "category": "fe_dudas",
            "title": "Falta de ganas de leer las Escrituras / La barra de hierro",
            "keywords": [
              "leer escrituras",
              "flojera leer",
              "no tengo tiempo",
              "barra de hierro",
              "palabra de dios"
            ],
            "scriptureRef": "1 Nefi 15:23-24",
            "scriptureQuote": "Y les dije que era la palabra de Dios; y que quienes escucharan la palabra de Dios y se aferraran a ella, no perecerían jamás; ni los vencerían las tentaciones ni los ardientes dardos del adversario para cegarlos y llevarlos a la destrucción.",
            "pastoralInsight": "Las Escrituras no son una tarea para tachar de una lista; son el escudo cotidiano que apaga los dardos inflamados de ansiedad y tentación que el mundo te lanza.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/15?lang=spa&id=p23-p24#p23",
            "bookId": "1-ne",
            "chapterNum": 15,
            "shortTitle": "Desgano por las Escrituras"
          }
        ]
      },
      {
        "ch": 16,
        "fact": "La Liahona guía a la familia según la fe y Nefi talla un nuevo arco de madera",
        "summary": "para cazar y alimentar a su hambrienta familia en medio de la aflicción del desierto tras romperse su arco de acero.",
        "tags": [
          "salud_sabiduria",
          "consuelo_afliccion",
          "barco_imposibles",
          "familia_crisis"
        ],
        "keywords": "liahona brujula arco roto madera hambre comida desierto nahom muerte ismael",
        "topics": []
      },
      {
        "ch": 17,
        "fact": "Nefi construye el barco por mandato del Señor ante la burla de Lamán y Lemuel",
        "summary": "demostrando que Dios alimenta con carne cruda nutritiva y sacude a los rebeldes con el poder fulgurante del Espíritu.",
        "tags": [
          "barco_imposibles",
          "ira_ataque",
          "salud_sabiduria",
          "consuelo_afliccion"
        ],
        "keywords": "construir barco abundancia herramientas fuego mineral burla sacudida carne cruda",
        "topics": [
          {
            "id": "crisis_economica_dios_provee",
            "category": "decisiones_futuro",
            "title": "Miedo a la ruina económica, desempleo o falta de sustento",
            "keywords": [
              "desempleo",
              "sin dinero",
              "crisis economica",
              "falta de sustento",
              "pobreza",
              "deudas"
            ],
            "scriptureRef": "1 Nefi 17:3",
            "scriptureQuote": "Y así vemos que los mandamientos de Dios se deben cumplir. Y si los hijos de los hombres guardan los mandamientos de Dios, él los nutre y los fortalece, y les proporciona los medios para que puedan cumplir lo que les ha mandado.",
            "pastoralInsight": "Si estás esforzándote por ser justo, Dios no te abandonará en la escasez. Él proveyó alimento en el desierto y proveerá los medios para tu familia.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/17?lang=spa&id=p3#p3",
            "bookId": "1-ne",
            "chapterNum": 17,
            "shortTitle": "Desempleo y Sustento"
          }
        ]
      },
      {
        "ch": 18,
        "fact": "El barco navega y arriba triunfante a la Tierra Prometida",
        "summary": "luego de calmarse la furiosa tempestad marina provocada por la insensata rebelión y ataduras impuestas por Lamán y Lemuel.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno",
          "barco_imposibles",
          "ira_ataque"
        ],
        "keywords": "tierra prometida tempestad atado liahona calma desembarco semillas oro plata",
        "topics": []
      },
      {
        "ch": 19,
        "fact": "Nefi graba las profecías del sufrimiento del Redentor en la cruz",
        "summary": "citando a los profetas Zenoc, Neum y Zenós sobre cómo la tierra gemirá y las islas del mar esperarán Su ley.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "zenoc neum zenos sufrimiento cruz tres dias tinieblas recogimiento",
        "topics": [
          {
            "id": "aplicar_escrituras_hogar",
            "category": "convenios_capilla",
            "title": "Aplicar las Escrituras a nosotros mismos para provecho e instrucción",
            "keywords": [
              "aplicar las escrituras",
              "estudio familiar",
              "instruccion",
              "nefi isaias"
            ],
            "scriptureRef": "1 Nefi 19:23",
            "scriptureQuote": "Y les leí muchas cosas que estaban escritas en los libros de Moisés; pero a fin de persuadirlos más plenamente a creer en el Señor su Redentor, les leí lo que fue escrito por el profeta Isaías; porque apliqué todas las escrituras a nosotros mismos, para nuestro provecho e instrucción.",
            "pastoralInsight": "El Libro de Mormón no fue escrito para los antiguos; fue escrito para nuestros días. Cuando lo lees preguntando '¿cómo aplica esto a mi problema de hoy?', cobra vida.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/19?lang=spa&id=p23#p23",
            "bookId": "1-ne",
            "chapterNum": 19,
            "shortTitle": "Aplicar las Escrituras"
          }
        ]
      },
      {
        "ch": 20,
        "fact": "Isaías 48: Jehová refina a Su pueblo en el horno de la aflicción",
        "summary": "recordándoles que por amor a Su santo nombre no los cortará y los redimirá de las ataduras babilónicas.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "horno afliccion isaias babilonia redencion aguas sed roca",
        "topics": []
      },
      {
        "ch": 21,
        "fact": "Isaías 49: El Señor promete que jamás olvidará a Sion",
        "summary": "¿puede una mujer olvidar a su hijo de pecho? Aunque ella lo olvide, Él nos tiene esculpidos en las palmas de Sus manos.",
        "tags": [
          "consuelo_afliccion",
          "familia_crisis"
        ],
        "keywords": "palmas manos grabados compasion hijo pecho muros rescate reyes nodrizas",
        "topics": [
          {
            "id": "soledad_sensacion_abandono",
            "category": "salud_mental",
            "title": "Sentimiento desgarrador de soledad y abandono",
            "keywords": [
              "soledad",
              "solo",
              "aislado",
              "abandono",
              "nadie me quiere",
              "invisible",
              "olvidado"
            ],
            "scriptureRef": "1 Nefi 21:14-16",
            "scriptureQuote": "Pero Sión ha dicho: El Señor me ha desamparado, y mi Señor se ha olvidado de mí. ¿Puede una mujer olvidar a su niño de pecho, para dejar de compadecerse del hijo de su vientre? Pues aunque ellas olviden, yo no me olvidaré de ti. He aquí, en las palmas de mis manos te tengo grabado.",
            "pastoralInsight": "Dios jamás nos olvida. Las marcas de los clavos en las manos del Salvador son el recordatorio eterno de que tu nombre está grabado indeleblemente en Su corazón.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne/21?lang=spa&id=p14-p16#p14",
            "bookId": "1-ne",
            "chapterNum": 21,
            "shortTitle": "Soledad y Abandono"
          }
        ]
      },
      {
        "ch": 22,
        "fact": "Nefi explica el recogimiento espiritual y físico de Israel en los postreros días",
        "summary": "asegurando que los justos no deben temer porque el Santo de Israel los preservará con Su brazo omnipotente.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "recogimiento israel gentiles brazo desnudo fuego santos no temeran",
        "topics": []
      }
    ]
  },
  {
    "id": "2-ne",
    "title": "2 Nefi",
    "author": "Nefi / Lehi / Jacob",
    "period": "588 a.C. — 545 a.C.",
    "icon": "📜",
    "summary": "Últimas bendiciones y enseñanzas de Lehi, el albedrío moral, el Salmo de Nefi, separación de nefitas y lamanitas, capítulos de Isaías, y la Doctrina de Cristo.",
    "url_slug": "2-ne",
    "chapters": [
      {
        "ch": 1,
        "fact": "Lehi exhorta a sus hijos a despertar del profundo sueño del pecado",
        "summary": "y vestir la armadura de la rectitud para que su posteridad no sea destruida en la tierra escogida.",
        "tags": [
          "familia_crisis",
          "tentacion_ataduras"
        ],
        "keywords": "despertad polvo cadenas sueno pecado armadura tierra prometida libertad",
        "topics": [
          {
            "id": "romper_cadenas_saturnino",
            "category": "habitos_ataduras",
            "title": "Sacudirse el polvo y romper las pesadas cadenas del cautiverio",
            "keywords": [
              "romper cadenas",
              "sacudete el polvo",
              "cautiverio",
              "libertad en cristo",
              "lehi despertar"
            ],
            "scriptureRef": "2 Nefi 1:23",
            "scriptureQuote": "¡Despertad, hijos míos, y ceñíos la armadura de la rectitud! ¡Sacudíos las cadenas con que estáis atados, y salid de la obscuridad, y levantaos del polvo!",
            "pastoralInsight": "El Padre te llama a despertar con dignidad. No naciste para ser esclavo de una pantalla ni de un vicio; naciste para reinar en rectitud.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/1?lang=spa&id=p23#p23",
            "bookId": "2-ne",
            "chapterNum": 1,
            "shortTitle": "Romper las Cadenas"
          }
        ]
      },
      {
        "ch": 2,
        "fact": "Lehi enseña el Plan de Salvación a su hijo Jacob: oposición en todas las cosas",
        "summary": "el libre albedrío para elegir la libertad eterna o la cautiverio, y proclama: 'Adán cayó para que los hombres existiesen, y existen para que tengan gozo'.",
        "tags": [
          "consuelo_afliccion",
          "decisiones_guia",
          "tentacion_ataduras"
        ],
        "keywords": "oposicion todas cosas caida adan libre albedrio gozo cristo redencion ley",
        "topics": [
          {
            "id": "gozo_proposito_vida",
            "category": "salud_mental",
            "title": "Recordar el propósito de la existencia: los hombres existen para tener gozo",
            "keywords": [
              "gozo",
              "felicidad",
              "proposito",
              "sentido",
              "para que vivo",
              "existencia",
              "alegria"
            ],
            "scriptureRef": "2 Nefi 2:25",
            "scriptureQuote": "Adán cayó para que los hombres existiesen, y existen los hombres para que tengan gozo.",
            "pastoralInsight": "Dios no diseñó esta vida para que vivamos en miseria o culpa constante; el objetivo supremo del Plan de Salvación es el gozo verdadero en Cristo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2?lang=spa&id=p25#p25",
            "bookId": "2-ne",
            "chapterNum": 2,
            "shortTitle": "El Propósito: Gozo"
          },
          {
            "id": "bendicion_sin_sanidad_inmediata",
            "category": "duelo_dolor",
            "title": "Cuando una bendición del sacerdocio no trae sanidad inmediata",
            "keywords": [
              "bendicion sacerdocio",
              "no sano",
              "por que no sana",
              "voluntad de dios",
              "fe para no ser sanado"
            ],
            "scriptureRef": "2 Nefi 2:1-2",
            "scriptureQuote": "Jacob, mi primogénito en el desierto: Tú has padecido aflicciones y mucho dolor por causa de la dureza de tus hermanos. No obstante, tú conoces la grandeza de Dios; y él consagrará tus aflicciones para tu provecho.",
            "pastoralInsight": "A veces la respuesta de Dios no es quitar el cáliz al instante, sino consagrar el dolor para refinar nuestra alma de forma santa. Su poder sigue obrando en ti.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2?lang=spa&id=p1-p2#p1",
            "bookId": "2-ne",
            "chapterNum": 2,
            "shortTitle": "Cuando no Hay Sanidad"
          },
          {
            "id": "planes_frustrados_consagrar",
            "category": "decisiones_futuro",
            "title": "Cuando tus mejores planes se derrumban inesperadamente",
            "keywords": [
              "planes frustrados",
              "fracaso de proyecto",
              "cambio de planes",
              "voluntad divina"
            ],
            "scriptureRef": "2 Nefi 2:2",
            "scriptureQuote": "No obstante, tú conoces la grandeza de Dios; y él consagrará tus aflicciones para tu provecho.",
            "pastoralInsight": "A veces una puerta cerrada es la mayor bendición de protección que Dios te da. Confía en Su visión panorámica.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/2?lang=spa&id=p2#p2",
            "bookId": "2-ne",
            "chapterNum": 2,
            "shortTitle": "Cuando los Planes Fracasan"
          }
        ]
      },
      {
        "ch": 3,
        "fact": "Lehi bendice a su hijo menor José citando a José de Egipto",
        "summary": "quien profetizó la futura labor de un vidente escogido en los últimos días llamado José (José Smith), hijo de José.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas"
        ],
        "keywords": "jose egipto vidente escogido jose smith restauracion planchas biblia vara",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "El Salmo de Nefi: tras la muerte de Lehi, Nefi gime por sus pecados y flaquezas",
        "summary": "pero clama con gozo triunfal: '¡Sé en quién he confiado! Dios ha sido mi apoyo; ¡oh Señor, confío en ti para siempre!'.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno",
          "ira_ataque",
          "arrepentimiento_perdon"
        ],
        "keywords": "salmo nefi muerte lehi lamento flaquezas roca confianza oracion enojo",
        "topics": [
          {
            "id": "depresion_desanimo_salmo_nefi",
            "category": "salud_mental",
            "title": "Depresión profunda, tristeza continua y el llanto del alma",
            "keywords": [
              "depresion",
              "tristeza",
              "llanto",
              "bajon",
              "abatimiento",
              "desanimo",
              "desesperanza",
              "triste"
            ],
            "scriptureRef": "2 Nefi 4:16-19, 26-28",
            "scriptureQuote": "Mi corazón se apesadumbra a causa de mis aflicciones... ¡Oh, miserable hombre que soy!... ¿Por qué ha de quebrantarse mi corazón, y languidecer mi alma, y gemir en el valle del dolor?... ¡Despierta, alma mía! No te abatas más en el pecado. ¡Regocíjate, oh corazón mío, y no des más lugar al enemigo de mi alma!",
            "pastoralInsight": "Nefi, un profeta gigante, también experimentó días oscuros de llanto y abatimiento. La salida no es fingir estar bien, sino desahogar el alma y recordar en Quién hemos confiado.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/4?lang=spa&id=p16-p19,p26-p28#p16",
            "bookId": "2-ne",
            "chapterNum": 4,
            "shortTitle": "Depresión y Desánimo"
          },
          {
            "id": "autoestima_inutil_desprecio",
            "category": "salud_mental",
            "title": "Sentirse inútil, indigno o con baja autoestima personal",
            "keywords": [
              "autoestima",
              "inutil",
              "no valgo nada",
              "rechazo a mi mismo",
              "desprecio",
              "complejo",
              "fracasado"
            ],
            "scriptureRef": "2 Nefi 4:34-35",
            "scriptureQuote": "¡Oh Señor, en ti he confiado, y en ti confiaré para siempre! No pondré mi confianza en el brazo de la carne... Sí, clamaré a ti, mi Dios, roca de mi justicia. He aquí, mi voz ascenderá para siempre a ti, mi roca y mi Dios eterno.",
            "pastoralInsight": "Tu valor no se mide por tus debilidades ni por la opinión humana, sino por el precio infinito que el Salvador pagó por ti en Getsemaní.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/4?lang=spa&id=p34-p35#p34",
            "bookId": "2-ne",
            "chapterNum": 4,
            "shortTitle": "Baja Autoestima"
          }
        ]
      },
      {
        "ch": 5,
        "fact": "Nefi huye con los suyos al desierto por advertencia divina y edifica un templo",
        "summary": "enseñando a su pueblo la industria, agricultura y defensa, viviendo 'de una manera feliz'.",
        "tags": [
          "capilla_comunion",
          "familia_crisis",
          "salud_sabiduria"
        ],
        "keywords": "separacion huida templo salomon industria espadas manera feliz maldicion",
        "topics": [
          {
            "id": "templo_casa_del_senor_nefi",
            "category": "convenios_capilla",
            "title": "La santidad del Templo: centro de adoración y convenios eternos",
            "keywords": [
              "templo",
              "casa del senor",
              "convenios eternos",
              "adoracion sagrada",
              "nefi templo"
            ],
            "scriptureRef": "2 Nefi 5:16",
            "scriptureQuote": "Y yo, Nefi, edifiqué un templo; y lo construí según el modelo del templo de Salomón, salvo que no se construyó de tantos materiales preciosos... pero la confección fue semejante a la del templo de Salomón; y su obra fue sumamente fina.",
            "pastoralInsight": "Aun en medio del desierto y con pocos recursos, el pueblo de Nefi priorizó edificar un templo. En el templo encontramos refugio del ruido del mundo y poder celestial.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/5?lang=spa&id=p16#p16",
            "bookId": "2-ne",
            "chapterNum": 5,
            "shortTitle": "El Templo y Adoración"
          }
        ]
      },
      {
        "ch": 6,
        "fact": "Jacob lee las profecías de Isaías sobre el pueblo del convenio",
        "summary": "testificando de la primera venida del Mesías a los judíos y Su rescate final en los últimos días.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "jacob isaias rescate judios convenio gentiles promesa",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Isaías 50: El Salvador declara que dio Su espalda a los que le herían",
        "summary": "y no escondió Su rostro de las injurias ni de los esputos, poniendo Su rostro como un pedernal confiando en Su Dios.",
        "tags": [
          "ira_ataque",
          "consuelo_afliccion"
        ],
        "keywords": "espalda heridores injurias esputos pedernal confianza siervo",
        "topics": []
      },
      {
        "ch": 8,
        "fact": "Isaías 51: Jehová consolará a Sion y transformará su desierto en Edén",
        "summary": "reclamando a Su pueblo: '¿Quién eres tú para temer al hombre que morirá y te olvidas de Jehová tu Hacedor?'.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "eden consuelo no temais oprobio brazo despierta cautiverio gozo",
        "topics": [
          {
            "id": "tristeza_rechazo_vilipendios",
            "category": "salud_mental",
            "title": "Tristeza y dolor por el rechazo social, burlas o calumnias",
            "keywords": [
              "rechazo",
              "burlas",
              "bullying",
              "calumnias",
              "vilipendios",
              "oprobio",
              "desprecio social"
            ],
            "scriptureRef": "2 Nefi 8:7",
            "scriptureQuote": "Escuchadme, los que conocéis la rectitud, pueblo en cuyo corazón he puesto mi ley: No temáis el oprobio de los hombres, ni tengáis miedo de sus vilipendios.",
            "pastoralInsight": "El dolor del rechazo duele en lo profundo, pero el Señor nos pide que no dejemos que las opiniones humanas definan nuestra paz. Dios aprueba tu caminar honesto.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/8?lang=spa&id=p7#p7",
            "bookId": "2-ne",
            "chapterNum": 8,
            "shortTitle": "Rechazo y Burlas"
          }
        ]
      },
      {
        "ch": 9,
        "fact": "El gran sermón expiatorio de Jacob: la victoria sobre la muerte y el infierno",
        "summary": "gracias a la Expiación infinita de Jesucristo; expone los diez '¡Ayes!' contra la mentira, el orgullo, las riquezas y la fornicación.",
        "tags": [
          "arrepentimiento_perdon",
          "consuelo_afliccion",
          "tentacion_ataduras"
        ],
        "keywords": "expiacion infinita monstruo muerte infierno resurreccion paraiso ayes pecado",
        "topics": [
          {
            "id": "sabios_en_su_propia_opinion",
            "category": "fe_dudas",
            "title": "El peligro del intelectualismo soberbio que apaga el testimonio",
            "keywords": [
              "intelectualismo",
              "soberbia intelectual",
              "creerse sabios",
              "apoyarse en la carne"
            ],
            "scriptureRef": "2 Nefi 9:28-29",
            "scriptureQuote": "¡Oh ese sutil plan del maligno! ¡Oh las vanidades, y las flaquezas, y las necedades de los hombres! Cuando son instruidos se creen sabios, y no escuchan el consejo de Dios... Pero bueno es ser instruido, si hacen caso de los consejos de Dios.",
            "pastoralInsight": "El Evangelio ama el estudio y la verdad, pero la razón sin humildad espiritual se vuelve ciega. Estudia con la mente y cree con el corazón.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/9?lang=spa&id=p28-p29#p28",
            "bookId": "2-ne",
            "chapterNum": 9,
            "shortTitle": "Intelectualismo Soberbio"
          }
        ]
      },
      {
        "ch": 10,
        "fact": "Jacob explica por qué el Mesías debía morir en Judea",
        "summary": "pues ninguna otra nación sobre la tierra crucificaría a su propio Dios, y llama al pueblo a reconciliarse con Su gracia salvadora.",
        "tags": [
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "crucifixion judios gracia albedrio reconciliacion resurreccion vida eterna",
        "topics": []
      },
      {
        "ch": 11,
        "fact": "Nefi declara que su alma se deleita en testificar de Cristo",
        "summary": "presentando tres grandes testigos de la gloria redentora del Salvador: Isaías, Jacob y el propio Nefi.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "tres testigos isaias jacob nefi deleite alma redentor",
        "topics": []
      },
      {
        "ch": 12,
        "fact": "Isaías 2: El monte de la casa del Señor será establecido en la cumbre de los montes",
        "summary": "todas las naciones correrán a él, de Sion saldrá la ley y transformarán sus espadas en rejas de arado.",
        "tags": [
          "capilla_comunion",
          "ira_ataque"
        ],
        "keywords": "monte del senor templo ley sion espadas arados paz soberbia abatida",
        "topics": []
      },
      {
        "ch": 13,
        "fact": "Isaías 3: Juicio contra los gobernantes que despojan y oprimen al pobre",
        "summary": "y contra la vanidad superficial de las hijas de Sion entregadas a lujos mundanos.",
        "tags": [
          "tentacion_ataduras",
          "caridad_servicio"
        ],
        "keywords": "juicio opresion pobres vanidad adornos soberbia justicia",
        "topics": []
      },
      {
        "ch": 14,
        "fact": "Isaías 4: El renuevo de Jehová será hermoso y glorioso",
        "summary": "y sobre cada morada de Sion habrá nube de día y resplandor de fuego de noche como refugio contra la tempestad.",
        "tags": [
          "consuelo_afliccion",
          "capilla_comunion"
        ],
        "keywords": "renuevo refugio nube fuego templo santuario purificacion",
        "topics": []
      },
      {
        "ch": 15,
        "fact": "Isaías 5: El cántico de la viña y ¡ay de los que a lo malo llaman bueno!",
        "summary": "y a lo bueno malo; el Señor alza pendón a las naciones lejanas convocándolas velozmente.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "vina uvas silvestres malo bueno tinieblas luz sabios ojos pendon",
        "topics": []
      },
      {
        "ch": 16,
        "fact": "Isaías 6: Visión sublime del trono de Dios en el templo",
        "summary": "un serafín purifica los labios de Isaías con un carbón encendido del altar, y responde: 'Heme aquí, envíame a mí'.",
        "tags": [
          "arrepentimiento_perdon",
          "capilla_comunion",
          "caridad_servicio"
        ],
        "keywords": "vision templo tronos serafines labios carbon santo heme aqui llamamiento",
        "topics": []
      },
      {
        "ch": 17,
        "fact": "Isaías 7: La gloriosa profecía mesiánica de Emanuel",
        "summary": "'He aquí que la virgen concebirá y dará a luz un hijo, y llamará su nombre Emanuel (Dios con nosotros)'.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "virgen emanuel profecia senal acaz siria israel",
        "topics": []
      },
      {
        "ch": 18,
        "fact": "Isaías 8: Cristo es santuario para los justos pero piedra de tropiezo para los rebeldes",
        "summary": "manda consultar a la ley y al testimonio divino en lugar de recurrir a espiritistas o adivinos.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "piedra tropiezo santuario ley testimonio adivinos confianza",
        "topics": []
      },
      {
        "ch": 19,
        "fact": "Isaías 9: El pueblo que andaba en tinieblas vio gran luz",
        "summary": "porque un niño nos es nacido: 'Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz'.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "luz tinieblas principe de paz admirable consejero gobierno eterno",
        "topics": []
      },
      {
        "ch": 20,
        "fact": "Isaías 10: La destrucción de Asiria tipifica el destino de los orgullosos",
        "summary": "que se jactan contra el hacha y la sierra de Dios; un remanente fiel volverá al Dios Fuerte.",
        "tags": [
          "resiliencia",
          "fe_semilla_dudas"
        ],
        "keywords": "asiria orgullo hacha sierra remanente juicio vara",
        "topics": []
      },
      {
        "ch": 21,
        "fact": "Isaías 11: Saldrá una vara del tronco de Isaí",
        "summary": "el lobo morará con el cordero, la tierra será llena del conocimiento de Jehová y el Señor alzará pendón para recoger a los dispersos.",
        "tags": [
          "ira_ataque",
          "capilla_comunion"
        ],
        "keywords": "tronco isai vara lobo cordero paz recogimiento pendon naciones",
        "topics": []
      },
      {
        "ch": 22,
        "fact": "Isaías 12: Cántico de gozo y gratitud salvadora",
        "summary": "'He aquí, Dios es mi salvación; tendré confianza y no temeré, porque Jehová es mi fortaleza y mi cántico'.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno"
        ],
        "keywords": "salvacion aguas gozo cantico fortaleza alabanza sion",
        "topics": [
          {
            "id": "miedo_futuro_terror",
            "category": "salud_mental",
            "title": "Miedo paralizante al futuro y a lo que vendrá",
            "keywords": [
              "miedo",
              "temor",
              "terror",
              "panico al futuro",
              "inseguridad",
              "incertidumbre",
              "preocupacion"
            ],
            "scriptureRef": "2 Nefi 22:2",
            "scriptureQuote": "He aquí, Dios es mi salvación; confiaré y no temeré, porque el Señor Jehová es mi fortaleza y mi cántico; él también ha llegado a ser mi salvación.",
            "pastoralInsight": "El miedo anticipa desgracias que el Señor promete disipar con Su presencia. Ayúdale a enfocar su energía solo en el día de hoy con la certeza de que Dios ya está en su mañana.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/22?lang=spa&id=p2#p2",
            "bookId": "2-ne",
            "chapterNum": 22,
            "shortTitle": "Miedo al Futuro"
          }
        ]
      },
      {
        "ch": 23,
        "fact": "Isaías 13: La caída total e irrevocable de Babilonia",
        "summary": "símbolo profético de la caída del mundo corrompido ante la venida del día grande del Señor.",
        "tags": [
          "tentacion_ataduras"
        ],
        "keywords": "babilonia destruccion estrellas sol tinieblas dia senor",
        "topics": []
      },
      {
        "ch": 24,
        "fact": "Isaías 14: La estrepitosa caída de Lucifer: '¡Cómo caíste del cielo, oh Lucero!'",
        "summary": "derribado hasta el sepulcro por su insaciable soberbia de querer colocarse por encima del trono de Dios.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "lucifer lucero caida cielo soberbia sepulcro trono",
        "topics": []
      },
      {
        "ch": 25,
        "fact": "Nefi proclama: 'Hablamos de Cristo, nos regocijamos en Cristo, predicamos de Cristo'",
        "summary": "enseñando que la salvación es por la gracia del Redentor después de hacer cuanto podamos.",
        "tags": [
          "fe_semilla_dudas",
          "familia_crisis",
          "arrepentimiento_perdon"
        ],
        "keywords": "hablamos de cristo regocijamos gracia despues hacer cuanto podamos fe ley moises",
        "topics": [
          {
            "id": "salvados_por_gracia_esfuerzo",
            "category": "culpa_perdon",
            "title": "La gracia de Cristo suple donde terminan tus fuerzas humanas",
            "keywords": [
              "gracia",
              "meritos de cristo",
              "esfuerzo humano",
              "insuficiencia",
              "salvados por gracia"
            ],
            "scriptureRef": "2 Nefi 25:23",
            "scriptureQuote": "Porque nosotros trabajamos diligentemente para escribir, a fin de persuadir a nuestros hijos, así como a nuestros hermanos, a creer en Cristo y a reconciliarse con Dios; pues sabemos que es por la gracia por la que nos salvamos, después de hacer cuanto podamos.",
            "pastoralInsight": "Hacer 'cuanto podamos' no significa alcanzar la perfección por cuenta propia, sino dar nuestro sincero empeño y dejar que la gracia de Cristo haga el resto.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/25?lang=spa&id=p23#p23",
            "bookId": "2-ne",
            "chapterNum": 25,
            "shortTitle": "Gracia Suficiente"
          }
        ]
      },
      {
        "ch": 26,
        "fact": "Nefi advierte sobre las combinaciones secretas y proclama la universalidad de Cristo",
        "summary": "Él no hace nada en tinieblas e invita a todos con amor: 'negro o blanco, siervo o libre, varón o mujer; todos son iguales ante Dios'.",
        "tags": [
          "caridad_servicio",
          "capilla_comunion",
          "ira_ataque"
        ],
        "keywords": "todos iguales ante dios negro blanco mujer varon combinaciones secretas universal",
        "topics": []
      },
      {
        "ch": 27,
        "fact": "Nefi profetiza la salida a luz del Libro de Mormón en los últimos días",
        "summary": "el libro sellado, las palabras de los que duermen en el polvo y el sabio que dirá: 'No puedo leer un libro sellado'.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "libro sellado sabio no puedo leer polvo obra maravillosa prodigio",
        "topics": []
      },
      {
        "ch": 28,
        "fact": "Nefi desenmascara con maestría las trampas sutiles de Satanás en los últimos días",
        "summary": "cómo adormece a los hombres con seguridad carnal diciendo 'todo va bien en Sion', llevándolos con cordeles de lino al infierno.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "trampas satanas todo va bien pacificara cordel lino infierno adormecer",
        "topics": [
          {
            "id": "amistades_toxicas_presion",
            "category": "relaciones_hogar",
            "title": "Poner límites a malas amistades o influencias tóxicas",
            "keywords": [
              "malas amistades",
              "presion social",
              "influencias toxicas",
              "limites",
              "amistad sana"
            ],
            "scriptureRef": "2 Nefi 28:14-16",
            "scriptureQuote": "Pues ellos siguen los preceptos de los hombres... y a causa del orgullo, y por haber aprendido falsas doctrinas, y a causa de las riquezas de este mundo... se han descarriado.",
            "pastoralInsight": "El amor ministerial no implica dejar que otros destruyan tu testimonio o tu integridad. Saber decir 'no' y elegir amigos que te eleven es un mandamiento sabio.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/28?lang=spa&id=p14-p16#p14",
            "bookId": "2-ne",
            "chapterNum": 28,
            "shortTitle": "Amistades Tóxicas"
          },
          {
            "id": "engano_cordel_lino_adormecer",
            "category": "habitos_ataduras",
            "title": "El engaño gradual del adversario: cordeles de lino hasta atar",
            "keywords": [
              "engano",
              "cordel de lino",
              "adormecer",
              "todo va bien",
              "seguridad carnal",
              "trampa suave"
            ],
            "scriptureRef": "2 Nefi 28:21-22",
            "scriptureQuote": "Y a otros los pacificará y los adormecerá con seguridad carnal, de modo que dirán: Todo va bien en Sión; sí, Sión prospera, todo va bien. Y así el diablo engaña sus almas, y los conduce astutamente al infierno... los guía del cuello con cordel de lino, hasta que los ata con sus fuertes cuerdas para siempre.",
            "pastoralInsight": "Las adicciones casi nunca empiezan con una cuerda gruesa, sino con un 'cordel suave de lino' (solo una vez, nadie me ve). Reconocer la trampa a tiempo salva la vida.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/28?lang=spa&id=p21-p22#p21",
            "bookId": "2-ne",
            "chapterNum": 28,
            "shortTitle": "El Engaño Suave (Lino)"
          }
        ]
      },
      {
        "ch": 29,
        "fact": "El Señor reprende a los gentiles que rechazan más revelación ('¡Una Biblia! ¡Una Biblia!')",
        "summary": "recordando que Dios habla a todas las naciones y que dos naciones serán testigos unidos de Su verdad eterna.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "una biblia dos naciones testigos palabra todas las naciones",
        "topics": []
      },
      {
        "ch": 30,
        "fact": "El Libro de Mormón llevará a los lamanitas y al mundo al conocimiento de Cristo",
        "summary": "haciendo que caigan las escamas de tinieblas de sus ojos y comience una era bienaventurada de rectitud milenaria.",
        "tags": [
          "fe_semilla_dudas",
          "capilla_comunion"
        ],
        "keywords": "escamas tinieblas restauracion lamanitas milenio paz",
        "topics": []
      },
      {
        "ch": 31,
        "fact": "Nefi expone la Doctrina de Cristo: Fe, Arrepentimiento, Bautismo y Espíritu Santo",
        "summary": "seguir al Cordero entrando por la puerta estrecha y perseverar hasta el fin con firmeza en Cristo para obtener la vida eterna.",
        "tags": [
          "santa_cena_ordenanzas",
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "doctrina cristo puerta estrecha bautismo agua fuego espiritu santo perseverar fin",
        "topics": [
          {
            "id": "sequia_espiritual_hipocrita",
            "category": "fe_dudas",
            "title": "Sequía espiritual: ir a la capilla sintiéndose frío o hipócrita",
            "keywords": [
              "sequia espiritual",
              "frialdad",
              "hipocrita",
              "no siento el espiritu",
              "vaciedad en la capilla"
            ],
            "scriptureRef": "2 Nefi 31:13",
            "scriptureQuote": "Por tanto, amados hermanos míos, sé que si seguís al Hijo con íntegro propósito de corazón, sin hipocresía y sin engaño ante Dios, sino con verdadera intención, arrepintiéndoos de vuestros pecados... he aquí, entonces recibiréis el Espíritu Santo.",
            "pastoralInsight": "Estar en la capilla sintiéndote débil no te hace hipócrita; te hace un paciente sincero en el hospital del Señor. Sé honesto con Dios y Él renovará tu fuego.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31?lang=spa&id=p13#p13",
            "bookId": "2-ne",
            "chapterNum": 31,
            "shortTitle": "Sentirse Frío en la Capilla"
          },
          {
            "id": "don_espiritu_santo_lengua_angeles",
            "category": "convenios_capilla",
            "title": "El don del Espíritu Santo y hablar con lengua de ángeles",
            "keywords": [
              "espiritu santo",
              "don del espiritu santo",
              "fuego purificador",
              "lengua de angeles"
            ],
            "scriptureRef": "2 Nefi 31:13-14",
            "scriptureQuote": "Y entonces viene el bautismo de fuego y del Espíritu Santo; y entonces podéis hablar con lengua de ángeles y prorrumpir en alabanzas al Santo de Israel... porque las palabras de Cristo os dirán todas las cosas que debéis hacer.",
            "pastoralInsight": "El Espíritu Santo no es solo una voz tenue; es un fuego purificador que limpia tu corazón y te da palabras de consuelo para ministrar a otros.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31?lang=spa&id=p13-p14#p13",
            "bookId": "2-ne",
            "chapterNum": 31,
            "shortTitle": "Don del Espíritu Santo"
          },
          {
            "id": "perseverar_hasta_el_fin_esperanza",
            "category": "convenios_capilla",
            "title": "Seguir adelante con firmeza en Cristo: perseverar hasta el fin con gozo",
            "keywords": [
              "perseverar hasta el fin",
              "seguir adelante",
              "fulgor de esperanza",
              "firmeza en cristo"
            ],
            "scriptureRef": "2 Nefi 31:20",
            "scriptureQuote": "Por tanto, debéis seguir adelante con firmeza en Cristo, teniendo un fulgor perfecto de esperanza y amor por Dios y por todos los hombres. Por tanto, si marcháis adelante, deleitándoos en la palabra de Cristo, y perseveráis hasta el fin, he aquí, así dice el Padre: Tendréis la vida eterna.",
            "pastoralInsight": "Perseverar no es apretar los dientes con amargura hasta morir; es caminar con los ojos puestos en Cristo, con una sonrisa de esperanza y amor por los demás.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/31?lang=spa&id=p20#p20",
            "bookId": "2-ne",
            "chapterNum": 31,
            "shortTitle": "Perseverar hasta el Fin"
          }
        ]
      },
      {
        "ch": 32,
        "fact": "Nefi manda deleitarse en las palabras de Cristo y orar siempre sin cesar",
        "summary": "porque las palabras de Cristo os dirán todas las cosas que debéis hacer, y el Espíritu Santo os mostrará el camino.",
        "tags": [
          "oracion_ayuno",
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "deleitaos palabras de cristo orar siempre espiritu santo camino direccion",
        "topics": [
          {
            "id": "oraciones_frias_enemigo_no_orar",
            "category": "fe_dudas",
            "title": "Sentir que las oraciones no pasan del techo / No querer orar",
            "keywords": [
              "no quiero orar",
              "oracion fria",
              "no siento nada",
              "oraciones vacias",
              "desgano espiritual"
            ],
            "scriptureRef": "2 Nefi 32:8-9",
            "scriptureQuote": "Y ahora bien, mis amados hermanos, percibo que aún estáis meditando en vuestros corazones; y me duele tener que hablaros concerniente a esto. Porque si escuchaseis al Espíritu que enseña al hombre a orar, sabríais que os es menester orar; porque el espíritu malo no enseña al hombre a orar, sino le enseña que no debe orar. Mas he aquí, os digo que debéis orar siempre...",
            "pastoralInsight": "Cuando sientas que no quieres orar, ese es exactamente el momento en que más necesitas ponerte de rodillas. El adversario busca cortar tu línea directa con Dios.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/32?lang=spa&id=p8-p9#p8",
            "bookId": "2-ne",
            "chapterNum": 32,
            "shortTitle": "Oraciones Frías / Desgano"
          },
          {
            "id": "palabras_cristo_haran_saber",
            "category": "decisiones_futuro",
            "title": "Las palabras de Cristo os dirán todas las cosas que debéis hacer",
            "keywords": [
              "que debo hacer",
              "orientacion divina",
              "palabras de cristo",
              "direccion espiritual"
            ],
            "scriptureRef": "2 Nefi 32:3, 5",
            "scriptureQuote": "Deleitaos en las palabras de Cristo; porque he aquí, las palabras de Cristo os dirán todas las cosas que debéis hacer... Si entráis por la vía y recibís el Espíritu Santo, él os mostrará todas las cosas que debéis hacer.",
            "pastoralInsight": "Cuando no sepas qué decisión tomar, sumérgete en las Escrituras buscando principios. El Espíritu te dará la claridad exacta que necesitas.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne/32?lang=spa&id=p3,p5#p3",
            "bookId": "2-ne",
            "chapterNum": 32,
            "shortTitle": "Dirección por la Palabra"
          }
        ]
      },
      {
        "ch": 33,
        "fact": "La solemne despedida y testimonio final de Nefi al concluir su registro",
        "summary": "llorando por su pueblo y testificando que estas palabras persuaden a hacer el bien y nos hablarán ante el gran tribunal de Dios.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "despedida nefi tribunal juicio lagrimas palabras persuaden hacer el bien",
        "topics": []
      }
    ]
  },
  {
    "id": "jacob",
    "title": "Jacob",
    "author": "Jacob",
    "period": "544 a.C. — 421 a.C.",
    "icon": "🌿",
    "summary": "Sermón en el templo contra el orgullo y la poligamia no autorizada, consuelo a los puros de corazón, la colosal alegoría del Olivo de Zenós y la refutación del anticristo Sherem.",
    "url_slug": "jacob",
    "chapters": [
      {
        "ch": 1,
        "fact": "Jacob y José asumen con devoción su sagrado ministerio sacerdotal",
        "summary": "magnificando sus llamamientos ante el pueblo para responder limpiamente por sus almas ante el Señor.",
        "tags": [
          "caridad_servicio",
          "capilla_comunion"
        ],
        "keywords": "ministerio magnificar llamamiento jacob jose nefi muerte sangre vestidos",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "Jacob condena enérgicamente en el templo el orgullo por las riquezas y la fornicación",
        "summary": "mandando cuidar a los pobres antes de buscar riquezas, y prohibiendo tener más de una esposa salvo mandato divino.",
        "tags": [
          "familia_crisis",
          "tentacion_ataduras",
          "caridad_servicio"
        ],
        "keywords": "templo orgullo riquezas pobres pureza esposas dolor quebranto corazon hijos",
        "topics": [
          {
            "id": "perdidas_materiales_fuego_robo",
            "category": "duelo_dolor",
            "title": "Pérdida material devastadora: quiebra, incendio, robo o ruina",
            "keywords": [
              "quiebra",
              "perdi todo",
              "ruina",
              "incendio",
              "robo",
              "perdida patrimonial"
            ],
            "scriptureRef": "Jacob 2:18-19",
            "scriptureQuote": "Pero antes de buscar riquezas, buscad el reino de Dios; y cuando hayáis obtenido una esperanza en Cristo, obtendréis riquezas si las buscáis... para vestir al desnudo y alimentar al hambriento y libertar al cautivo y suministrar auxilio al enfermo y afligido.",
            "pastoralInsight": "Las posesiones terrenales vienen y van, pero tu valor y tus tesoros en el cielo están intactos. Dios te dará la sabiduría y la fuerza para levantarte de nuevo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/2?lang=spa&id=p18-p19#p18",
            "bookId": "jacob",
            "chapterNum": 2,
            "shortTitle": "Pérdida Material / Ruina"
          },
          {
            "id": "matrimonio_corazones_quebrantados",
            "category": "relaciones_hogar",
            "title": "Matrimonio en crisis, infidelidad o quebrantamiento conyugal",
            "keywords": [
              "matrimonio",
              "esposo",
              "esposa",
              "divorcio",
              "infidelidad",
              "desamor",
              "crisis matrimonial"
            ],
            "scriptureRef": "Jacob 2:31-35",
            "scriptureQuote": "Porque he aquí, yo, el Señor, he visto el dolor y oído el lamento de las hijas de mi pueblo... a causa de las iniquidades y abominaciones de sus maridos... Habéis quebrantado los corazones de vuestras tiernas esposas y perdido la confianza de vuestros hijos, por causa de vuestros malos ejemplos delante de ellos.",
            "pastoralInsight": "El Señor ama y defiende la ternura en el hogar. Sanar un matrimonio exige verdad absoluta, abandono de egoísmos y reconstrucción de la confianza con hechos concretos.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/2?lang=spa&id=p31-p35#p31",
            "bookId": "jacob",
            "chapterNum": 2,
            "shortTitle": "Matrimonio en Crisis"
          },
          {
            "id": "riquezas_para_hacer_el_bien",
            "category": "decisiones_futuro",
            "title": "Buscar primero el reino de Dios antes que el dinero o la fama",
            "keywords": [
              "riquezas",
              "dinero",
              "ambicion",
              "buscar el reino de dios",
              "hacer el bien"
            ],
            "scriptureRef": "Jacob 2:18-19",
            "scriptureQuote": "Pero antes de buscar riquezas, buscad el reino de Dios; y cuando hayáis obtenido una esperanza en Cristo, obtendréis riquezas si las buscáis; y las buscaréis con el fin de hacer el bien...",
            "pastoralInsight": "Tener bienes no es pecado si el corazón está puesto en bendecir al necesitado y no en el orgullo terrenal.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/2?lang=spa&id=p18-p19#p18",
            "bookId": "jacob",
            "chapterNum": 2,
            "shortTitle": "Riquezas para el Bien"
          }
        ]
      },
      {
        "ch": 3,
        "fact": "Jacob consuela tiernamente a los de corazón puro y quebrantado",
        "summary": "recordando que los lamanitas son más justos por amar a sus esposas y no afligir a sus hijos.",
        "tags": [
          "consuelo_afliccion",
          "familia_crisis"
        ],
        "keywords": "puros corazon consuelo lamanitas amor esposas hijos firmeza",
        "topics": [
          {
            "id": "amor_conyugal_ternura",
            "category": "relaciones_hogar",
            "title": "El modelo de amor conyugal: amar al cónyuge y a los hijos",
            "keywords": [
              "amor conyugal",
              "ternura",
              "cuidar a la esposa",
              "amar al esposo",
              "familia unida"
            ],
            "scriptureRef": "Jacob 3:7",
            "scriptureQuote": "He aquí, sus maridos aman a sus esposas, y sus esposas aman a sus maridos; y sus esposas y sus maridos aman a sus hijos; y su incredulidad y su odio contra vosotros se debe a la iniquidad de sus padres.",
            "pastoralInsight": "El mayor legado que un padre o madre puede dejar a sus hijos es ver cómo se aman, se respetan y se perdonan mutuamente en el día a día.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob/3?lang=spa&id=p7#p7",
            "bookId": "jacob",
            "chapterNum": 3,
            "shortTitle": "Ternura Conyugal"
          }
        ]
      },
      {
        "ch": 4,
        "fact": "Jacob enseña que la fe viva en el nombre de Cristo tiene poder sobre la creación",
        "summary": "y que todos los santos profetas antiguos adoraron al Padre en el sagrado nombre del Redentor.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "fe viva nombre cristo piedras arboles profetas expiacion",
        "topics": []
      },
      {
        "ch": 5,
        "fact": "La majestuosa alegoría del Olivo de Zenós: el tierno amor del Señor de la viña",
        "summary": "quien llora, poda, injerta, cava y nutre las ramas naturales y silvestres proclamando: '¿Qué más pude haber hecho por mi viña?'.",
        "tags": [
          "caridad_servicio",
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "alegoria olivo zenos senor vina injertar podar llora que mas pude haber hecho ramas",
        "topics": []
      },
      {
        "ch": 6,
        "fact": "Jacob implora al pueblo allegarse a Dios con corazón sincero",
        "summary": "mientras los brazos de Su misericordia estén extendidos hacia ellos en este día de probación terrenal.",
        "tags": [
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "allegarse dios brazos misericordia arrepentimiento justicia",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Sherem el anticristo desafía la fe de Jacob pero es confundido",
        "summary": "por las escrituras, el testimonio del Espíritu y una señal de Dios; confiesa la verdad al borde de la muerte.",
        "tags": [
          "fe_semilla_dudas",
          "ira_ataque"
        ],
        "keywords": "sherem anticristo senal confundido escrituras testimonio muerte",
        "topics": []
      }
    ]
  },
  {
    "id": "enos",
    "title": "Enós",
    "author": "Enós",
    "period": "aprox. 420 a.C.",
    "icon": "🏹",
    "summary": "La lucha del alma en oración solitaria en el bosque, el perdón personal de pecados y la súplica por los nefitas y lamanitas.",
    "url_slug": "enos",
    "chapters": [
      {
        "ch": 1,
        "fact": "Enós lucha en ferviente oración todo el día y la noche",
        "summary": "su alma tiene hambre espiritual; recibe el perdón de sus pecados por su fe en Cristo y suplica por la salvación de sus enemigos los lamanitas.",
        "tags": [
          "oracion_ayuno",
          "arrepentimiento_perdon",
          "ira_ataque",
          "consuelo_afliccion"
        ],
        "keywords": "enos oracion bosque hambre alma perdon pecados lamanitas preservacion registros",
        "topics": [
          {
            "id": "perdonarse_a_uno_mismo",
            "category": "culpa_perdon",
            "title": "Incapacidad de perdonarse a uno mismo habiendo recibido el perdón",
            "keywords": [
              "no me perdono",
              "odio a mi mismo",
              "culpa del pasado",
              "remordimiento eterno",
              "perdonarse"
            ],
            "scriptureRef": "Enós 1:5-8",
            "scriptureQuote": "Y vino a mí una voz, diciendo: Enós, tus pecados te son perdonados, y serás bendecido. Y yo, Enós, sabía que Dios no podía mentir; por tanto, mi culpa fue desterrada. Y dije yo: Señor, ¿cómo se lleva esto a efecto? Y él me dijo: Por tu fe en Cristo... ve, pues; tu fe te ha salvado.",
            "pastoralInsight": "Si Dios ya perdonó y olvidó tu pecado, insistir en seguir flagelándote es dudar de la suficiencia del sacrificio de Su Hijo. Deja que tu culpa sea desterrada hoy.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/enos/1?lang=spa&id=p5-p8#p5",
            "bookId": "enos",
            "chapterNum": 1,
            "shortTitle": "Perdonarse a sí Mismo"
          },
          {
            "id": "orar_con_hambre_alma_enos",
            "category": "fe_dudas",
            "title": "Cómo orar de verdad: cuando el alma tiene hambre de respuestas",
            "keywords": [
              "hambre en el alma",
              "oracion profunda",
              "suplica ferviente",
              "enos",
              "clamor a dios"
            ],
            "scriptureRef": "Enós 1:4",
            "scriptureQuote": "Y mi alma tuvo hambre; y me arrodillé ante mi Hacedor, y clamé a él con ferviente oración y súplica por mi propia alma; y clamé a él todo el día; sí, y cuando anocheció, todavía elevaba mi voz a lo alto, hasta que llegó a los cielos.",
            "pastoralInsight": "La oración que transforma no es una lista apresurada de pedidos, sino abrir el alma vulnerable y transparente ante el Padre.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/enos/1?lang=spa&id=p4#p4",
            "bookId": "enos",
            "chapterNum": 1,
            "shortTitle": "Hambre en el Alma (Enós)"
          }
        ]
      }
    ]
  },
  {
    "id": "jarom",
    "title": "Jarom",
    "author": "Jarom",
    "period": "399 a.C. — 361 a.C.",
    "icon": "🛡️",
    "summary": "Preservación de las genealogías, leyes y preparación defensiva de los nefitas.",
    "url_slug": "jarom",
    "chapters": [
      {
        "ch": 1,
        "fact": "Jarom registra la estricta fidelidad de los profetas y sacerdotes",
        "summary": "quienes enseñan la ley de Moisés anticipando con esperanza la venida del Mesías para evitar la aniquilación nefita.",
        "tags": [
          "capilla_comunion",
          "fe_semilla_dudas"
        ],
        "keywords": "jarom sacerdotes ley de moises profetas armas defensa mesias",
        "topics": []
      }
    ]
  },
  {
    "id": "omni",
    "title": "Omni",
    "author": "Omni, Amarón, Quémish, Abinadom, Amalekí",
    "period": "323 a.C. — 130 a.C.",
    "icon": "📜",
    "summary": "Cinco cronistas preservan el registro sagrado, relatan el descubrimiento de Zarahemla (pueblo de Mulek) y la entrega de las planchas al rey Benjamín.",
    "url_slug": "omni",
    "chapters": [
      {
        "ch": 1,
        "fact": "Amalekí narra el descubrimiento del pueblo de Zarahemla (Mulek)",
        "summary": "la unión de ambos pueblos bajo el rey Mosíah I, la piedra jaredita de Coriantumr y la entrega final de las planchas al virtuoso rey Benjamín.",
        "tags": [
          "decisiones_guia",
          "caridad_servicio"
        ],
        "keywords": "zarahemla mulek coriantumr mosiah benjamin planchas union historia",
        "topics": []
      }
    ]
  },
  {
    "id": "w-of-m",
    "title": "Palabras de Mormón",
    "author": "Mormón",
    "period": "aprox. 385 d.C.",
    "icon": "🔗",
    "summary": "El puente profético e inspirador que une las planchas menores de Nefi con el compendio general de las planchas mayores.",
    "url_slug": "w-of-m",
    "chapters": [
      {
        "ch": 1,
        "fact": "Mormón conecta las planchas menores con su compendio por inspiración divina",
        "summary": "maravillado por un sabio propósito del Señor que bendecirá a generaciones futuras más allá de su propia comprensión.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "mormon planchas menores puente sabio proposito espiritu santo rey benjamin",
        "topics": []
      }
    ]
  },
  {
    "id": "mosiah",
    "title": "Mosíah",
    "author": "Mosíah / Rey Benjamín / Alma",
    "period": "130 a.C. — 91 a.C.",
    "icon": "👑",
    "summary": "El discurso del rey Benjamín desde su torre, el martirio de Abinadí, Alma en las Aguas de Mormón, la liberación de Limhi y Alma, la conversión de Alma hijo y el inicio de los jueces.",
    "url_slug": "mosiah",
    "chapters": [
      {
        "ch": 1,
        "fact": "El rey Benjamín instruye a sus hijos en el lenguaje de sus padres",
        "summary": "enseñándoles la custodia de las planchas de bronce y preparándolos para la transmisión sagrada del reino a Mosíah.",
        "tags": [
          "familia_crisis",
          "decisiones_guia"
        ],
        "keywords": "benjamin hijos mosiah helaman helem escrituras planchas bronce",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "El rey Benjamín enseña desde su torre sobre el servicio desinteresado",
        "summary": "proclamando: 'Cuando os halláis al servicio de vuestros semejantes, solo os halláis al servicio de vuestro Dios'.",
        "tags": [
          "caridad_servicio",
          "humildad"
        ],
        "keywords": "torre servicio semejantes servicio dios siervos inutiles humildad deudas",
        "topics": [
          {
            "id": "servir_desinteresado_projimo",
            "category": "relaciones_hogar",
            "title": "Cuando estás sirviendo a tus semejantes, estás al servicio de Dios",
            "keywords": [
              "servicio",
              "servir al projimo",
              "rey benjamin",
              "ayudar",
              "solidaridad"
            ],
            "scriptureRef": "Mosíah 2:17",
            "scriptureQuote": "Y he aquí, os digo estas cosas para que aprendáis sabiduría; para que sepáis que cuando os halláis al servicio de vuestros semejantes, solo os halláis al servicio de vuestro Dios.",
            "pastoralInsight": "La cura más rápida para la autocompasión o el aislamiento es salir a servir a alguien que tiene una carga mayor. Al bendecir a otros, Dios te sana a ti.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/2?lang=spa&id=p17#p17",
            "bookId": "mosiah",
            "chapterNum": 2,
            "shortTitle": "Servicio Desinteresado"
          },
          {
            "id": "sostener_lideres_servicio_humilde",
            "category": "convenios_capilla",
            "title": "Sostener a los líderes de la Iglesia y entender el liderazgo de servicio",
            "keywords": [
              "lideres",
              "obispo",
              "presidente de estaca",
              "rey benjamin",
              "sostener lideres"
            ],
            "scriptureRef": "Mosíah 2:11-14",
            "scriptureQuote": "No he mandado que me pagaseis dinero, ni yo mismo he buscado ninguna clase de riquezas... sino que yo mismo he trabajado con mis propias manos a fin de poder serviros, y para que no fueseis cargados con tributos... y de todas estas cosas que he dicho, vosotros mismos sois testigos este día.",
            "pastoralInsight": "En la Iglesia no hay clero pagado; nuestros líderes son vecinos y hermanos que sirven con sacrificio. Sostenerlos con nuestras oraciones fortalece al barrio entero.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/2?lang=spa&id=p11-p14#p11",
            "bookId": "mosiah",
            "chapterNum": 2,
            "shortTitle": "Sostener a los Líderes"
          }
        ]
      },
      {
        "ch": 3,
        "fact": "El ángel revela a Benjamín la venida y sufrimiento de Jesucristo en Getsemaní",
        "summary": "donde brotará sangre de cada poro por las angustias de Su pueblo, y enseña que 'el hombre natural es enemigo de Dios' a menos que se someta al Espíritu.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion",
          "arrepentimiento_perdon"
        ],
        "keywords": "angel getsemani sangre cada poro hombre natural nino sumiso manso expiacion",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "El pueblo recibe el perdón de sus pecados y Benjamín manda retener la remisión",
        "summary": "socorriendo al mendigo, impartiendo alimentos y bienes al pobre sin juzgar si merece o no la ayuda.",
        "tags": [
          "arrepentimiento_perdon",
          "caridad_servicio",
          "consuelo_afliccion"
        ],
        "keywords": "remision pecados mendigo no somos todos mendigos socorrer pobre retener perdon",
        "topics": [
          {
            "id": "agotamiento_burnout_prisa",
            "category": "salud_mental",
            "title": "Burnout espiritual y agotamiento: correr más rápido de las fuerzas",
            "keywords": [
              "burnout",
              "agotamiento",
              "fatiga",
              "no doy mas",
              "colapso",
              "exigencia",
              "perfeccionismo",
              "estres"
            ],
            "scriptureRef": "Mosíah 4:27",
            "scriptureQuote": "Y mirad que se hagan todas estas cosas con prudencia y orden; porque no se exige que un hombre corra más aprisa de lo que sus fuerzas le permiten. Y además, es conveniente que sea diligente, para que así gane el galardón.",
            "pastoralInsight": "El Evangelio no te pide que colapses por auto-exigencia. El Señor pide prudencia, ritmo sostenible y descanso mental. Validar su fatiga es el primer paso del consuelo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p27#p27",
            "bookId": "mosiah",
            "chapterNum": 4,
            "shortTitle": "Agotamiento / Burnout"
          },
          {
            "id": "paz_conciencia_gozo",
            "category": "salud_mental",
            "title": "Recuperar la paz de conciencia y la tranquilidad interior",
            "keywords": [
              "paz",
              "tranquilidad",
              "serenidad",
              "conciencia limpia",
              "calma",
              "sosiego",
              "armonia"
            ],
            "scriptureRef": "Mosíah 4:3",
            "scriptureQuote": "Y aconteció que después de haber pronunciado estas palabras, el Espíritu del Señor vino sobre ellos, y fueron llenos de gozo, habiendo recibido la remisión de sus pecados y teniendo paz de conciencia a causa de la gran fe que tenían en Jesucristo.",
            "pastoralInsight": "La paz de conciencia no es ausencia de problemas externos, sino la dulce calma espiritual que Jesucristo entrega al corazón cuando descansamos en Su misericordia.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p3#p3",
            "bookId": "mosiah",
            "chapterNum": 4,
            "shortTitle": "Paz de Conciencia"
          },
          {
            "id": "ensenar_hijos_sin_renas",
            "category": "relaciones_hogar",
            "title": "Crianza con amor: enseñar a los hijos sin gritos ni riñas",
            "keywords": [
              "crianza",
              "educar hijos",
              "no gritar",
              "paciencia con hijos",
              "armonia en casa"
            ],
            "scriptureRef": "Mosíah 4:14-15",
            "scriptureQuote": "Ni permitiréis que vuestros hijos anden hambrientos ni desnudos; ni consentiréis que quebranten las leyes de Dios, ni que luchen y riñan entre sí, y sirvan al diablo... antes bien, les enseñaréis a andar por las vías de la verdad y la seriedad; les enseñaréis a amarse mutuamente y a servirse el uno al otro.",
            "pastoralInsight": "Enseñar a los hijos no es imponer mediante el miedo, sino modelar la rectitud y enseñarles a amarse mutuamente bajo el espíritu de Cristo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p14-p15#p14",
            "bookId": "mosiah",
            "chapterNum": 4,
            "shortTitle": "Educar sin Gritos"
          },
          {
            "id": "integridad_deudas_devolver",
            "category": "decisiones_futuro",
            "title": "Honradez en los negocios: devolver lo prestado y evitar trampas",
            "keywords": [
              "deudas",
              "prestamos",
              "honradez",
              "integridad",
              "devolver lo prestado"
            ],
            "scriptureRef": "Mosíah 4:28",
            "scriptureQuote": "Y quisiera que recordaseis que cualquiera de entre vosotros que pida prestado a su vecino debe devolver la cosa que tomó prestada, según haya convenido; de lo contrario, cometerás pecado, y tal vez hagas que tu vecino peque también.",
            "pastoralInsight": "La integridad en tus tratos económicos es testimonio puro del Evangelio. Un discípulo de Cristo honra su palabra aun a costa de su propia comodidad.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p28#p28",
            "bookId": "mosiah",
            "chapterNum": 4,
            "shortTitle": "Honradez y Devolver Deudas"
          },
          {
            "id": "compartir_con_pobre_aunque_poco",
            "category": "decisiones_futuro",
            "title": "Generosidad: compartir con el necesitado aunque tengamos poco",
            "keywords": [
              "generosidad",
              "ayudar al pobre",
              "compartir alimentos",
              "solidaridad",
              "rey benjamin"
            ],
            "scriptureRef": "Mosíah 4:21-22",
            "scriptureQuote": "Y si Dios... os da todo cuanto tenéis... ¡cuánto más debéis vosotros impartir de vuestros bienes los unos a los otros!... Y si juzgáis al hombre que os pide de vuestros bienes para no perecer... ¡cuánto más justa será vuestra condenación por retener vuestros bienes!",
            "pastoralInsight": "El Señor bendice las manos que dan. No esperes a tener abundancia para ser generoso; la ofrenda del que tiene poco tiene un valor incalculable en el cielo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p21-p22#p21",
            "bookId": "mosiah",
            "chapterNum": 4,
            "shortTitle": "Generosidad con el Pobre"
          },
          {
            "id": "no_tengo_pero_si_tuviera_daria",
            "category": "decisiones_futuro",
            "title": "Tranquilidad para quien no tiene recursos para dar a otros",
            "keywords": [
              "no tengo para dar",
              "deseo del corazon",
              "pobreza digna",
              "sin recursos"
            ],
            "scriptureRef": "Mosíah 4:24",
            "scriptureQuote": "Y también a los pobres me refiero... que no tenéis y sin embargo tenéis suficiente para subsistir día tras día: Quisiera que dijeseis en vuestros corazones: No doy porque no tengo, pero si tuviera, daría.",
            "pastoralInsight": "Dios mira el deseo íntimo de tu corazón. Si tus intenciones son puras, Él acepta tu deseo como si hubieses dado en abundancia.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4?lang=spa&id=p24#p24",
            "bookId": "mosiah",
            "chapterNum": 4,
            "shortTitle": "Deseo del Corazón sin Recursos"
          }
        ]
      },
      {
        "ch": 5,
        "fact": "El pueblo declara no tener más disposición a obrar mal sino a hacer el bien",
        "summary": "tomando sobre sí el nombre de Cristo como Sus hijos e hijas mediante convenio solemne.",
        "tags": [
          "arrepentimiento_perdon",
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "cambio corazon ninguna disposicion hacer mal nombre cristo hijos hijas convenio",
        "topics": [
          {
            "id": "potente_cambio_corazon",
            "category": "culpa_perdon",
            "title": "El milagro del potente cambio de corazón y deseos",
            "keywords": [
              "cambio de corazon",
              "nuevo ser",
              "deseo de pecar",
              "transformacion espiritual",
              "nacer de nuevo"
            ],
            "scriptureRef": "Mosíah 5:2",
            "scriptureQuote": "El Espíritu del Señor Omnipotente ha obrado en nosotros... un potente cambio, de modo que ya no tenemos más disposición a obrar mal, sino a hacer lo bueno continuamente.",
            "pastoralInsight": "El Evangelio no es solo modificación de conducta externa; es una re-creación interna de tus afectos. Pídele al Señor ese potente cambio hoy.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/5?lang=spa&id=p2#p2",
            "bookId": "mosiah",
            "chapterNum": 5,
            "shortTitle": "Cambio de Corazón"
          }
        ]
      },
      {
        "ch": 6,
        "fact": "Mosíah es coronado rey en Zarahemla",
        "summary": "y Benjamín registra los nombres de todos los que concertaron el convenio antes de concluir sus días terrenales en paz.",
        "tags": [
          "santa_cena_ordenanzas",
          "decisiones_guia"
        ],
        "keywords": "coronacion mosiah nombres convenio sacerdotes ordenados",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Ammón encabeza una expedición de rescate y encuentra al pueblo de Limhi",
        "summary": "quienes viven en amargo cautiverio y tributo bajo el dominio de los ejércitos lamanitas.",
        "tags": [
          "consuelo_afliccion",
          "caridad_servicio"
        ],
        "keywords": "ammon limhi expedicion lehi nefi cautiverio cadenas tributo",
        "topics": []
      },
      {
        "ch": 8,
        "fact": "Ammón explica la sublime y excelsa función de un Vidente",
        "summary": "quien es mayor que un profeta y traduce anales antiguos mediante los sagrados intérpretes preparados por Dios.",
        "tags": [
          "fe_semilla_dudas",
          "decisiones_guia"
        ],
        "keywords": "vidente profeta interpretes 24 planchas oro jareditas revelador",
        "topics": []
      },
      {
        "ch": 9,
        "fact": "Zeniff relata su excesivo celo por poseer la tierra heredada",
        "summary": "y cómo el astuto rey lamanita le cedió tierras con el maquiavélico propósito de sojuzgarlos después.",
        "tags": [
          "decisiones_guia",
          "tentacion_ataduras"
        ],
        "keywords": "zeniff celo nefi shilom astucia rey lamanita engaño",
        "topics": []
      },
      {
        "ch": 10,
        "fact": "Zeniff conduce a su pueblo a la victoria contra los invasores lamanitas",
        "summary": "fortalecidos por la oración y el trabajo constante frente al odio tradicional sembrado contra Nefi.",
        "tags": [
          "oracion_ayuno",
          "resiliencia"
        ],
        "keywords": "victoria zeniff trabajo mujeres ninos tradicion odio lamanitas",
        "topics": []
      },
      {
        "ch": 11,
        "fact": "El inicuo rey Noé impone pesados impuestos, edifica palacios y vive en vanidad",
        "summary": "hasta que el profeta Abinadí aparece proclamando arrepentimiento ante el juicio divino.",
        "tags": [
          "tentacion_ataduras",
          "arrepentimiento_perdon"
        ],
        "keywords": "rey noe sacerdotes vino palacios impuestos abinadi profecia",
        "topics": []
      },
      {
        "ch": 12,
        "fact": "Abinadí regresa disfrazado y confronta con intrepidez a los sacerdotes de Noé",
        "summary": "desafiando su falsa piedad y examinándolos severamente sobre los Diez Mandamientos.",
        "tags": [
          "fe_semilla_dudas",
          "valentia"
        ],
        "keywords": "abinadi disfraz sacerdotes diez mandamientos ley de moises juicio",
        "topics": []
      },
      {
        "ch": 13,
        "fact": "El rostro de Abinadí resplandece como el de Moisés en el monte Sinaí",
        "summary": "y el poder de Dios impide que lo toquen hasta que concluya el mensaje sagrado que le fue encomendado.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "rostro resplandece moises sinai proteccion poder mensaje diez mandamientos",
        "topics": []
      },
      {
        "ch": 14,
        "fact": "Abinadí cita el conmovedor cántico de Isaías 53 sobre el Siervo Doliente",
        "summary": "herido por nuestras transgresiones, molido por nuestras iniquidades, y por cuyas llagas fuimos nosotros sanados.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas",
          "arrepentimiento_perdon"
        ],
        "keywords": "isaias 53 siervo doliente llagas sanados oveja trasquilador expiacion",
        "topics": []
      },
      {
        "ch": 15,
        "fact": "Abinadí explica cómo Cristo es tanto Padre como Hijo",
        "summary": "y exclama conmovido: '¡Cuán hermosos son sobre los montes los pies de aquellos que publican la paz y traen buenas nuevas!'.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "padre e hijo expiacion hermosa paz resurreccion primera inocentes ninos",
        "topics": []
      },
      {
        "ch": 16,
        "fact": "Abinadí testifica de la Resurrección universal y advierte del peligro de no arrepentirse",
        "summary": "porque el aguijón de la muerte es consumido en Cristo, pero el impenitente persistirá en su enemistad contra Dios.",
        "tags": [
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "resurreccion aguijon muerte justicia juicio final impenitente",
        "topics": [
          {
            "id": "aguijon_muerte_consumido",
            "category": "duelo_dolor",
            "title": "El aguijón de la muerte es consumido en la victoria de Cristo",
            "keywords": [
              "aguijon de la muerte",
              "victoria",
              "tumba vacia",
              "triunfo sobre la muerte"
            ],
            "scriptureRef": "Mosíah 16:7-8",
            "scriptureQuote": "Y si Cristo no hubiese resucitado de entre los muertos... no habría habido resurrección. Mas hay una resurrección; por tanto, la tumba no tiene victoria, y el aguijón de la muerte es consumido en Cristo.",
            "pastoralInsight": "La tumba no es el final de la historia. El dolor de la separación es temporal; la reunión venidera será eterna y llena de gozo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/16?lang=spa&id=p7-p8#p7",
            "bookId": "mosiah",
            "chapterNum": 16,
            "shortTitle": "Victoria sobre la Tumba"
          }
        ]
      },
      {
        "ch": 17,
        "fact": "Alma cree el mensaje y huye; Abinadí es martirizado en la hoguera",
        "summary": "sellando su testimonio con su propia sangre y profetizando que la dinastía de Noé perecerá consumida por fuego.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "alma conversion martirio abinadi hoguera fuego sangre testimonio",
        "topics": []
      },
      {
        "ch": 18,
        "fact": "Alma bautiza en las sagradas Aguas de Mormón y funda la Iglesia de Cristo",
        "summary": "estableciendo el convenio de llevar las cargas los unos de los otros, llorar con los que lloran, consolar y congregarse un día a la semana.",
        "tags": [
          "capilla_comunion",
          "santa_cena_ordenanzas",
          "caridad_servicio",
          "consuelo_afliccion"
        ],
        "keywords": "aguas de mormon bautismo llevar cargas llorar con los que lloran consolar domingo iglesia",
        "topics": [
          {
            "id": "cuidar_enfermo_prolongado",
            "category": "duelo_dolor",
            "title": "Fatiga del cuidador: sostener a un enfermo por meses o años",
            "keywords": [
              "cuidador",
              "cuidar a mi madre",
              "cuidar enfermo",
              "fatiga del cuidador",
              "abnegacion"
            ],
            "scriptureRef": "Mosíah 18:8-9",
            "scriptureQuote": "Deseáis entrar en el redil de Dios y ser llamados su pueblo, y estáis dispuestos a llevar las cargas los unos de los otros para que sean ligeras; sí, y estáis dispuestos a llorar con los que lloran y a consolar a los que necesitan de consuelo...",
            "pastoralInsight": "Tu servicio silencioso al pie de la cama es una de las expresiones más sagradas del convenio bautismal. Dios ve cada noche de desvelo y te sostendrá.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p8-p9#p8",
            "bookId": "mosiah",
            "chapterNum": 18,
            "shortTitle": "Fatiga del Cuidador"
          },
          {
            "id": "llorar_con_los_que_lloran",
            "category": "duelo_dolor",
            "title": "Acompañar sin juzgar: llorar con los que lloran",
            "keywords": [
              "llorar",
              "empatia",
              "consolar",
              "afliccion ajena",
              "acompanar",
              "silencio comprensivo"
            ],
            "scriptureRef": "Mosíah 18:9",
            "scriptureQuote": "Y ser testigos de Dios en todo tiempo, y en todas las cosas y en todo lugar en que estuvieseis, aun hasta la muerte, para que seáis redimidos por Dios, y seáis contados con los de la primera resurrección...",
            "pastoralInsight": "No necesitas tener sermones preparados. Muchas veces el acto de ministración más poderoso es sentarse en silencio al lado de la persona y dejar que llore.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p9#p9",
            "bookId": "mosiah",
            "chapterNum": 18,
            "shortTitle": "Llorar con el Afligido"
          },
          {
            "id": "unidad_corazones_entrelazados",
            "category": "relaciones_hogar",
            "title": "Unidad de corazón: tener los corazones entrelazados con amor",
            "keywords": [
              "unidad",
              "corazones entrelazados",
              "sociedad de socorro",
              "cuorum",
              "armonia comunitaria"
            ],
            "scriptureRef": "Mosíah 18:21",
            "scriptureQuote": "Y les mandó que no hubiese contenciones entre uno y otro, sino que fijasen su vista hacia adelante con una sola mira, teniendo una fe y un bautismo, teniendo entrelazados sus corazones con unidad y amor el uno hacia el otro.",
            "pastoralInsight": "La iglesia florece cuando no hay bandos ni favoritismos, sino un solo corazón entrelazado para socorrer al que está caído.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p21#p21",
            "bookId": "mosiah",
            "chapterNum": 18,
            "shortTitle": "Unidad de Corazón"
          },
          {
            "id": "convenio_bautismal_aguas_mormon",
            "category": "convenios_capilla",
            "title": "El convenio bautismal: entrar en el redil y llevar cargas mutuas",
            "keywords": [
              "bautismo",
              "aguas de mormon",
              "convenio bautismal",
              "llevar cargas",
              "alma"
            ],
            "scriptureRef": "Mosíah 18:8-10",
            "scriptureQuote": "He aquí las aguas de Mormón... ya que deseáis entrar en el redil de Dios y ser llamados su pueblo... ¿qué os impide ser bautizados en el nombre del Señor, como testimonio ante él de que habéis concertado un convenio con él de que lo serviréis y guardaréis sus mandamientos, para que él derrame su Espíritu más abundantemente sobre vosotros?",
            "pastoralInsight": "El bautismo es sellar tu pertenencia a la familia de Dios. Haces la promesa de servirle y Él te promete Su Espíritu como compañero constante.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p8-p10#p8",
            "bookId": "mosiah",
            "chapterNum": 18,
            "shortTitle": "El Convenio Bautismal"
          },
          {
            "id": "dia_de_reposo_reverencia",
            "category": "convenios_capilla",
            "title": "El Día de Reposo: delicia de adoración, descanso y devoción",
            "keywords": [
              "dia de reposo",
              "domingo",
              "santificar el domingo",
              "descanso espiritual",
              "reverencia"
            ],
            "scriptureRef": "Mosíah 18:23, 25",
            "scriptureQuote": "Y les mandó que observaran el día de reposo y lo santificaran... Y había un día a la semana señalado en que debían reunirse para enseñar al pueblo y adorar al Señor su Dios; y también debían congregarse tan a menudo como estuviese en su poder.",
            "pastoralInsight": "El domingo es un oasis en el desierto de la semana. No es un día de prohibiciones, sino una oportunidad de recargar el espíritu y reconectar con la familia y con Dios.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/18?lang=spa&id=p23,p25#p23",
            "bookId": "mosiah",
            "chapterNum": 18,
            "shortTitle": "El Día de Reposo"
          }
        ]
      },
      {
        "ch": 19,
        "fact": "Gedeón enfrenta al rey Noé; el ejército lamanita invade y Noé es quemado por sus hombres",
        "summary": "mientras Limhi asume el trono comprometiéndose a pagar la mitad de todo lo que poseen como tributo.",
        "tags": [
          "ira_ataque",
          "justicia"
        ],
        "keywords": "gedeon rey noe huida muerte de noe tributo limhi rey",
        "topics": []
      },
      {
        "ch": 20,
        "fact": "Los sacerdotes fugitivos de Noé raptan a veinticuatro hijas de los lamanitas",
        "summary": "desatando un ataque enfurecido que Limhi logra apaciguar al descubrir y esclarecer la verdad de los hechos.",
        "tags": [
          "ira_ataque",
          "familia_crisis",
          "decisiones_guia"
        ],
        "keywords": "rapto hijas lamanitas sacerdotes pacificacion limhi verdad",
        "topics": []
      },
      {
        "ch": 21,
        "fact": "El pueblo de Limhi sufre crueles vejaciones bajo el yugo lamanita",
        "summary": "humillándose en oración constante hasta que Ammón los localiza y renueva su esperanza de libertad.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno",
          "resiliencia"
        ],
        "keywords": "limhi afliccion azotes oracion humillacion llegada ammon esperanza",
        "topics": []
      },
      {
        "ch": 22,
        "fact": "Gedeón idea el audaz plan de embriagar a los centinelas lamanitas",
        "summary": "logrando que todo el pueblo de Limhi escape de noche con sus ganados y riquezas hacia Zarahemla.",
        "tags": [
          "decisiones_guia",
          "barco_imposibles"
        ],
        "keywords": "escape gedeon vino guardias ebrios noche zarahemla liberacion",
        "topics": []
      },
      {
        "ch": 23,
        "fact": "Alma rehúsa ser rey y organiza en paz al pueblo de la ciudad de Helam",
        "summary": "pero son descubiertos y sometidos pacíficamente por el ejército lamanita comandado por el apóstata Amulón.",
        "tags": [
          "capilla_comunion",
          "humildad",
          "decisiones_guia"
        ],
        "keywords": "alma rehusar rey ciudad helam amulon sumision pacifica",
        "topics": []
      },
      {
        "ch": 24,
        "fact": "Amulón persigue al pueblo de Alma y prohíbe sus oraciones bajo pena de muerte",
        "summary": "pero Dios alivia sus cargas de modo que no sienten el peso sobre sus hombros y los rescata milagrosamente.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno",
          "resiliencia",
          "capilla_comunion"
        ],
        "keywords": "amulon prohibido orar cargas livianas hombros consuelo rescate sueno guardias",
        "topics": [
          {
            "id": "cargas_pesadas_alivio",
            "category": "salud_mental",
            "title": "Sentirse abrumado y aplastado por las cargas de la vida",
            "keywords": [
              "cargas",
              "abrumado",
              "cansancio",
              "agotamiento",
              "opresion",
              "pesadez",
              "no puedo mas",
              "pesado"
            ],
            "scriptureRef": "Mosíah 24:14-15",
            "scriptureQuote": "Y también aliviaré las cargas que pongan sobre vuestros hombros, de manera que no las podréis sentir sobre vuestras espaldas... para que sepáis de seguro que yo, el Señor Dios, visito a mi pueblo en sus aflicciones. Y aconteció que las cargas que se imponían sobre Alma y sus hermanos fueron aliviadas; sí, el Señor los fortaleció de modo que pudieron soportar sus cargas con facilidad.",
            "pastoralInsight": "El Señor a veces no quita la prueba de inmediato, pero fortalece las espaldas de manera que la carga se vuelve ligera. Pregúntale: '¿Cómo podemos orar hoy para que sientas ese sostén?'",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/24?lang=spa&id=p14-p15#p14",
            "bookId": "mosiah",
            "chapterNum": 24,
            "shortTitle": "Cargas Pesadas"
          }
        ]
      },
      {
        "ch": 25,
        "fact": "Mosíah recibe con amor a los pueblos de Limhi y Alma en Zarahemla",
        "summary": "y Alma bautiza a una multitud estableciendo siete congregaciones organizadas de la Iglesia de Dios.",
        "tags": [
          "capilla_comunion",
          "santa_cena_ordenanzas",
          "caridad_servicio"
        ],
        "keywords": "zarahemla reunion limhi alma bautismo siete congregaciones iglesia comunion",
        "topics": []
      },
      {
        "ch": 26,
        "fact": "La nueva generación se rebela por incredulidad; Alma recibe revelación para disciplinar con amor",
        "summary": "el Señor promete que cuantas veces Su pueblo se arrepienta sinceramente, Él perdonará sus ofensas.",
        "tags": [
          "familia_crisis",
          "arrepentimiento_perdon",
          "capilla_comunion"
        ],
        "keywords": "nueva generacion incredulidad revelacion arrepentimiento perdonar cuantas veces",
        "topics": [
          {
            "id": "pecado_demasiado_grave",
            "category": "culpa_perdon",
            "title": "Sentir que mi pecado es demasiado grave para ser perdonado",
            "keywords": [
              "pecado grave",
              "no merezco perdon",
              "dios no me perdonara",
              "inmunda",
              "inmundo",
              "manchado",
              "irredimible"
            ],
            "scriptureRef": "Mosíah 26:30",
            "scriptureQuote": "Sí, y cuantas veces mi pueblo se arrepienta, le perdonaré sus ofensas contra mí.",
            "pastoralInsight": "No existe pecado que sobrepase el alcance infinito de la Expiación de Jesucristo si hay arrepentimiento sincero. La palabra de Dios dice 'cuantas veces se arrepienta, le perdonaré'.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/26?lang=spa&id=p30#p30",
            "bookId": "mosiah",
            "chapterNum": 26,
            "shortTitle": "¿Pecado Irredimible?"
          },
          {
            "id": "perdonar_traicion_grave",
            "category": "relaciones_hogar",
            "title": "Perdonar a quien te traicionó o te causó una herida profunda",
            "keywords": [
              "traicion",
              "herida profunda",
              "perdonar al enemigo",
              "rencor",
              "venganza",
              "amargura"
            ],
            "scriptureRef": "Mosíah 26:31",
            "scriptureQuote": "Y también debéis perdonaros vuestras ofensas unos a otros; porque en verdad os digo que el que no perdona las ofensas de su prójimo, cuando este dice que se arrepiente, ese tal se ha puesto bajo condenación.",
            "pastoralInsight": "Perdonar no es justificar la maldad del otro ni exponerte a más daño; es soltar el veneno del rencor para que tu propia alma no quede envenenada.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/26?lang=spa&id=p31#p31",
            "bookId": "mosiah",
            "chapterNum": 26,
            "shortTitle": "Perdonar Traición Grave"
          }
        ]
      },
      {
        "ch": 27,
        "fact": "Un ángel del Señor se aparece a Alma hijo y a los cuatro hijos de Mosíah",
        "summary": "en respuesta directa a las fervientes oraciones de su padre; Alma queda mudo y paralizado hasta experimentar el nuevo nacimiento.",
        "tags": [
          "familia_crisis",
          "oracion_ayuno",
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "angel voz trueno alma hijo cuatro hijos mosiah oracion padre nuevo nacimiento mudo",
        "topics": [
          {
            "id": "confesar_abandonar_pecado",
            "category": "culpa_perdon",
            "title": "El valor para confesar y abandonar el pecado definitivamente",
            "keywords": [
              "confesar",
              "abandonar",
              "dejar el pecado",
              "honestidad espiritual",
              "romper con el pasado"
            ],
            "scriptureRef": "Mosíah 27:35",
            "scriptureQuote": "Y viajaron por toda la tierra... confesando todos sus pecados y proclamando todas las cosas que habían visto, y explicando las profecías y las escrituras a todos los que deseaban oírlas.",
            "pastoralInsight": "Confesar no te debilita; te quita la máscara y te devuelve el poder. Al abandonar el pecado y ser transparente, el Espíritu regresa con plenitud.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p35#p35",
            "bookId": "mosiah",
            "chapterNum": 27,
            "shortTitle": "Confesar y Abandonar"
          },
          {
            "id": "hijos_rebeldes_alejados",
            "category": "relaciones_hogar",
            "title": "Dolor por hijos descarriados que se han alejado del Evangelio",
            "keywords": [
              "hijos rebeldes",
              "hijo apartado",
              "hijo inactivo",
              "dolor de padres",
              "oracion por los hijos"
            ],
            "scriptureRef": "Mosíah 27:14",
            "scriptureQuote": "He aquí, el Señor ha oído las oraciones de su pueblo, y también las oraciones de su siervo Alma, que es tu padre; porque él ha orado con mucha fe en cuanto a ti, para que seas traído al conocimiento de la verdad; por tanto, con este fin he venido para convencerte del poder y la autoridad de Dios.",
            "pastoralInsight": "Las oraciones de un padre y una madre con fe tienen un alcance sagrado. Nunca dejes de orar con fe por ese hijo; el Señor no lo ha perdido de vista.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p14#p14",
            "bookId": "mosiah",
            "chapterNum": 27,
            "shortTitle": "Hijos Descarriados"
          },
          {
            "id": "redimido_del_abismo_cambio",
            "category": "habitos_ataduras",
            "title": "Nadie está tan hundido que no pueda ser rescatado por Dios",
            "keywords": [
              "redimido del abismo",
              "alma hijo",
              "rescate",
              "salvacion de lo profundo",
              "esperanza de cambio"
            ],
            "scriptureRef": "Mosíah 27:28",
            "scriptureQuote": "No obstante, después de vadear a través de mucha tribulación, arrepintiéndome casi hasta la muerte, el Señor en su misericordia ha tenido a bien arrebatarme de una llama eterna, y he nacido de Dios.",
            "pastoralInsight": "Alma hijo era el mayor perseguidor de la Iglesia de su época. Si Dios pudo transformar su vida, puede transformar la tuya o la de cualquier ser querido.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p28#p28",
            "bookId": "mosiah",
            "chapterNum": 27,
            "shortTitle": "Rescate del Abismo"
          },
          {
            "id": "trabajar_propias_manos_ocio",
            "category": "decisiones_futuro",
            "title": "Trabajar con empeño y laboriosidad con nuestras propias manos",
            "keywords": [
              "trabajo duro",
              "laboriosidad",
              "propias manos",
              "autonomia",
              "autosuficiencia"
            ],
            "scriptureRef": "Mosíah 27:3-4",
            "scriptureQuote": "Y no debía haber orgullo ni soberbia entre ellos... antes bien, todo sacerdote y maestro debía trabajar con sus propias manos para su sostén en todos los casos, salvo en caso de enfermedad...",
            "pastoralInsight": "El trabajo honesto dignifica el alma y es el cimiento de la autosuficiencia espiritual y temporal. Dios bendice el sudor honesto.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/27?lang=spa&id=p3-p4#p3",
            "bookId": "mosiah",
            "chapterNum": 27,
            "shortTitle": "Laboriosidad vs Ocio"
          }
        ]
      },
      {
        "ch": 28,
        "fact": "Los cuatro hijos de Mosíah renuncian al trono para partir a una peligrosa misión de 14 años",
        "summary": "movidos por compasión hacia los lamanitas; Mosíah traduce las veinticuatro planchas de los jareditas.",
        "tags": [
          "caridad_servicio",
          "mision",
          "decisiones_guia"
        ],
        "keywords": "cuatro hijos mosiah renuncia trono mision lamanitas compasion 24 planchas",
        "topics": []
      },
      {
        "ch": 29,
        "fact": "Mosíah propone abolir la monarquía y establecer el gobierno de jueces",
        "summary": "para que cada hombre sea juzgado según sus propios hechos y la voz del pueblo elija con justicia.",
        "tags": [
          "decisiones_guia",
          "justicia"
        ],
        "keywords": "gobierno jueces voz del pueblo abolicion monarquia alma primer juez",
        "topics": []
      }
    ]
  },
  {
    "id": "alma",
    "title": "Alma",
    "author": "Alma hijo / Helamán / Capitán Moroni",
    "period": "91 a.C. — 52 a.C.",
    "icon": "⚔️",
    "summary": "El libro más extenso: lucha contra anticristos (Nehor, Korihor), misiones de redención, el Salmo de la Semilla de Fe (Alma 32), consejos a los hijos, el Estandarte de la Libertad y las guerras del Capitán Moroni.",
    "url_slug": "alma",
    "chapters": [
      {
        "ch": 1,
        "fact": "Nehor introduce la superchería sacerdotal y asesina al venerable anciano Gedeón",
        "summary": "es condenado por Alma según la ley y ejecutado en el cerro Manti, pero su doctrina corrupta infecta a muchos.",
        "tags": [
          "ira_ataque",
          "justicia"
        ],
        "keywords": "nehor supercheria sacerdotal asesinato gedeon juicio ejecucion doctrina falsa",
        "topics": [
          {
            "id": "chismes_juicios_barrio",
            "category": "relaciones_hogar",
            "title": "Chismes, murmuración y juicios injustos en la capilla o familia",
            "keywords": [
              "chismes",
              "murmuracion",
              "juicios",
              "criticas",
              "hablar a espaldas",
              "ofensa en el barrio"
            ],
            "scriptureRef": "Alma 1:30",
            "scriptureQuote": "Y en su estado de prosperidad, no enviaban a nadie que estuviese desnudo, o que tuviese hambre... ni hacían distinción de personas en lo que tocaba a los necesitados... y eran bondadosos con todos los hombres, ya fueran viejos o jóvenes, esclavos o libres, varones o mujeres, perteneciesen o no a la iglesia.",
            "pastoralInsight": "Cuando en el barrio o familia abundan las críticas, tu ministerio debe ser el antídoto: bondad incondicional, silencio ante el chisme y brazos abiertos al necesitado.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/1?lang=spa&id=p30#p30",
            "bookId": "alma",
            "chapterNum": 1,
            "shortTitle": "Chismes en el Barrio"
          }
        ]
      },
      {
        "ch": 2,
        "fact": "Amlici conspira para coronarse rey y desata una sangrienta guerra civil",
        "summary": "Alma ora al Señor pidiendo fortaleza y vence personalmente a Amlici en singular combate junto al río Sidón.",
        "tags": [
          "oracion_ayuno",
          "resiliencia"
        ],
        "keywords": "amlici rebelion rio sidon combate alma victoria oracion",
        "topics": []
      },
      {
        "ch": 3,
        "fact": "Los amlicitas se rapan la cabeza y se marcan la frente de rojo",
        "summary": "cumpliendo la advertencia profética de que los hombres traen sobre sí mismos su propia condenación.",
        "tags": [
          "tentacion_ataduras",
          "decisiones_guia"
        ],
        "keywords": "marca roja frente amlicitas consecuencia albedrio distincion",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "Alma renuncia al asiento judicial para consagrarse por entero al ministerio",
        "summary": "al ver que el orgullo, la vanidad y la opresión dentro de la Iglesia amenazaban con destruir la obra de Dios.",
        "tags": [
          "capilla_comunion",
          "arrepentimiento_perdon",
          "decisiones_guia"
        ],
        "keywords": "renuncia asiento judicial nefihah ministerio palabra orgullo iglesia",
        "topics": []
      },
      {
        "ch": 5,
        "fact": "El profundo examen de conciencia de Alma a los miembros en Zarahemla",
        "summary": "¿habéis experimentado este potente cambio en vuestros corazones? ¿Podéis mirar hacia arriba con corazón puro y manos limpias?.",
        "tags": [
          "arrepentimiento_perdon",
          "fe_semilla_dudas",
          "capilla_comunion"
        ],
        "keywords": "examen conciencia potente cambio corazon imagen rostro manos limpias zarahemla",
        "topics": [
          {
            "id": "vestidos_blancos_sangre_cordero",
            "category": "culpa_perdon",
            "title": "Purificación total: lavados en la sangre del Cordero",
            "keywords": [
              "limpio",
              "puro",
              "sin mancha",
              "vestidos blancos",
              "purificacion",
              "lavado"
            ],
            "scriptureRef": "Alma 5:21",
            "scriptureQuote": "Nadie puede ser salvo a menos que sus vestidos sean lavados sin mancha; sí, sus vestidos deben ser purificados hasta que queden limpios de toda mancha, mediante la sangre de aquel de quien nuestros padres han hablado, que ha de venir para redimir a su pueblo.",
            "pastoralInsight": "No importa cuán oscuras hayan sido tus manchas; el poder limpiador del Salvador tiene la potencia de dejar tus vestiduras más blancas que la nieve.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/5?lang=spa&id=p21#p21",
            "bookId": "alma",
            "chapterNum": 5,
            "shortTitle": "Purificación Total"
          },
          {
            "id": "orgullo_humillacion_espiritual",
            "category": "culpa_perdon",
            "title": "Vencer el orgullo que impide pedir perdón o agachar la cabeza",
            "keywords": [
              "orgullo",
              "soberbia",
              "agachar la cabeza",
              "pedir perdon",
              "humillacion voluntaria"
            ],
            "scriptureRef": "Alma 5:27-28",
            "scriptureQuote": "¿Habéis caminado, conservándoos irreprensibles delante de Dios? ¿Podríais decir, si se os llamara a morir en este momento... que vuestros vestidos han sido lavados y blanqueados mediante la sangre de Cristo?... ¿Os halláis despojados del orgullo? Os digo que si no, no estáis preparados para comparecer ante Dios.",
            "pastoralInsight": "El orgullo es la gran barrera del alma. Humillarse ante Dios y ante nuestro prójimo no es debilidad; es la mayor demostración de nobleza espiritual.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/5?lang=spa&id=p27-p28#p27",
            "bookId": "alma",
            "chapterNum": 5,
            "shortTitle": "Vencer el Orgullo"
          }
        ]
      },
      {
        "ch": 6,
        "fact": "Alma purifica la Iglesia en Zarahemla y ordena maestros y sacerdotes",
        "summary": "mandando al pueblo ayunar y orar por aquellos que aún no conocen a Dios ni participan de la verdad.",
        "tags": [
          "capilla_comunion",
          "oracion_ayuno",
          "caridad_servicio"
        ],
        "keywords": "purificacion iglesia sacerdotes maestros ayuno oracion no creyentes",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Alma enseña en Gedeón la conmovedora doctrina del sufrimiento de Cristo",
        "summary": "Él tomó sobre sí nuestros dolores, enfermedades, flaquezas y aflicciones para que Sus entrañas se llenen de misericordia y sepa cómo socorrernos.",
        "tags": [
          "consuelo_afliccion",
          "salud_sabiduria",
          "fe_semilla_dudas"
        ],
        "keywords": "sede de cristo dolores enfermedades flaquezas socorrer misericordia gedeon",
        "topics": [
          {
            "id": "ansiedad_panico",
            "category": "salud_mental",
            "title": "Ansiedad, angustia profunda o ataques de pánico",
            "keywords": [
              "ansiedad",
              "panico",
              "angustia",
              "miedo",
              "palpitaciones",
              "ahogo",
              "estres",
              "crisis nerviosa",
              "taquicardia"
            ],
            "scriptureRef": "Alma 7:11-13",
            "scriptureQuote": "Y él saldrá, sufriendo dolores, aflicciones y tentaciones de todas clases; y esto para que se cumpla la palabra que dice: Tomará sobre sí los dolores y las enfermedades de su pueblo... y tomará sobre sí sus flaquezas, a fin de que sus entrañas sean llenas de misericordia... para saber cómo socorrer a su pueblo según las flaquezas de ellos.",
            "pastoralInsight": "Recuérdale que el Salvador experimentó en Su propia carne y espíritu la sensación exacta de ahogo y angustia que siente hoy. No es una debilidad de fe, y Cristo sabe íntimamente cómo socorrerle.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/7?lang=spa&id=p11-p13#p11",
            "bookId": "alma",
            "chapterNum": 7,
            "shortTitle": "Ansiedad y Pánico"
          },
          {
            "id": "dolor_fisico_cronico",
            "category": "duelo_dolor",
            "title": "Dolor corporal crónico, enfermedad degenerativa o discapacidad",
            "keywords": [
              "dolor cronico",
              "enfermedad",
              "discapacidad",
              "degenerativa",
              "postrado",
              "padecimiento corporal"
            ],
            "scriptureRef": "Alma 7:11-12",
            "scriptureQuote": "Y él saldrá, sufriendo dolores, aflicciones y tentaciones de todas clases... Tomará sobre sí los dolores y las enfermedades de su pueblo... para que sus entrañas sean llenas de misericordia, según la carne, a fin de que según la carne sepa cómo socorrer a su pueblo.",
            "pastoralInsight": "Cristo sabe lo que siente cada nervio, cada articulación y cada noche de insomnio por el dolor. Él está presente a tu lado en cada minuto de tu aflicción corporal.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/7?lang=spa&id=p11-p12#p11",
            "bookId": "alma",
            "chapterNum": 7,
            "shortTitle": "Dolor Físico Crónico"
          }
        ]
      },
      {
        "ch": 8,
        "fact": "Alma es escupido y expulsado de Ammoníah, pero un ángel le manda volver",
        "summary": "ingresa por otra puerta y encuentra a Amulek, quien lo recibe y cobija en su hogar guiado por una visión angélica.",
        "tags": [
          "consuelo_afliccion",
          "desesperanza",
          "caridad_servicio"
        ],
        "keywords": "ammoniah escupido angel regresa amulek hospitalidad angel alimento",
        "topics": []
      },
      {
        "ch": 9,
        "fact": "Alma advierte con severidad al endurecido pueblo de Ammoníah",
        "summary": "que si rechazan la luz superior que han recibido, su juicio será más intolerable que el de los lamanitas.",
        "tags": [
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "ammoniah juicio luz advertencia dureza corazon",
        "topics": []
      },
      {
        "ch": 10,
        "fact": "Amulek testifica de su linaje y vocación divina ante los abogados",
        "summary": "desenmascarando las trampas jurídicas de quienes buscan enriquecerse a costa de pervertir la justicia.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "amulek testimonio abogados jueces trampas linaje nefita",
        "topics": []
      },
      {
        "ch": 11,
        "fact": "Amulek rechaza con dignidad el soborno de seis ontis de plata ofrecido por Zeezrom",
        "summary": "y aclara con firmeza que Cristo no salvará al hombre *en* sus pecados sino *de* sus pecados mediante el arrepentimiento.",
        "tags": [
          "tentacion_ataduras",
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "zeezrom soborno seis ontis plata no salvara en pecados de pecados resurreccion",
        "topics": [
          {
            "id": "resurreccion_perfecta_cuerpo",
            "category": "duelo_dolor",
            "title": "Certeza de la resurrección: el cuerpo restaurado a su perfección",
            "keywords": [
              "resurreccion",
              "cuerpo perfecto",
              "tumba",
              "restauracion corporal",
              "volver a vivir"
            ],
            "scriptureRef": "Alma 11:43-44",
            "scriptureQuote": "El espíritu y el cuerpo serán reunidos otra vez en su perfecta forma; los miembros así como las coyunturas serán restaurados a su propia forma, tal como nos hallamos ahora... y esta restauración vendrá sobre todos, tanto viejos como jóvenes, esclavos así como libres, varones así como mujeres... ni un solo cabello de sus cabezas se perderá.",
            "pastoralInsight": "Todo cuerpo mutilado, enfermo, desgastado por la edad o los achaques se levantará con vigor y esplendor eterno. Volverás a abrazar a tus seres queridos cara a cara.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/11?lang=spa&id=p43-p44#p43",
            "bookId": "alma",
            "chapterNum": 11,
            "shortTitle": "Resurrección del Cuerpo"
          }
        ]
      },
      {
        "ch": 12,
        "fact": "Alma expone a Zeezrom el estado preparatorio de esta vida terrenal",
        "summary": "y advierte que en el juicio final nuestras propias palabras, obras y pensamientos nos condenarán si no nos arrepentimos.",
        "tags": [
          "fe_semilla_dudas",
          "arrepentimiento_perdon"
        ],
        "keywords": "estado preparatorio juicio pensamientos palabras obras misterios dios",
        "topics": []
      },
      {
        "ch": 13,
        "fact": "Alma diserta sobre la preordenación del Santo Sacerdocio según el orden del Hijo de Dios",
        "summary": "citando a Melquisedec y llamando a los hombres a entrar en el reposo del Señor mediante la humildad y la pureza.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "sacerdocio melquisedec orden hijo de dios preordenacion reposo del senor",
        "topics": []
      },
      {
        "ch": 14,
        "fact": "Alma y Amulek presencian el atroz martirio de las mujeres y niños en el fuego",
        "summary": "son golpeados en prisión durante días hasta que el poder de Dios derrumba los muros del calabozo aplastando a sus verdugos.",
        "tags": [
          "consuelo_afliccion",
          "resiliencia",
          "fe_semilla_dudas"
        ],
        "keywords": "martirio fuego mujeres ninos prision terremoto muros caen amulek dolor",
        "topics": [
          {
            "id": "por_que_dios_permite_maldad",
            "category": "fe_dudas",
            "title": "¿Por qué un Dios amoroso permite el sufrimiento de los inocentes?",
            "keywords": [
              "por que dios permite el mal",
              "sufrimiento inocente",
              "maldad en el mundo",
              "injusticia"
            ],
            "scriptureRef": "Alma 14:10-11",
            "scriptureQuote": "Y aconteció que cuando Amulek vio los dolores de las mujeres y niños que se consumían en la hoguera... dijo a Alma: ¿Cómo podemos presenciar esta escena tan horrible?... Pero Alma le dijo: El Espíritu me constriñe a no extender la mano; pues he aquí, el Señor los recibe para sí en gloria; y él permite que el pueblo haga esto... a fin de que los juicios que dicte sobre ellos en su ira sean justos.",
            "pastoralInsight": "Dios respeta el albedrío humano aun cuando los hombres eligen causar daño atroz. Su justicia es perfecta y Él recibe a los que sufren en gloria eterna.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/14?lang=spa&id=p10-p11#p10",
            "bookId": "alma",
            "chapterNum": 14,
            "shortTitle": "¿Por qué Sufre el Inocente?"
          }
        ]
      },
      {
        "ch": 15,
        "fact": "Zeezrom arde en fiebre por el tormento de su culpa; Alma lo sana milagrosamente",
        "summary": "al profesar Zeezrom fe viva en Jesucristo, tras lo cual es bautizado y comienza a predicar con poder.",
        "tags": [
          "salud_sabiduria",
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "zeezrom fiebre culpa tormento sanacion milagro fe bautismo sidom",
        "topics": []
      },
      {
        "ch": 16,
        "fact": "Un ejército lamanita destruye la ciudad de Ammoníah en un solo día",
        "summary": "cumpliendo la profecía de Alma; Zoram rescata a los cautivos consultando la revelación profética de Alma.",
        "tags": [
          "justicia",
          "decisiones_guia"
        ],
        "keywords": "destruccion ammoniah desolacion nehor zoram profecia cautivos",
        "topics": []
      },
      {
        "ch": 17,
        "fact": "Inicia la misión de los hijos de Mosíah: ayunaron y oraron para tener el Espíritu",
        "summary": "Ammón se hace criado del rey Lamoni y defiende con valentía sus rebaños cortando los brazos de los ladrones en las aguas de Sebus.",
        "tags": [
          "caridad_servicio",
          "oracion_ayuno",
          "salud_sabiduria"
        ],
        "keywords": "hijos mosiah ayuno oracion ammon criado rey lamoni rebaños sebus brazos honda",
        "topics": [
          {
            "id": "poder_espiritual_del_ayuno",
            "category": "convenios_capilla",
            "title": "El poder del ayuno sincero: espíritu de revelación y fortaleza",
            "keywords": [
              "ayuno",
              "ayunar",
              "revelacion",
              "poder espiritual",
              "hijos de mosiah"
            ],
            "scriptureRef": "Alma 17:2-3",
            "scriptureQuote": "Y lo que aún añade más a su gozo: eran todavía sus hermanos en el Señor; sí, y se habían fortalecido en el conocimiento de la verdad; porque eran hombres de sano juicio, y habían escudriñado diligentemente las Escrituras... Mas esto no es todo; se habían dedicado a mucha oración y ayuno; por tanto, tenían el espíritu de profecía y el espíritu de revelación...",
            "pastoralInsight": "El ayuno con propósito abre las compuertas de la revelación y rompe las ataduras de la duda. Cuando tengas una necesidad urgente, une tu oración al ayuno.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/17?lang=spa&id=p2-p3#p2",
            "bookId": "alma",
            "chapterNum": 17,
            "shortTitle": "Poder del Ayuno Sincero"
          }
        ]
      },
      {
        "ch": 18,
        "fact": "El rey Lamoni queda anonadado por la fidelidad de Ammón y se desmaya ante el Espíritu",
        "summary": "tras escuchar por boca de Ammón el glorioso Plan de Redención desde la Creación hasta la venida de Cristo.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "lamoni asombro fidelidad gran espiritu plan redencion desmayo",
        "topics": []
      },
      {
        "ch": 19,
        "fact": "La reina de Lamoni demuestra una fe insigne: 'No ha habido tan grande fe entre los nefitas'",
        "summary": "y el rey, la reina y la humilde sierva Abish viven un milagro de conversión que derrama el Espíritu sobre la multitud.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "reina fe lamoni abish sierva multitud conversion derramamiento espiritu",
        "topics": []
      },
      {
        "ch": 20,
        "fact": "Ammón y Lamoni viajan a Middoni y confrontan al padre de Lamoni",
        "summary": "cuya espada e ira furiosa son desarmadas por la nobleza, amor protector y valentía inquebrantable de Ammón.",
        "tags": [
          "ira_ataque",
          "familia_crisis"
        ],
        "keywords": "middoni padre lamoni ira espada desarmado amor valentia rescate hermanos",
        "topics": []
      },
      {
        "ch": 21,
        "fact": "Aarón y sus hermanos sufren crueles prisiones, hambre y frío en Jerusalén",
        "summary": "perseverando en paciencia y fe hasta ser liberados por la amorosa intervención de Ammón y Lamoni.",
        "tags": [
          "consuelo_afliccion",
          "resiliencia"
        ],
        "keywords": "aaron jerusalen prision hambre cadenas liberacion paciencia",
        "topics": []
      },
      {
        "ch": 22,
        "fact": "Aarón enseña al anciano rey de todos los lamanitas, quien suplica: 'Daré todos mis pecados por conocerte'",
        "summary": "y el rey se postra en ferviente oración y experimenta la paz del perdón junto a toda su casa.",
        "tags": [
          "arrepentimiento_perdon",
          "oracion_ayuno",
          "fe_semilla_dudas"
        ],
        "keywords": "rey lamanita dare todos mis pecados oracion aaron caida tierra paz",
        "topics": []
      },
      {
        "ch": 23,
        "fact": "Miles de lamanitas en siete tierras se convierten al Señor y entierran sus armas de rebelión",
        "summary": "asumiendo con honor sagrado el nombre de Anti-Nefi-Lehis y prometiendo jamás volver a pelear.",
        "tags": [
          "ira_ataque",
          "arrepentimiento_perdon",
          "santa_cena_ordenanzas"
        ],
        "keywords": "anti nefi lehis conversion siete tierras enterrar armas rebelion firmeza jamas caer",
        "topics": []
      },
      {
        "ch": 24,
        "fact": "Los Anti-Nefi-Lehis entierran sus espadas en lo profundo de la tierra",
        "summary": "haciendo convenio solemne de morir antes que pecar, y postrados en oración reciben el ataque sin defenderse.",
        "tags": [
          "ira_ataque",
          "paz",
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "entierro espadas tierra pacto no manchar sangre postrados oracion martirio pacificadores",
        "topics": [
          {
            "id": "enterrar_armas_guerra",
            "category": "culpa_perdon",
            "title": "Enterrar las armas de rebelión en lo profundo para no volver a pecar",
            "keywords": [
              "enterrar armas",
              "anti nefi lehi",
              "pacto de no volver a pecar",
              "romper tentacion"
            ],
            "scriptureRef": "Alma 24:15-18",
            "scriptureQuote": "Enterremos nuestras armas en lo profundo de la tierra para que se conserven lustrosas, como testimonio a nuestro Dios en el postrer día... Y esto hicieron, estimando que era un testimonio a Dios... de que nunca jamás usarían armas.",
            "pastoralInsight": "Para no volver a caer, hay que deshacerse de los accesos, contraseñas, ambientes o amistades que nos incitaban. Enterrar las armas es un acto de amor a Dios.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/24?lang=spa&id=p15-p18#p15",
            "bookId": "alma",
            "chapterNum": 24,
            "shortTitle": "Enterrar Armas de Pecado"
          },
          {
            "id": "cortar_ambientes_armas_guerra",
            "category": "habitos_ataduras",
            "title": "Deshacerse de raíz de los detonantes de la adicción",
            "keywords": [
              "detonantes",
              "cortar de raiz",
              "armas de rebelion",
              "entorno sano",
              "cero recaida"
            ],
            "scriptureRef": "Alma 24:17-18",
            "scriptureQuote": "Y enterraron las armas que habían empleado para derramar sangre humana... y esto hicieron como testimonio a Dios de que nunca jamás emplearían armas; y de este modo atestiguaron su amor hacia Dios.",
            "pastoralInsight": "Si tienes que borrar una aplicación, cambiar de número, botar objetos o alejarte de un lugar, hazlo hoy. Tu paz eterna vale más que cualquier apego terrenal.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/24?lang=spa&id=p17-p18#p17",
            "bookId": "alma",
            "chapterNum": 24,
            "shortTitle": "Cortar Detonantes de Raíz"
          }
        ]
      },
      {
        "ch": 25,
        "fact": "Los lamanitas atacan con furia a los nefitas tras matar a los creyentes indefensos",
        "summary": "cumpliéndose con exactitud las palabras proféticas del mártir Abinadí respecto a los sacerdotes de Noé.",
        "tags": [
          "justicia",
          "fe_semilla_dudas"
        ],
        "keywords": "ataque cumplimiento profecia abinadi sacerdotes noe dispersion",
        "topics": []
      },
      {
        "ch": 26,
        "fact": "El glorioso himno de triunfo de Ammón: 'No me jacto de mi propia fuerza, mas me gloriaré en mi Dios'",
        "summary": "¿quién pudiera imaginarse que Dios sería tan infinitamente misericordioso como para rescatarnos a nosotros y a nuestros hermanos?.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno",
          "caridad_servicio"
        ],
        "keywords": "himno ammon no me jacto gloria dios gozo gavillas cosecha misericordia",
        "topics": []
      },
      {
        "ch": 27,
        "fact": "Los nefitas reciben con conmovedora caridad a los Anti-Nefi-Lehis (pueblo de Ammón)",
        "summary": "cediéndoles generosamente la tierra fértil de Jersón y protegiéndolos con sus propios ejércitos.",
        "tags": [
          "caridad_servicio",
          "capilla_comunion"
        ],
        "keywords": "pueblo de ammon jerson hospitalidad generosidad proteccion ejercitos",
        "topics": [
          {
            "id": "miedo_propia_muerte",
            "category": "duelo_dolor",
            "title": "Miedo o terror a la propia muerte y al más allá",
            "keywords": [
              "miedo a morir",
              "temor a la muerte",
              "morir",
              "agonia",
              "fin de la vida",
              "mas alla"
            ],
            "scriptureRef": "Alma 27:28",
            "scriptureQuote": "Y jamás miraban la muerte con ningún grado de terror, a causa de su esperanza y sus puntos de vista en cuanto a Cristo y la resurrección; por tanto, para ellos la muerte era consumida por la victoria de Cristo sobre ella.",
            "pastoralInsight": "Para el discípulo de Jesucristo, la muerte no es un abismo oscuro sino una puerta de entrada a la paz, donde toda lágrima será enjugada.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/27?lang=spa&id=p28#p28",
            "bookId": "alma",
            "chapterNum": 27,
            "shortTitle": "Miedo a la Muerte"
          }
        ]
      },
      {
        "ch": 28,
        "fact": "Una cruenta batalla causa inmenso dolor y luto entre los hogares nefitas",
        "summary": "recordando la amarga tragedia del pecado frente al gozo sublime y la esperanza eterna de los justos.",
        "tags": [
          "consuelo_afliccion",
          "resiliencia"
        ],
        "keywords": "batalla luto llanto dolor contraste pecado justicia esperanza",
        "topics": [
          {
            "id": "tragedia_repentina_luto",
            "category": "duelo_dolor",
            "title": "Tragedia inesperada o pérdida repentina de un familiar",
            "keywords": [
              "accidente",
              "muerte repentina",
              "tragedia",
              "shock",
              "luto repentino",
              "dolor agudo"
            ],
            "scriptureRef": "Alma 28:11-12",
            "scriptureQuote": "Y hubo grandes lamentos y llantos por la pérdida de sus parientes... Mas ¡ay!, sabían que tenían motivo para afligirse, según las promesas del Señor... y otros de verdad se regocijaban y se llenaban de gozo a causa de las promesas del Señor de que serían levantados para habitar a la diestra de Dios.",
            "pastoralInsight": "Llorar una pérdida es sagrado; el llanto no contradice la fe. El Evangelio abraza las lágrimas mientras nos sostiene con la certeza inquebrantable de la vida eterna.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/28?lang=spa&id=p11-p12#p11",
            "bookId": "alma",
            "chapterNum": 28,
            "shortTitle": "Tragedia Inesperada"
          }
        ]
      },
      {
        "ch": 29,
        "fact": "El célebre clamor apostólico de Alma: '¡Oh, si fuera yo un ángel y se me concediera el deseo de mi corazón!'",
        "summary": "para proclamar con trompeta celestial el arrepentimiento y la salvación a cada alma sobre la tierra.",
        "tags": [
          "caridad_servicio",
          "arrepentimiento_perdon"
        ],
        "keywords": "oh si fuera yo un angel trompeta clamar arrepentimiento deseo corazon regocijo",
        "topics": [
          {
            "id": "albedrio_respeto_decisiones_ajenas",
            "category": "relaciones_hogar",
            "title": "Respetar el albedrío ajeno cuando no eligen lo correcto",
            "keywords": [
              "albedrio",
              "no puedo obligar",
              "eleccion libre",
              "libertad ajena",
              "soltar el control"
            ],
            "scriptureRef": "Alma 29:4",
            "scriptureQuote": "Porque sé que él concede a los hombres según lo que deseen, ya sea para muerte o para vida; sí, sé que él concede a los hombres según sus deseos, ya sea para salvación o para destrucción.",
            "pastoralInsight": "No puedes obligar a nadie a ser feliz o a obedecer. Ama, enseña con el ejemplo, ora sin cesar y suelta la necesidad de controlar lo que solo Dios y ellos pueden decidir.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/29?lang=spa&id=p4#p4",
            "bookId": "alma",
            "chapterNum": 29,
            "shortTitle": "Respetar el Albedrío"
          }
        ]
      },
      {
        "ch": 30,
        "fact": "Korihor el anticristo predica la burla a la fe y exige una señal a Alma",
        "summary": "queda mudo instantáneamente por mandato de Dios, confiesa haber sido engañado por el diablo y muere atropellado entre los zoramitas.",
        "tags": [
          "fe_semilla_dudas",
          "ira_ataque"
        ],
        "keywords": "korihor anticristo senal mudo todas las cosas indican que hay un dios diablo angel de luz atropellado",
        "topics": [
          {
            "id": "pedir_senales_korihor",
            "category": "fe_dudas",
            "title": "Cuando alguien exige una señal milagrosa para poder creer",
            "keywords": [
              "pedir senales",
              "korihor",
              "todas las cosas testifican",
              "evidencias de dios"
            ],
            "scriptureRef": "Alma 30:44",
            "scriptureQuote": "Todas las cosas indican que hay un Dios, sí, aun la tierra y todo cuanto hay sobre ella, sí, y su movimiento, sí, y también todos los planetas que se mueven en su orden regular testifican que hay un Creador Supremo.",
            "pastoralInsight": "Las señales no engendran fe duradera; la fe nace de la humildad del corazón. La creación entera y el latido de tu pecho testifican de la bondad de Dios.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/30?lang=spa&id=p44#p44",
            "bookId": "alma",
            "chapterNum": 30,
            "shortTitle": "Exigir Señales (Korihor)"
          }
        ]
      },
      {
        "ch": 31,
        "fact": "Alma encabeza una misión para rescatar a los apóstatas zoramitas",
        "summary": "quienes oran con vanidad sobre el púlpito del Rameumptom; Alma ora con lágrimas pidiendo consuelo y fortaleza para sus compañeros.",
        "tags": [
          "oracion_ayuno",
          "consuelo_afliccion",
          "caridad_servicio"
        ],
        "keywords": "zoramitas rameumptom oracion vana alma lagrimas consuelo fortaleza mision",
        "topics": [
          {
            "id": "desesperacion_pruebas_fe",
            "category": "salud_mental",
            "title": "Cuando sientes que tus oraciones se estrellan contra el techo",
            "keywords": [
              "desesperacion",
              "cielo de bronce",
              "dios no responde",
              "silencio de dios",
              "oracion sin respuesta"
            ],
            "scriptureRef": "Alma 31:31-33",
            "scriptureQuote": "¡Oh Señor, da consuelo a mi alma en Cristo!... ¡Da fortaleza a mi alma para que sufra con paciencia estas aflicciones que han de venir sobre mí a causa de la iniquidad de este pueblo!... ¡Concédeles que tengan éxito, sí, para que de nuevo te traigamos a nuestros hermanos en Cristo!",
            "pastoralInsight": "Incluso profetas como Alma oraron en medio de lágrimas y dolor agudo pidiendo consuelo para su propia alma. El silencio temporal de Dios no es ausencia, es preparación de Su respuesta.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/31?lang=spa&id=p31-p33#p31",
            "bookId": "alma",
            "chapterNum": 31,
            "shortTitle": "Oración en el Dolor"
          }
        ]
      },
      {
        "ch": 32,
        "fact": "Alma enseña a los humildes cómo cultivar la fe como si fuera una semilla",
        "summary": "si dais lugar para que la palabra sea sembrada en vuestro corazón y no la expulsáis con incredulidad, germinará, crecerá y se convertirá en un árbol de vida eterna.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion",
          "resiliencia"
        ],
        "keywords": "semilla fe dar lugar experimento germinar brotar arbol fruto vida eterna",
        "topics": [
          {
            "id": "experimento_semilla_dudas",
            "category": "fe_dudas",
            "title": "«No sé si Dios existe realmente o si sólo es una ilusión»",
            "keywords": [
              "dudas de fe",
              "dios existe",
              "no se si creo",
              "escepticismo",
              "semilla",
              "experimentar"
            ],
            "scriptureRef": "Alma 32:27-28",
            "scriptureQuote": "Pero he aquí, si despertáis y aviváis vuestras facultades hasta experimentar con mis palabras, y ejercitáis un poco de fe, sí, aunque no tengáis más que un deseo de creer, dejad que este deseo obre en vosotros... Ahora bien, compararemos la palabra a una semilla. Si dais cabida para que una semilla sea sembrada en vuestro corazón... empezará a hincharse en vuestro pecho.",
            "pastoralInsight": "Dios no exige certeza absoluta el primer día. Basta con un pequeño deseo de creer. Siembras la semilla orando con sinceridad y observando el fruto de paz en tu vida.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/32?lang=spa&id=p27-p28#p27",
            "bookId": "alma",
            "chapterNum": 32,
            "shortTitle": "¿Existe Dios? (Semilla)"
          },
          {
            "id": "fe_pequena_como_semilla",
            "category": "fe_dudas",
            "title": "Sentir que mi fe es demasiado pequeña e insuficiente",
            "keywords": [
              "poca fe",
              "fe pequena",
              "duda",
              "deseo de creer",
              "semilla de fe"
            ],
            "scriptureRef": "Alma 32:27",
            "scriptureQuote": "Pero he aquí, si despertáis y aviváis vuestras facultades hasta experimentar con mis palabras, y ejercitáis un poco de fe, sí, aunque no tengáis más que un deseo de creer, dejad que este deseo obre en vosotros, sí, hasta que creáis de tal modo que deis cabida a una porción de mis palabras.",
            "pastoralInsight": "No necesitas mover montañas hoy; solo necesitas darle un lugar pequeño a la palabra en tu corazón. El Salvador se encarga de hacerla crecer.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/32?lang=spa&id=p27#p27",
            "bookId": "alma",
            "chapterNum": 32,
            "shortTitle": "Fe Pequeña"
          }
        ]
      },
      {
        "ch": 33,
        "fact": "Alma refuta el Rameumptom citando las oraciones de Zenós en el campo, desierto y aposento",
        "summary": "y recuerda cómo los israelitas rebeldes perecieron en el desierto por rehusar mirar a la serpiente de bronce que sanaba con solo mirar.",
        "tags": [
          "oracion_ayuno",
          "salud_sabiduria",
          "fe_semilla_dudas"
        ],
        "keywords": "zenos oracion campo desierto serpiente bronce mirar vivir moises",
        "topics": []
      },
      {
        "ch": 34,
        "fact": "Amulek enseña que la Expiación es un sacrificio infinito y eterno",
        "summary": "manda orar en los campos, hogares y aposentos, socorrer al necesitado y no demorar el día de nuestro arrepentimiento terrenal.",
        "tags": [
          "arrepentimiento_perdon",
          "oracion_ayuno",
          "caridad_servicio"
        ],
        "keywords": "sacrificio infinito expiacion orar aposentos no demorar arrepentimiento noche tinieblas",
        "topics": [
          {
            "id": "trampa_posponer_arrepentimiento",
            "category": "culpa_perdon",
            "title": "El peligro de posponer el arrepentimiento: 'mañana cambiaré'",
            "keywords": [
              "posponer",
              "procrastinacion espiritual",
              "manana me arrepiento",
              "tiempo de prepararse"
            ],
            "scriptureRef": "Alma 34:32-34",
            "scriptureQuote": "Porque he aquí, esta vida es cuando el hombre debe prepararse para comparecer ante Dios... os ruego, por tanto, que no demoréis el día de vuestro arrepentimiento hasta el fin... porque el mismo espíritu que posea vuestros cuerpos al salir de esta vida, ese mismo espíritu tendrá poder para poseer vuestro cuerpo en aquel mundo eterno.",
            "pastoralInsight": "El mañana no está garantizado. El momento de ser libre, de pedir perdón y de respirar en paz con Dios es hoy mismo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/34?lang=spa&id=p32-p34#p32",
            "bookId": "alma",
            "chapterNum": 34,
            "shortTitle": "No Posponer el Cambio"
          },
          {
            "id": "orar_en_todo_lugar_campo_casa",
            "category": "fe_dudas",
            "title": "Aprender a orar en todo momento y lugar: campo, casa y secretos",
            "keywords": [
              "orar siempre",
              "oracion familiar",
              "oracion secreta",
              "clamar a dios",
              "amulek oracion"
            ],
            "scriptureRef": "Alma 34:18-27",
            "scriptureQuote": "Sí, clamad a él por misericordia, porque es poderoso para salvar... clamad a él en vuestras casas, sí, por todas las de vuestra casa, tanto por la mañana, como al mediodía y al atardecer... reposen vuestros corazones, inundados continuamente de ferviente oración hacia él por vuestro bienestar y por el bienestar de aquellos que os rodean.",
            "pastoralInsight": "Dios está interesado en cada detalle de tu vida: tu trabajo, tus finanzas, tus miedos y tu hogar. Habla con Él con la confianza de un hijo amado.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/34?lang=spa&id=p18-p27#p18",
            "bookId": "alma",
            "chapterNum": 34,
            "shortTitle": "Orar en Todo Momento"
          },
          {
            "id": "gratitud_continua_misericordias",
            "category": "decisiones_futuro",
            "title": "Vivir cada día en acción de gracias por las misericordias recibidas",
            "keywords": [
              "gratitud",
              "accion de gracias",
              "bendiciones diarias",
              "misericordia"
            ],
            "scriptureRef": "Alma 34:38",
            "scriptureQuote": "Que no contendáis más contra el Espíritu Santo, sino que lo recibáis y toméis sobre vosotros el nombre de Cristo; que os humilléis hasta el polvo y adoréis a Dios en cualquier lugar en que estéis, en espíritu y en verdad; y que viváis cada día en acción de gracias por las muchas misericordias y bendiciones que él os concede.",
            "pastoralInsight": "Un corazón agradecido es inmune al desánimo. Empezar el día agradeciendo 3 cosas sencillas cambia por completo la perspectiva ante el futuro.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/34?lang=spa&id=p38#p38",
            "bookId": "alma",
            "chapterNum": 34,
            "shortTitle": "Gratitud Diaria"
          }
        ]
      },
      {
        "ch": 35,
        "fact": "Los zoramitas conversos y pobres son expulsados de su tierra y acogidos en Jersón",
        "summary": "por el generoso pueblo de Ammón, lo cual enfurece a los líderes zoramitas y enciende los preparativos bélicos.",
        "tags": [
          "caridad_servicio",
          "consuelo_afliccion"
        ],
        "keywords": "refugiados zoramitas pueblo ammon jerson ira lideres guerra",
        "topics": []
      },
      {
        "ch": 36,
        "fact": "Alma relata a su hijo Helamán su portentosa conversión en quiasmo perfecto",
        "summary": "estando sumido en el tormento más amargo por sus pecados, clamó: '¡Oh Jesús, Hijo de Dios, ten misericordia de mí!', y no recordó más su dolor.",
        "tags": [
          "arrepentimiento_perdon",
          "consuelo_afliccion",
          "familia_crisis"
        ],
        "keywords": "quiasmo helaman conversion tormento clamar jesus misericordia no mas dolor gozo",
        "topics": [
          {
            "id": "perdida_deseo_vivir",
            "category": "salud_mental",
            "title": "Pérdida del deseo de vivir / Desesperanza existencial",
            "keywords": [
              "deseo de morir",
              "no quiero vivir",
              "suicidio",
              "desesperanza",
              "tormento",
              "oscuridad",
              "vacio",
              "suicidio",
              "suicida",
              "quitarse la vida",
              "no quiero vivir",
              "morir"
            ],
            "scriptureRef": "Alma 36:18-20",
            "scriptureQuote": "¡Oh Jesús, Hijo de Dios, ten misericordia de mí!... Y cuando pensé en esto, ya no me pude acordar más de mis dolores... ¡Y oh qué gozo, y qué luz tan maravillosa fue la que vi! Sí, mi alma se llenó de un gozo tan profundo como lo había sido mi dolor.",
            "pastoralInsight": "Cuando el dolor es desgarrador, una sola súplica al nombre de Jesucristo puede ser el inicio del rescate. Escucha sin juzgar, ofrece apoyo profesional médico de inmediato y acompáñale con amor incondicional.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p18-p20#p18",
            "bookId": "alma",
            "chapterNum": 36,
            "shortTitle": "Suicidio y Desesperanza"
          },
          {
            "id": "confianza_sostenido_dificultad",
            "category": "salud_mental",
            "title": "Fortaleza cuando sientes que ya no puedes soportar otra prueba",
            "keywords": [
              "no puedo mas",
              "resistencia",
              "sostener",
              "fortaleza",
              "tribulaciones",
              "dificultades",
              "aguante"
            ],
            "scriptureRef": "Alma 36:3",
            "scriptureQuote": "Quienquiera que ponga su confianza en Dios será sostenido en sus tribulaciones, y sus dificultades y aflicciones, y será enaltecido en el postrer día.",
            "pastoralInsight": "No necesitas tener todas las respuestas hoy ni resolver el mes completo; solo poner tu confianza en Dios para dar el siguiente paso de fe. Él te sostiene.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p3#p3",
            "bookId": "alma",
            "chapterNum": 36,
            "shortTitle": "Sostén en Aflicción"
          },
          {
            "id": "verguenza_miedo_obispo",
            "category": "culpa_perdon",
            "title": "Vergüenza y pavor de confesar y hablar con el Obispo",
            "keywords": [
              "miedo al obispo",
              "verguenza confesar",
              "confesion",
              "que va a pensar de mi",
              "terror de confesar"
            ],
            "scriptureRef": "Alma 36:17-19",
            "scriptureQuote": "Y aconteció que mientras me atormentaba el recuerdo de mis muchos pecados... me acordé de haber oído a mi padre profetizar al pueblo concerniente a la venida de un Jesucristo... ¡Oh Jesús, Hijo de Dios, ten misericordia de mí!... Y cuando pensé en esto, ya no me pude acordar más de mis dolores.",
            "pastoralInsight": "El obispo no es un verdugo, es un médico espiritual llamado para ayudarte a vendar las heridas. La confesión abre la puerta para que el tormento se transforme en gozo puro.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p17-p19#p17",
            "bookId": "alma",
            "chapterNum": 36,
            "shortTitle": "Miedo a Confesar al Obispo"
          },
          {
            "id": "paz_interior_incomprensible",
            "category": "culpa_perdon",
            "title": "El gozo que sobrepasa el entendimiento tras el perdón de pecados",
            "keywords": [
              "gozo del perdon",
              "alivio inmenso",
              "liberacion espiritual",
              "paz interior"
            ],
            "scriptureRef": "Alma 36:20-21",
            "scriptureQuote": "Sí, te digo, hijo mío, que no puede haber cosa tan exquisita y tan dulce como lo fue mi gozo... sí, y nada puede haber tan exquisito y amargo como fueron mis dolores.",
            "pastoralInsight": "La medida de tu tristeza actual será la medida del gozo que experimentarás cuando permitas que el Salvador disuelva tu culpa. Ten fe.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/36?lang=spa&id=p20-p21#p20",
            "bookId": "alma",
            "chapterNum": 36,
            "shortTitle": "Gozo del Perdón"
          }
        ]
      },
      {
        "ch": 37,
        "fact": "Alma encomienda los anales a Helamán y enseña: 'Por cosas pequeñas y sencillas se realizan grandes obras'",
        "summary": "explicando que la Liahona funcionaba según la fe y que de igual modo las palabras de Cristo nos guiarán sin extraviarnos.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas",
          "familia_crisis"
        ],
        "keywords": "cosas pequenas sencillas grandes obras liahona brujula palabras de cristo guia",
        "topics": [
          {
            "id": "liahona_palabras_cristo",
            "category": "fe_dudas",
            "title": "La Liahona espiritual: las palabras de Cristo nos guían paso a paso",
            "keywords": [
              "liahona",
              "direccion paso a paso",
              "brujula espiritual",
              "palabras de cristo"
            ],
            "scriptureRef": "Alma 37:44-46",
            "scriptureQuote": "Porque he aquí, tan fácil es prestar atención a la palabra de Cristo, que te señalará un curso directo a la felicidad eterna, como lo fue para nuestros padres prestar atención a esta brújula, que les señalaba un curso directo a la tierra prometida... No seamos perezosos por causa de la facilidad de la senda.",
            "pastoralInsight": "La guía diaria de Dios es simple pero requiere constancia. Unos minutos al día en las Escrituras operan como tu Liahona para no perder el rumbo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37?lang=spa&id=p44-p46#p44",
            "bookId": "alma",
            "chapterNum": 37,
            "shortTitle": "La Liahona Espiritual"
          },
          {
            "id": "perezosos_facilidad_senda",
            "category": "habitos_ataduras",
            "title": "Vencer la apatía espiritual y la pereza que abre la puerta al mal",
            "keywords": [
              "pereza",
              "apatia",
              "letargo espiritual",
              "facilidad de la senda",
              "descuido"
            ],
            "scriptureRef": "Alma 37:46",
            "scriptureQuote": "¡Oh hijo mío, no seamos perezosos por causa de la facilidad de la senda! Porque así fue con nuestros padres; pues así les fue preparado: que si miraban, vivían; así es con nosotros. La vía está preparada; y si queremos mirar, podremos vivir para siempre.",
            "pastoralInsight": "La mayoría de las caídas no ocurren por rebelión violenta, sino por dejar de orar y leer por pura pereza. Mantén tus hábitos espirituales vivos hoy.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37?lang=spa&id=p46#p46",
            "bookId": "alma",
            "chapterNum": 37,
            "shortTitle": "Pereza Espiritual"
          },
          {
            "id": "consulta_al_senor_todos_hechos",
            "category": "decisiones_futuro",
            "title": "Elegir empleo, profesión o tomar una gran decisión de vida",
            "keywords": [
              "empleo",
              "trabajo",
              "carrera",
              "decision dificil",
              "consulta al senor",
              "que debo hacer"
            ],
            "scriptureRef": "Alma 37:37",
            "scriptureQuote": "Consulta al Señor en todos tus hechos, y él te dirigirá para bien; sí, cuando te acuestes por la noche, acuéstate en el Señor, para que él te guarde en tu sueño; y cuando te levantes por la mañana, rebose tu corazón de gratitud a Dios; y si haces estas cosas, serás enaltecido en el postrer día.",
            "pastoralInsight": "No tomes decisiones importantes a solas con tu ansiedad. Presenta tus opciones en oración, pide confirmación y Él dirigirá tus pasos para bien.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/37?lang=spa&id=p37#p37",
            "bookId": "alma",
            "chapterNum": 37,
            "shortTitle": "Elegir Empleo / Carrera"
          }
        ]
      },
      {
        "ch": 38,
        "fact": "Alma aconseja a su fiel hijo Shiblón a perseverar con humildad y templanza",
        "summary": "mandándole: 'Refrena todas tus pasiones para que estés lleno de amor; no te jactes de tu propia sabiduría'.",
        "tags": [
          "tentacion_ataduras",
          "familia_crisis",
          "caridad_servicio"
        ],
        "keywords": "shiblon refrenar pasiones lleno amor no jactarse templanza mansedumbre",
        "topics": [
          {
            "id": "ira_interna_refrenar_pasiones",
            "category": "salud_mental",
            "title": "Ira desbordada, frustración y enojo que amarga el corazón",
            "keywords": [
              "ira",
              "enojo",
              "rabia",
              "coraje",
              "furia",
              "rencor",
              "frustracion",
              "odio"
            ],
            "scriptureRef": "Alma 38:12",
            "scriptureQuote": "Usa de moderación en todas las cosas; procura también refrenar todas tus pasiones para que estés lleno de amor; procura evitar la ociosidad.",
            "pastoralInsight": "Alma le enseñó a su hijo que 'refrenar' las pasiones como a un caballo no es reprimirse enfermizamente, sino encauzar la energía para que el corazón pueda llenarse de amor y paz.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p12#p12",
            "bookId": "alma",
            "chapterNum": 38,
            "shortTitle": "Ira y Enojo"
          },
          {
            "id": "paz_que_sobrepuja_todo",
            "category": "duelo_dolor",
            "title": "Buscar la paz que sobrepuja todo entendimiento humano",
            "keywords": [
              "paz de dios",
              "serenidad en el dolor",
              "calma en la tormenta",
              "consuelo supremo"
            ],
            "scriptureRef": "Alma 38:5",
            "scriptureQuote": "Y ahora bien, hijo mío, Shiblon, quisiera que supieses que en tanto que pongas tu confianza en Dios, en esa misma medida serás librado de tus pruebas y tus dificultades y tus aflicciones, y serás enaltecido en el postrer día.",
            "pastoralInsight": "La paz no significa que la tormenta haya cesado alrededor, sino que dentro de tu alma tienes anclada la mano del Príncipe de Paz.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p5#p5",
            "bookId": "alma",
            "chapterNum": 38,
            "shortTitle": "Paz Inexplicable"
          },
          {
            "id": "envidia_celos_hermanos",
            "category": "relaciones_hogar",
            "title": "Vencer la envidia y la comparación con amigos o hermanos",
            "keywords": [
              "envidia",
              "celos",
              "comparacion",
              "rivalidad",
              "jactancia"
            ],
            "scriptureRef": "Alma 38:11",
            "scriptureQuote": "Procura no ser altivo; sí, procura no jactarte de tu propia sabiduría, ni de tus muchas riquezas.",
            "pastoralInsight": "La comparación es el ladrón del gozo. Dios no tiene hijos favoritos; Él tiene un plan a la medida exacta para ti que no compite con el de nadie más.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p11#p11",
            "bookId": "alma",
            "chapterNum": 38,
            "shortTitle": "Envidia y Comparación"
          },
          {
            "id": "desacuerdos_mansedumbre",
            "category": "relaciones_hogar",
            "title": "Resolver desacuerdos sin gritos: moderación y dominio propio",
            "keywords": [
              "discusiones",
              "pleitos",
              "peleas",
              "desacuerdos",
              "mansedumbre",
              "dialogo pacífico"
            ],
            "scriptureRef": "Alma 38:12",
            "scriptureQuote": "Usa de moderación en todas las cosas; procura también refrenar todas tus pasiones para que estés lleno de amor...",
            "pastoralInsight": "En cualquier desacuerdo conyugal o familiar, el que baja la voz y busca entender antes de tener la razón es quien gana la verdadera victoria de Cristo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/38?lang=spa&id=p12#p12",
            "bookId": "alma",
            "chapterNum": 38,
            "shortTitle": "Resolver Desacuerdos"
          }
        ]
      },
      {
        "ch": 39,
        "fact": "Alma amonesta con franqueza a su hijo Coriantón por dejar el ministerio e ir tras la ramera Isabel",
        "summary": "enseñándole la gravedad aborrecible de los pecados sexuales, que son lo más abominable después de derramar sangre inocente.",
        "tags": [
          "tentacion_ataduras",
          "familia_crisis",
          "arrepentimiento_perdon"
        ],
        "keywords": "corianton ramera isabel pecados sexuales abominable ministerio cruz arrepentimiento",
        "topics": [
          {
            "id": "pornografia_inmoralidad_crucificate",
            "category": "habitos_ataduras",
            "title": "Lucha contra la pornografía o la inmoralidad sexual",
            "keywords": [
              "pornografia",
              "impureza",
              "lujuria",
              "castidad",
              "inmoralidad",
              "adiccion sexual",
              "corianton"
            ],
            "scriptureRef": "Alma 39:9, 11",
            "scriptureQuote": "Quisiera que te arrepintieses y abandonases tus pecados, y no te dejases llevar más por las concupiscencias de tus ojos, sino que te crucificases a ti mismo de todas estas cosas... Vuélvete al Señor con toda tu mente, alma y fuerza.",
            "pastoralInsight": "Alma no condenó a su hijo Coriantón para siempre; le mostró con amor firme que debía cortar de raíz los estímulos que alimentaban la tentación y refugiarse en el Señor.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/39?lang=spa&id=p9,p11#p9",
            "bookId": "alma",
            "chapterNum": 39,
            "shortTitle": "Pornografía e Impureza"
          }
        ]
      },
      {
        "ch": 40,
        "fact": "Alma instruye a Coriantón sobre el estado del alma entre la muerte y la resurrección",
        "summary": "distinguiendo entre el paraíso de descanso y paz para los justos, y las tinieblas de afuera con lloro y crujir de dientes para los inicuos.",
        "tags": [
          "consuelo_afliccion",
          "familia_crisis"
        ],
        "keywords": "muerte resurreccion estado del alma paraiso descanso tinieblas llanto",
        "topics": [
          {
            "id": "fallecimiento_conyuge_padres",
            "category": "duelo_dolor",
            "title": "Fallecimiento de cónyuge, padre, madre o ser querido íntimo",
            "keywords": [
              "muerte conyuge",
              "fallecio mi esposo",
              "murio mi madre",
              "padre fallecido",
              "luto",
              "viudez",
              "paraiso"
            ],
            "scriptureRef": "Alma 40:11-12",
            "scriptureQuote": "El espíritu de todos los hombres, luego que se separa de este cuerpo mortal... es llevado de regreso a ese Dios que les dio la vida... los espíritus de los que son justos son recibidos en un estado de felicidad que se llama paraíso: un estado de descanso, un estado de paz, donde descansarán de todos sus afanes, y de todo cuidado y pesar.",
            "pastoralInsight": "Tu ser querido no ha dejado de existir; ha entrado en un estado de descanso absoluto donde no hay dolor, enfermedad ni angustia terrenal, a la espera del abrazo glorioso de la resurrección.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/40?lang=spa&id=p11-p12#p11",
            "bookId": "alma",
            "chapterNum": 40,
            "shortTitle": "Luto Conyugal / Padres"
          }
        ]
      },
      {
        "ch": 41,
        "fact": "Alma aclara la Ley de la Restauración: 'La maldad nunca fue felicidad'",
        "summary": "enseñándole que recibiremos de regreso exactamente lo que hayamos sembrado: el bien por bien, y el mal por mal.",
        "tags": [
          "arrepentimiento_perdon",
          "decisiones_guia",
          "justicia"
        ],
        "keywords": "ley restauracion maldad nunca fue felicidad sembrar cosechar bien mal",
        "topics": [
          {
            "id": "restitucion_maldad_nunca_felicidad",
            "category": "culpa_perdon",
            "title": "Restituir el daño causado: la maldad nunca fue felicidad",
            "keywords": [
              "maldad nunca fue felicidad",
              "restitucion",
              "reparar dano",
              "pedir perdon al projimo"
            ],
            "scriptureRef": "Alma 41:10, 14",
            "scriptureQuote": "La maldad nunca fue felicidad... Por tanto, hijo mío, mira que seas misericordioso con tus hermanos; trata con justicia, juzga con rectitud, y haz el bien continuamente; y si haces todas estas cosas, entonces recibirás tu galardón.",
            "pastoralInsight": "El pecado deja un rastro amargo. Cuando nos humillamos a reparar lo dañado y actuar con justicia hacia quienes herimos, el gozo celestial regresa.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/41?lang=spa&id=p10,p14#p10",
            "bookId": "alma",
            "chapterNum": 41,
            "shortTitle": "Maldad Nunca Fue Felicidad"
          }
        ]
      },
      {
        "ch": 42,
        "fact": "Alma explica la armonía divina entre la Justicia y la Misericordia en la Expiación",
        "summary": "invitando a Coriantón a dejar que la justicia divina lo humille hasta el polvo para que la gracia y misericordia de Cristo lo alcancen.",
        "tags": [
          "arrepentimiento_perdon",
          "consuelo_afliccion",
          "justicia"
        ],
        "keywords": "justicia misericordia expiacion polvo humillacion armonia redencion",
        "topics": [
          {
            "id": "tristeza_segun_dios_vs_mundana",
            "category": "culpa_perdon",
            "title": "Distinguir entre la tristeza según Dios y el remordimiento destructivo",
            "keywords": [
              "tristeza segun dios",
              "remordimiento",
              "autodestruccion",
              "desesperacion por pecar"
            ],
            "scriptureRef": "Alma 42:29-30",
            "scriptureQuote": "Y ahora bien, hijo mío, quisiera que no te dejaras turbar más por estas cosas, y solo deja que te turben tus pecados, con esa turbación que te ha de llevar al arrepentimiento... ¡Oh hijo mío, no niegues más la justicia de Dios!",
            "pastoralInsight": "La culpa sana te empuja hacia Cristo para cambiar; la culpa del adversario te dice que no vales nada y que deberías esconderte. Quédate solo con la que te lleva a la luz.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/42?lang=spa&id=p29-p30#p29",
            "bookId": "alma",
            "chapterNum": 42,
            "shortTitle": "Tristeza según Dios"
          }
        ]
      },
      {
        "ch": 43,
        "fact": "El joven capitán Moroni diseña armaduras y corazas protectoras para su pueblo",
        "summary": "y derrota al ejército de Zerahemna en el río Sidón luchando no por conquista sino por sus familias, libertades y religión.",
        "tags": [
          "resiliencia",
          "familia_crisis",
          "ira_ataque"
        ],
        "keywords": "moroni corazas escudos armaduras zerahemna sidon familias libertad religion",
        "topics": []
      },
      {
        "ch": 44,
        "fact": "Moroni exige a Zerahemna un pacto solemne de paz en el nombre de Dios",
        "summary": "Zerahemna intenta asesinar a Moroni a traición pero un soldado nefita le corta el cuero cabelludo hasta que entrega sus armas.",
        "tags": [
          "ira_ataque",
          "paz",
          "justicia"
        ],
        "keywords": "pacto de paz zerahemna traicion cuero cabelludo entrega armas rio sidon",
        "topics": []
      },
      {
        "ch": 45,
        "fact": "Alma profetiza la aniquilación nefita final, bendice la tierra y parte de ella",
        "summary": "siendo trasladado por el Señor como Moisés; Helamán y sus hermanos reorganizan el sacerdocio en toda la nación.",
        "tags": [
          "fe_semilla_dudas",
          "decisiones_guia"
        ],
        "keywords": "profecia destruccion bendicion tierra partida alma traslado moises helaman",
        "topics": []
      },
      {
        "ch": 46,
        "fact": "Amalickíah conspira para hacerse rey; Moroni rasga su manto y alza el Estandarte de la Libertad",
        "summary": "escribiendo en él: 'En memoria de nuestro Dios, nuestra religión, y libertad, y nuestra paz, nuestras esposas y nuestros hijos'.",
        "tags": [
          "resiliencia",
          "familia_crisis",
          "salud_sabiduria"
        ],
        "keywords": "estandarte libertad moroni manto rasgado amalickiah esposas hijos religion paz",
        "topics": [
          {
            "id": "cuidar_templo_cuerpo_salud",
            "category": "habitos_ataduras",
            "title": "Cuidado del cuerpo físico y pureza: la Palabra de Sabiduría",
            "keywords": [
              "salud",
              "palabra de sabiduria",
              "cuerpo templo",
              "alcohol",
              "drogas",
              "sustancias",
              "alcohol",
              "alcoholico",
              "alcoholismo",
              "bebida",
              "borracho",
              "vicio",
              "drogas",
              "tabaco",
              "sustancias"
            ],
            "scriptureRef": "Alma 46:40",
            "scriptureQuote": "Y hubo algunos que murieron de fiebres, que en ciertas estaciones del año eran muy frecuentes en esa región... pero no tantos como los que murieron a causa de las fiebres, por motivo de las excelentes cualidades de las muchas plantas y raíces que Dios había preparado para extirpar la causa de las enfermedades...",
            "pastoralInsight": "Dios proveyó cosas saludables para nuestro sustento y nos mandó cuidar el cuerpo. Mantener el templo corporal libre de sustancias destructivas despeja la mente para recibir revelación.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/46?lang=spa&id=p40#p40",
            "bookId": "alma",
            "chapterNum": 46,
            "shortTitle": "Alcohol, Drogas y Salud"
          }
        ]
      },
      {
        "ch": 47,
        "fact": "Amalickíah usa la traición, el engaño y el veneno a plazos para usurpar el trono lamanita",
        "summary": "asesinando a Lehonti y luego al propio rey lamanita para apoderarse de su reina y ejércitos.",
        "tags": [
          "tentacion_ataduras",
          "justicia"
        ],
        "keywords": "amalickiah traicion veneno a plazos lehonti asesinato reina usurpacion",
        "topics": []
      },
      {
        "ch": 48,
        "fact": "El imperecedero elogio al carácter del Capitán Moroni",
        "summary": "'Si todos los hombres hubiesen sido, y fuesen, y estuviesen para siempre conforme al temple de Moroni, los poderes mismos del infierno se habrían sacudido para siempre'.",
        "tags": [
          "resiliencia",
          "caridad_servicio",
          "caracter"
        ],
        "keywords": "temple moroni caracter infierno sacudido fidelidad no se deleitaba en sangre",
        "topics": [
          {
            "id": "fortificar_puntos_debiles_moroni",
            "category": "habitos_ataduras",
            "title": "Estrategia de defensa: fortificar tus puntos débiles de antemano",
            "keywords": [
              "defensas",
              "fortificaciones",
              "puntos debiles",
              "capitan moroni",
              "prevencion"
            ],
            "scriptureRef": "Alma 48:8-9",
            "scriptureQuote": "Y aconteció que Moroni no cesó de hacer preparativos para la guerra, o sea, para defender a su pueblo de los lamanitas; porque mandó que sus ejércitos... erigiesen fuertes alrededor de cada ciudad en toda la tierra circundante.",
            "pastoralInsight": "No esperes a que la tentación golpee para decidir qué harás. Pon filtros, cambia de hábitos, duerme temprano y establece barreras claras cuando estás fuerte.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/alma/48?lang=spa&id=p8-p9#p8",
            "bookId": "alma",
            "chapterNum": 48,
            "shortTitle": "Fortificar Puntos Débiles"
          }
        ]
      },
      {
        "ch": 49,
        "fact": "Los lamanitas atacan las ciudades de Ammoníah y Noé pero quedan atónitos y masacrados",
        "summary": "ante las impenetrables fortificaciones, parapetos y fosos de defensa diseñados por Moroni sin perder un solo nefita.",
        "tags": [
          "preparacion",
          "resiliencia"
        ],
        "keywords": "fortificaciones fosos parapetos ammoniah noe asombro victoria sin bajas",
        "topics": []
      },
      {
        "ch": 50,
        "fact": "Moroni fortifica todas las ciudades y los nefitas viven una era de inmensa prosperidad",
        "summary": "declarando los anales que jamás hubo una época más feliz entre el pueblo de Nefi desde los días de su fundación.",
        "tags": [
          "prosperidad",
          "capilla_comunion"
        ],
        "keywords": "ciudades fortificadas epoca feliz prosperidad paz lehi morianton disputas",
        "topics": []
      },
      {
        "ch": 51,
        "fact": "Los reyezuelos rehúsan pelear por su patria; Moroni sofoca la sedición interna",
        "summary": "mientras Amalickíah invade las costas hasta que el audaz Teáncum le clava una jabalina en el corazón mientras duerme en su tienda.",
        "tags": [
          "justicia",
          "decisiones_guia"
        ],
        "keywords": "reyezuelos sedicion teancum lanza jabalina corazon muerte amalickiah tienda",
        "topics": []
      },
      {
        "ch": 52,
        "fact": "Ammoron sucede a su hermano; Moroni, Teáncum y Lehi coordinan una brillante estrategia",
        "summary": "atrayendo al ejército lamanita fuera de la ciudad fortificada de Mulek para recuperarla sin sufrir grandes bajas.",
        "tags": [
          "decisiones_guia",
          "resiliencia"
        ],
        "keywords": "ammoron mulek senuelo estrategia teancum lehi moroni victoria",
        "topics": []
      },
      {
        "ch": 53,
        "fact": "Dos mil jóvenes hijos de los conversos de Ammón hacen convenio de defender la libertad",
        "summary": "tomando las armas bajo el mando del profeta Helamán guiados por la fe indestructible que sus madres les enseñaron.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas",
          "resiliencia"
        ],
        "keywords": "dos mil jovenes guerreros helaman hijos madres fe convenio libertad valor",
        "topics": []
      },
      {
        "ch": 54,
        "fact": "Ammoron propone un canje de prisioneros; Moroni le responde con una epístola inflexible",
        "summary": "exigiendo justicia, denunciando sus mentiras y advirtiéndole que Dios vengará la sangre de los inocentes.",
        "tags": [
          "ira_ataque",
          "valentia"
        ],
        "keywords": "canje prisioneros ammoron carta moroni firmeza justicia advertencia",
        "topics": []
      },
      {
        "ch": 55,
        "fact": "Moroni rescata a todos los prisioneros nefitas en la ciudad de Gid sin derramar sangre",
        "summary": "enviando vino a los centinelas lamanitas a través del soldado Laman y armando en secreto a sus cautivos.",
        "tags": [
          "decisiones_guia",
          "sabiduria"
        ],
        "keywords": "rescate sin sangre gid vino guardias ebrios soldado laman noche armas",
        "topics": []
      },
      {
        "ch": 56,
        "fact": "Helamán escribe a Moroni narrando el prodigioso heroísmo de sus jóvenes guerreros",
        "summary": "quienes pelean con fuerza sobrehumana y declaran: 'Nuestras madres nos enseñaron que si no dudábamos, Dios nos libraría; y no dudamos'.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "carta helaman dos mil jovenes no dudaban madres fe libraria antipas",
        "topics": []
      },
      {
        "ch": 57,
        "fact": "Los jóvenes de Helamán sufren heridas múltiples pero ninguno pierde la vida",
        "summary": "dejando atónito al ejército entero ante semejante milagro obrado por su fe absoluta en la expiación de Cristo.",
        "tags": [
          "salud_sabiduria",
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "heridas ninguno murio milagro fe absoluta cumeni preservacion divina",
        "topics": []
      },
      {
        "ch": 58,
        "fact": "Helamán toma la ciudad de Manti por estratagema; Dios infunde paz en sus almas",
        "summary": "tras clamar en oración en medio del hambre, la falta de provisiones y el desamparo del gobierno.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno",
          "resiliencia"
        ],
        "keywords": "manti estratagema oracion paz alma provisiones hambre consuelo rescate",
        "topics": []
      },
      {
        "ch": 59,
        "fact": "Moroni se llena de profundo dolor e indignación al caer la ciudad de Nefíah",
        "summary": "creyendo falsamente que los gobernantes en Zarahemla se desentienden por pereza de los soldados que mueren en el frente.",
        "tags": [
          "desesperanza",
          "ira_ataque"
        ],
        "keywords": "dolor moroni caida nefiah queja gobierno provisiones traicion aparente",
        "topics": []
      },
      {
        "ch": 60,
        "fact": "La apasionada y severa epístola de Moroni a Pahorán",
        "summary": "¿podéis quedaros sentados en vuestros tronos en insensible estupor mientras vuestros hermanos son asesinados por millares?.",
        "tags": [
          "ira_ataque",
          "justicia"
        ],
        "keywords": "carta moroni pahoran tronos estupor indolencia juicio limpieza vaso",
        "topics": []
      },
      {
        "ch": 61,
        "fact": "La magistral respuesta de mansedumbre de Pahorán a Moroni",
        "summary": "'En tu carta me has censurado, mas no me disgusta; me regocijo en la grandeza de tu corazón'; le revela que una rebelión traidora usurpó la capital.",
        "tags": [
          "ira_ataque",
          "pacificadores",
          "inteligencia_emocional",
          "consuelo_afliccion"
        ],
        "keywords": "respuesta pahoran mansedumbre no me disgusta grandeza corazon rebelion pacthies",
        "topics": []
      },
      {
        "ch": 62,
        "fact": "Moroni y Pahorán unen sus fuerzas en Zarahemla y liberan la nación",
        "summary": "recuperan Nefíah, abastecen a los ejércitos de Helamán y ponen fin definitivo a la más devastadora guerra nefita.",
        "tags": [
          "reconciliacion",
          "resiliencia",
          "capilla_comunion"
        ],
        "keywords": "union moroni pahoran victoria recuperacion nefiah paz final provisiones",
        "topics": []
      },
      {
        "ch": 63,
        "fact": "Shiblón custodia los anales, Hagoth zarpa en naves hacia el norte y Moroni muere en paz",
        "summary": "entregando el registro sagrado al joven Helamán hijo tras una vida entera de devoción sin mancha.",
        "tags": [
          "historia",
          "decisiones_guia"
        ],
        "keywords": "hagoth naves mar norte shiblon anales muerte moroni helaman hijo",
        "topics": []
      }
    ]
  },
  {
    "id": "hel",
    "title": "Helamán",
    "author": "Helamán hijo / Nefi hijo de Helamán",
    "period": "52 a.C. — 1 a.C.",
    "icon": "⚡",
    "summary": "Las combinaciones secretas de Gadiantón, la inmortal enseñanza de fundar la vida sobre la Roca del Redentor (Helamán 5:12), la oración de Nefi en el jardín, el poder de atar y desatar, y las profecías de Samuel el Lamanita.",
    "url_slug": "hel",
    "chapters": [
      {
        "ch": 1,
        "fact": "Pahorán hijo es asesinado por Kishkumen en el asiento judicial",
        "summary": "los lamanitas invaden y toman por sorpresa la capital Zarahemla, pero Moroníah los derrota y expulsa.",
        "tags": [
          "crisis_politica",
          "alerta"
        ],
        "keywords": "asesinato pahoran hijo kishkumen coriantumr captura zarahemla moroniah",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "Helamán asume el asiento judicial; su siervo apuñala en secreto a Kishkumen",
        "summary": "frustrando el complot de la banda secreta fundada por Gadiantón que pretendía exterminar a los líderes del pueblo.",
        "tags": [
          "decisiones_guia",
          "tentacion_ataduras"
        ],
        "keywords": "helaman siervo punal kishkumen gadianton banda secreta huida",
        "topics": []
      },
      {
        "ch": 3,
        "fact": "Gran migración hacia el norte; los santos ayunan y oran a menudo haciéndose más puros y firmes",
        "summary": "en la fe de Cristo a pesar de las persecuciones y la soberbia que asolan al país.",
        "tags": [
          "oracion_ayuno",
          "capilla_comunion",
          "humildad"
        ],
        "keywords": "migracion cemento madera ayuno oracion purificacion corazon firmeza cristo",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "Por causa del orgullo y la opresión a los necesitados, los nefitas pierden la mitad de su territorio",
        "summary": "comprendiendo en carne propia que cuando el Espíritu de Dios se aparta, quedan indefensos ante sus enemigos.",
        "tags": [
          "arrepentimiento_perdon",
          "humildad"
        ],
        "keywords": "perdida tierras orgullo opresion espiritu aparta debilidad juicio",
        "topics": []
      },
      {
        "ch": 5,
        "fact": "El inmortal consejo de Helamán a sus hijos: 'Recordad que es sobre la roca de nuestro Redentor donde debéis establecer vuestro fundamento'",
        "summary": "Nefi y Lehi convierten a 8,000 lamanitas en prisión envueltos por un fuego celestial y una voz mansa y apacible que atraviesa el alma.",
        "tags": [
          "resiliencia",
          "fe_semilla_dudas",
          "familia_crisis",
          "consuelo_afliccion"
        ],
        "keywords": "roca redentor fundamento fuego celestial voz apacible nefi lehi aminadab conversion prision",
        "topics": [
          {
            "id": "roca_cristo_fundamento_helaman",
            "category": "habitos_ataduras",
            "title": "Fundamento inquebrantable: edificar sobre la roca de Cristo",
            "keywords": [
              "roca de cristo",
              "fundamento seguro",
              "torbellinos del diablo",
              "helaman 5 12",
              "firmeza"
            ],
            "scriptureRef": "Helamán 5:12",
            "scriptureQuote": "Y ahora bien, recordad, hijos míos, recordad que es sobre la roca de nuestro Redentor, el cual es Cristo, el Hijo de Dios, donde debéis establecer vuestro fundamento, para que cuando el diablo lance sus impetuosos vientos... sus dardos en el torbellino... no tenga poder para arrastraros al abismo de miseria y angustia sin fin.",
            "pastoralInsight": "Las tormentas vendrán a todos, pero si tus pies están anclados al Salvador a través de convenios diarios, ninguna adicción ni torbellino podrá derribarte.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/hel/5?lang=spa&id=p12#p12",
            "bookId": "hel",
            "chapterNum": 5,
            "shortTitle": "La Roca de Cristo"
          }
        ]
      },
      {
        "ch": 6,
        "fact": "Los lamanitas convertidos superan en justicia a los nefitas y van a predicarles",
        "summary": "mientras los ladrones de Gadiantón se apoderan del gobierno nefita seduciendo a la sociedad con riquezas y corrupción.",
        "tags": [
          "capilla_comunion",
          "justicia"
        ],
        "keywords": "lamanitas justicia nefitas corrupcion gadianton juramentos antiguos",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Nefi gime desconsolado en la torre de su jardín junto al camino del mercado",
        "summary": "llorando por la iniquidad de su pueblo y advirtiendo que los juicios de Dios caerán velozmente sobre sus cabezas.",
        "tags": [
          "oracion_ayuno",
          "desesperanza"
        ],
        "keywords": "nefi torre jardin mercado llanto luto iniquidad advertencia",
        "topics": []
      },
      {
        "ch": 8,
        "fact": "Nefi desenmascara a los jueces corruptos, testifica de Cristo citando a Moisés y Zenós",
        "summary": "y profetiza que en ese preciso instante el juez superior Seezoram ha sido asesinado por su propio hermano.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "jueces corruptos veredicto profecia veracidad asesinato seezoram",
        "topics": []
      },
      {
        "ch": 9,
        "fact": "Cinco mensajeros corren al tribunal y hallan a Seezoram degollado en su sangre",
        "summary": "Nefi identifica con detalles exactos y sobrenaturales a Seántum como el asesino, demostrando su divina condición de profeta.",
        "tags": [
          "discernimiento",
          "fe_semilla_dudas"
        ],
        "keywords": "cinco mensajeros veracidad seezoram seantum sangre manto confesion",
        "topics": []
      },
      {
        "ch": 10,
        "fact": "El Señor otorga a Nefi el supremo poder de atar y desatar en la tierra y en el cielo",
        "summary": "por su incansable fidelidad y porque no busca su propia vida sino la voluntad pura del Padre.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "poder atar desatar cielo tierra fidelidad incansable voz divina",
        "topics": []
      },
      {
        "ch": 11,
        "fact": "Nefi pide una sequía y gran hambre en lugar de guerra para doblegar el orgullo del pueblo",
        "summary": "el pueblo se humilla, clama a Dios, Nefi suplica lluvia y los cielos se abren, aunque pronto recaen en el mal.",
        "tags": [
          "oracion_ayuno",
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "sequia hambre oracion lluvia cesa peste humillacion recaida gadianton",
        "topics": []
      },
      {
        "ch": 12,
        "fact": "Mormón reflexiona sobre la insensatez y fragilidad del corazón humano",
        "summary": "¡cuán presto es el hombre a vanagloriarse en la abundancia terrenal y cuán tardo en acordarse de su Creador y Salvador!.",
        "tags": [
          "humildad",
          "arrepentimiento_perdon"
        ],
        "keywords": "insensatez corazon humano vanagloria polvo nada tierra obedece dios",
        "topics": []
      },
      {
        "ch": 13,
        "fact": "Samuel el Lamanita sube a las murallas de Zarahemla tras ser expulsado",
        "summary": "y proclama con valentía la destrucción de los nefitas si no se arrepienten de su orgullo y su enfermizo amor a las riquezas.",
        "tags": [
          "ira_ataque",
          "arrepentimiento_perdon",
          "valentia"
        ],
        "keywords": "samuel lamanita murallas zarahemla espada justicia riquezas malditas arrepentíos",
        "topics": []
      },
      {
        "ch": 14,
        "fact": "Samuel profetiza las señales precisas del nacimiento y de la muerte del Salvador",
        "summary": "una noche sin tinieblas y una nueva estrella para el nacimiento; y tres días de densa obscuridad, truenos y rocas partidas para Su muerte.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "senales nacimiento noche sin tinieblas estrella tres dias oscuridad muerte cristo rocas",
        "topics": []
      },
      {
        "ch": 15,
        "fact": "Samuel contrasta la paciencia de Dios hacia los lamanitas con el castigo nefita",
        "summary": "recordando que a mayor luz recibida, mayor será la condenación si se rechaza el mensaje celestial.",
        "tags": [
          "justicia",
          "arrepentimiento_perdon"
        ],
        "keywords": "paciencia lamanitas luz recibida advertencia condenacion firmeza",
        "topics": []
      },
      {
        "ch": 16,
        "fact": "Los nefitas enfurecidos arrojan piedras y flechas contra Samuel en la muralla",
        "summary": "pero el Espíritu del Señor lo protege de forma milagrosa sin que nada lo toque; salta de la muralla y regresa a su tierra.",
        "tags": [
          "ira_ataque",
          "fe_semilla_dudas",
          "resiliencia"
        ],
        "keywords": "piedras flechas muralla proteccion milagro salto huida bautismo nefi",
        "topics": []
      }
    ]
  },
  {
    "id": "3-ne",
    "title": "3 Nefi",
    "author": "Nefi hijo de Nefi / Jesucristo / Mormón",
    "period": "1 d.C. — 35 d.C.",
    "icon": "✨",
    "summary": "El cumplimiento de las señales, la destrucción de los inicuos, la gloriosa aparición personal de Jesucristo resucitado en el templo de Abundancia, Sus enseñanzas, sanaciones y la institución de la Santa Cena.",
    "url_slug": "3-ne",
    "chapters": [
      {
        "ch": 1,
        "fact": "Los incrédulos fijan un día fatal para matar a todos los creyentes si no aparece la señal",
        "summary": "Nefi clama todo el día al Señor y la voz divina le dice: '¡Alza la cabeza y ten buen ánimo!'; esa noche el sol se oculta pero no hay tinieblas.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas",
          "oracion_ayuno"
        ],
        "keywords": "dia de muerte creyentes alza cabeza noche sin tinieblas nueva estrella nacimiento cristo",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "El pueblo olvida pronto las señales milagrosas y las atribuye a la casualidad",
        "summary": "mientras los ladrones de Gadiantón se multiplican y amenazan con exterminar tanto a nefitas como a lamanitas.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "olvido senales incredulidad casualidad ladrones gadianton peligro union",
        "topics": []
      },
      {
        "ch": 3,
        "fact": "Giddianhi el ladrón envía una carta intimidante y aduladora al gobernador Laconeo",
        "summary": "pero Laconeo no se acobarda y reúne a todo el pueblo con sus familias y provisiones para siete años en un solo refugio fortificado.",
        "tags": [
          "ira_ataque",
          "resiliencia",
          "familia_crisis"
        ],
        "keywords": "giddianhi carta intimidacion laconeo no teme concentracion provisiones siete anos",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "Los nefitas liderados por Gidgiddoni derrotan totalmente a los ejércitos de Gadiantón",
        "summary": "ahorcando a su líder Zemnaríah en un árbol y alabando a Dios con lágrimas y cánticos de gozo.",
        "tags": [
          "resiliencia",
          "justicia"
        ],
        "keywords": "gidgiddoni victoria batalla derrota ladrones zemnariah arbol canticos gozo",
        "topics": []
      },
      {
        "ch": 5,
        "fact": "Mormón testifica de su genealogía y su llamado supremo como discípulo de Jesucristo",
        "summary": "declarando con solemnidad que su compendio es un registro verídico que llevará a Israel de regreso a su Redentor.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "mormon discipulo de jesucristo compendio veridico recogimiento israel",
        "topics": []
      },
      {
        "ch": 6,
        "fact": "La paz dura poco; el orgullo por las riquezas y la distinción de clases sociales destruyen la Iglesia",
        "summary": "y jueces inicuos confabulan en secreto asesinando a los profetas que testifican de Cristo.",
        "tags": [
          "capilla_comunion",
          "tentacion_ataduras"
        ],
        "keywords": "orgullo clases sociales vestidos costosos asesinato profetas destruccion iglesia",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "El gobierno colapsa en tribus independientes; Nefi ministra con ángeles y resucita a su hermano",
        "summary": "testificando con tal potencia del Espíritu que nadie puede resistir sus palabras ni sus milagros.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "colapso gobierno tribus nefi angeles hermano resucitado poder fe milagros",
        "topics": []
      },
      {
        "ch": 8,
        "fact": "En el año 34 estalla una tempestad devastadora, terremotos que parten la tierra e incendios feroces",
        "summary": "hundiendo ciudades enteras en el mar y el fuego, seguidos por tres días de densa obscuridad que sofoca toda vela y fuego.",
        "tags": [
          "consuelo_afliccion",
          "justicia"
        ],
        "keywords": "tempestad terremoto rocas hendidas ciudades hundidas tres dias oscuridad espesa llanto",
        "topics": []
      },
      {
        "ch": 9,
        "fact": "En medio de las tinieblas resuena la voz de Jesucristo llamando al arrepentimiento",
        "summary": "'¡Oh pueblo, cuántas veces os he juntado como la gallina junta sus polluelos!; no me ofreceréis más sacrificios de sangre, sino un corazón quebrantado y un espíritu contrito'.",
        "tags": [
          "consuelo_afliccion",
          "arrepentimiento_perdon",
          "santa_cena_ordenanzas"
        ],
        "keywords": "voz cristo tinieblas gallina polluelos corazon quebrantado espiritu contrito luz mundo",
        "topics": [
          {
            "id": "brazo_misericordia_extendido",
            "category": "culpa_perdon",
            "title": "El Salvador te espera con los brazos abiertos sin reproches",
            "keywords": [
              "brazos abiertos",
              "brazo de misericordia",
              "acogida",
              "recibir",
              "no me rechaza"
            ],
            "scriptureRef": "3 Nefi 9:14",
            "scriptureQuote": "He aquí, mi brazo de misericordia se extiende hacia vosotros; y el que viniere, yo lo recibiré; y benditos son los que vienen a mí.",
            "pastoralInsight": "Cristo no te está esperando con un ceño fruncido o una lista de acusaciones. Su brazo está abierto y extendido hacia ti ahora mismo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/9?lang=spa&id=p14#p14",
            "bookId": "3-ne",
            "chapterNum": 9,
            "shortTitle": "Brazos Abiertos de Cristo"
          }
        ]
      },
      {
        "ch": 10,
        "fact": "El silencio y el llanto cesan al oír por segunda vez la tierna promesa del Salvador",
        "summary": "las tinieblas se disipan milagrosamente y los sobrevivientes que no habían rechazado a los profetas caen en alabanzas al Redentor.",
        "tags": [
          "consuelo_afliccion",
          "paz"
        ],
        "keywords": "silencio llanto disipan tinieblas luz sol alabanzas salvador preservados",
        "topics": []
      },
      {
        "ch": 11,
        "fact": "Jesucristo desciende del cielo en el templo de Abundancia tras la voz del Padre: '¡He aquí a mi Hijo Amado!'",
        "summary": "permite a la multitud palpar las heridas en Sus manos, pies y costado; llama a doce discípulos y enseña el bautismo prohibiendo las disputas de doctrina.",
        "tags": [
          "fe_semilla_dudas",
          "santa_cena_ordenanzas",
          "ira_ataque",
          "capilla_comunion"
        ],
        "keywords": "aparicion cristo abundancia templo tocar heridas manos costado bautismo inmersion no contencion doctrina",
        "topics": [
          {
            "id": "insultos_ataques_contencion",
            "category": "relaciones_hogar",
            "title": "Cómo responder ante ataques verbales, agresiones o provocaciones",
            "keywords": [
              "insultos",
              "agresion",
              "ataque verbal",
              "contencion",
              "odio",
              "provocacion",
              "pacificadores"
            ],
            "scriptureRef": "3 Nefi 11:29-30",
            "scriptureQuote": "Porque en verdad, en verdad os digo que aquel que tiene el espíritu de contención no es mío, sino es del diablo, que es el padre de la contención, y él incita los corazones de los hombres a contender con ira, unos con otros. He aquí, esta no es mi doctrina, agitar con ira los corazones de los hombres, el uno contra el otro; antes bien, mi doctrina es esta: que se ponga fin a tales cosas.",
            "pastoralInsight": "Responder al insulto con ira es darle la victoria al adversario. El pacificador no es débil; tiene la fuerza de Cristo para desarmar la contención con silencio o mansedumbre.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/11?lang=spa&id=p29-p30#p29",
            "bookId": "3-ne",
            "chapterNum": 11,
            "shortTitle": "Insultos y Agresiones"
          }
        ]
      },
      {
        "ch": 12,
        "fact": "Jesucristo proclama las Bienaventuranzas en América elevando la ley moral",
        "summary": "bienaventurados los mansos, los misericordiosos y los pacificadores; manda no tener ira contra el hermano, evitar la fornicación mental y amar a los enemigos.",
        "tags": [
          "ira_ataque",
          "caridad_servicio",
          "arrepentimiento_perdon"
        ],
        "keywords": "bienaventuranzas pobres espiritu pacificadores reconciliate pronto ama enemigos sal de la tierra luz",
        "topics": []
      },
      {
        "ch": 13,
        "fact": "El Salvador enseña a dar limosnas y orar en secreto sin hipocresía",
        "summary": "enseña el Padre Nuestro, el perdón sincero a quienes nos ofenden y manda buscar primeramente el reino de Dios y Su justicia.",
        "tags": [
          "oracion_ayuno",
          "arrepentimiento_perdon",
          "decisiones_guia"
        ],
        "keywords": "limosnas secreto padre nuestro oracion perdon buscar primeramente reino dios lilios campo",
        "topics": []
      },
      {
        "ch": 14,
        "fact": "Jesucristo manda no juzgar injustamente, no echar perlas a los cerdos y pedir para recibir",
        "summary": "y enseña la parábola del hombre sabio que edificó su casa sobre la roca y resistió la lluvia y las tempestades.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas",
          "resiliencia"
        ],
        "keywords": "no juzgueis viga paja ojo perlas cerdos pedid se os dara puerta estrecha casa roca",
        "topics": []
      },
      {
        "ch": 15,
        "fact": "El Salvador declara que la ley de Moisés se cumplió en Su persona",
        "summary": "y revela a los nefitas que ellos son las 'otras ovejas' de las que habló a Sus apóstoles en Jerusalén que debían oír Su voz.",
        "tags": [
          "fe_semilla_dudas",
          "doctrina"
        ],
        "keywords": "ley moises cumplida otras ovejas rebano jerusalen convenio israel",
        "topics": []
      },
      {
        "ch": 16,
        "fact": "Jesucristo profetiza sobre las tribus perdidas y el recogimiento de Israel en los postreros días",
        "summary": "advirtiendo a los gentiles modernos que si se enorgullecen perderán la plenitud del Evangelio que pasará a los remanentes.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "tribus perdidas recogimiento gentiles orgullo remanente israel sion",
        "topics": []
      },
      {
        "ch": 17,
        "fact": "El Salvador sana a los enfermos, cojos y ciegos, y bendice a cada uno de los niños pequeños",
        "summary": "llora de compasión infinita, y ángeles descienden del cielo rodeando a los niños en medio de fuego celestial.",
        "tags": [
          "salud_sabiduria",
          "consuelo_afliccion",
          "familia_crisis",
          "caridad_servicio"
        ],
        "keywords": "sanidad enfermos cojos ciegos ninos pequenos fuego celestial angeles lagrimas compasion",
        "topics": [
          {
            "id": "ministrar_uno_por_uno_cristo",
            "category": "convenios_capilla",
            "title": "El modelo divino de la ministración: cuidar a las almas uno por uno",
            "keywords": [
              "ministracion",
              "uno por uno",
              "visita de ministracion",
              "cuidar al projimo",
              "jesus ninos"
            ],
            "scriptureRef": "3 Nefi 17:21",
            "scriptureQuote": "Y aconteció que cuando hubo hablado estas palabras, lloró, y la multitud dio testimonio de ello; y tomó a sus niños pequeños, uno por uno, y los bendijo, y oró al Padre por ellos.",
            "pastoralInsight": "Jesús nunca ministró a bulto; se detuvo a mirar a los ojos y bendecir a cada uno por su nombre. Ese es el estándar de oro de nuestra ministración.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/17?lang=spa&id=p21#p21",
            "bookId": "3-ne",
            "chapterNum": 17,
            "shortTitle": "Ministrar Uno por Uno"
          }
        ]
      },
      {
        "ch": 18,
        "fact": "Jesucristo instituye la Santa Cena mandando participar del pan y del vino en Su memoria",
        "summary": "manda orar siempre en las familias y prohíbe terminantemente expulsar a nadie de las reuniones de la Iglesia.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion",
          "oracion_ayuno"
        ],
        "keywords": "santa cena pan vino memoria cuerpo sangre orar siempre no echar nadie reuniones",
        "topics": [
          {
            "id": "velar_y_orar_siempre_redes",
            "category": "habitos_ataduras",
            "title": "Velar y orar continuamente para no caer en las trampas sutiles",
            "keywords": [
              "velar y orar",
              "vigilancia",
              "trampas del diablo",
              "oracion preventiva"
            ],
            "scriptureRef": "3 Nefi 18:18",
            "scriptureQuote": "He aquí, de cierto, de cierto os digo que debéis velar y orar siempre, no sea que el diablo os tiente y seáis llevados cautivos por él.",
            "pastoralInsight": "La oración no es solo para pedir perdón tras el error; es el radar que te avisa del peligro antes de que caigas en él.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/18?lang=spa&id=p18#p18",
            "bookId": "3-ne",
            "chapterNum": 18,
            "shortTitle": "Velar y Orar contra Redes"
          }
        ]
      },
      {
        "ch": 19,
        "fact": "Los doce discípulos enseñan y oran con fervor suplicando recibir el Espíritu Santo",
        "summary": "Jesucristo regresa, ora al Padre agradecido por la pureza de su fe, y Su rostro y ropas resplandecen con blancura incomparable.",
        "tags": [
          "oracion_ayuno",
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "doce discipulos deseo espiritu santo oracion cristo resplandor blancura celestial fe",
        "topics": []
      },
      {
        "ch": 20,
        "fact": "El Salvador provee pan y vino milagrosamente por segunda vez para la Santa Cena",
        "summary": "y cita con majestuosidad las profecías del convenio abrahámico sobre el triunfo final de Sion en los postreros días.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "segunda santa cena pan milagroso convenio abraham recogimiento sion triunfo",
        "topics": []
      },
      {
        "ch": 21,
        "fact": "La salida a luz del Libro de Mormón será la señal suprema de que el recogimiento ha comenzado",
        "summary": "y que el convenio del Señor con la casa de Israel se está cumpliendo velozmente sobre la faz de la tierra.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "libro de mormon senal suprema recogimiento israel cumplimiento convenio",
        "topics": []
      },
      {
        "ch": 22,
        "fact": "El Salvador cita Isaías 54: 'Por un breve momento te abandoné, mas te recogeré con grandes misericordias'",
        "summary": "prometiendo que los montes se moverán y los collados temblarán, pero Su benignidad jamás se apartará de Su pueblo.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "isaias 54 breve momento abandone grandes misericordias benignidad no apartara paz",
        "topics": []
      },
      {
        "ch": 23,
        "fact": "Jesucristo manda escudriñar diligentemente los escritos del profeta Isaías",
        "summary": "y hace corregir el registro nefita añadiendo la profecía cumplida de Samuel el Lamanita sobre la resurrección de los santos.",
        "tags": [
          "fe_semilla_dudas",
          "estudio"
        ],
        "keywords": "escudrinar isaias mandamiento corregir anales samuel lamanita resurreccion santos",
        "topics": []
      },
      {
        "ch": 24,
        "fact": "El Salvador manda registrar Malaquías 3 sobre la venida del Señor a Su templo y el Diezmo",
        "summary": "'Traed todos los diezmos al alfolí... y probadme ahora en esto, si no os abriré las ventanas de los cielos y derramaré bendición hasta que sobreabunde'.",
        "tags": [
          "capilla_comunion",
          "santa_cena_ordenanzas",
          "prosperidad"
        ],
        "keywords": "malaquias 3 diezmo alfoli ventanas cielos bendicion sobreabunde purificador plata",
        "topics": [
          {
            "id": "diezmo_ventanas_de_cielos",
            "category": "decisiones_futuro",
            "title": "Pagar el diezmo y las ofrendas cuando el dinero apenas alcanza",
            "keywords": [
              "diezmo",
              "ofrendas",
              "ventanas de los cielos",
              "dinero",
              "probar a dios"
            ],
            "scriptureRef": "3 Nefi 24:10",
            "scriptureQuote": "Traed todos los diezmos al alfolí, para que haya alimento en mi casa; y probadme ahora en esto, dice el Señor de los Ejércitos, si no os abriré las ventanas de los cielos y derramaré sobre vosotros bendición tal que no haya donde contenerla.",
            "pastoralInsight": "El diezmo no se paga con dinero, sino con fe. Es la ley de la prosperidad espiritual que asegura la protección celestial sobre tu hogar.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne/24?lang=spa&id=p10#p10",
            "bookId": "3-ne",
            "chapterNum": 24,
            "shortTitle": "Pagar el Diezmo en Crisis"
          }
        ]
      },
      {
        "ch": 25,
        "fact": "El Salvador cita Malaquías 4 sobre la venida de Elías el Profeta",
        "summary": "quien vendrá antes del día grande y terrible para volver el corazón de los padres a los hijos y de los hijos a los padres.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas"
        ],
        "keywords": "elias profeta corazon padres a hijos volver corazones genealogia templos",
        "topics": []
      },
      {
        "ch": 26,
        "fact": "Jesucristo expone todas las cosas desde el principio hasta Su segunda venida",
        "summary": "y los niños pequeños sueltan sus lenguas hablando cosas tan grandes y maravillosas que se prohíbe escribirlas.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas"
        ],
        "keywords": "todas las cosas principio fin ninos lenguas desatadas maravillas bautismos sanidades",
        "topics": []
      },
      {
        "ch": 27,
        "fact": "Jesucristo aclara el nombre sagrado de Su Iglesia y define Su Evangelio eterno",
        "summary": "'¿Cómo puede ser mi iglesia si no lleva mi nombre?'; y declara que Su Evangelio consiste en que vino a ser levantado en la cruz para atraer a todos a Él.",
        "tags": [
          "capilla_comunion",
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "nombre iglesia de jesucristo definicion evangelio levantado cruz atraer juicio obras",
        "topics": []
      },
      {
        "ch": 28,
        "fact": "Nueve discípulos desean ir con Cristo al morir; tres discípulos nefitas son trasladados",
        "summary": "para permanecer sobre la tierra ministrando y trayendo almas a Cristo sin probar jamás el dolor de la muerte.",
        "tags": [
          "caridad_servicio",
          "santa_cena_ordenanzas"
        ],
        "keywords": "tres nefitas trasladados juan amado no probar muerte ministrar almas poder dolor",
        "topics": []
      },
      {
        "ch": 29,
        "fact": "Mormón advierte con solemnidad a los gentiles modernos que no escarnezcan las promesas de Dios",
        "summary": "porque la espada de Su justicia pende sobre aquellos que pretendan anular Sus convenios sagrados.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "advertencia gentiles no escarnecer promesas espada justicia convenios",
        "topics": []
      },
      {
        "ch": 30,
        "fact": "Mormón concluye con una apremiante invitación a todos los gentiles",
        "summary": "a volverse de sus iniquidades, bautizarse en el nombre de Cristo y contarse entre el pueblo del convenio.",
        "tags": [
          "arrepentimiento_perdon",
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "invitacion gentiles bautismo perdon contarse pueblo convenio cristo",
        "topics": []
      }
    ]
  },
  {
    "id": "4-ne",
    "title": "4 Nefi",
    "author": "Nefi / Amós / Amós hijo / Amarón",
    "period": "35 d.C. — 321 d.C.",
    "icon": "🕊️",
    "summary": "La era dorada de Sion: casi dos siglos de paz absoluta, bienes en común, sin distinciones de clase ni odio; y el posterior rebrote del orgullo y la decadencia por causa del amor a las riquezas.",
    "url_slug": "4-ne",
    "chapters": [
      {
        "ch": 1,
        "fact": "Doscientos años de era dorada de Sion donde no hay ricos ni pobres y tienen todo en común",
        "summary": "no había contenciones por motivo del amor de Dios en sus corazones; hacia el año 201 rebrota el orgullo, las sectas y las riquezas marcando la caída final.",
        "tags": [
          "capilla_comunion",
          "caridad_servicio",
          "tentacion_ataduras",
          "ira_ataque"
        ],
        "keywords": "sion todas cosas comun no ricos pobres amor de dios no contencion caida orgullo riquezas divisiones",
        "topics": []
      }
    ]
  },
  {
    "id": "morm",
    "title": "Mormón",
    "author": "Mormón / Moroni",
    "period": "321 d.C. — 421 d.C.",
    "icon": "🛡️",
    "summary": "Mormón asume el mando militar a los dieciséis años, el dolor de un profeta al ver la autodestrucción de su pueblo sin arrepentimiento, la batalla final en Cumorah y el lamento por los caídos.",
    "url_slug": "morm",
    "chapters": [
      {
        "ch": 1,
        "fact": "Amarón encomienda las planchas a Mormón a los diez años; a los quince es visitado por el Señor",
        "summary": "en medio de una sociedad endurecida en el pecado donde los milagros y los dones del Espíritu han cesado.",
        "tags": [
          "fe_semilla_dudas",
          "decisiones_guia"
        ],
        "keywords": "amaron mormon diez anos quince anos visita del senor dones cesan dureza",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "Mormón es nombrado líder del ejército nefita a los dieciséis años",
        "summary": "y llora al ver que el lamento de su pueblo no es tristeza según Dios para arrepentimiento sino la tristeza de los condenados.",
        "tags": [
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "general dieciseis anos tristeza segun dios tristeza condenados no arrepentimiento lamento",
        "topics": []
      },
      {
        "ch": 3,
        "fact": "Mormón rehúsa seguir liderando a los ejércitos nefitas por causa de su crueldad y sed de venganza",
        "summary": "permaneciendo como testigo silencioso e imparcial de la autodestrucción inevitable de su nación.",
        "tags": [
          "ira_ataque",
          "justicia"
        ],
        "keywords": "renuncia mando sed de venganza crueldad testigo juicio advertencia",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "Mormón observa que es por la propia maldad de los hombres que son destruidos",
        "summary": "las mujeres y los niños son sacrificados a los ídolos en medio de una barbarie sin precedentes.",
        "tags": [
          "justicia",
          "consuelo_afliccion"
        ],
        "keywords": "maldad destruccion juicios sacrificios idolos desolacion barbarie",
        "topics": []
      },
      {
        "ch": 5,
        "fact": "Mormón retoma el mando militar por amor compasivo a su pueblo aunque sabe que perecerán",
        "summary": "y escribe con ternura a los gentiles y al remanente de Israel para que se arrepientan y vengan a Cristo.",
        "tags": [
          "caridad_servicio",
          "fe_semilla_dudas"
        ],
        "keywords": "retoma mando compasion sin esperanza mensaje gentiles polvo recogimiento",
        "topics": []
      },
      {
        "ch": 6,
        "fact": "La batalla final en Cumorah: doscientos treinta mil nefitas son masacrados",
        "summary": "Mormón contempla el campo lleno de cadáveres y llora con el alma destrozada: '¡Oh bellos seres, cómo pudisteis apartaros de las vías del Señor!'.",
        "tags": [
          "consuelo_afliccion",
          "desesperanza",
          "familia_crisis"
        ],
        "keywords": "cumorah batalla final 230 mil muertos oh bellos seres llanto dolor destruccion total",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Mormón exhorta conmovido a los descendientes de los lamanitas a creer en Jesucristo",
        "summary": "arrepentirse, bautizarse y abrazar tanto la Biblia como el Libro de Mormón como dos testigos unidos de la salvación.",
        "tags": [
          "fe_semilla_dudas",
          "santa_cena_ordenanzas"
        ],
        "keywords": "exhortacion lamanitas creer en cristo bautismo biblia libro de mormon dos testigos",
        "topics": []
      },
      {
        "ch": 8,
        "fact": "Moroni queda solo tras la muerte de su padre Mormón y narra la desolación de su pueblo",
        "summary": "profetiza con exactitud las condiciones de los últimos días: iglesias corruptas por dinero, soberbia, falta de fe y desprecio a los pobres.",
        "tags": [
          "consuelo_afliccion",
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "moroni solo muerte mormon ultimo testigo profecia ultimos dias iglesias dinero hipocresia",
        "topics": []
      },
      {
        "ch": 9,
        "fact": "Moroni confronta a quienes afirman que las revelaciones y milagros han cesado",
        "summary": "testificando con fuego: 'Dios es un Dios de milagros invariable de ayer, hoy y para siempre; si los milagros han cesado, es por vuestra propia incredulidad'.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "dios de milagros invariable ayer hoy siempre incredulidad oracion respondera",
        "topics": []
      }
    ]
  },
  {
    "id": "ether",
    "title": "Éter",
    "author": "Éter / Moroni",
    "period": "aprox. 2200 a.C. — 600 a.C.",
    "icon": "💎",
    "summary": "La historia del pueblo jaredita desde la Torre de Babel, los barcos herméticos, las dieciséis piedras que brillan al tocarlas el dedo de Cristo, el cruce del mar enfurecido, el discurso de la fe de Moroni y la autodestrucción jaredita.",
    "url_slug": "ether",
    "chapters": [
      {
        "ch": 1,
        "fact": "Moroni compendia la historia jaredita desde la Torre de Babel",
        "summary": "el hermano de Jared suplica al Señor en oración que no confunda el idioma de sus familias ni el de sus entrañables amigos.",
        "tags": [
          "oracion_ayuno",
          "familia_crisis",
          "caridad_servicio"
        ],
        "keywords": "torre de babel hermano de jared oracion no confundir lengua amigos tierra prometida",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "Los jareditas construyen barcos herméticos como conchas marinas por mandato divino",
        "summary": "el hermano de Jared consulta al Señor sobre cómo resolver el problema de la luz y el aire, recibiendo instrucción para diseñar una solución.",
        "tags": [
          "barco_imposibles",
          "decisiones_guia",
          "oracion_ayuno"
        ],
        "keywords": "barcos hermeticos conchas luz aire montana moriancumer hermano jared",
        "topics": []
      },
      {
        "ch": 3,
        "fact": "El hermano de Jared funde dieciséis piedras transparentes y ve el dedo y cuerpo espiritual de Jesucristo",
        "summary": "quien toca las piedras para que brillen en los barcos; el velo cae por su fe infinita contemplando al Salvador premortal.",
        "tags": [
          "fe_semilla_dudas",
          "barco_imposibles",
          "oracion_ayuno"
        ],
        "keywords": "dieciseis piedras dedo senor cuerpo espiritual fe infinita velo jesucristo premortal",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "Moroni sella la magna visión del hermano de Jared en las planchas",
        "summary": "revelando que estas gloriosas verdades solo se manifestarán a aquellos que desgarren el velo de incredulidad y ejerzan una fe pura.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "vision sellada velo incredulidad fe pura revelacion ultimos dias",
        "topics": []
      },
      {
        "ch": 5,
        "fact": "Moroni profetiza la función de los Tres Testigos que verán las planchas por el poder de Dios",
        "summary": "para que el testimonio de tres sea establecido firmemente ante el mundo entero.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "tres testigos planchas poder de dios testimonio verdad",
        "topics": []
      },
      {
        "ch": 6,
        "fact": "Las barcas jareditas navegan 344 días en medio de olas gigantescas cantando alabanzas al Señor",
        "summary": "impulsadas por vientos tempestuosos que jamás cesaron de soplar hasta hacerlos desembarcar triunfantes en la tierra prometida.",
        "tags": [
          "consuelo_afliccion",
          "barco_imposibles",
          "oracion_ayuno",
          "resiliencia"
        ],
        "keywords": "344 dias olas gigantescas vientostempestuosos canticos alabanzas gratitud desembarco",
        "topics": []
      },
      {
        "ch": 7,
        "fact": "Comienzan las disputas por el trono entre los reyes jareditas Orihah, Kib y Corihor",
        "summary": "mostrando cómo la ambición política y las rebeliones filiales traen cautiverio y sufrimiento.",
        "tags": [
          "familia_crisis",
          "decisiones_guia"
        ],
        "keywords": "reyes jareditas orihah kib corihor rebelion usurpacion cautiverio",
        "topics": []
      },
      {
        "ch": 8,
        "fact": "Akish trama una combinación secreta sangrienta mediante juramentos antiguos",
        "summary": "y Moroni lanza una severa advertencia a los gentiles de los postreros días contra las conspiraciones que destruyen la libertad de las naciones.",
        "tags": [
          "tentacion_ataduras",
          "justicia"
        ],
        "keywords": "combinaciones secretas akish juramentos cain advertencia gentiles destruccion libertad",
        "topics": []
      },
      {
        "ch": 9,
        "fact": "Guerras sangrientas, venenos y hambrunas asolan a los reinos jareditas por su maldad",
        "summary": "hasta que el rey Emer vive en rectitud y contempla al Hijo de Justicia en una era de paz.",
        "tags": [
          "justicia",
          "prosperidad"
        ],
        "keywords": "hambre serpientes venenosas emer hijo de justicia prosperidad paz",
        "topics": []
      },
      {
        "ch": 10,
        "fact": "Sucesión de monarcas justos e inicuos que alternan entre la tiranía y el alivio del pueblo",
        "summary": "ilustrando las consecuencias temporales de someterse al orgullo o vivir con sobriedad.",
        "tags": [
          "decisiones_guia"
        ],
        "keywords": "reyes jareditas morianton lib kim justicia tirania historia",
        "topics": []
      },
      {
        "ch": 11,
        "fact": "Profetas inspirados advierten de la inminente aniquilación de la civilización jaredita",
        "summary": "pero son despreciados, expulsados y rechazados por un pueblo obstinado en sus abominaciones.",
        "tags": [
          "arrepentimiento_perdon",
          "advertencia"
        ],
        "keywords": "profetas advertencia rechazo endurecimiento destruccion",
        "topics": []
      },
      {
        "ch": 12,
        "fact": "El célebre discurso de Moroni sobre la fe: 'La fe es las cosas que se esperan y no se ven'",
        "summary": "no recibís testimonio sino hasta después de la prueba de vuestra fe; y el Señor promete: 'Mi gracia es suficiente para los mansos; haré que las cosas débiles sean fuertes'.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion",
          "resiliencia",
          "humildad"
        ],
        "keywords": "fe cosas que se esperan prueba de la fe gracia suficiente cosas debiles fuertes moroni esperanza",
        "topics": [
          {
            "id": "debilidad_humildad_eter",
            "category": "salud_mental",
            "title": "Frustración por debilidades personales constantes",
            "keywords": [
              "debilidad",
              "imperfeccion",
              "limitacion",
              "torpeza",
              "defectos",
              "humildad",
              "debil"
            ],
            "scriptureRef": "Éter 12:27",
            "scriptureQuote": "Doy a los hombres debilidad para que sean humildes; y basta mi gracia a todos los hombres que se humillan ante mí; porque si se humillan ante mí, y tienen fe en mí, entonces haré que las cosas débiles sean fuertes para ellos.",
            "pastoralInsight": "La debilidad no es tu enemiga: es el taller donde Dios forja tu humildad. Su gracia es suficiente para suplir exactamente lo que te falta.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12?lang=spa&id=p27#p27",
            "bookId": "ether",
            "chapterNum": 12,
            "shortTitle": "Debilidad Personal"
          },
          {
            "id": "dudas_historia_doctrina_iglesia",
            "category": "fe_dudas",
            "title": "Dudas por historia de la Iglesia, ataques en internet o confusión",
            "keywords": [
              "dudas historicas",
              "internet",
              "ataques a la iglesia",
              "crisis de fe",
              "prueba de fe"
            ],
            "scriptureRef": "Éter 12:6",
            "scriptureQuote": "Y ahora yo, Moroni, quisiera hablar algo concerniente a estas cosas. Quisiera mostrar al mundo que la fe es las cosas que se esperan y no se ven; por tanto, no contendáis porque no veis, porque no recibís testimonio sino hasta después de la prueba de vuestra fe.",
            "pastoralInsight": "Tener preguntas no es pecado; el Evangelio nació de la pregunta honesta de un joven de 14 años. Lo importante es no abandonar lo que ya sabes por lo que aún no entiendes.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/ether/12?lang=spa&id=p6#p6",
            "bookId": "ether",
            "chapterNum": 12,
            "shortTitle": "Dudas de Historia / Internet"
          }
        ]
      },
      {
        "ch": 13,
        "fact": "Éter profetiza la Nueva Jerusalén en el continente americano y el destino de Coriantumr",
        "summary": "teniendo que esconderse en la cavidad de una roca de noche para ver y registrar la destrucción de su pueblo.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "nueva jerusalen eter cavidad de la roca coriantumr profecia soledad",
        "topics": []
      },
      {
        "ch": 14,
        "fact": "La cruenta guerra civil entre Coriantumr y Shiz se torna en una carnicería total",
        "summary": "donde hombres, mujeres y niños son poseídos por una ira y locura asesina incontrolable.",
        "tags": [
          "ira_ataque",
          "desesperanza"
        ],
        "keywords": "coriantumr shiz guerra civil carniceria ira locura odio ciego",
        "topics": []
      },
      {
        "ch": 15,
        "fact": "La batalla final en Ramah: millones perecen hasta quedar solo Coriantumr y Shiz",
        "summary": "Coriantumr decapita a Shiz y cae exhausto al suelo por la pérdida de sangre, cumpliéndose la profecía de Éter, quien concluye y oculta los anales.",
        "tags": [
          "ira_ataque",
          "justicia",
          "consecuencias"
        ],
        "keywords": "ramah batalla final decapita shiz coriantumr fin jareditas eter esconde anales",
        "topics": []
      }
    ]
  },
  {
    "id": "moro",
    "title": "Moroni",
    "author": "Moroni / Mormón",
    "period": "aprox. 401 d.C. — 421 d.C.",
    "icon": "🎺",
    "summary": "El profeta solitario que concluye las planchas, ordenanzas sagradas (don del Espíritu Santo, sacerdocio, Santa Cena), el sermón de la caridad de Mormón, condena al bautismo de infantes y la inmortal Promesa de Moroni.",
    "url_slug": "moro",
    "chapters": [
      {
        "ch": 1,
        "fact": "Moroni deambula errante por su vida negándose a negar al Cristo vivo",
        "summary": "mientras los lamanitas asesinan despiadadamente a todo nefita que rehúse abjurar de su fe.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas",
          "resiliencia"
        ],
        "keywords": "moroni solitario errante no negare a cristo fidelidad vida muerte",
        "topics": []
      },
      {
        "ch": 2,
        "fact": "Moroni registra las palabras exactas de Jesucristo al conferir el Don del Espíritu Santo",
        "summary": "mediante la imposición de manos a Sus doce discípulos escogidos en el templo.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "don espiritu santo imposicion de manos doce discipulos palabras cristo",
        "topics": []
      },
      {
        "ch": 3,
        "fact": "Moroni describe el modo sagrado de ordenar a presbíteros y maestros",
        "summary": "por el poder del Espíritu Santo y en el nombre de Jesucristo para cuidar y alimentar a la Iglesia.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "ordenacion sacerdotes presbiteros maestros imposicion manos oficio",
        "topics": []
      },
      {
        "ch": 4,
        "fact": "La oración sacramental sagrada e inmutable sobre el pan",
        "summary": "'Oh Dios, Padre Eterno, te pedimos en el nombre de tu Hijo, Jesucristo, que bendigas y santifiques este pan para las almas de todos los que participen de él...'.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "oracion sacramental pan bendecir santificar recordar cuerpo siempre acordarse guardar mandamientos",
        "topics": [
          {
            "id": "significado_santa_cena_semanal",
            "category": "convenios_capilla",
            "title": "El verdadero significado de la Santa Cena semanal: renovar convenios",
            "keywords": [
              "santa cena",
              "sacramento",
              "oracion del pan",
              "oracion del agua",
              "recordarle siempre",
              "espiritu santo"
            ],
            "scriptureRef": "Moroni 4:3; 5:2",
            "scriptureQuote": "Oh Dios, Padre Eterno, en el nombre de Jesucristo, tu Hijo, te pedimos que bendigas y santifiques este pan... para que testifiquen ante ti, oh Dios, Padre Eterno, que están dispuestos a tomar sobre sí el nombre de tu Hijo, y a recordarle siempre, y a guardar sus mandamientos que él les ha dado, para que siempre puedan tener su Espíritu consigo.",
            "pastoralInsight": "La Santa Cena no es para personas perfectas, sino para personas que están arrepintiéndose. Cada domingo es un nuevo comienzo donde tu bautismo se renueva por completo.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/4?lang=spa&id=p3#p3",
            "bookId": "moro",
            "chapterNum": 4,
            "shortTitle": "La Santa Cena Semanal"
          }
        ]
      },
      {
        "ch": 5,
        "fact": "La oración sacramental sagrada e inmutable sobre el vino",
        "summary": "'Oh Dios, Padre Eterno, te pedimos en el nombre de tu Hijo, Jesucristo, que bendigas y santifiques este vino para las almas de todos los que beban de él...'.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "oracion sacramental vino bendecir santificar sangre derramada recordar espiritu con ellos",
        "topics": []
      },
      {
        "ch": 6,
        "fact": "Los requisitos del bautismo y la vida activa en la Iglesia de Cristo",
        "summary": "se reunían a menudo para ayunar y orar, hablar unos con otros del bienestar de sus almas, tomar el pan y el vino, y perdonar sinceramente al arrepentido.",
        "tags": [
          "capilla_comunion",
          "santa_cena_ordenanzas",
          "oracion_ayuno",
          "arrepentimiento_perdon"
        ],
        "keywords": "bautismo requisitos quebrantado contrito reunirse a menudo ayunar orar bienestar almas santa cena perdon",
        "topics": [
          {
            "id": "recaidas_constantes_mismo_error",
            "category": "culpa_perdon",
            "title": "Desesperanza tras recaídas constantes en el mismo error",
            "keywords": [
              "recai",
              "otra vez cai",
              "recaida",
              "fracaso moral",
              "no cambio nunca",
              "siempre lo mismo"
            ],
            "scriptureRef": "Moroni 6:8",
            "scriptureQuote": "Pero cuantas veces se arrepentían y pedían perdón, con verdadera intención, se les perdonaba.",
            "pastoralInsight": "La recaída duele, pero rendirse es la verdadera trampa del adversario. El Salvador te invita a levantarte, sacudirte el polvo y volver a acudir a Él.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/6?lang=spa&id=p8#p8",
            "bookId": "moro",
            "chapterNum": 6,
            "shortTitle": "Recaídas Constantes"
          },
          {
            "id": "por_que_asistir_capilla_reunirse",
            "category": "convenios_capilla",
            "title": "¿Por qué es indispensable congregarse en la capilla los domingos?",
            "keywords": [
              "asistir a la capilla",
              "por que ir a la iglesia",
              "reunirse a menudo",
              "hermandad",
              "comunion"
            ],
            "scriptureRef": "Moroni 6:5-6",
            "scriptureQuote": "Y la iglesia se reunía a menudo para ayunar y orar, y para hablar unos con otros concerniente al bienestar de sus almas. Y se reunían a menudo para participar del pan y del vino, en memoria del Señor Jesús.",
            "pastoralInsight": "No vamos a la capilla porque todos sean perfectos; vamos para recordar a Cristo juntos, tomar la Santa Cena y cuidar del bienestar de nuestras almas.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/6?lang=spa&id=p5-p6#p5",
            "bookId": "moro",
            "chapterNum": 6,
            "shortTitle": "¿Por qué ir a la Capilla?"
          }
        ]
      },
      {
        "ch": 7,
        "fact": "El célebre sermón de Mormón sobre la Fe, la Esperanza y la Caridad",
        "summary": "'La caridad es el amor puro de Cristo y permanece para siempre; y a quien la posea en el postrer día, todo le saldrá bien'.",
        "tags": [
          "caridad_servicio",
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "caridad amor puro de cristo fe esperanza luz de cristo juzgar bien nunca deja de ser",
        "topics": [
          {
            "id": "caridad_amor_puro_cristo",
            "category": "relaciones_hogar",
            "title": "Aprender a amar a las personas difíciles: la caridad pura",
            "keywords": [
              "caridad",
              "amor puro",
              "tolerancia",
              "amar a los dificiles",
              "paciencia con otros"
            ],
            "scriptureRef": "Moroni 7:45-48",
            "scriptureQuote": "La caridad es sufrida y es benigna, y no tiene envidia, ni se ensancha, no busca lo suyo, no se irrita fácilmente, no piensa el mal, no se regocija en la iniquidad, sino se regocija en la verdad; todo lo sufre, todo lo cree, todo lo espera, todo lo soporta... la caridad es el amor puro de Cristo, y permanece para siempre.",
            "pastoralInsight": "Amar a quien nos trata bien es fácil; la caridad de Cristo se demuestra cuando somos benignos y pacientes con aquel que es tosco o antipático.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7?lang=spa&id=p45-p48#p45",
            "bookId": "moro",
            "chapterNum": 7,
            "shortTitle": "Amar al Difícil (Caridad)"
          },
          {
            "id": "discernir_voz_espiritu",
            "category": "fe_dudas",
            "title": "Cómo saber si una impresión proviene de Dios o de mi propia mente",
            "keywords": [
              "discernimiento",
              "voz del espiritu",
              "es de dios o mio",
              "inspiracion",
              "moroni 7"
            ],
            "scriptureRef": "Moroni 7:16-17",
            "scriptureQuote": "Pues he aquí, a todo hombre se da el Espíritu de Cristo para que sepa discernir el bien del mal... toda cosa que invita e induce a hacer lo bueno, y a amar a Dios y a servirle, es inspirada por Dios... pero todo lo que persuade a los hombres a hacer lo malo... es del diablo.",
            "pastoralInsight": "La prueba es sencilla: si una idea te impulsa a hacer el bien, ser bondadoso, perdonar y acercarte a Cristo, viene de Dios. Actúa sobre ella sin dudar.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7?lang=spa&id=p16-p17#p16",
            "bookId": "moro",
            "chapterNum": 7,
            "shortTitle": "Discernir la Voz del Espíritu"
          },
          {
            "id": "caridad_amor_puro_permanece",
            "category": "convenios_capilla",
            "title": "Pedir al Padre con toda la energía del corazón para ser llenos de amor",
            "keywords": [
              "pedir caridad",
              "energia del corazon",
              "amor puro de cristo",
              "moroni 7"
            ],
            "scriptureRef": "Moroni 7:47-48",
            "scriptureQuote": "Pero la caridad es el amor puro de Cristo, y permanece para siempre; y a quien la posea en el postrer día, le irá bien. Por consiguiente, amados hermanos míos, pedid al Padre con toda la energía de vuestros corazones, que seáis llenos de este amor que él ha otorgado a todos los que son verdaderos discípulos de su Hijo Jesucristo...",
            "pastoralInsight": "La caridad no es algo que fabricamos solos; es un don que se ruega de rodillas al Padre. Cuando ministres, pide primero ser lleno de ese amor puro por esa persona.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/7?lang=spa&id=p47-p48#p47",
            "bookId": "moro",
            "chapterNum": 7,
            "shortTitle": "La Caridad Pura de Cristo"
          }
        ]
      },
      {
        "ch": 8,
        "fact": "Mormón condena enérgica y doctrinalmente el bautismo de los niños pequeños",
        "summary": "declarando que es una solemne burla ante Dios, porque los niños pequeños están vivos en Cristo y no tienen pecado ni necesitan arrepentimiento.",
        "tags": [
          "santa_cena_ordenanzas",
          "familia_crisis",
          "doctrina"
        ],
        "keywords": "bautismo ninos pequenos burla ante dios vivos en cristo sin pecado doctrina salvacion",
        "topics": [
          {
            "id": "muerte_hijo_pequeno",
            "category": "duelo_dolor",
            "title": "Muerte desgarradora de un niño pequeño, bebé o hijo",
            "keywords": [
              "muerte de un hijo",
              "bebe",
              "nino fallecido",
              "muerte infantil",
              "duelo maternal",
              "luto hijo"
            ],
            "scriptureRef": "Moroni 8:12, 17, 22",
            "scriptureQuote": "Los niños pequeños no pueden pecar... viven en Cristo aun desde la fundación del mundo... Todos los niños pequeños viven en Cristo, y también todos aquellos que están sin ley. Porque el poder de la redención surte efecto en todos los que no tienen ley.",
            "pastoralInsight": "Los niños pequeños son puros y van directo a la presencia del Padre por los méritos de Cristo. Su salvación es completa y la promesa del sellamiento eterno les devolverá a sus brazos.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/8?lang=spa&id=p12,p17,p22#p12",
            "bookId": "moro",
            "chapterNum": 8,
            "shortTitle": "Muerte de un Hijo"
          }
        ]
      },
      {
        "ch": 9,
        "fact": "La conmovedora y desgarradora carta final de Mormón a su hijo Moroni",
        "summary": "ante la depravación total de su pueblo le implora: 'Hijo mío, sé fiel en Cristo; y que Sus sufrimientos y muerte reposen en tu mente para siempre'.",
        "tags": [
          "consuelo_afliccion",
          "familia_crisis",
          "desesperanza",
          "resiliencia"
        ],
        "keywords": "carta mormon a moroni se fiel sufrimientos muerte cristo reposen mente corazon barbarie",
        "topics": []
      },
      {
        "ch": 10,
        "fact": "La inmortal Promesa de Moroni y su invitación eterna",
        "summary": "'Y cuando recibáis estas cosas, preguntad a Dios con corazón sincero y fe en Cristo, y Él os manifestará la verdad por el poder del Espíritu Santo; venid a Cristo y perfeccionaos en Él'.",
        "tags": [
          "fe_semilla_dudas",
          "oracion_ayuno",
          "santa_cena_ordenanzas",
          "consuelo_afliccion"
        ],
        "keywords": "promesa moroni preguntar dios corazon sincero fe en cristo manifestara verdad espiritu santo dones venid a cristo gracia suficiente",
        "topics": [
          {
            "id": "promesa_moroni_libro_mormon",
            "category": "fe_dudas",
            "title": "La promesa de Moroni: saber por ti mismo que el Libro es verdad",
            "keywords": [
              "promesa de moroni",
              "oracion libro de mormon",
              "saber la verdad",
              "espiritu santo testimonio"
            ],
            "scriptureRef": "Moroni 10:4-5",
            "scriptureQuote": "Y cuando recibáis estas cosas, quisiera exhortaros a que preguntéis a Dios, el Eterno Padre, en el nombre de Cristo, si no son verdaderas estas cosas; y si pedís con un corazón sincero, con verdadera intención, teniendo fe en Cristo, él os manifestará la verdad de ellas por el poder del Espíritu Santo; y por el poder del Espíritu Santo podréis conocer la verdad de todas las cosas.",
            "pastoralInsight": "Tu testimonio no tiene que depender del de tus padres o líderes. El Espíritu Santo puede confirmar directamente a tu corazón que Jesucristo vive y este libro es Su palabra.",
            "churchUrl": "https://www.churchofjesuschrist.org/study/scriptures/bofm/moro/10?lang=spa&id=p4-p5#p4",
            "bookId": "moro",
            "chapterNum": 10,
            "shortTitle": "La Promesa de Moroni"
          }
        ]
      }
    ]
  }
];

    let activeCategoryFilter = 'all';
    let searchQuery = '';
    let isDrawerOpen = true;
    let activeTopicFilterId = null;
    let drawerViewMode = 'cards'; // 'cards' | 'az'
    let drawerSearchQuery = '';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMormonView);
    } else {
        initMormonView();
    }

    function initMormonView() {
        renderDrawerFrequent();
        renderDrawerCategories();
        renderDrawerContent();
        renderBooksAccordion();
        bindEvents();
        updateMatchCount();
        initScrollTopButton();
    }

    // Normalizador de texto para búsquedas (sin tildes, minúsculas)
    function normalizeText(text) {
        if (!text) return '';
        return text.toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // -------------------------------------------------------------------------
    // DRAWER DE PESTAÑAS DE MINISTRACIÓN (106 TEMAS)
    // -------------------------------------------------------------------------
    window.toggleMinisterioDrawer = function() {
        const drawer = document.getElementById('mormon-ministerio-drawer');
        const btn = document.getElementById('mormon-toggle-drawer-btn');
        if (!drawer) return;

        isDrawerOpen = !isDrawerOpen;
        if (isDrawerOpen) {
            drawer.style.display = 'block';
            if (btn) btn.classList.add('active');
        } else {
            drawer.style.display = 'none';
            if (btn) btn.classList.remove('active');
        }
    };

    const FREQUENT_TOPIC_CONFIG = [
        { id: 'ansiedad_panico', label: 'Ansiedad & Pánico', icon: '🧠' },
        { id: 'depresion_desanimo_salmo_nefi', label: 'Depresión', icon: '🌧️' },
        { id: 'fallecimiento_conyuge_padres', label: 'Duelo & Muerte', icon: '🖤' },
        { id: 'matrimonio_corazones_quebrantados', label: 'Matrimonio en Crisis', icon: '💍' },
        { id: 'cuidar_templo_cuerpo_salud', label: 'Alcohol & Drogas', icon: '🍷' },
        { id: 'paz_interior_incomprensible', label: 'Paz & Perdón', icon: '🕊️' },
        { id: 'diezmo_ventanas_de_cielos', label: 'Diezmo en Crisis', icon: '💰' },
        { id: 'significado_santa_cena_semanal', label: 'Santa Cena', icon: '🍞' }
    ];

    function renderDrawerFrequent() {
        const container = document.getElementById('drawer-frequent-chips');
        if (!container) return;

        let html = '';
        FREQUENT_TOPIC_CONFIG.forEach(cfg => {
            const topic = MINISTERIO_TOPICS.find(t => t.id === cfg.id);
            if (!topic) return;

            const isActive = (activeTopicFilterId === topic.id);
            html += `
                <button class="frequent-chip-btn ${isActive ? 'active-filter' : ''}"
                        onclick="window.locateAndOpenTopic('${topic.id}', '${topic.bookId}', ${topic.chapterNum})"
                        title="${escapeHtml(topic.title)} (${escapeHtml(topic.scriptureRef)})">
                    <span>${cfg.icon}</span>
                    <span>${escapeHtml(cfg.label)}</span>
                </button>
            `;
        });

        container.innerHTML = html;
    }

    function renderDrawerCategories() {
        const container = document.getElementById('drawer-categories-bar');
        if (!container) return;

        // Si estamos en modo A-Z, ocultar la barra de filtros por categoría
        if (drawerViewMode !== 'cards') {
            container.style.display = 'none';
            return;
        }
        container.style.display = 'flex';

        const countMap = {};
        MINISTERIO_TOPICS.forEach(t => {
            countMap[t.category] = (countMap[t.category] || 0) + 1;
        });

        let html = `
            <button class="drawer-cat-tab ${activeCategoryFilter === 'all' ? 'active' : ''}" data-cat="all" onclick="window.selectDrawerCategory('all')">
                <span class="cat-tab-icon">✨</span>
                <span class="cat-tab-label">Todas</span>
                <span class="cat-tab-badge">${MINISTERIO_TOPICS.length}</span>
            </button>
        `;

        MINISTERIO_CATEGORIES.forEach(cat => {
            const count = countMap[cat.id] || 0;
            const isActive = (activeCategoryFilter === cat.id);
            html += `
                <button class="drawer-cat-tab ${isActive ? 'active' : ''}" data-cat="${cat.id}" onclick="window.selectDrawerCategory('${cat.id}')" title="${cat.desc}">
                    <span class="cat-tab-icon">${cat.icon}</span>
                    <span class="cat-tab-label">${cat.label}</span>
                    <span class="cat-tab-badge">${count}</span>
                </button>
            `;
        });

        container.innerHTML = html;
    }

    window.selectDrawerCategory = function(catId) {
        activeCategoryFilter = catId;
        renderDrawerCategories();
        renderDrawerContent();
    };

    window.setDrawerViewMode = function(mode) {
        drawerViewMode = mode;
        const btnCards = document.getElementById('btn-drawerview-cards');
        const btnAz = document.getElementById('btn-drawerview-az');
        if (btnCards && btnAz) {
            if (mode === 'cards') {
                btnCards.classList.add('active');
                btnAz.classList.remove('active');
            } else {
                btnAz.classList.add('active');
                btnCards.classList.remove('active');
            }
        }
        renderDrawerCategories();
        renderDrawerContent();
    };

    window.filterDrawerTopics = function(query) {
        drawerSearchQuery = query || '';
        const clearBtn = document.getElementById('drawer-mini-clear-btn');
        if (clearBtn) clearBtn.style.display = drawerSearchQuery ? 'block' : 'none';
        renderDrawerContent();
    };

    window.clearDrawerMiniSearch = function() {
        drawerSearchQuery = '';
        const input = document.getElementById('drawer-mini-search');
        if (input) {
            input.value = '';
            input.focus();
        }
        const clearBtn = document.getElementById('drawer-mini-clear-btn');
        if (clearBtn) clearBtn.style.display = 'none';
        renderDrawerContent();
    };

    window.jumpToAzLetter = function(letter) {
        const el = document.getElementById(`az-group-${letter}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    function renderDrawerContent() {
        const container = document.getElementById('drawer-main-content');
        if (!container) return;

        const query = normalizeText(drawerSearchQuery);

        if (drawerViewMode === 'cards') {
            renderCardsView(container, query);
        } else {
            renderAzView(container, query);
        }
    }

    function renderCardsView(container, query) {
        let categoriesToRender = (activeCategoryFilter === 'all')
            ? MINISTERIO_CATEGORIES
            : MINISTERIO_CATEGORIES.filter(c => c.id === activeCategoryFilter);

        let html = `<div class="drawer-categories-grid">`;
        let totalMatches = 0;

        categoriesToRender.forEach(cat => {
            let catTopics = MINISTERIO_TOPICS.filter(t => t.category === cat.id);

            if (query) {
                catTopics = catTopics.filter(t => {
                    const searchStr = normalizeText(`${t.shortTitle} ${t.title} ${t.keywords.join(' ')} ${t.scriptureRef}`);
                    return searchStr.includes(query);
                });
            }

            // Ordenar alfabéticamente dentro de la tarjeta
            catTopics.sort((a, b) => (a.shortTitle || '').localeCompare(b.shortTitle || '', 'es'));

            if (catTopics.length > 0) {
                totalMatches += catTopics.length;
                html += `
                    <div class="drawer-cat-card" id="cat-card-${cat.id}">
                        <div class="drawer-cat-card-header">
                            <div class="drawer-cat-title-row">
                                <span class="drawer-cat-title">
                                    <span class="drawer-cat-icon">${cat.icon}</span>
                                    <span>${escapeHtml(cat.label)}</span>
                                </span>
                                <span class="drawer-cat-badge">${catTopics.length}</span>
                            </div>
                            <p class="drawer-cat-desc">${escapeHtml(cat.desc)}</p>
                        </div>
                        <div class="drawer-cat-topics-list">
                `;

                catTopics.forEach(topic => {
                    const isActive = (activeTopicFilterId === topic.id);
                    html += `
                        <button class="drawer-topic-item ${isActive ? 'active-filter' : ''}"
                                onclick="window.locateAndOpenTopic('${topic.id}', '${topic.bookId}', ${topic.chapterNum})"
                                title="${escapeHtml(topic.title)} (${escapeHtml(topic.scriptureRef)})">
                            <span class="topic-item-left">
                                <span class="topic-item-bullet">◆</span>
                                <span class="topic-item-title">${escapeHtml(topic.shortTitle)}</span>
                            </span>
                            <span class="topic-item-arrow">→</span>
                        </button>
                    `;
                });

                html += `
                        </div>
                    </div>
                `;
            }
        });

        html += `</div>`;

        if (totalMatches === 0) {
            html = `
                <div class="drawer-empty-state">
                    <span class="drawer-empty-icon">🔍</span>
                    <p>No se encontraron temas para <strong>"${escapeHtml(drawerSearchQuery)}"</strong>.</p>
                    <button class="drawer-filter-clear-btn" onclick="window.clearDrawerMiniSearch()" style="margin-top:10px;">Limpiar filtro</button>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    function renderAzView(container, query) {
        let topics = [...MINISTERIO_TOPICS];

        if (query) {
            topics = topics.filter(t => {
                const searchStr = normalizeText(`${t.shortTitle} ${t.title} ${t.keywords.join(' ')} ${t.scriptureRef}`);
                return searchStr.includes(query);
            });
        }

        // Ordenar alfabéticamente
        topics.sort((a, b) => (a.shortTitle || '').localeCompare(b.shortTitle || '', 'es'));

        if (topics.length === 0) {
            container.innerHTML = `
                <div class="drawer-empty-state">
                    <span class="drawer-empty-icon">🔍</span>
                    <p>No se encontraron temas en el índice alfabético para <strong>"${escapeHtml(drawerSearchQuery)}"</strong>.</p>
                    <button class="drawer-filter-clear-btn" onclick="window.clearDrawerMiniSearch()" style="margin-top:10px;">Limpiar filtro</button>
                </div>
            `;
            return;
        }

        // Agrupar por primera letra
        const groups = {};
        topics.forEach(t => {
            let firstLetter = (t.shortTitle || '').charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if (!firstLetter || !/[A-Z]/.test(firstLetter)) firstLetter = '#';
            if (!groups[firstLetter]) groups[firstLetter] = [];
            groups[firstLetter].push(t);
        });

        const letters = Object.keys(groups).sort();

        // Barra de salto rápido por letra
        let html = `<div class="drawer-az-jump-bar">`;
        letters.forEach(letter => {
            html += `<button class="az-jump-btn" onclick="window.jumpToAzLetter('${letter}')">${letter}</button>`;
        });
        html += `</div>`;

        // Secciones de cada letra
        html += `<div class="drawer-az-groups-container">`;
        letters.forEach(letter => {
            const groupTopics = groups[letter];
            html += `
                <div class="drawer-az-group" id="az-group-${letter}">
                    <div class="az-group-header">
                        <span class="az-group-letter">${letter}</span>
                        <span class="az-group-count">${groupTopics.length} ${groupTopics.length === 1 ? 'tema' : 'temas'}</span>
                    </div>
                    <div class="az-group-topics-grid">
            `;

            groupTopics.forEach(topic => {
                const isActive = (activeTopicFilterId === topic.id);
                html += `
                    <button class="drawer-topic-item ${isActive ? 'active-filter' : ''}"
                            onclick="window.locateAndOpenTopic('${topic.id}', '${topic.bookId}', ${topic.chapterNum})"
                            title="${escapeHtml(topic.title)} (${escapeHtml(topic.scriptureRef)})">
                        <span class="topic-item-left">
                            <span class="topic-item-bullet">◆</span>
                            <span class="topic-item-title">${escapeHtml(topic.shortTitle)}</span>
                        </span>
                        <span class="topic-item-arrow">→</span>
                    </button>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        });
        html += `</div>`;

        container.innerHTML = html;
    }

    // -------------------------------------------------------------------------
    // LOCALIZAR Y AISLAR PASAJE DIRECTO EN EL LIBRO (FILTRA LIBRO Y CAPÍTULO)
    // -------------------------------------------------------------------------
    window.locateAndOpenTopic = function(topicId, bookId, chapterNum) {
        const topic = MINISTERIO_TOPICS.find(t => t.id === topicId);
        if (!topic) return;

        activeTopicFilterId = topicId;

        // Limpiar input de búsqueda previa para evitar colisiones
        const searchInput = document.getElementById('mormon-search-input');
        const clearBtn = document.getElementById('mormon-clear-search-btn');
        if (searchInput) searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
        searchQuery = '';

        // 1. Filtrar los 15 libros: Aislar el libro y ocultar por completo los otros 14
        MORMON_BOOKS.forEach(book => {
            const details = document.getElementById(`book-${book.id}`);
            if (!details) return;

            if (book.id === bookId) {
                // Mostrar y expandir el libro coincidente
                details.style.display = 'block';
                details.style.opacity = '1';
                details.open = true;

                // Ocultar todos los demás capítulos de este libro, dejando SOLO el capítulo de la necesidad
                const rows = details.querySelectorAll('.mormon-chapter-row');
                rows.forEach(row => {
                    if (row.id === `chap-${bookId}-${chapterNum}`) {
                        row.style.display = 'block';
                        row.classList.add('is-highlighted');
                    } else {
                        row.style.display = 'none';
                        row.classList.remove('is-highlighted');
                    }
                });

                const countBadge = document.getElementById(`badge-count-${book.id}`);
                if (countBadge) countBadge.textContent = '1 cap';
            } else {
                // Ocultar por completo los otros 14 libros
                details.style.display = 'none';
                details.open = false;
            }
        });

        // 2. Localizar y destacar la fila del capítulo seleccionado
        const chapRow = document.getElementById(`chap-${bookId}-${chapterNum}`);
        if (chapRow) {
            chapRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            chapRow.classList.add('pulse-highlight');
            setTimeout(() => {
                chapRow.classList.remove('pulse-highlight');
            }, 3500);
        }

        // 3. Abrir la ficha quirúrgica específica del tema
        const detailEl = document.getElementById(`detail-${topicId}`);
        if (detailEl) {
            detailEl.style.display = 'block';
            const toggleBtn = document.getElementById(`btn-toggle-${topicId}`);
            if (toggleBtn) toggleBtn.classList.add('active');
        }

        // 4. Actualizar contador total visible
        updateMatchCount(1);

        // 5. Actualizar insignia en el Drawer de ministración
        const drawerBadge = document.getElementById('drawer-active-filter-badge');
        if (drawerBadge) {
            drawerBadge.style.display = 'inline-flex';
            drawerBadge.innerHTML = `
                <span>🏷️ <strong>${escapeHtml(topic.shortTitle)}</strong> (${escapeHtml(topic.scriptureRef)})</span>
                <button class="drawer-filter-clear-btn" onclick="window.clearTopicFilter()" title="Quitar filtro y ver todos los 15 libros">✕ Ver todos los libros</button>
            `;
        }

        // 6. Actualizar banner de filtro activo sobre los libros
        const filterBanner = document.getElementById('mormon-active-filter-banner');
        if (filterBanner) {
            filterBanner.style.display = 'flex';
            filterBanner.innerHTML = `
                <div class="filter-banner-text">
                    <span class="filter-banner-icon">🎯</span>
                    <span>Mostrando únicamente tema: <strong>${escapeHtml(topic.shortTitle)}</strong> — <span class="filter-banner-ref">${escapeHtml(topic.scriptureRef)}</span></span>
                </div>
                <button class="btn-clear-active-filter" onclick="window.clearTopicFilter()" title="Restaurar los 15 libros del Libro de Mormón">
                    ✕ Ver todos los 15 libros
                </button>
            `;
        }

        // 7. Refrescar chips del drawer para marcar el chip activo
        renderDrawerFrequent();
        renderDrawerContent();

        if (typeof showToast === 'function') {
            showToast(`📖 ${topic.scriptureRef}: ${topic.shortTitle}`, 'success');
        }
    };

    // -------------------------------------------------------------------------
    // RESTAURAR TODOS LOS LIBROS Y CAPÍTULOS
    // -------------------------------------------------------------------------
    window.clearTopicFilter = function() {
        activeTopicFilterId = null;

        const drawerBadge = document.getElementById('drawer-active-filter-badge');
        if (drawerBadge) {
            drawerBadge.style.display = 'none';
            drawerBadge.innerHTML = '';
        }

        const filterBanner = document.getElementById('mormon-active-filter-banner');
        if (filterBanner) {
            filterBanner.style.display = 'none';
            filterBanner.innerHTML = '';
        }

        // Restaurar los 15 libros (visibles y colapsados para orden)
        MORMON_BOOKS.forEach(book => {
            const details = document.getElementById(`book-${book.id}`);
            if (details) {
                details.style.display = 'block';
                details.style.opacity = '1';
                details.open = false;

                const rows = details.querySelectorAll('.mormon-chapter-row');
                rows.forEach(row => {
                    row.style.display = 'block';
                    row.classList.remove('is-highlighted');
                });

                const countBadge = document.getElementById(`badge-count-${book.id}`);
                if (countBadge) countBadge.textContent = `${book.chapters.length} caps`;
            }
        });

        renderDrawerFrequent();
        renderDrawerContent();
        updateMatchCount(239);

        if (typeof showToast === 'function') {
            showToast('Mostrando todos los 15 libros del Libro de Mormón', 'info');
        }
    };

    window.toggleTopicDetail = function(topicId) {
        const detailEl = document.getElementById(`detail-${topicId}`);
        const toggleBtn = document.getElementById(`btn-toggle-${topicId}`);
        if (!detailEl) return;

        if (detailEl.style.display === 'block') {
            detailEl.style.display = 'none';
            if (toggleBtn) toggleBtn.classList.remove('active');
        } else {
            detailEl.style.display = 'block';
            if (toggleBtn) toggleBtn.classList.add('active');
        }
    };

    // -------------------------------------------------------------------------
    // RENDERIZAR ACORDEÓN DE LIBROS (15 LIBROS • 239 CAPÍTULOS)
    // COLAPSADOS POR DEFECTO PARA MEJOR NAVEGACIÓN
    // -------------------------------------------------------------------------
    function renderBooksAccordion() {
        const container = document.getElementById('mormon-books-accordion');
        if (!container) return;

        let html = '';
        MORMON_BOOKS.forEach(book => {
            const bookTotal = book.chapters.length;

            // SIN el atributo 'open' -> Todos colapsados por defecto
            html += `
                <details class="mormon-book-card" id="book-${book.id}">
                    <summary class="mormon-book-summary">
                        <div class="mormon-book-header-left">
                            <span class="mormon-book-icon">${book.icon || '📖'}</span>
                            <div class="mormon-book-titles">
                                <div class="mormon-book-name-row">
                                    <h3 class="mormon-book-name">${escapeHtml(book.title)}</h3>
                                    <span class="mormon-book-period">${escapeHtml(book.period || '')}</span>
                                </div>
                                <p class="mormon-book-desc">${escapeHtml(book.summary || '')}</p>
                            </div>
                        </div>
                        <div class="mormon-book-header-right">
                            <span class="mormon-chapter-count-badge" id="badge-count-${book.id}">${bookTotal} caps</span>
                            <svg class="mormon-chevron-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </summary>

                    <div class="mormon-chapters-list">
            `;

            book.chapters.forEach(chap => {
                let topicSearchTokens = '';
                chap.topics.forEach(t => {
                    topicSearchTokens += ' ' + t.title + ' ' + (t.shortTitle || '') + ' ' + t.keywords.join(' ') + ' ' + t.scriptureRef + ' ' + t.scriptureQuote;
                });

                const searchTokens = normalizeText(`${book.title} ${chap.ch} ${chap.fact} ${chap.summary} ${chap.keywords || ''} ${topicSearchTokens}`);
                const churchUrl = `https://www.churchofjesuschrist.org/study/scriptures/bofm/${book.url_slug}/${chap.ch}?lang=spa`;

                html += `
                    <div class="mormon-chapter-row" id="chap-${book.id}-${chap.ch}" data-search="${escapeHtml(searchTokens)}">
                        <div class="chapter-row-main">
                            <div class="mormon-chapter-left">
                                <a href="${churchUrl}" target="_blank" rel="noopener noreferrer" class="mormon-chap-ref-badge" title="Leer ${book.title} ${chap.ch} en ChurchofJesusChrist.org">
                                    ${book.title} ${chap.ch}
                                </a>
                                <div class="mormon-chap-content">
                                    <span class="mormon-chap-fact"><strong>${escapeHtml(chap.fact)}</strong></span>
                                    <span class="mormon-chap-separator">—</span>
                                    <span class="mormon-chap-summary">${escapeHtml(chap.summary)}</span>
                                </div>
                            </div>
                            <div class="mormon-chapter-right">
                                <button class="mormon-copy-btn" onclick="window.copyChapterSynthesis('${escapeHtml(book.title)}', ${chap.ch}, '${escapeHtml(chap.fact)}', '${escapeHtml(chap.summary)}', '${churchUrl}', this)" title="Copiar referencia">
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                `;

                // Si el capitulo tiene pasajes de ministracion, inyectar píldoras y fichas quirurgicas integradas
                if (chap.topics && chap.topics.length > 0) {
                    html += `<div class="chapter-pastoral-pills-row">`;
                    chap.topics.forEach(top => {
                        html += `
                            <button id="btn-toggle-${top.id}" class="chap-pastoral-pill" onclick="window.toggleTopicDetail('${top.id}')" title="Ver versículo y guía para ${top.title}">
                                <span class="pill-icon">🩺</span>
                                <span class="pill-ref">${escapeHtml(top.scriptureRef)}</span>
                                <span class="pill-title">${escapeHtml(top.shortTitle)}</span>
                                <span class="pill-arrow">▾</span>
                            </button>
                        `;
                    });
                    html += `</div>`;

                    // Fichas quirúrgicas colapsables (SIN texto repetido)
                    chap.topics.forEach(top => {
                        html += `
                            <div id="detail-${top.id}" class="embedded-topic-card" style="display: none;">
                                <div class="embedded-quote-box">
                                    <p class="embedded-quote-text">«${escapeHtml(top.scriptureQuote)}»</p>
                                </div>
                                <div class="embedded-pastoral-box">
                                    <span class="embedded-pastoral-label">💡 <strong>Enfoque de ministración / Qué decir:</strong></span>
                                    <p class="embedded-pastoral-text">${escapeHtml(top.pastoralInsight)}</p>
                                </div>
                                <div class="embedded-actions-row">
                                    <button class="btn-embedded-action btn-copy-mini" onclick="window.copyMinisterioTopic('${top.id}', this)" title="Copiar pasaje al portapapeles">
                                        📋 <span>Copiar Pasaje</span>
                                    </button>
                                    <button class="btn-embedded-action btn-whatsapp-mini" onclick="window.shareWhatsAppTopic('${top.id}')" title="Compartir mensaje por WhatsApp">
                                        💬 <span>WhatsApp</span>
                                    </button>
                                    <a href="${top.churchUrl}" target="_blank" rel="noopener noreferrer" class="btn-embedded-action btn-church-mini" title="Abrir en ChurchofJesusChrist.org">
                                        📖 <span>Leer en Línea</span>
                                    </a>
                                </div>
                            </div>
                        `;
                    });
                }

                html += `</div>`;
            });

            html += `
                    </div>
                </details>
            `;
        });

        container.innerHTML = html;
        filterBooksAccordion();
    }

    // -------------------------------------------------------------------------
    // BÚSQUEDA Y FILTRADO EN TIEMPO REAL
    // OCULTA LIBROS NO COINCIDENTES PARA NAVEGACIÓN RÁPIDA
    // -------------------------------------------------------------------------
    function filterBooksAccordion() {
        const q = normalizeText(searchQuery);

        if (q && activeTopicFilterId) {
            // Si el usuario escribe una búsqueda libre, quitar el aislamiento del tema
            activeTopicFilterId = null;
            const drawerBadge = document.getElementById('drawer-active-filter-badge');
            if (drawerBadge) {
                drawerBadge.style.display = 'none';
                drawerBadge.innerHTML = '';
            }
            const filterBanner = document.getElementById('mormon-active-filter-banner');
            if (filterBanner) {
                filterBanner.style.display = 'none';
                filterBanner.innerHTML = '';
            }
            renderDrawerFrequent();
            renderDrawerContent();
        } else if (!q && activeTopicFilterId) {
            // Mantener el aislamiento del tema activo
            return;
        }

        let totalVisible = 0;

        MORMON_BOOKS.forEach(book => {
            const details = document.getElementById(`book-${book.id}`);
            if (!details) return;

            let bookVisibleCount = 0;
            const rows = details.querySelectorAll('.mormon-chapter-row');

            rows.forEach(row => {
                const searchIdx = row.getAttribute('data-search') || '';
                const isMatch = (!q || searchIdx.includes(q));

                if (isMatch) {
                    row.style.display = 'block';
                    if (q) {
                        row.classList.add('is-highlighted');
                        // Abrir la ficha correspondiente en la búsqueda activa
                        const embeddedCards = row.querySelectorAll('.embedded-topic-card');
                        embeddedCards.forEach(card => card.style.display = 'block');
                    } else {
                        row.classList.remove('is-highlighted');
                    }
                    bookVisibleCount++;
                    totalVisible++;
                } else {
                    row.style.display = 'none';
                    row.classList.remove('is-highlighted');
                }
            });

            const badge = document.getElementById(`badge-count-${book.id}`);
            if (badge) badge.textContent = `${bookVisibleCount} caps`;

            if (q) {
                if (bookVisibleCount > 0) {
                    // Solo mostrar y abrir los libros que coinciden
                    details.open = true;
                    details.style.opacity = '1';
                    details.style.display = 'block';
                } else {
                    // Ocultar por completo los libros que no coinciden
                    details.open = false;
                    details.style.display = 'none';
                }
            } else {
                // Sin búsqueda: todos los libros visibles y colapsados
                details.style.opacity = '1';
                details.style.display = 'block';
                // Si el usuario colapsó, mantenerlo colapsado
            }
        });

        updateMatchCount(totalVisible);
    }

    function updateMatchCount(count) {
        const matchCountEl = document.getElementById('mormon-match-count');
        if (matchCountEl) {
            matchCountEl.textContent = count !== undefined ? count : 239;
        }
    }

    // -------------------------------------------------------------------------
    // BOTÓN FLOTANTE: VOLVER ARRIBA
    // -------------------------------------------------------------------------
    function initScrollTopButton() {
        let btn = document.getElementById('mormon-scroll-top-btn');
        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'mormon-scroll-top-btn';
            btn.className = 'mormon-scroll-top-btn';
            btn.title = 'Volver al inicio del Libro de Mormón';
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                <span>Arriba</span>
            `;
            btn.onclick = window.scrollMormonTop;
            document.body.appendChild(btn);
        }

        window.addEventListener('scroll', () => {
            const currentTab = document.querySelector('.nav-tab-btn.active');
            const isMormonActive = currentTab && currentTab.getAttribute('data-view') === 'view-mormon';

            if (isMormonActive && window.scrollY > 350) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });
    }

    window.scrollMormonTop = function() {
        const hero = document.querySelector('.mormon-hero-card');
        if (hero) {
            hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // -------------------------------------------------------------------------
    // EVENT LISTENERS
    // -------------------------------------------------------------------------
    function bindEvents() {
        const searchInput = document.getElementById('mormon-search-input');
        const clearBtn = document.getElementById('mormon-clear-search-btn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                if (clearBtn) clearBtn.style.display = searchQuery ? 'block' : 'none';
                filterBooksAccordion();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
                searchQuery = '';
                clearBtn.style.display = 'none';
                filterBooksAccordion();
            });
        }

        const expandBtn = document.getElementById('mormon-expand-all-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => {
                if (activeTopicFilterId) {
                    window.clearTopicFilter();
                }
                document.querySelectorAll('.mormon-book-card').forEach(d => {
                    d.style.display = 'block';
                    d.open = true;
                });
            });
        }

        const collapseBtn = document.getElementById('mormon-collapse-all-btn');
        if (collapseBtn) {
            collapseBtn.addEventListener('click', () => {
                if (activeTopicFilterId) {
                    window.clearTopicFilter();
                }
                document.querySelectorAll('.mormon-book-card').forEach(d => {
                    d.open = false;
                });
            });
        }

        const randomBtn = document.getElementById('mormon-random-btn');
        if (randomBtn) {
            randomBtn.addEventListener('click', pickRandomChapter);
        }
    }

    // -------------------------------------------------------------------------
    // ACCIONES: COPIAR Y COMPARTIR
    // -------------------------------------------------------------------------
    window.copyMinisterioTopic = function(topicId, btn) {
        const topic = MINISTERIO_TOPICS.find(t => t.id === topicId);
        if (!topic) return;

        const textToCopy = `📖 *${topic.scriptureRef}*\n«${topic.scriptureQuote}»\n\n💡 *Enfoque pastoral:* ${topic.pastoralInsight}\n🔗 ${topic.churchUrl}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.classList.add('copied');
            const originalHtml = btn.innerHTML;
            btn.innerHTML = `✓ <span>Copiado</span>`;
            if (typeof showToast === 'function') {
                showToast(`Copiado al portapapeles: ${topic.scriptureRef}`, 'success');
            }
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalHtml;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    };

    window.shareWhatsAppTopic = function(topicId) {
        const topic = MINISTERIO_TOPICS.find(t => t.id === topicId);
        if (!topic) return;

        const message = `Hola, me acordé de ti al leer esto hoy:\n\n📖 *${topic.scriptureRef}*\n«${topic.scriptureQuote}»\n\n💡 *Pensamiento:* ${topic.pastoralInsight}\n\n🔗 ${topic.churchUrl}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    window.copyChapterSynthesis = function(bookTitle, chapNum, fact, summary, url, btn) {
        const textToCopy = `📖 *${bookTitle} ${chapNum}* — **${fact}** ${summary}\n🔗 ${url}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.classList.add('copied');
            const orig = btn.innerHTML;
            btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            if (typeof showToast === 'function') {
                showToast(`Copiado: ${bookTitle} ${chapNum}`, 'success');
            }
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = orig;
            }, 2000);
        });
    };

    function pickRandomChapter() {
        const allChapters = [];
        MORMON_BOOKS.forEach(b => {
            b.chapters.forEach(c => {
                allChapters.push({ book: b, chapter: c });
            });
        });

        const choice = allChapters[Math.floor(Math.random() * allChapters.length)];
        const detailsEl = document.getElementById(`book-${choice.book.id}`);
        const rowEl = document.getElementById(`chap-${choice.book.id}-${choice.chapter.ch}`);

        if (detailsEl) detailsEl.open = true;

        if (rowEl) {
            rowEl.style.display = 'block';
            rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            rowEl.classList.add('pulse-highlight');
            setTimeout(() => {
                rowEl.classList.remove('pulse-highlight');
            }, 3000);
        }

        if (typeof showToast === 'function') {
            showToast(`📖 ${choice.book.title} ${choice.chapter.ch}: "${choice.chapter.fact}"`, 'success');
        }
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
})();
