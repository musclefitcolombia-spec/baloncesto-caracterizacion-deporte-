export const demandasTecnicoTacticas = {
  repertorio:
    'El repertorio técnico fundamental del baloncesto incluye el drible, el pase, el lanzamiento, el rebote y las acciones defensivas individuales y colectivas.',
  exigencia:
    'Cada una de estas acciones exige una toma de decisión rápida bajo oposición directa y presión temporal —marcada por el reloj de veinticuatro segundos—, lo que convierte al baloncesto en un deporte de alta exigencia perceptivo-cognitiva además de física.',
}

export const dimensionFisica = {
  intro:
    'Un estudio con jugadores juveniles halló diferencias significativas por posición en potencia de salto y potencia anaeróbica (p = .01).',
  datos: [
    { posicion: 'Aleros', salto: '46.10 cm', potencia: '9.10 W/kg' },
    { posicion: 'Escoltas', salto: '40.20 cm', potencia: '8.30 W/kg' },
    { posicion: 'Pívots', salto: '—', potencia: '7.95 W/kg' },
  ],
  nota:
    'Otro estudio, centrado en potencia, velocidad de sprint y agilidad, no halló diferencias estadísticamente significativas entre posiciones en estas dos últimas variables, aunque sí una relación fuerte entre la potencia del salto y el rendimiento en sprints repetidos, lo que sugiere entrenarlas de forma integrada y no aislada por posición.',
  source1: '"Perfil de rendimiento físico en baloncesto juvenil", 2025',
  source2: '"Potencia, velocidad y agilidad con referencia a la posición en el baloncesto", 2024',
}

export const dimensionFisiologica = {
  intro:
    'El baloncesto es un deporte acíclico e intermitente de alta intensidad, que combina esfuerzos anaeróbicos cortos —sprints, saltos, cambios de dirección— con pausas de intensidad moderada sostenidas principalmente por el metabolismo aeróbico.',
  vo2max: [
    { posicion: 'Escoltas', valor: '54.23 ml/kg/min' },
    { posicion: 'Pívots', valor: '49.68 ml/kg/min' },
    { posicion: 'Ala-pívots', valor: '48.15 ml/kg/min' },
  ],
  vo2maxNota: 'Diferencias significativas entre posiciones (p = .02), en jugadores juveniles.',
  source1: '"Demandas fisiológicas e indicadores de rendimiento en el baloncesto", 2023',
  source2: '"Perfil de rendimiento físico en baloncesto juvenil", 2025',
}

export const dimensionAntropometrica = {
  text1:
    'El perfil antropométrico también varía por posición: los bases tienden a presentar la menor estatura y peso corporal, valores que aumentan progresivamente hasta los pívots, quienes son los jugadores más altos y pesados del equipo.',
  text2:
    'En jugadores sub-17, los pívots mostraron una estatura significativamente mayor que los armadores (bases), mientras que los aleros destacaron en resistencia abdominal frente a los pívots; no se hallaron diferencias significativas entre posiciones en agilidad, fuerza de miembro superior o salto vertical en esa misma muestra.',
  source: 'Castro & Lima, 2019',
}

export const rutasMetabolicas = {
  clasificacion:
    'El baloncesto se clasifica fisiológicamente como un deporte "aeróbico-anaeróbico alternado", en el que las tres vías de producción de energía se acoplan con frecuencia a lo largo del partido.',
  clasificacionSource: 'Dalmonte et al., 1987, como se citó en "La potencia anaeróbica en el baloncesto", 2003',
  sistemas: [
    {
      nombre: 'ATP-PCr (fosfágenos)',
      detalle: 'Domina las acciones explosivas de muy corta duración: arrancadas, saltos, bloqueos.',
    },
    {
      nombre: 'Glucólisis anaeróbica',
      detalle: 'Predomina en esfuerzos de algunos segundos a dos minutos.',
    },
    {
      nombre: 'Sistema oxidativo',
      detalle:
        'Aporta la energía de base durante los cuarenta minutos de partido y, sobre todo, resintetiza la fosfocreatina y elimina el lactato acumulado durante las pausas (tiempos muertos, sustituciones, descansos entre cuartos).',
    },
  ],
  sistemasSource: 'GSSI, s.f.',
  estudioEsfuerzos:
    'Un estudio reciente que sometió a jugadores de baloncesto a esfuerzos máximos de 7, 15 y 30 segundos en cicloergómetro encontró que el sistema ATP-CP predomina claramente en los esfuerzos de 7 segundos, mientras que la contribución relativa de la glucólisis y del metabolismo aeróbico aumenta con la duración del esfuerzo.',
  estudioEsfuerzosSource: '"Análisis de la contribución energética en esfuerzos explosivos en jugadores de baloncesto", 2026',
  foxEstimacion: {
    anaerobico: 90,
    aerobico: 10,
    nota:
      'Fox (1984) estimó de forma clásica que, a lo largo de un partido completo, la contribución anaeróbica ronda el 90% frente a un 10% aeróbico, aunque el sistema aeróbico resulta indispensable para sostener el ritmo de juego durante los cuarenta minutos.',
    source: '"La potencia anaeróbica en el baloncesto", 2003',
  },
  lactato: {
    valor: '3.92 mmol/L',
    detalle:
      'En jugadores internacionales junior, se han registrado concentraciones de lactato al final del partido cercanas a este valor, con diferencias significativas entre periodos de juego y según la posición —los bases muestran valores distintos al resto—, sin que se haya encontrado una relación directa entre el tiempo jugado y la concentración de lactato. Esto sugiere que la intensidad relativa de cada acción, más que el volumen total de minutos, es lo que determina la demanda de la vía glucolítica en este deporte.',
    source: '"Estudio del metabolismo glucolítico en jugadores de baloncesto", 2009',
  },
}

export const capacidadesRequeridas = {
  condicionales: [
    'Fuerza explosiva y potencia (saltos, arrancadas)',
    'Velocidad y agilidad (cambios de dirección)',
    'Resistencia a esfuerzos intermitentes',
  ],
  coordinativas: [
    'Acoplamiento',
    'Diferenciación',
    'Orientación espacial',
    'Reacción',
    'Capacidad de adaptación',
    'Ritmo',
    'Equilibrio',
  ],
  nota:
    'Todas exigidas de forma simultánea en cada posesión de balón, particularmente durante la ejecución del drible.',
}
