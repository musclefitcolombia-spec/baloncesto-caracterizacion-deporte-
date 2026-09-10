export const maduracionBiologica = {
  intro:
    'En categorías de formación, la maduración biológica —y no solo la edad cronológica— determina en gran medida el rendimiento motor. Niños de la misma edad cronológica pueden diferir considerablemente en su grado de madurez, especialmente alrededor del pico de máxima velocidad de crecimiento (PHV), lo que puede sesgar los procesos de detección de talento a favor de quienes maduran antes.',
  introSource: '"Edad biológica", 2018',
  estudio:
    'Un estudio con jugadores de 14 años, clasificados según su estado de madurez (temprana, promedio o tardía) mediante el método de Mirwald et al. (2002), encontró diferencias significativas entre grupos tanto en pruebas físicas generales (salto vertical, sprint, agilidad) como en pruebas específicas de habilidad de baloncesto; los jugadores de maduración promedio obtuvieron los mejores resultados en la mayoría de las variables, mientras que los de maduración tardía obtuvieron los peores.',
  estudioSource: '"Estado de Madurez Biológica y Desempeño Motriz en Jugadores de Baloncesto de Catorce Años de Edad", 2016',
  conclusion:
    'Esto respalda la recomendación de no basar la selección de talentos únicamente en la edad cronológica, ya que puede favorecer injustamente a quienes atraviesan una ventaja madurativa temporal y no necesariamente poseen mayor potencial a largo plazo.',
}

export interface DatoLesion {
  label: string
  detalle: string
}

export const lesionesFrecuentes: DatoLesion[] = [
  { label: 'Esguince de tobillo', detalle: 'La lesión más frecuente en el baloncesto.' },
  { label: 'Rodilla', detalle: 'Segunda ubicación más frecuente de lesión.' },
  { label: 'Dedos de la mano', detalle: 'Frecuente por el contacto directo con el balón.' },
  { label: 'Lumbalgia', detalle: 'Dolor lumbar asociado a la carga del juego.' },
]

export const porcentajeMiembroInferior = {
  valor: 57,
  detalle: 'De las lesiones se ubican en el miembro inferior.',
  source: 'FBCV, 2023',
}

export const lesionLCA = {
  texto:
    'La lesión de ligamento cruzado anterior (LCA), aunque menos frecuente que el esguince de tobillo, es una de las más graves —requiere típicamente cirugía y de 8 a 12 meses de recuperación— y presenta una incidencia notablemente mayor en mujeres, asociada a un mayor valgo de rodilla y menor estabilidad en el aterrizaje.',
  source: 'Grupo Sobre Entrenamiento, 2024',
}

export const prevencion = {
  intro: 'Las estrategias de prevención con mayor respaldo incluyen:',
  items: [
    'Trabajo propioceptivo y de equilibrio',
    'Fortalecimiento de la musculatura peroneal e isquiotibial',
    'Ejercicios de aterrizaje controlado, evitando el valgo de rodilla',
    'Uso de tobilleras o vendaje funcional en deportistas con historial de esguinces',
  ],
  source: 'FBCV, 2023',
}
