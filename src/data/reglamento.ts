export const reglasBasicas = [
  { label: 'Equipos', value: '2 equipos de 5 jugadores en cancha' },
  { label: 'Objetivo', value: 'Anotar en la canasta rival e impedir que el rival anote en la propia' },
  { label: 'Duración', value: '4 periodos de 10 minutos' },
  { label: 'Cancha oficial', value: '28 x 15 m' },
  { label: 'Altura del aro', value: '3.05 m' },
]

export interface Violacion {
  nombre: string
  detalle: string
}

export const violaciones: Violacion[] = [
  { nombre: 'Pasos', detalle: 'Desplazamiento irregular sin driblar el balón.' },
  { nombre: 'Doble drible', detalle: 'Reanudar el drible tras haberlo detenido.' },
  { nombre: '3 segundos', detalle: 'Permanencia máxima dentro de la zona restringida propia.' },
  { nombre: '8 segundos', detalle: 'Tiempo máximo para cruzar el balón a la pista delantera.' },
  { nombre: '24 segundos', detalle: 'Tiempo máximo para efectuar un lanzamiento antes de que el balón toque el aro.' },
]

export const puntuacion = [
  { label: 'Tiro libre', value: '1 punto' },
  { label: 'Lanzamiento de campo', value: '2 puntos' },
  { label: 'Lanzamiento tras la línea de 3', value: '3 puntos, según zona de lanzamiento' },
]

export const material = [
  {
    titulo: 'Balón (categoría masculina absoluta, talla 7)',
    detalle: 'Circunferencia de 749 a 780 mm y peso de 567 a 650 g.',
    source: 'Consejo Superior de Deportes, 2015',
  },
  {
    titulo: 'Tablero',
    detalle: '1.80 x 1.05 m, fabricado en material transparente (vidrio templado o policarbonato).',
    source: 'FIBA, 2022',
  },
  {
    titulo: 'Uniforme',
    detalle:
      'Camiseta y pantaloneta numeradas, iguales para todo el equipo, además de calzado deportivo específico diseñado para ofrecer buen agarre y soporte de tobillo frente a los cambios de dirección constantes del juego.',
    source: 'FIBA, 2022',
  },
]

export const cuerpoArbitral = [
  {
    rol: 'Árbitros de cancha',
    detalle:
      'Un partido oficial es dirigido por uno, dos o tres árbitros de cancha; el sistema de tres árbitros es el estándar en competiciones FIBA de alto nivel.',
  },
  {
    rol: 'Anotador',
    detalle: 'Registra en el acta todas las incidencias del partido.',
  },
  {
    rol: 'Ayudante de anotador',
    detalle: 'Apoya el registro y control de las incidencias del partido.',
  },
  {
    rol: 'Cronometrador',
    detalle: 'Controla el tiempo de juego y los tiempos muertos.',
  },
  {
    rol: 'Operador del reloj de lanzamiento',
    detalle: 'Administra la regla de los veinticuatro segundos.',
  },
]

export const notaArbitral =
  'El árbitro principal conserva la autoridad final sobre cualquier situación no contemplada expresamente en el reglamento (FIBA, 2020; FIBA, 2022).'
