// Ventanas de entrenabilidad / fases sensibles del baloncesto.
//
// El documento fuente ("Fases - Sensibles - Baloncesto") trae la estructura de la tabla
// (capacidades agrupadas x edad de 1 a 40 años) pero SIN los rangos de color rellenados
// explícitamente en el texto extraído. Para no inventar cifras de investigación que no
// existen en la fuente, cada capacidad se define aquí con un rango de edad editable,
// construido a partir de la orientación pedagógica general del prompt del proyecto:
// coordinativas ~6-12 años (preadolescencia), condicionales tipo fuerza/velocidad ~11-16
// años (adolescencia), y psicológico/teórico/táctico con ventanas más amplias que se
// extienden hacia la adultez temprana. Todos los rangos llevan un comentario
// `// TODO: ajustar rango según la fuente original` y deben tratarse como orientación
// pedagógica, no como un límite rígido individual.

export type GrupoCapacidad = 'condicional' | 'coordinativa' | 'psicologico' | 'teorico' | 'tactico'

export interface Capacidad {
  nombre: string
  grupo: GrupoCapacidad
  rango: [number, number]
}

export const EDAD_MIN = 1
export const EDAD_MAX = 40

export const GRUPOS: Record<GrupoCapacidad, { label: string; color: string }> = {
  condicional: { label: 'Capacidades condicionales', color: '#E8720C' },
  coordinativa: { label: 'Capacidades coordinativas', color: '#B87A32' },
  psicologico: { label: 'Psicológico', color: '#6B5D4E' },
  teorico: { label: 'Teórico', color: '#794C20' },
  tactico: { label: 'Táctico', color: '#976127' },
}

export const capacidades: Capacidad[] = [
  // Capacidades condicionales
  { nombre: 'Fuerza', grupo: 'condicional', rango: [12, 16] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Fuerza-Resistencia', grupo: 'condicional', rango: [12, 17] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Fuerza-Velocidad', grupo: 'condicional', rango: [13, 17] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Fuerza Máxima', grupo: 'condicional', rango: [15, 18] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Hipertrofia', grupo: 'condicional', rango: [15, 20] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Resistencia', grupo: 'condicional', rango: [10, 16] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Resistencia Aeróbica', grupo: 'condicional', rango: [9, 13] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Resistencia Anaeróbica', grupo: 'condicional', rango: [13, 17] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Resistencia Anaeróbica Láctica', grupo: 'condicional', rango: [14, 17] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Resistencia Anaeróbica Aláctica', grupo: 'condicional', rango: [12, 16] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Velocidad', grupo: 'condicional', rango: [7, 13] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Velocidad de Reacción', grupo: 'condicional', rango: [7, 11] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Velocidad de Desplazamiento', grupo: 'condicional', rango: [9, 13] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Velocidad Gestual', grupo: 'condicional', rango: [7, 12] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Flexibilidad', grupo: 'condicional', rango: [6, 10] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Movilidad General', grupo: 'condicional', rango: [6, 11] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Elasticidad', grupo: 'condicional', rango: [6, 10] }, // TODO: ajustar rango según la fuente original

  // Capacidades coordinativas
  { nombre: 'Saltos', grupo: 'coordinativa', rango: [7, 11] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Giros', grupo: 'coordinativa', rango: [7, 11] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Manipulaciones (balón)', grupo: 'coordinativa', rango: [6, 12] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Adaptación', grupo: 'coordinativa', rango: [7, 12] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Diferenciación', grupo: 'coordinativa', rango: [8, 12] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Orientación', grupo: 'coordinativa', rango: [7, 11] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Ritmo', grupo: 'coordinativa', rango: [6, 10] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Acople', grupo: 'coordinativa', rango: [8, 12] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Reacción', grupo: 'coordinativa', rango: [7, 11] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Equilibrio', grupo: 'coordinativa', rango: [6, 10] }, // TODO: ajustar rango según la fuente original

  // Psicológico
  { nombre: 'Personalidad', grupo: 'psicologico', rango: [10, 18] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Autoestima', grupo: 'psicologico', rango: [10, 18] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Autonomía', grupo: 'psicologico', rango: [12, 20] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Familia-Deporte-Entrenador', grupo: 'psicologico', rango: [6, 16] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Compañerismo Deportivo', grupo: 'psicologico', rango: [8, 16] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Preparación Mental', grupo: 'psicologico', rango: [13, 22] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Disposición a la Fatiga', grupo: 'psicologico', rango: [13, 20] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Inteligencia de la Atención y Sobrecarga', grupo: 'psicologico', rango: [12, 20] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Proyecto de Vida', grupo: 'psicologico', rango: [15, 22] }, // TODO: ajustar rango según la fuente original

  // Teórico
  { nombre: 'Materiales', grupo: 'teorico', rango: [6, 14] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Cancha de Baloncesto', grupo: 'teorico', rango: [6, 12] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Medidas de la Cancha', grupo: 'teorico', rango: [8, 14] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Reglas de Competición', grupo: 'teorico', rango: [8, 16] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Reglas de Posicionamiento', grupo: 'teorico', rango: [10, 18] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Sistemas de Juego', grupo: 'teorico', rango: [13, 20] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Matemática de las Pruebas (estadística)', grupo: 'teorico', rango: [16, 22] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Provecho de Pruebas', grupo: 'teorico', rango: [14, 20] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Recorridos Tácticos', grupo: 'teorico', rango: [12, 18] }, // TODO: ajustar rango según la fuente original

  // Táctico
  { nombre: 'Grupal', grupo: 'tactico', rango: [10, 18] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Individual', grupo: 'tactico', rango: [9, 16] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Bloqueos y Cortes', grupo: 'tactico', rango: [12, 18] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Lectura del Contrincante', grupo: 'tactico', rango: [13, 20] }, // TODO: ajustar rango según la fuente original
  { nombre: 'Lectura del Juego', grupo: 'tactico', rango: [12, 20] }, // TODO: ajustar rango según la fuente original
]
