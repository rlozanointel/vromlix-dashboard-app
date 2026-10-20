// =========================================================================
// VROMLIX OS - LIBRO DE MORMÓN: GUÍA MNEMOTÉCNICA & MINISTRACIÓN RÁPIDA
// Motor interactivo de retención narrativa (80%) y consulta instantánea
// =========================================================================

(function() {
    'use strict';

    const MORMON_THEMES = [
  {
    "id": "ira_ataque",
    "icon": "🕊️",
    "label": "Ataques / Ira / Pacificadores",
    "desc": "Cómo responder con mansedumbre ante insultos, provocaciones, odio o acusaciones injustas",
    "class": "theme-ira"
  },
  {
    "id": "consuelo_afliccion",
    "icon": "💔",
    "label": "Consuelo en Aflicción & Desesperanza",
    "desc": "Paz y fortaleza celestial cuando el alma se siente angustiada, quebrantada o sin salida",
    "class": "theme-consuelo"
  },
  {
    "id": "santa_cena_ordenanzas",
    "icon": "🥖",
    "label": "Santa Cena & Ordenanzas",
    "desc": "Propósito de la Santa Cena semanal, oraciones exactas, convenios, bautismo y sacerdocio",
    "class": "theme-ordenanzas"
  },
  {
    "id": "capilla_comunion",
    "icon": "⛪",
    "label": "Por qué Asistir a la Capilla",
    "desc": "La comunión de los santos, reunirse a menudo, adoración colectiva y sostén mutuo",
    "class": "theme-capilla"
  },
  {
    "id": "salud_sabiduria",
    "icon": "🌿",
    "label": "Salud Física & Sabiduría",
    "desc": "Cuidado del templo corporal, nutrición divina en el desierto, fortaleza física y sanación",
    "class": "theme-salud"
  },
  {
    "id": "barco_imposibles",
    "icon": "🚢",
    "label": "Construir el Barco (Imposibles)",
    "desc": "Fe y ejecución cuando Dios nos manda tareas que parecen humanamente inalcanzables",
    "class": "theme-barco"
  },
  {
    "id": "ayuno_oracion",
    "icon": "🙏",
    "label": "Ayuno & Oración Ferviente",
    "desc": "Poder de la súplica sincera, la lucha en el alma y el ayuno colectivo para abrir los cielos",
    "class": "theme-oracion"
  },
  {
    "id": "familia_crisis",
    "icon": "👨‍👩‍👧‍👦",
    "label": "Familia en Crisis & Hijos",
    "desc": "Dolor por hijos apartados, consejos paternales, unidad conyugal y salvaguarda del hogar",
    "class": "theme-familia"
  },
  {
    "id": "fe_semilla_dudas",
    "icon": "🌱",
    "label": "Semilla de Fe & Vencer Dudas",
    "desc": "Cómo experimentar con la palabra, confirmar la verdad espiritual y vencer el escepticismo",
    "class": "theme-fe"
  },
  {
    "id": "arrepentimiento_perdon",
    "icon": "✨",
    "label": "Arrepentimiento & Paz Interior",
    "desc": "El potente cambio de corazón, la remisión total de pecados y el alivio de la culpa amarga",
    "class": "theme-perdon"
  },
  {
    "id": "tentacion_ataduras",
    "icon": "🛡️",
    "label": "Vencer Tentaciones & Ataduras",
    "desc": "Estrategias ante adicciones, trampas del adversario, pasiones carnales y falsas seguridades",
    "class": "theme-tentacion"
  },
  {
    "id": "decisiones_guia",
    "icon": "🧭",
    "label": "Decisiones Difíciles & Guía",
    "desc": "Dar el paso sin saber de antemano el camino, dejándose guiar por el Espíritu y la Liahona",
    "class": "theme-decisiones"
  },
  {
    "id": "caridad_servicio",
    "icon": "❤️",
    "label": "Caridad Pura & Ministración",
    "desc": "El amor puro de Cristo, llevar las cargas ajenas, socorrer al necesitado y ministrar con gozo",
    "class": "theme-caridad"
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
        "keywords": "lehi jerusalen pilar de fuego libro profecia misericordia destruccion"
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
        "keywords": "desierto riquezas murmullo laman lemuel corazon ablandado obediencia"
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
        "keywords": "ire y hare mandamiento laban planchas bronce oro plata sorteo"
      },
      {
        "ch": 4,
        "fact": "Nefi guiado por el Espíritu sin saber de antemano lo que haría",
        "summary": "encuentra a Labán ebrio, cumple el mandato del Señor para salvar a una nación y rescata al siervo Zoram.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "guiado espiritu espada laban zoram justificacion perecer incredulidad"
      },
      {
        "ch": 5,
        "fact": "Sariah se consuela al abrazar a sus hijos sanos y salvos",
        "summary": "Lehi escudriña con gratitud las planchas de bronce, descubriendo su linaje de José y la plenitud de los cinco libros de Moisés.",
        "tags": [
          "familia_crisis",
          "consuelo_afliccion"
        ],
        "keywords": "sariah consuelo luto regreso gozo genealogia jose egipto escrituras"
      },
      {
        "ch": 6,
        "fact": "Nefi define el propósito sagrado de sus anales",
        "summary": "no ocuparse de genealogías mundanas sino persuadir a todos los hombres a venir a Cristo y ser salvos.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "proposito anales venir a cristo dios de abraham salvacion"
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
        "keywords": "ismael rebelion atado cuerdas oracion perdon corazon hijas matrimonio"
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
        "keywords": "arbol de la vida barra de hierro fruto blanco gran y espacioso edificio rio vapor tinieblas"
      },
      {
        "ch": 9,
        "fact": "Nefi recibe el mandato de labrar dos juegos de planchas",
        "summary": "para un sabio propósito del Señor que él todavía no comprende pero obedece con absoluta fe.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "dos juegos planchas sabio proposito obediencia preparacion"
      },
      {
        "ch": 10,
        "fact": "Lehi profetiza el bautismo del Mesías por Juan el Bautista",
        "summary": "la dispersión y el recogimiento de Israel, y promete que quien busque con diligencia hallará los misterios de Dios por el Espíritu Santo.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "juan bautista bautismo mesias espiritu santo olivo recogimiento"
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
        "keywords": "condescendencia maria cordero de dios amor de dios cruz salvacion"
      },
      {
        "ch": 12,
        "fact": "Nefi ve en visión la visita de Cristo resucitado a sus descendientes",
        "summary": "la era de paz en América y la posterior decadencia y aniquilación final nefita por causa del orgullo.",
        "tags": [
          "fe_semilla_dudas",
          "tentacion_ataduras"
        ],
        "keywords": "visita cristo america doce discipulos guerra orgullo destruccion"
      },
      {
        "ch": 13,
        "fact": "Nefi observa la formación de la gran iglesia abominable",
        "summary": "la pérdida de verdades claras y preciosas de la Biblia, el viaje de Colón y la gloriosa Restauración en los últimos días.",
        "tags": [
          "fe_semilla_dudas",
          "capilla_comunion"
        ],
        "keywords": "iglesia abominable verdades claras y preciosas biblia colon restauracion gentiles"
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
        "keywords": "dos iglesias cordero diablo santos armados poder rectitud apocalipsis juan"
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
        "keywords": "consultar al señor barra de hierro palabra de dios dardos fuego olivo"
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
        "keywords": "liahona brujula arco roto madera hambre comida desierto nahom muerte ismael"
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
        "keywords": "construir barco abundancia herramientas fuego mineral burla sacudida carne cruda"
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
        "keywords": "tierra prometida tempestad atado liahona calma desembarco semillas oro plata"
      },
      {
        "ch": 19,
        "fact": "Nefi graba las profecías del sufrimiento del Redentor en la cruz",
        "summary": "citando a los profetas Zenoc, Neum y Zenós sobre cómo la tierra gemirá y las islas del mar esperarán Su ley.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "zenoc neum zenos sufrimiento cruz tres dias tinieblas recogimiento"
      },
      {
        "ch": 20,
        "fact": "Isaías 48: Jehová refina a Su pueblo en el horno de la aflicción",
        "summary": "recordándoles que por amor a Su santo nombre no los cortará y los redimirá de las ataduras babilónicas.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "horno afliccion isaias babilonia redencion aguas sed roca"
      },
      {
        "ch": 21,
        "fact": "Isaías 49: El Señor promete que jamás olvidará a Sion",
        "summary": "¿puede una mujer olvidar a su hijo de pecho? Aunque ella lo olvide, Él nos tiene esculpidos en las palmas de Sus manos.",
        "tags": [
          "consuelo_afliccion",
          "familia_crisis"
        ],
        "keywords": "palmas manos grabados compasion hijo pecho muros rescate reyes nodrizas"
      },
      {
        "ch": 22,
        "fact": "Nefi explica el recogimiento espiritual y físico de Israel en los postreros días",
        "summary": "asegurando que los justos no deben temer porque el Santo de Israel los preservará con Su brazo omnipotente.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "recogimiento israel gentiles brazo desnudo fuego santos no temeran"
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
        "keywords": "despertad polvo cadenas sueno pecado armadura tierra prometida libertad"
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
        "keywords": "oposicion todas cosas caida adan libre albedrio gozo cristo redencion ley"
      },
      {
        "ch": 3,
        "fact": "Lehi bendice a su hijo menor José citando a José de Egipto",
        "summary": "quien profetizó la futura labor de un vidente escogido en los últimos días llamado José (José Smith), hijo de José.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas"
        ],
        "keywords": "jose egipto vidente escogido jose smith restauracion planchas biblia vara"
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
        "keywords": "salmo nefi muerte lehi lamento flaquezas roca confianza oracion enojo"
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
        "keywords": "separacion huida templo salomon industria espadas manera feliz maldicion"
      },
      {
        "ch": 6,
        "fact": "Jacob lee las profecías de Isaías sobre el pueblo del convenio",
        "summary": "testificando de la primera venida del Mesías a los judíos y Su rescate final en los últimos días.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "jacob isaias rescate judios convenio gentiles promesa"
      },
      {
        "ch": 7,
        "fact": "Isaías 50: El Salvador declara que dio Su espalda a los que le herían",
        "summary": "y no escondió Su rostro de las injurias ni de los esputos, poniendo Su rostro como un pedernal confiando en Su Dios.",
        "tags": [
          "ira_ataque",
          "consuelo_afliccion"
        ],
        "keywords": "espalda heridores injurias esputos pedernal confianza siervo"
      },
      {
        "ch": 8,
        "fact": "Isaías 51: Jehová consolará a Sion y transformará su desierto en Edén",
        "summary": "reclamando a Su pueblo: '¿Quién eres tú para temer al hombre que morirá y te olvidas de Jehová tu Hacedor?'.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "eden consuelo no temais oprobio brazo despierta cautiverio gozo"
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
        "keywords": "expiacion infinita monstruo muerte infierno resurreccion paraiso ayes pecado"
      },
      {
        "ch": 10,
        "fact": "Jacob explica por qué el Mesías debía morir en Judea",
        "summary": "pues ninguna otra nación sobre la tierra crucificaría a su propio Dios, y llama al pueblo a reconciliarse con Su gracia salvadora.",
        "tags": [
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "crucifixion judios gracia albedrio reconciliacion resurreccion vida eterna"
      },
      {
        "ch": 11,
        "fact": "Nefi declara que su alma se deleita en testificar de Cristo",
        "summary": "presentando tres grandes testigos de la gloria redentora del Salvador: Isaías, Jacob y el propio Nefi.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "tres testigos isaias jacob nefi deleite alma redentor"
      },
      {
        "ch": 12,
        "fact": "Isaías 2: El monte de la casa del Señor será establecido en la cumbre de los montes",
        "summary": "todas las naciones correrán a él, de Sion saldrá la ley y transformarán sus espadas en rejas de arado.",
        "tags": [
          "capilla_comunion",
          "ira_ataque"
        ],
        "keywords": "monte del senor templo ley sion espadas arados paz soberbia abatida"
      },
      {
        "ch": 13,
        "fact": "Isaías 3: Juicio contra los gobernantes que despojan y oprimen al pobre",
        "summary": "y contra la vanidad superficial de las hijas de Sion entregadas a lujos mundanos.",
        "tags": [
          "tentacion_ataduras",
          "caridad_servicio"
        ],
        "keywords": "juicio opresion pobres vanidad adornos soberbia justicia"
      },
      {
        "ch": 14,
        "fact": "Isaías 4: El renuevo de Jehová será hermoso y glorioso",
        "summary": "y sobre cada morada de Sion habrá nube de día y resplandor de fuego de noche como refugio contra la tempestad.",
        "tags": [
          "consuelo_afliccion",
          "capilla_comunion"
        ],
        "keywords": "renuevo refugio nube fuego templo santuario purificacion"
      },
      {
        "ch": 15,
        "fact": "Isaías 5: El cántico de la viña y ¡ay de los que a lo malo llaman bueno!",
        "summary": "y a lo bueno malo; el Señor alza pendón a las naciones lejanas convocándolas velozmente.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "vina uvas silvestres malo bueno tinieblas luz sabios ojos pendon"
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
        "keywords": "vision templo tronos serafines labios carbon santo heme aqui llamamiento"
      },
      {
        "ch": 17,
        "fact": "Isaías 7: La gloriosa profecía mesiánica de Emanuel",
        "summary": "'He aquí que la virgen concebirá y dará a luz un hijo, y llamará su nombre Emanuel (Dios con nosotros)'.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "virgen emanuel profecia senal acaz siria israel"
      },
      {
        "ch": 18,
        "fact": "Isaías 8: Cristo es santuario para los justos pero piedra de tropiezo para los rebeldes",
        "summary": "manda consultar a la ley y al testimonio divino en lugar de recurrir a espiritistas o adivinos.",
        "tags": [
          "decisiones_guia",
          "fe_semilla_dudas"
        ],
        "keywords": "piedra tropiezo santuario ley testimonio adivinos confianza"
      },
      {
        "ch": 19,
        "fact": "Isaías 9: El pueblo que andaba en tinieblas vio gran luz",
        "summary": "porque un niño nos es nacido: 'Admirable, Consejero, Dios Fuerte, Padre Eterno, Príncipe de Paz'.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "luz tinieblas principe de paz admirable consejero gobierno eterno"
      },
      {
        "ch": 20,
        "fact": "Isaías 10: La destrucción de Asiria tipifica el destino de los orgullosos",
        "summary": "que se jactan contra el hacha y la sierra de Dios; un remanente fiel volverá al Dios Fuerte.",
        "tags": [
          "resiliencia",
          "fe_semilla_dudas"
        ],
        "keywords": "asiria orgullo hacha sierra remanente juicio vara"
      },
      {
        "ch": 21,
        "fact": "Isaías 11: Saldrá una vara del tronco de Isaí",
        "summary": "el lobo morará con el cordero, la tierra será llena del conocimiento de Jehová y el Señor alzará pendón para recoger a los dispersos.",
        "tags": [
          "ira_ataque",
          "capilla_comunion"
        ],
        "keywords": "tronco isai vara lobo cordero paz recogimiento pendon naciones"
      },
      {
        "ch": 22,
        "fact": "Isaías 12: Cántico de gozo y gratitud salvadora",
        "summary": "'He aquí, Dios es mi salvación; tendré confianza y no temeré, porque Jehová es mi fortaleza y mi cántico'.",
        "tags": [
          "consuelo_afliccion",
          "oracion_ayuno"
        ],
        "keywords": "salvacion aguas gozo cantico fortaleza alabanza sion"
      },
      {
        "ch": 23,
        "fact": "Isaías 13: La caída total e irrevocable de Babilonia",
        "summary": "símbolo profético de la caída del mundo corrompido ante la venida del día grande del Señor.",
        "tags": [
          "tentacion_ataduras"
        ],
        "keywords": "babilonia destruccion estrellas sol tinieblas dia senor"
      },
      {
        "ch": 24,
        "fact": "Isaías 14: La estrepitosa caída de Lucifer: '¡Cómo caíste del cielo, oh Lucero!'",
        "summary": "derribado hasta el sepulcro por su insaciable soberbia de querer colocarse por encima del trono de Dios.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "lucifer lucero caida cielo soberbia sepulcro trono"
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
        "keywords": "hablamos de cristo regocijamos gracia despues hacer cuanto podamos fe ley moises"
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
        "keywords": "todos iguales ante dios negro blanco mujer varon combinaciones secretas universal"
      },
      {
        "ch": 27,
        "fact": "Nefi profetiza la salida a luz del Libro de Mormón en los últimos días",
        "summary": "el libro sellado, las palabras de los que duermen en el polvo y el sabio que dirá: 'No puedo leer un libro sellado'.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "libro sellado sabio no puedo leer polvo obra maravillosa prodigio"
      },
      {
        "ch": 28,
        "fact": "Nefi desenmascara con maestría las trampas sutiles de Satanás en los últimos días",
        "summary": "cómo adormece a los hombres con seguridad carnal diciendo 'todo va bien en Sion', llevándolos con cordeles de lino al infierno.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "trampas satanas todo va bien pacificara cordel lino infierno adormecer"
      },
      {
        "ch": 29,
        "fact": "El Señor reprende a los gentiles que rechazan más revelación ('¡Una Biblia! ¡Una Biblia!')",
        "summary": "recordando que Dios habla a todas las naciones y que dos naciones serán testigos unidos de Su verdad eterna.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "una biblia dos naciones testigos palabra todas las naciones"
      },
      {
        "ch": 30,
        "fact": "El Libro de Mormón llevará a los lamanitas y al mundo al conocimiento de Cristo",
        "summary": "haciendo que caigan las escamas de tinieblas de sus ojos y comience una era bienaventurada de rectitud milenaria.",
        "tags": [
          "fe_semilla_dudas",
          "capilla_comunion"
        ],
        "keywords": "escamas tinieblas restauracion lamanitas milenio paz"
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
        "keywords": "doctrina cristo puerta estrecha bautismo agua fuego espiritu santo perseverar fin"
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
        "keywords": "deleitaos palabras de cristo orar siempre espiritu santo camino direccion"
      },
      {
        "ch": 33,
        "fact": "La solemne despedida y testimonio final de Nefi al concluir su registro",
        "summary": "llorando por su pueblo y testificando que estas palabras persuaden a hacer el bien y nos hablarán ante el gran tribunal de Dios.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "despedida nefi tribunal juicio lagrimas palabras persuaden hacer el bien"
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
        "keywords": "ministerio magnificar llamamiento jacob jose nefi muerte sangre vestidos"
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
        "keywords": "templo orgullo riquezas pobres pureza esposas dolor quebranto corazon hijos"
      },
      {
        "ch": 3,
        "fact": "Jacob consuela tiernamente a los de corazón puro y quebrantado",
        "summary": "recordando que los lamanitas son más justos por amar a sus esposas y no afligir a sus hijos.",
        "tags": [
          "consuelo_afliccion",
          "familia_crisis"
        ],
        "keywords": "puros corazon consuelo lamanitas amor esposas hijos firmeza"
      },
      {
        "ch": 4,
        "fact": "Jacob enseña que la fe viva en el nombre de Cristo tiene poder sobre la creación",
        "summary": "y que todos los santos profetas antiguos adoraron al Padre en el sagrado nombre del Redentor.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "fe viva nombre cristo piedras arboles profetas expiacion"
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
        "keywords": "alegoria olivo zenos senor vina injertar podar llora que mas pude haber hecho ramas"
      },
      {
        "ch": 6,
        "fact": "Jacob implora al pueblo allegarse a Dios con corazón sincero",
        "summary": "mientras los brazos de Su misericordia estén extendidos hacia ellos en este día de probación terrenal.",
        "tags": [
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "allegarse dios brazos misericordia arrepentimiento justicia"
      },
      {
        "ch": 7,
        "fact": "Sherem el anticristo desafía la fe de Jacob pero es confundido",
        "summary": "por las escrituras, el testimonio del Espíritu y una señal de Dios; confiesa la verdad al borde de la muerte.",
        "tags": [
          "fe_semilla_dudas",
          "ira_ataque"
        ],
        "keywords": "sherem anticristo senal confundido escrituras testimonio muerte"
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
        "keywords": "enos oracion bosque hambre alma perdon pecados lamanitas preservacion registros"
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
        "keywords": "jarom sacerdotes ley de moises profetas armas defensa mesias"
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
        "keywords": "zarahemla mulek coriantumr mosiah benjamin planchas union historia"
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
        "keywords": "mormon planchas menores puente sabio proposito espiritu santo rey benjamin"
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
        "keywords": "benjamin hijos mosiah helaman helem escrituras planchas bronce"
      },
      {
        "ch": 2,
        "fact": "El rey Benjamín enseña desde su torre sobre el servicio desinteresado",
        "summary": "proclamando: 'Cuando os halláis al servicio de vuestros semejantes, solo os halláis al servicio de vuestro Dios'.",
        "tags": [
          "caridad_servicio",
          "humildad"
        ],
        "keywords": "torre servicio semejantes servicio dios siervos inutiles humildad deudas"
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
        "keywords": "angel getsemani sangre cada poro hombre natural nino sumiso manso expiacion"
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
        "keywords": "remision pecados mendigo no somos todos mendigos socorrer pobre retener perdon"
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
        "keywords": "cambio corazon ninguna disposicion hacer mal nombre cristo hijos hijas convenio"
      },
      {
        "ch": 6,
        "fact": "Mosíah es coronado rey en Zarahemla",
        "summary": "y Benjamín registra los nombres de todos los que concertaron el convenio antes de concluir sus días terrenales en paz.",
        "tags": [
          "santa_cena_ordenanzas",
          "decisiones_guia"
        ],
        "keywords": "coronacion mosiah nombres convenio sacerdotes ordenados"
      },
      {
        "ch": 7,
        "fact": "Ammón encabeza una expedición de rescate y encuentra al pueblo de Limhi",
        "summary": "quienes viven en amargo cautiverio y tributo bajo el dominio de los ejércitos lamanitas.",
        "tags": [
          "consuelo_afliccion",
          "caridad_servicio"
        ],
        "keywords": "ammon limhi expedicion lehi nefi cautiverio cadenas tributo"
      },
      {
        "ch": 8,
        "fact": "Ammón explica la sublime y excelsa función de un Vidente",
        "summary": "quien es mayor que un profeta y traduce anales antiguos mediante los sagrados intérpretes preparados por Dios.",
        "tags": [
          "fe_semilla_dudas",
          "decisiones_guia"
        ],
        "keywords": "vidente profeta interpretes 24 planchas oro jareditas revelador"
      },
      {
        "ch": 9,
        "fact": "Zeniff relata su excesivo celo por poseer la tierra heredada",
        "summary": "y cómo el astuto rey lamanita le cedió tierras con el maquiavélico propósito de sojuzgarlos después.",
        "tags": [
          "decisiones_guia",
          "tentacion_ataduras"
        ],
        "keywords": "zeniff celo nefi shilom astucia rey lamanita engaño"
      },
      {
        "ch": 10,
        "fact": "Zeniff conduce a su pueblo a la victoria contra los invasores lamanitas",
        "summary": "fortalecidos por la oración y el trabajo constante frente al odio tradicional sembrado contra Nefi.",
        "tags": [
          "oracion_ayuno",
          "resiliencia"
        ],
        "keywords": "victoria zeniff trabajo mujeres ninos tradicion odio lamanitas"
      },
      {
        "ch": 11,
        "fact": "El inicuo rey Noé impone pesados impuestos, edifica palacios y vive en vanidad",
        "summary": "hasta que el profeta Abinadí aparece proclamando arrepentimiento ante el juicio divino.",
        "tags": [
          "tentacion_ataduras",
          "arrepentimiento_perdon"
        ],
        "keywords": "rey noe sacerdotes vino palacios impuestos abinadi profecia"
      },
      {
        "ch": 12,
        "fact": "Abinadí regresa disfrazado y confronta con intrepidez a los sacerdotes de Noé",
        "summary": "desafiando su falsa piedad y examinándolos severamente sobre los Diez Mandamientos.",
        "tags": [
          "fe_semilla_dudas",
          "valentia"
        ],
        "keywords": "abinadi disfraz sacerdotes diez mandamientos ley de moises juicio"
      },
      {
        "ch": 13,
        "fact": "El rostro de Abinadí resplandece como el de Moisés en el monte Sinaí",
        "summary": "y el poder de Dios impide que lo toquen hasta que concluya el mensaje sagrado que le fue encomendado.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "rostro resplandece moises sinai proteccion poder mensaje diez mandamientos"
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
        "keywords": "isaias 53 siervo doliente llagas sanados oveja trasquilador expiacion"
      },
      {
        "ch": 15,
        "fact": "Abinadí explica cómo Cristo es tanto Padre como Hijo",
        "summary": "y exclama conmovido: '¡Cuán hermosos son sobre los montes los pies de aquellos que publican la paz y traen buenas nuevas!'.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "padre e hijo expiacion hermosa paz resurreccion primera inocentes ninos"
      },
      {
        "ch": 16,
        "fact": "Abinadí testifica de la Resurrección universal y advierte del peligro de no arrepentirse",
        "summary": "porque el aguijón de la muerte es consumido en Cristo, pero el impenitente persistirá en su enemistad contra Dios.",
        "tags": [
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "resurreccion aguijon muerte justicia juicio final impenitente"
      },
      {
        "ch": 17,
        "fact": "Alma cree el mensaje y huye; Abinadí es martirizado en la hoguera",
        "summary": "sellando su testimonio con su propia sangre y profetizando que la dinastía de Noé perecerá consumida por fuego.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "alma conversion martirio abinadi hoguera fuego sangre testimonio"
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
        "keywords": "aguas de mormon bautismo llevar cargas llorar con los que lloran consolar domingo iglesia"
      },
      {
        "ch": 19,
        "fact": "Gedeón enfrenta al rey Noé; el ejército lamanita invade y Noé es quemado por sus hombres",
        "summary": "mientras Limhi asume el trono comprometiéndose a pagar la mitad de todo lo que poseen como tributo.",
        "tags": [
          "ira_ataque",
          "justicia"
        ],
        "keywords": "gedeon rey noe huida muerte de noe tributo limhi rey"
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
        "keywords": "rapto hijas lamanitas sacerdotes pacificacion limhi verdad"
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
        "keywords": "limhi afliccion azotes oracion humillacion llegada ammon esperanza"
      },
      {
        "ch": 22,
        "fact": "Gedeón idea el audaz plan de embriagar a los centinelas lamanitas",
        "summary": "logrando que todo el pueblo de Limhi escape de noche con sus ganados y riquezas hacia Zarahemla.",
        "tags": [
          "decisiones_guia",
          "barco_imposibles"
        ],
        "keywords": "escape gedeon vino guardias ebrios noche zarahemla liberacion"
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
        "keywords": "alma rehusar rey ciudad helam amulon sumision pacifica"
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
        "keywords": "amulon prohibido orar cargas livianas hombros consuelo rescate sueno guardias"
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
        "keywords": "zarahemla reunion limhi alma bautismo siete congregaciones iglesia comunion"
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
        "keywords": "nueva generacion incredulidad revelacion arrepentimiento perdonar cuantas veces"
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
        "keywords": "angel voz trueno alma hijo cuatro hijos mosiah oracion padre nuevo nacimiento mudo"
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
        "keywords": "cuatro hijos mosiah renuncia trono mision lamanitas compasion 24 planchas"
      },
      {
        "ch": 29,
        "fact": "Mosíah propone abolir la monarquía y establecer el gobierno de jueces",
        "summary": "para que cada hombre sea juzgado según sus propios hechos y la voz del pueblo elija con justicia.",
        "tags": [
          "decisiones_guia",
          "justicia"
        ],
        "keywords": "gobierno jueces voz del pueblo abolicion monarquia alma primer juez"
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
        "keywords": "nehor supercheria sacerdotal asesinato gedeon juicio ejecucion doctrina falsa"
      },
      {
        "ch": 2,
        "fact": "Amlici conspira para coronarse rey y desata una sangrienta guerra civil",
        "summary": "Alma ora al Señor pidiendo fortaleza y vence personalmente a Amlici en singular combate junto al río Sidón.",
        "tags": [
          "oracion_ayuno",
          "resiliencia"
        ],
        "keywords": "amlici rebelion rio sidon combate alma victoria oracion"
      },
      {
        "ch": 3,
        "fact": "Los amlicitas se rapan la cabeza y se marcan la frente de rojo",
        "summary": "cumpliendo la advertencia profética de que los hombres traen sobre sí mismos su propia condenación.",
        "tags": [
          "tentacion_ataduras",
          "decisiones_guia"
        ],
        "keywords": "marca roja frente amlicitas consecuencia albedrio distincion"
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
        "keywords": "renuncia asiento judicial nefihah ministerio palabra orgullo iglesia"
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
        "keywords": "examen conciencia potente cambio corazon imagen rostro manos limpias zarahemla"
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
        "keywords": "purificacion iglesia sacerdotes maestros ayuno oracion no creyentes"
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
        "keywords": "sede de cristo dolores enfermedades flaquezas socorrer misericordia gedeon"
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
        "keywords": "ammoniah escupido angel regresa amulek hospitalidad angel alimento"
      },
      {
        "ch": 9,
        "fact": "Alma advierte con severidad al endurecido pueblo de Ammoníah",
        "summary": "que si rechazan la luz superior que han recibido, su juicio será más intolerable que el de los lamanitas.",
        "tags": [
          "arrepentimiento_perdon",
          "fe_semilla_dudas"
        ],
        "keywords": "ammoniah juicio luz advertencia dureza corazon"
      },
      {
        "ch": 10,
        "fact": "Amulek testifica de su linaje y vocación divina ante los abogados",
        "summary": "desenmascarando las trampas jurídicas de quienes buscan enriquecerse a costa de pervertir la justicia.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "amulek testimonio abogados jueces trampas linaje nefita"
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
        "keywords": "zeezrom soborno seis ontis plata no salvara en pecados de pecados resurreccion"
      },
      {
        "ch": 12,
        "fact": "Alma expone a Zeezrom el estado preparatorio de esta vida terrenal",
        "summary": "y advierte que en el juicio final nuestras propias palabras, obras y pensamientos nos condenarán si no nos arrepentimos.",
        "tags": [
          "fe_semilla_dudas",
          "arrepentimiento_perdon"
        ],
        "keywords": "estado preparatorio juicio pensamientos palabras obras misterios dios"
      },
      {
        "ch": 13,
        "fact": "Alma diserta sobre la preordenación del Santo Sacerdocio según el orden del Hijo de Dios",
        "summary": "citando a Melquisedec y llamando a los hombres a entrar en el reposo del Señor mediante la humildad y la pureza.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "sacerdocio melquisedec orden hijo de dios preordenacion reposo del senor"
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
        "keywords": "martirio fuego mujeres ninos prision terremoto muros caen amulek dolor"
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
        "keywords": "zeezrom fiebre culpa tormento sanacion milagro fe bautismo sidom"
      },
      {
        "ch": 16,
        "fact": "Un ejército lamanita destruye la ciudad de Ammoníah en un solo día",
        "summary": "cumpliendo la profecía de Alma; Zoram rescata a los cautivos consultando la revelación profética de Alma.",
        "tags": [
          "justicia",
          "decisiones_guia"
        ],
        "keywords": "destruccion ammoniah desolacion nehor zoram profecia cautivos"
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
        "keywords": "hijos mosiah ayuno oracion ammon criado rey lamoni rebaños sebus brazos honda"
      },
      {
        "ch": 18,
        "fact": "El rey Lamoni queda anonadado por la fidelidad de Ammón y se desmaya ante el Espíritu",
        "summary": "tras escuchar por boca de Ammón el glorioso Plan de Redención desde la Creación hasta la venida de Cristo.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "lamoni asombro fidelidad gran espiritu plan redencion desmayo"
      },
      {
        "ch": 19,
        "fact": "La reina de Lamoni demuestra una fe insigne: 'No ha habido tan grande fe entre los nefitas'",
        "summary": "y el rey, la reina y la humilde sierva Abish viven un milagro de conversión que derrama el Espíritu sobre la multitud.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "reina fe lamoni abish sierva multitud conversion derramamiento espiritu"
      },
      {
        "ch": 20,
        "fact": "Ammón y Lamoni viajan a Middoni y confrontan al padre de Lamoni",
        "summary": "cuya espada e ira furiosa son desarmadas por la nobleza, amor protector y valentía inquebrantable de Ammón.",
        "tags": [
          "ira_ataque",
          "familia_crisis"
        ],
        "keywords": "middoni padre lamoni ira espada desarmado amor valentia rescate hermanos"
      },
      {
        "ch": 21,
        "fact": "Aarón y sus hermanos sufren crueles prisiones, hambre y frío en Jerusalén",
        "summary": "perseverando en paciencia y fe hasta ser liberados por la amorosa intervención de Ammón y Lamoni.",
        "tags": [
          "consuelo_afliccion",
          "resiliencia"
        ],
        "keywords": "aaron jerusalen prision hambre cadenas liberacion paciencia"
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
        "keywords": "rey lamanita dare todos mis pecados oracion aaron caida tierra paz"
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
        "keywords": "anti nefi lehis conversion siete tierras enterrar armas rebelion firmeza jamas caer"
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
        "keywords": "entierro espadas tierra pacto no manchar sangre postrados oracion martirio pacificadores"
      },
      {
        "ch": 25,
        "fact": "Los lamanitas atacan con furia a los nefitas tras matar a los creyentes indefensos",
        "summary": "cumpliéndose con exactitud las palabras proféticas del mártir Abinadí respecto a los sacerdotes de Noé.",
        "tags": [
          "justicia",
          "fe_semilla_dudas"
        ],
        "keywords": "ataque cumplimiento profecia abinadi sacerdotes noe dispersion"
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
        "keywords": "himno ammon no me jacto gloria dios gozo gavillas cosecha misericordia"
      },
      {
        "ch": 27,
        "fact": "Los nefitas reciben con conmovedora caridad a los Anti-Nefi-Lehis (pueblo de Ammón)",
        "summary": "cediéndoles generosamente la tierra fértil de Jersón y protegiéndolos con sus propios ejércitos.",
        "tags": [
          "caridad_servicio",
          "capilla_comunion"
        ],
        "keywords": "pueblo de ammon jerson hospitalidad generosidad proteccion ejercitos"
      },
      {
        "ch": 28,
        "fact": "Una cruenta batalla causa inmenso dolor y luto entre los hogares nefitas",
        "summary": "recordando la amarga tragedia del pecado frente al gozo sublime y la esperanza eterna de los justos.",
        "tags": [
          "consuelo_afliccion",
          "resiliencia"
        ],
        "keywords": "batalla luto llanto dolor contraste pecado justicia esperanza"
      },
      {
        "ch": 29,
        "fact": "El célebre clamor apostólico de Alma: '¡Oh, si fuera yo un ángel y se me concediera el deseo de mi corazón!'",
        "summary": "para proclamar con trompeta celestial el arrepentimiento y la salvación a cada alma sobre la tierra.",
        "tags": [
          "caridad_servicio",
          "arrepentimiento_perdon"
        ],
        "keywords": "oh si fuera yo un angel trompeta clamar arrepentimiento deseo corazon regocijo"
      },
      {
        "ch": 30,
        "fact": "Korihor el anticristo predica la burla a la fe y exige una señal a Alma",
        "summary": "queda mudo instantáneamente por mandato de Dios, confiesa haber sido engañado por el diablo y muere atropellado entre los zoramitas.",
        "tags": [
          "fe_semilla_dudas",
          "ira_ataque"
        ],
        "keywords": "korihor anticristo senal mudo todas las cosas indican que hay un dios diablo angel de luz atropellado"
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
        "keywords": "zoramitas rameumptom oracion vana alma lagrimas consuelo fortaleza mision"
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
        "keywords": "semilla fe dar lugar experimento germinar brotar arbol fruto vida eterna"
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
        "keywords": "zenos oracion campo desierto serpiente bronce mirar vivir moises"
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
        "keywords": "sacrificio infinito expiacion orar aposentos no demorar arrepentimiento noche tinieblas"
      },
      {
        "ch": 35,
        "fact": "Los zoramitas conversos y pobres son expulsados de su tierra y acogidos en Jersón",
        "summary": "por el generoso pueblo de Ammón, lo cual enfurece a los líderes zoramitas y enciende los preparativos bélicos.",
        "tags": [
          "caridad_servicio",
          "consuelo_afliccion"
        ],
        "keywords": "refugiados zoramitas pueblo ammon jerson ira lideres guerra"
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
        "keywords": "quiasmo helaman conversion tormento clamar jesus misericordia no mas dolor gozo"
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
        "keywords": "cosas pequenas sencillas grandes obras liahona brujula palabras de cristo guia"
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
        "keywords": "shiblon refrenar pasiones lleno amor no jactarse templanza mansedumbre"
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
        "keywords": "corianton ramera isabel pecados sexuales abominable ministerio cruz arrepentimiento"
      },
      {
        "ch": 40,
        "fact": "Alma instruye a Coriantón sobre el estado del alma entre la muerte y la resurrección",
        "summary": "distinguiendo entre el paraíso de descanso y paz para los justos, y las tinieblas de afuera con lloro y crujir de dientes para los inicuos.",
        "tags": [
          "consuelo_afliccion",
          "familia_crisis"
        ],
        "keywords": "muerte resurreccion estado del alma paraiso descanso tinieblas llanto"
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
        "keywords": "ley restauracion maldad nunca fue felicidad sembrar cosechar bien mal"
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
        "keywords": "justicia misericordia expiacion polvo humillacion armonia redencion"
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
        "keywords": "moroni corazas escudos armaduras zerahemna sidon familias libertad religion"
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
        "keywords": "pacto de paz zerahemna traicion cuero cabelludo entrega armas rio sidon"
      },
      {
        "ch": 45,
        "fact": "Alma profetiza la aniquilación nefita final, bendice la tierra y parte de ella",
        "summary": "siendo trasladado por el Señor como Moisés; Helamán y sus hermanos reorganizan el sacerdocio en toda la nación.",
        "tags": [
          "fe_semilla_dudas",
          "decisiones_guia"
        ],
        "keywords": "profecia destruccion bendicion tierra partida alma traslado moises helaman"
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
        "keywords": "estandarte libertad moroni manto rasgado amalickiah esposas hijos religion paz"
      },
      {
        "ch": 47,
        "fact": "Amalickíah usa la traición, el engaño y el veneno a plazos para usurpar el trono lamanita",
        "summary": "asesinando a Lehonti y luego al propio rey lamanita para apoderarse de su reina y ejércitos.",
        "tags": [
          "tentacion_ataduras",
          "justicia"
        ],
        "keywords": "amalickiah traicion veneno a plazos lehonti asesinato reina usurpacion"
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
        "keywords": "temple moroni caracter infierno sacudido fidelidad no se deleitaba en sangre"
      },
      {
        "ch": 49,
        "fact": "Los lamanitas atacan las ciudades de Ammoníah y Noé pero quedan atónitos y masacrados",
        "summary": "ante las impenetrables fortificaciones, parapetos y fosos de defensa diseñados por Moroni sin perder un solo nefita.",
        "tags": [
          "preparacion",
          "resiliencia"
        ],
        "keywords": "fortificaciones fosos parapetos ammoniah noe asombro victoria sin bajas"
      },
      {
        "ch": 50,
        "fact": "Moroni fortifica todas las ciudades y los nefitas viven una era de inmensa prosperidad",
        "summary": "declarando los anales que jamás hubo una época más feliz entre el pueblo de Nefi desde los días de su fundación.",
        "tags": [
          "prosperidad",
          "capilla_comunion"
        ],
        "keywords": "ciudades fortificadas epoca feliz prosperidad paz lehi morianton disputas"
      },
      {
        "ch": 51,
        "fact": "Los reyezuelos rehúsan pelear por su patria; Moroni sofoca la sedición interna",
        "summary": "mientras Amalickíah invade las costas hasta que el audaz Teáncum le clava una jabalina en el corazón mientras duerme en su tienda.",
        "tags": [
          "justicia",
          "decisiones_guia"
        ],
        "keywords": "reyezuelos sedicion teancum lanza jabalina corazon muerte amalickiah tienda"
      },
      {
        "ch": 52,
        "fact": "Ammoron sucede a su hermano; Moroni, Teáncum y Lehi coordinan una brillante estrategia",
        "summary": "atrayendo al ejército lamanita fuera de la ciudad fortificada de Mulek para recuperarla sin sufrir grandes bajas.",
        "tags": [
          "decisiones_guia",
          "resiliencia"
        ],
        "keywords": "ammoron mulek senuelo estrategia teancum lehi moroni victoria"
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
        "keywords": "dos mil jovenes guerreros helaman hijos madres fe convenio libertad valor"
      },
      {
        "ch": 54,
        "fact": "Ammoron propone un canje de prisioneros; Moroni le responde con una epístola inflexible",
        "summary": "exigiendo justicia, denunciando sus mentiras y advirtiéndole que Dios vengará la sangre de los inocentes.",
        "tags": [
          "ira_ataque",
          "valentia"
        ],
        "keywords": "canje prisioneros ammoron carta moroni firmeza justicia advertencia"
      },
      {
        "ch": 55,
        "fact": "Moroni rescata a todos los prisioneros nefitas en la ciudad de Gid sin derramar sangre",
        "summary": "enviando vino a los centinelas lamanitas a través del soldado Laman y armando en secreto a sus cautivos.",
        "tags": [
          "decisiones_guia",
          "sabiduria"
        ],
        "keywords": "rescate sin sangre gid vino guardias ebrios soldado laman noche armas"
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
        "keywords": "carta helaman dos mil jovenes no dudaban madres fe libraria antipas"
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
        "keywords": "heridas ninguno murio milagro fe absoluta cumeni preservacion divina"
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
        "keywords": "manti estratagema oracion paz alma provisiones hambre consuelo rescate"
      },
      {
        "ch": 59,
        "fact": "Moroni se llena de profundo dolor e indignación al caer la ciudad de Nefíah",
        "summary": "creyendo falsamente que los gobernantes en Zarahemla se desentienden por pereza de los soldados que mueren en el frente.",
        "tags": [
          "desesperanza",
          "ira_ataque"
        ],
        "keywords": "dolor moroni caida nefiah queja gobierno provisiones traicion aparente"
      },
      {
        "ch": 60,
        "fact": "La apasionada y severa epístola de Moroni a Pahorán",
        "summary": "¿podéis quedaros sentados en vuestros tronos en insensible estupor mientras vuestros hermanos son asesinados por millares?.",
        "tags": [
          "ira_ataque",
          "justicia"
        ],
        "keywords": "carta moroni pahoran tronos estupor indolencia juicio limpieza vaso"
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
        "keywords": "respuesta pahoran mansedumbre no me disgusta grandeza corazon rebelion pacthies"
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
        "keywords": "union moroni pahoran victoria recuperacion nefiah paz final provisiones"
      },
      {
        "ch": 63,
        "fact": "Shiblón custodia los anales, Hagoth zarpa en naves hacia el norte y Moroni muere en paz",
        "summary": "entregando el registro sagrado al joven Helamán hijo tras una vida entera de devoción sin mancha.",
        "tags": [
          "historia",
          "decisiones_guia"
        ],
        "keywords": "hagoth naves mar norte shiblon anales muerte moroni helaman hijo"
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
        "keywords": "asesinato pahoran hijo kishkumen coriantumr captura zarahemla moroniah"
      },
      {
        "ch": 2,
        "fact": "Helamán asume el asiento judicial; su siervo apuñala en secreto a Kishkumen",
        "summary": "frustrando el complot de la banda secreta fundada por Gadiantón que pretendía exterminar a los líderes del pueblo.",
        "tags": [
          "decisiones_guia",
          "tentacion_ataduras"
        ],
        "keywords": "helaman siervo punal kishkumen gadianton banda secreta huida"
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
        "keywords": "migracion cemento madera ayuno oracion purificacion corazon firmeza cristo"
      },
      {
        "ch": 4,
        "fact": "Por causa del orgullo y la opresión a los necesitados, los nefitas pierden la mitad de su territorio",
        "summary": "comprendiendo en carne propia que cuando el Espíritu de Dios se aparta, quedan indefensos ante sus enemigos.",
        "tags": [
          "arrepentimiento_perdon",
          "humildad"
        ],
        "keywords": "perdida tierras orgullo opresion espiritu aparta debilidad juicio"
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
        "keywords": "roca redentor fundamento fuego celestial voz apacible nefi lehi aminadab conversion prision"
      },
      {
        "ch": 6,
        "fact": "Los lamanitas convertidos superan en justicia a los nefitas y van a predicarles",
        "summary": "mientras los ladrones de Gadiantón se apoderan del gobierno nefita seduciendo a la sociedad con riquezas y corrupción.",
        "tags": [
          "capilla_comunion",
          "justicia"
        ],
        "keywords": "lamanitas justicia nefitas corrupcion gadianton juramentos antiguos"
      },
      {
        "ch": 7,
        "fact": "Nefi gime desconsolado en la torre de su jardín junto al camino del mercado",
        "summary": "llorando por la iniquidad de su pueblo y advirtiendo que los juicios de Dios caerán velozmente sobre sus cabezas.",
        "tags": [
          "oracion_ayuno",
          "desesperanza"
        ],
        "keywords": "nefi torre jardin mercado llanto luto iniquidad advertencia"
      },
      {
        "ch": 8,
        "fact": "Nefi desenmascara a los jueces corruptos, testifica de Cristo citando a Moisés y Zenós",
        "summary": "y profetiza que en ese preciso instante el juez superior Seezoram ha sido asesinado por su propio hermano.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "jueces corruptos veredicto profecia veracidad asesinato seezoram"
      },
      {
        "ch": 9,
        "fact": "Cinco mensajeros corren al tribunal y hallan a Seezoram degollado en su sangre",
        "summary": "Nefi identifica con detalles exactos y sobrenaturales a Seántum como el asesino, demostrando su divina condición de profeta.",
        "tags": [
          "discernimiento",
          "fe_semilla_dudas"
        ],
        "keywords": "cinco mensajeros veracidad seezoram seantum sangre manto confesion"
      },
      {
        "ch": 10,
        "fact": "El Señor otorga a Nefi el supremo poder de atar y desatar en la tierra y en el cielo",
        "summary": "por su incansable fidelidad y porque no busca su propia vida sino la voluntad pura del Padre.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "poder atar desatar cielo tierra fidelidad incansable voz divina"
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
        "keywords": "sequia hambre oracion lluvia cesa peste humillacion recaida gadianton"
      },
      {
        "ch": 12,
        "fact": "Mormón reflexiona sobre la insensatez y fragilidad del corazón humano",
        "summary": "¡cuán presto es el hombre a vanagloriarse en la abundancia terrenal y cuán tardo en acordarse de su Creador y Salvador!.",
        "tags": [
          "humildad",
          "arrepentimiento_perdon"
        ],
        "keywords": "insensatez corazon humano vanagloria polvo nada tierra obedece dios"
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
        "keywords": "samuel lamanita murallas zarahemla espada justicia riquezas malditas arrepentíos"
      },
      {
        "ch": 14,
        "fact": "Samuel profetiza las señales precisas del nacimiento y de la muerte del Salvador",
        "summary": "una noche sin tinieblas y una nueva estrella para el nacimiento; y tres días de densa obscuridad, truenos y rocas partidas para Su muerte.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "senales nacimiento noche sin tinieblas estrella tres dias oscuridad muerte cristo rocas"
      },
      {
        "ch": 15,
        "fact": "Samuel contrasta la paciencia de Dios hacia los lamanitas con el castigo nefita",
        "summary": "recordando que a mayor luz recibida, mayor será la condenación si se rechaza el mensaje celestial.",
        "tags": [
          "justicia",
          "arrepentimiento_perdon"
        ],
        "keywords": "paciencia lamanitas luz recibida advertencia condenacion firmeza"
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
        "keywords": "piedras flechas muralla proteccion milagro salto huida bautismo nefi"
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
        "keywords": "dia de muerte creyentes alza cabeza noche sin tinieblas nueva estrella nacimiento cristo"
      },
      {
        "ch": 2,
        "fact": "El pueblo olvida pronto las señales milagrosas y las atribuye a la casualidad",
        "summary": "mientras los ladrones de Gadiantón se multiplican y amenazan con exterminar tanto a nefitas como a lamanitas.",
        "tags": [
          "tentacion_ataduras",
          "fe_semilla_dudas"
        ],
        "keywords": "olvido senales incredulidad casualidad ladrones gadianton peligro union"
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
        "keywords": "giddianhi carta intimidacion laconeo no teme concentracion provisiones siete anos"
      },
      {
        "ch": 4,
        "fact": "Los nefitas liderados por Gidgiddoni derrotan totalmente a los ejércitos de Gadiantón",
        "summary": "ahorcando a su líder Zemnaríah en un árbol y alabando a Dios con lágrimas y cánticos de gozo.",
        "tags": [
          "resiliencia",
          "justicia"
        ],
        "keywords": "gidgiddoni victoria batalla derrota ladrones zemnariah arbol canticos gozo"
      },
      {
        "ch": 5,
        "fact": "Mormón testifica de su genealogía y su llamado supremo como discípulo de Jesucristo",
        "summary": "declarando con solemnidad que su compendio es un registro verídico que llevará a Israel de regreso a su Redentor.",
        "tags": [
          "fe_semilla_dudas",
          "caridad_servicio"
        ],
        "keywords": "mormon discipulo de jesucristo compendio veridico recogimiento israel"
      },
      {
        "ch": 6,
        "fact": "La paz dura poco; el orgullo por las riquezas y la distinción de clases sociales destruyen la Iglesia",
        "summary": "y jueces inicuos confabulan en secreto asesinando a los profetas que testifican de Cristo.",
        "tags": [
          "capilla_comunion",
          "tentacion_ataduras"
        ],
        "keywords": "orgullo clases sociales vestidos costosos asesinato profetas destruccion iglesia"
      },
      {
        "ch": 7,
        "fact": "El gobierno colapsa en tribus independientes; Nefi ministra con ángeles y resucita a su hermano",
        "summary": "testificando con tal potencia del Espíritu que nadie puede resistir sus palabras ni sus milagros.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "colapso gobierno tribus nefi angeles hermano resucitado poder fe milagros"
      },
      {
        "ch": 8,
        "fact": "En el año 34 estalla una tempestad devastadora, terremotos que parten la tierra e incendios feroces",
        "summary": "hundiendo ciudades enteras en el mar y el fuego, seguidos por tres días de densa obscuridad que sofoca toda vela y fuego.",
        "tags": [
          "consuelo_afliccion",
          "justicia"
        ],
        "keywords": "tempestad terremoto rocas hendidas ciudades hundidas tres dias oscuridad espesa llanto"
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
        "keywords": "voz cristo tinieblas gallina polluelos corazon quebrantado espiritu contrito luz mundo"
      },
      {
        "ch": 10,
        "fact": "El silencio y el llanto cesan al oír por segunda vez la tierna promesa del Salvador",
        "summary": "las tinieblas se disipan milagrosamente y los sobrevivientes que no habían rechazado a los profetas caen en alabanzas al Redentor.",
        "tags": [
          "consuelo_afliccion",
          "paz"
        ],
        "keywords": "silencio llanto disipan tinieblas luz sol alabanzas salvador preservados"
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
        "keywords": "aparicion cristo abundancia templo tocar heridas manos costado bautismo inmersion no contencion doctrina"
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
        "keywords": "bienaventuranzas pobres espiritu pacificadores reconciliate pronto ama enemigos sal de la tierra luz"
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
        "keywords": "limosnas secreto padre nuestro oracion perdon buscar primeramente reino dios lilios campo"
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
        "keywords": "no juzgueis viga paja ojo perlas cerdos pedid se os dara puerta estrecha casa roca"
      },
      {
        "ch": 15,
        "fact": "El Salvador declara que la ley de Moisés se cumplió en Su persona",
        "summary": "y revela a los nefitas que ellos son las 'otras ovejas' de las que habló a Sus apóstoles en Jerusalén que debían oír Su voz.",
        "tags": [
          "fe_semilla_dudas",
          "doctrina"
        ],
        "keywords": "ley moises cumplida otras ovejas rebano jerusalen convenio israel"
      },
      {
        "ch": 16,
        "fact": "Jesucristo profetiza sobre las tribus perdidas y el recogimiento de Israel en los postreros días",
        "summary": "advirtiendo a los gentiles modernos que si se enorgullecen perderán la plenitud del Evangelio que pasará a los remanentes.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "tribus perdidas recogimiento gentiles orgullo remanente israel sion"
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
        "keywords": "sanidad enfermos cojos ciegos ninos pequenos fuego celestial angeles lagrimas compasion"
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
        "keywords": "santa cena pan vino memoria cuerpo sangre orar siempre no echar nadie reuniones"
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
        "keywords": "doce discipulos deseo espiritu santo oracion cristo resplandor blancura celestial fe"
      },
      {
        "ch": 20,
        "fact": "El Salvador provee pan y vino milagrosamente por segunda vez para la Santa Cena",
        "summary": "y cita con majestuosidad las profecías del convenio abrahámico sobre el triunfo final de Sion en los postreros días.",
        "tags": [
          "santa_cena_ordenanzas",
          "fe_semilla_dudas"
        ],
        "keywords": "segunda santa cena pan milagroso convenio abraham recogimiento sion triunfo"
      },
      {
        "ch": 21,
        "fact": "La salida a luz del Libro de Mormón será la señal suprema de que el recogimiento ha comenzado",
        "summary": "y que el convenio del Señor con la casa de Israel se está cumpliendo velozmente sobre la faz de la tierra.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "libro de mormon senal suprema recogimiento israel cumplimiento convenio"
      },
      {
        "ch": 22,
        "fact": "El Salvador cita Isaías 54: 'Por un breve momento te abandoné, mas te recogeré con grandes misericordias'",
        "summary": "prometiendo que los montes se moverán y los collados temblarán, pero Su benignidad jamás se apartará de Su pueblo.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "isaias 54 breve momento abandone grandes misericordias benignidad no apartara paz"
      },
      {
        "ch": 23,
        "fact": "Jesucristo manda escudriñar diligentemente los escritos del profeta Isaías",
        "summary": "y hace corregir el registro nefita añadiendo la profecía cumplida de Samuel el Lamanita sobre la resurrección de los santos.",
        "tags": [
          "fe_semilla_dudas",
          "estudio"
        ],
        "keywords": "escudrinar isaias mandamiento corregir anales samuel lamanita resurreccion santos"
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
        "keywords": "malaquias 3 diezmo alfoli ventanas cielos bendicion sobreabunde purificador plata"
      },
      {
        "ch": 25,
        "fact": "El Salvador cita Malaquías 4 sobre la venida de Elías el Profeta",
        "summary": "quien vendrá antes del día grande y terrible para volver el corazón de los padres a los hijos y de los hijos a los padres.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas"
        ],
        "keywords": "elias profeta corazon padres a hijos volver corazones genealogia templos"
      },
      {
        "ch": 26,
        "fact": "Jesucristo expone todas las cosas desde el principio hasta Su segunda venida",
        "summary": "y los niños pequeños sueltan sus lenguas hablando cosas tan grandes y maravillosas que se prohíbe escribirlas.",
        "tags": [
          "familia_crisis",
          "fe_semilla_dudas"
        ],
        "keywords": "todas las cosas principio fin ninos lenguas desatadas maravillas bautismos sanidades"
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
        "keywords": "nombre iglesia de jesucristo definicion evangelio levantado cruz atraer juicio obras"
      },
      {
        "ch": 28,
        "fact": "Nueve discípulos desean ir con Cristo al morir; tres discípulos nefitas son trasladados",
        "summary": "para permanecer sobre la tierra ministrando y trayendo almas a Cristo sin probar jamás el dolor de la muerte.",
        "tags": [
          "caridad_servicio",
          "santa_cena_ordenanzas"
        ],
        "keywords": "tres nefitas trasladados juan amado no probar muerte ministrar almas poder dolor"
      },
      {
        "ch": 29,
        "fact": "Mormón advierte con solemnidad a los gentiles modernos que no escarnezcan las promesas de Dios",
        "summary": "porque la espada de Su justicia pende sobre aquellos que pretendan anular Sus convenios sagrados.",
        "tags": [
          "fe_semilla_dudas",
          "justicia"
        ],
        "keywords": "advertencia gentiles no escarnecer promesas espada justicia convenios"
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
        "keywords": "invitacion gentiles bautismo perdon contarse pueblo convenio cristo"
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
        "keywords": "sion todas cosas comun no ricos pobres amor de dios no contencion caida orgullo riquezas divisiones"
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
        "keywords": "amaron mormon diez anos quince anos visita del senor dones cesan dureza"
      },
      {
        "ch": 2,
        "fact": "Mormón es nombrado líder del ejército nefita a los dieciséis años",
        "summary": "y llora al ver que el lamento de su pueblo no es tristeza según Dios para arrepentimiento sino la tristeza de los condenados.",
        "tags": [
          "arrepentimiento_perdon",
          "consuelo_afliccion"
        ],
        "keywords": "general dieciseis anos tristeza segun dios tristeza condenados no arrepentimiento lamento"
      },
      {
        "ch": 3,
        "fact": "Mormón rehúsa seguir liderando a los ejércitos nefitas por causa de su crueldad y sed de venganza",
        "summary": "permaneciendo como testigo silencioso e imparcial de la autodestrucción inevitable de su nación.",
        "tags": [
          "ira_ataque",
          "justicia"
        ],
        "keywords": "renuncia mando sed de venganza crueldad testigo juicio advertencia"
      },
      {
        "ch": 4,
        "fact": "Mormón observa que es por la propia maldad de los hombres que son destruidos",
        "summary": "las mujeres y los niños son sacrificados a los ídolos en medio de una barbarie sin precedentes.",
        "tags": [
          "justicia",
          "consuelo_afliccion"
        ],
        "keywords": "maldad destruccion juicios sacrificios idolos desolacion barbarie"
      },
      {
        "ch": 5,
        "fact": "Mormón retoma el mando militar por amor compasivo a su pueblo aunque sabe que perecerán",
        "summary": "y escribe con ternura a los gentiles y al remanente de Israel para que se arrepientan y vengan a Cristo.",
        "tags": [
          "caridad_servicio",
          "fe_semilla_dudas"
        ],
        "keywords": "retoma mando compasion sin esperanza mensaje gentiles polvo recogimiento"
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
        "keywords": "cumorah batalla final 230 mil muertos oh bellos seres llanto dolor destruccion total"
      },
      {
        "ch": 7,
        "fact": "Mormón exhorta conmovido a los descendientes de los lamanitas a creer en Jesucristo",
        "summary": "arrepentirse, bautizarse y abrazar tanto la Biblia como el Libro de Mormón como dos testigos unidos de la salvación.",
        "tags": [
          "fe_semilla_dudas",
          "santa_cena_ordenanzas"
        ],
        "keywords": "exhortacion lamanitas creer en cristo bautismo biblia libro de mormon dos testigos"
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
        "keywords": "moroni solo muerte mormon ultimo testigo profecia ultimos dias iglesias dinero hipocresia"
      },
      {
        "ch": 9,
        "fact": "Moroni confronta a quienes afirman que las revelaciones y milagros han cesado",
        "summary": "testificando con fuego: 'Dios es un Dios de milagros invariable de ayer, hoy y para siempre; si los milagros han cesado, es por vuestra propia incredulidad'.",
        "tags": [
          "fe_semilla_dudas",
          "consuelo_afliccion"
        ],
        "keywords": "dios de milagros invariable ayer hoy siempre incredulidad oracion respondera"
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
        "keywords": "torre de babel hermano de jared oracion no confundir lengua amigos tierra prometida"
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
        "keywords": "barcos hermeticos conchas luz aire montana moriancumer hermano jared"
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
        "keywords": "dieciseis piedras dedo senor cuerpo espiritual fe infinita velo jesucristo premortal"
      },
      {
        "ch": 4,
        "fact": "Moroni sella la magna visión del hermano de Jared en las planchas",
        "summary": "revelando que estas gloriosas verdades solo se manifestarán a aquellos que desgarren el velo de incredulidad y ejerzan una fe pura.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "vision sellada velo incredulidad fe pura revelacion ultimos dias"
      },
      {
        "ch": 5,
        "fact": "Moroni profetiza la función de los Tres Testigos que verán las planchas por el poder de Dios",
        "summary": "para que el testimonio de tres sea establecido firmemente ante el mundo entero.",
        "tags": [
          "fe_semilla_dudas"
        ],
        "keywords": "tres testigos planchas poder de dios testimonio verdad"
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
        "keywords": "344 dias olas gigantescas vientostempestuosos canticos alabanzas gratitud desembarco"
      },
      {
        "ch": 7,
        "fact": "Comienzan las disputas por el trono entre los reyes jareditas Orihah, Kib y Corihor",
        "summary": "mostrando cómo la ambición política y las rebeliones filiales traen cautiverio y sufrimiento.",
        "tags": [
          "familia_crisis",
          "decisiones_guia"
        ],
        "keywords": "reyes jareditas orihah kib corihor rebelion usurpacion cautiverio"
      },
      {
        "ch": 8,
        "fact": "Akish trama una combinación secreta sangrienta mediante juramentos antiguos",
        "summary": "y Moroni lanza una severa advertencia a los gentiles de los postreros días contra las conspiraciones que destruyen la libertad de las naciones.",
        "tags": [
          "tentacion_ataduras",
          "justicia"
        ],
        "keywords": "combinaciones secretas akish juramentos cain advertencia gentiles destruccion libertad"
      },
      {
        "ch": 9,
        "fact": "Guerras sangrientas, venenos y hambrunas asolan a los reinos jareditas por su maldad",
        "summary": "hasta que el rey Emer vive en rectitud y contempla al Hijo de Justicia en una era de paz.",
        "tags": [
          "justicia",
          "prosperidad"
        ],
        "keywords": "hambre serpientes venenosas emer hijo de justicia prosperidad paz"
      },
      {
        "ch": 10,
        "fact": "Sucesión de monarcas justos e inicuos que alternan entre la tiranía y el alivio del pueblo",
        "summary": "ilustrando las consecuencias temporales de someterse al orgullo o vivir con sobriedad.",
        "tags": [
          "decisiones_guia"
        ],
        "keywords": "reyes jareditas morianton lib kim justicia tirania historia"
      },
      {
        "ch": 11,
        "fact": "Profetas inspirados advierten de la inminente aniquilación de la civilización jaredita",
        "summary": "pero son despreciados, expulsados y rechazados por un pueblo obstinado en sus abominaciones.",
        "tags": [
          "arrepentimiento_perdon",
          "advertencia"
        ],
        "keywords": "profetas advertencia rechazo endurecimiento destruccion"
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
        "keywords": "fe cosas que se esperan prueba de la fe gracia suficiente cosas debiles fuertes moroni esperanza"
      },
      {
        "ch": 13,
        "fact": "Éter profetiza la Nueva Jerusalén en el continente americano y el destino de Coriantumr",
        "summary": "teniendo que esconderse en la cavidad de una roca de noche para ver y registrar la destrucción de su pueblo.",
        "tags": [
          "consuelo_afliccion",
          "fe_semilla_dudas"
        ],
        "keywords": "nueva jerusalen eter cavidad de la roca coriantumr profecia soledad"
      },
      {
        "ch": 14,
        "fact": "La cruenta guerra civil entre Coriantumr y Shiz se torna en una carnicería total",
        "summary": "donde hombres, mujeres y niños son poseídos por una ira y locura asesina incontrolable.",
        "tags": [
          "ira_ataque",
          "desesperanza"
        ],
        "keywords": "coriantumr shiz guerra civil carniceria ira locura odio ciego"
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
        "keywords": "ramah batalla final decapita shiz coriantumr fin jareditas eter esconde anales"
      }
    ]
  },
  {
    "id": "moroni",
    "title": "Moroni",
    "author": "Moroni / Mormón",
    "period": "aprox. 401 d.C. — 421 d.C.",
    "icon": "🎺",
    "summary": "El profeta solitario que concluye las planchas, ordenanzas sagradas (don del Espíritu Santo, sacerdocio, Santa Cena), el sermón de la caridad de Mormón, condena al bautismo de infantes y la inmortal Promesa de Moroni.",
    "url_slug": "moroni",
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
        "keywords": "moroni solitario errante no negare a cristo fidelidad vida muerte"
      },
      {
        "ch": 2,
        "fact": "Moroni registra las palabras exactas de Jesucristo al conferir el Don del Espíritu Santo",
        "summary": "mediante la imposición de manos a Sus doce discípulos escogidos en el templo.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "don espiritu santo imposicion de manos doce discipulos palabras cristo"
      },
      {
        "ch": 3,
        "fact": "Moroni describe el modo sagrado de ordenar a presbíteros y maestros",
        "summary": "por el poder del Espíritu Santo y en el nombre de Jesucristo para cuidar y alimentar a la Iglesia.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "ordenacion sacerdotes presbiteros maestros imposicion manos oficio"
      },
      {
        "ch": 4,
        "fact": "La oración sacramental sagrada e inmutable sobre el pan",
        "summary": "'Oh Dios, Padre Eterno, te pedimos en el nombre de tu Hijo, Jesucristo, que bendigas y santifiques este pan para las almas de todos los que participen de él...'.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "oracion sacramental pan bendecir santificar recordar cuerpo siempre acordarse guardar mandamientos"
      },
      {
        "ch": 5,
        "fact": "La oración sacramental sagrada e inmutable sobre el vino",
        "summary": "'Oh Dios, Padre Eterno, te pedimos en el nombre de tu Hijo, Jesucristo, que bendigas y santifiques este vino para las almas de todos los que beban de él...'.",
        "tags": [
          "santa_cena_ordenanzas",
          "capilla_comunion"
        ],
        "keywords": "oracion sacramental vino bendecir santificar sangre derramada recordar espiritu con ellos"
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
        "keywords": "bautismo requisitos quebrantado contrito reunirse a menudo ayunar orar bienestar almas santa cena perdon"
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
        "keywords": "caridad amor puro de cristo fe esperanza luz de cristo juzgar bien nunca deja de ser"
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
        "keywords": "bautismo ninos pequenos burla ante dios vivos en cristo sin pecado doctrina salvacion"
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
        "keywords": "carta mormon a moroni se fiel sufrimientos muerte cristo reposen mente corazon barbarie"
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
        "keywords": "promesa moroni preguntar dios corazon sincero fe en cristo manifestara verdad espiritu santo dones venid a cristo gracia suficiente"
      }
    ]
  }
];

    let activeFilterTag = 'all';
    let searchQuery = '';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMormonView);
    } else {
        initMormonView();
    }

    function initMormonView() {
        renderThemeChips();
        renderBooksAccordion();
        bindEvents();
    }

    // -------------------------------------------------------------
    // RENDER THEME CHIPS
    // -------------------------------------------------------------
    function renderThemeChips() {
        const container = document.getElementById('mormon-theme-chips');
        if (!container) return;

        let html = `
            <button class="mormon-chip active" data-tag="all">
                ✨ Todos los Temas (239)
            </button>
        `;

        MORMON_THEMES.forEach(t => {
            // Count chapters matching tag
            let count = 0;
            MORMON_BOOKS.forEach(b => {
                b.chapters.forEach(c => {
                    if (c.tags.includes(t.id)) count++;
                });
            });

            html += `
                <button class="mormon-chip ${t.class}" data-tag="${t.id}" title="${escapeHtml(t.desc)}">
                    ${t.icon} ${escapeHtml(t.label)} (${count})
                </button>
            `;
        });

        container.innerHTML = html;
    }

    // -------------------------------------------------------------
    // RENDER BOOKS ACCORDION
    // -------------------------------------------------------------
    function renderBooksAccordion() {
        const container = document.getElementById('mormon-books-accordion');
        if (!container) return;

        let html = '';

        MORMON_BOOKS.forEach((book, bIdx) => {
            html += `
                <details class="mormon-book-card" id="book-${book.id}" data-book-id="${book.id}">
                    <summary class="mormon-book-summary">
                        <div class="book-summary-left">
                            <span class="book-chevron-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </span>
                            <div class="book-title-group">
                                <span class="book-name">${escapeHtml(book.title)}</span>
                                <span class="book-meta-pill">${escapeHtml(book.period)}</span>
                            </div>
                        </div>
                        <div class="book-summary-right">
                            <span class="book-desc-snippet">${escapeHtml(book.summary)}</span>
                            <span class="book-count-badge" id="badge-count-${book.id}">${book.chapters.length} caps</span>
                        </div>
                    </summary>

                    <div class="mormon-book-body">
                        <div class="mormon-chapters-list" id="chapters-list-${book.id}">
                            ${book.chapters.map(c => renderChapterRow(book, c)).join('')}
                        </div>
                    </div>
                </details>
            `;
        });

        container.innerHTML = html;
    }

    function renderChapterRow(book, c) {
        const fullUrl = `https://www.churchofjesuschrist.org/study/scriptures/bofm/${book.url_slug}/${c.ch}?lang=spa`;
        const tagsClasses = c.tags.join(' ');

        const tagsHtml = c.tags.map(tId => {
            const themeObj = MORMON_THEMES.find(t => t.id === tId);
            if (!themeObj) return '';
            return `<button type="button" class="mormon-tag-pill ${themeObj.class}" data-action-tag="${themeObj.id}" title="Filtrar por: ${escapeHtml(themeObj.label)}">${themeObj.icon} ${escapeHtml(themeObj.label)}</button>`;
        }).join('');

        const jsonSafePayload = encodeURIComponent(JSON.stringify({
            book: book.title,
            ch: c.ch,
            fact: c.fact,
            summary: c.summary,
            url: fullUrl
        }));

        return `
            <div class="mormon-chapter-row" id="chap-${book.id}-${c.ch}" data-book="${escapeHtml(book.title)}" data-chapter="${c.ch}" data-tags="${tagsClasses}" data-keywords="${escapeHtml(c.keywords || '')}">
                <div class="mormon-chap-left">
                    <a href="${fullUrl}" target="_blank" rel="noopener noreferrer" class="mormon-chap-badge" title="Abrir ${escapeHtml(book.title)} ${c.ch} en ChurchofJesusChrist.org">
                        ${escapeHtml(book.title)} ${c.ch}
                        <svg class="external-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>

                <div class="mormon-chap-body">
                    <div class="mormon-chap-text">
                        <strong class="fact-bold">${escapeHtml(c.fact)}</strong> ${escapeHtml(c.summary)}
                    </div>
                    ${tagsHtml ? `<div class="mormon-chap-tags">${tagsHtml}</div>` : ''}
                </div>

                <div class="mormon-chap-actions">
                    <button type="button" class="mormon-copy-btn" data-chap-info="${jsonSafePayload}" title="Copiar resumen y enlace">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    // -------------------------------------------------------------
    // EVENT BINDINGS
    // -------------------------------------------------------------
    function bindEvents() {
        const searchInput = document.getElementById('mormon-search-input');
        const clearBtn = document.getElementById('mormon-clear-search-btn');
        const chipsContainer = document.getElementById('mormon-theme-chips');
        const expandAllBtn = document.getElementById('mormon-expand-all-btn');
        const collapseAllBtn = document.getElementById('mormon-collapse-all-btn');
        const randomBtn = document.getElementById('mormon-random-btn');
        const accordionContainer = document.getElementById('mormon-books-accordion');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim().toLowerCase();
                if (clearBtn) clearBtn.style.display = searchQuery ? 'block' : 'none';
                applyFilters();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                searchQuery = '';
                clearBtn.style.display = 'none';
                applyFilters();
                if (searchInput) searchInput.focus();
            });
        }

        if (chipsContainer) {
            chipsContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.mormon-chip');
                if (!btn) return;
                const tag = btn.getAttribute('data-tag');
                setThemeFilter(tag);
            });
        }

        if (accordionContainer) {
            accordionContainer.addEventListener('click', (e) => {
                // If clicked a tag pill inside a chapter row
                const tagBtn = e.target.closest('.mormon-tag-pill');
                if (tagBtn) {
                    const tag = tagBtn.getAttribute('data-action-tag');
                    if (tag) {
                        setThemeFilter(tag);
                        return;
                    }
                }

                // If clicked copy button
                const copyBtn = e.target.closest('.mormon-copy-btn');
                if (copyBtn) {
                    const raw = copyBtn.getAttribute('data-chap-info');
                    if (raw) {
                        try {
                            const data = JSON.parse(decodeURIComponent(raw));
                            copyChapterToClipboard(data, copyBtn);
                        } catch (err) {
                            console.error('Error copying chapter:', err);
                        }
                    }
                    return;
                }
            });
        }

        if (expandAllBtn) {
            expandAllBtn.addEventListener('click', () => {
                document.querySelectorAll('.mormon-book-card').forEach(details => {
                    details.open = true;
                });
            });
        }

        if (collapseAllBtn) {
            collapseAllBtn.addEventListener('click', () => {
                document.querySelectorAll('.mormon-book-card').forEach(details => {
                    details.open = false;
                });
            });
        }

        if (randomBtn) {
            randomBtn.addEventListener('click', pickRandomChapter);
        }
    }

    // -------------------------------------------------------------
    // FILTER ENGINE
    // -------------------------------------------------------------
    function setThemeFilter(tag) {
        activeFilterTag = tag;

        // Update chips UI
        document.querySelectorAll('.mormon-chip').forEach(chip => {
            chip.classList.toggle('active', chip.getAttribute('data-tag') === tag);
        });

        const activeIndicator = document.getElementById('mormon-active-filter-indicator');
        if (activeIndicator) {
            if (tag === 'all') {
                activeIndicator.style.display = 'none';
            } else {
                const found = MORMON_THEMES.find(t => t.id === tag);
                activeIndicator.textContent = found ? `${found.icon} ${found.label}` : tag;
                activeIndicator.style.display = 'inline-flex';
            }
        }

        applyFilters();
    }

    function applyFilters() {
        const queryTerms = searchQuery.split(/\s+/).filter(Boolean);
        const hasFilter = (activeFilterTag !== 'all') || (queryTerms.length > 0);

        let totalVisibleChapters = 0;

        document.querySelectorAll('.mormon-book-card').forEach(details => {
            const bookId = details.getAttribute('data-book-id');
            const rows = details.querySelectorAll('.mormon-chapter-row');
            let bookVisibleCount = 0;

            rows.forEach(row => {
                const tagsStr = row.getAttribute('data-tags') || '';
                const rowTags = tagsStr.split(' ');
                const bookTitle = row.getAttribute('data-book').toLowerCase();
                const chapNum = row.getAttribute('data-chapter');
                const textContent = row.textContent.toLowerCase();
                const keywords = (row.getAttribute('data-keywords') || '').toLowerCase();

                // Check tag filter
                let tagMatch = (activeFilterTag === 'all') || rowTags.includes(activeFilterTag);

                // Check query filter
                let queryMatch = true;
                if (queryTerms.length > 0) {
                    const combinedSearchString = `${bookTitle} ${chapNum} ${textContent} ${keywords}`;
                    queryMatch = queryTerms.every(term => combinedSearchString.includes(term));
                }

                const isVisible = tagMatch && queryMatch;

                if (isVisible) {
                    row.style.display = 'flex';
                    if (hasFilter) {
                        row.classList.add('is-highlighted');
                    } else {
                        row.classList.remove('is-highlighted');
                    }
                    bookVisibleCount++;
                    totalVisibleChapters++;
                } else {
                    row.style.display = 'none';
                    row.classList.remove('is-highlighted');
                }
            });

            // Update badge count
            const countBadge = document.getElementById(`badge-count-${bookId}`);
            if (countBadge) {
                countBadge.textContent = `${bookVisibleCount} caps`;
            }

            // Accordion behavior:
            if (hasFilter) {
                if (bookVisibleCount > 0) {
                    details.open = true;
                    details.style.opacity = '1';
                    details.style.display = 'block';
                } else {
                    details.open = false;
                    details.style.opacity = '0.35';
                    details.style.display = 'block';
                }
            } else {
                details.style.opacity = '1';
                details.style.display = 'block';
            }
        });

        // Update overall count
        const matchCountEl = document.getElementById('mormon-match-count');
        if (matchCountEl) {
            matchCountEl.textContent = totalVisibleChapters;
        }
    }

    // -------------------------------------------------------------
    // RANDOM INSPIRATOR
    // -------------------------------------------------------------
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
            rowEl.style.display = 'flex';
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

    // -------------------------------------------------------------
    // COPY CHAPTER TO CLIPBOARD
    // -------------------------------------------------------------
    function copyChapterToClipboard(data, btn) {
        const textToCopy = `📖 *${data.book} ${data.ch}* — **${data.fact}** ${data.summary}\n🔗 ${data.url}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.classList.add('copied');
            const originalSvg = btn.innerHTML;
            btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--accent-success)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

            if (typeof showToast === 'function') {
                showToast(`Copiado: ${data.book} ${data.ch}`);
            }

            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalSvg;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar al portapapeles:', err);
        });
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

    // Expose for external calls if needed
    window.setMormonThemeFilter = setThemeFilter;
})();
