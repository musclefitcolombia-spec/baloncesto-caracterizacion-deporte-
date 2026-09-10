export interface EtapaEvaluacion {
  etapa: string
  test: string
  instrumento: string
  evalua: string
}

export const evaluacionMotriz: EtapaEvaluacion[] = [
  {
    etapa: '0-2 años',
    test: 'Escalas de desarrollo infantil',
    instrumento: 'Escalas Bayley de Desarrollo Infantil (Bayley-III)',
    evalua: 'Desarrollo motor grueso y fino, reflejos primitivos',
  },
  {
    etapa: '3-5 años',
    test: 'Desarrollo motor grueso',
    instrumento: 'TGMD-3 (Test of Gross Motor Development) / MABC-2',
    evalua: 'Patrones motores básicos: correr, saltar, lanzar, atrapar',
  },
  {
    etapa: '6-9 años',
    test: 'Coordinación corporal general',
    instrumento: 'KTK (Körperkoordinationstest für Kinder)',
    evalua: 'Equilibrio dinámico, coordinación y control corporal',
  },
  {
    etapa: '10-12 años',
    test: 'Batería físico-motriz + habilidad específica',
    instrumento: 'EUROFIT + pruebas técnicas de baloncesto cronometradas (drible, pase, tiro)',
    evalua: 'Condición física general y primeras habilidades técnicas del deporte',
  },
  {
    etapa: '13-15 años',
    test: 'Batería de campo específica de baloncesto',
    instrumento: 'Salto vertical, sprint 20 m, T-test de agilidad, test de tiro',
    evalua: 'Capacidades condicionales y técnico-tácticas específicas',
  },
  {
    etapa: '16+ años (alto rendimiento)',
    test: 'Evaluación integral de talento',
    instrumento: 'Protocolos de laboratorio (VO2máx, antropometría ISAK, test de Wingate) + test de campo',
    evalua: 'Perfil fisiológico, antropométrico y de rendimiento para proyección competitiva',
  },
]

export interface MetodoDeteccion {
  numero: number
  nombre: string
  descripcion: string
  objetivo: string
}

export const metodosDeteccion: MetodoDeteccion[] = [
  {
    numero: 1,
    nombre: 'Modelo multidimensional de detección de talento',
    descripcion:
      'Combina variables antropométricas, físicas, técnicas, psicológicas y de maduración biológica en una sola evaluación integral, en lugar de basarse en un único criterio.',
    objetivo: 'Obtener un perfil completo del deportista y reducir el riesgo de descartar talento por evaluar una sola dimensión.',
  },
  {
    numero: 2,
    nombre: 'Comparación con perfiles de referencia de deportistas de élite',
    descripcion: 'Contrasta el perfil físico y técnico del joven con el de un deportista consolidado de su misma posición.',
    objetivo: 'Proyectar el potencial de desarrollo a partir de un modelo de éxito ya validado.',
  },
  {
    numero: 3,
    nombre: 'Seguimiento longitudinal (talent development)',
    descripcion: 'Evalúa la progresión del deportista en varias mediciones a lo largo del tiempo, en lugar de una sola medición puntual.',
    objetivo: 'Reducir el sesgo de la maduración temprana o tardía sobre la decisión de selección.',
  },
  {
    numero: 4,
    nombre: 'Test de habilidad específica de baloncesto',
    descripcion: 'Pruebas cronometradas de drible, pase y tiro bajo condiciones estandarizadas.',
    objetivo: 'Evaluar el dominio técnico específico del deporte, más allá de las capacidades físicas generales.',
  },
  {
    numero: 5,
    nombre: 'Evaluación de la maduración biológica',
    descripcion: 'Estimación de la edad biológica (p. ej., mediante el método de Mirwald et al., 2002) en relación con la edad cronológica.',
    objetivo: 'Interpretar correctamente el rendimiento físico de un joven considerando su momento madurativo real.',
  },
  {
    numero: 6,
    nombre: 'Observación en competencia (scouting / análisis notacional)',
    descripcion: 'Evaluación del comportamiento del deportista en un partido real: toma de decisiones, liderazgo, respuesta a la presión.',
    objetivo: 'Complementar los test de laboratorio y cancha con el desempeño en contexto competitivo real, donde finalmente se expresa el talento.',
  },
]
