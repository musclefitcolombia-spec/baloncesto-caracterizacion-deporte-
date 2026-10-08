// Motor de recomendaciones: reglas explícitas y deterministas, sin IA en tiempo de
// ejecución. Cada umbral vive aquí, comentado, para poder ajustarlo o auditarlo.
import {
  EDAD_MUESTRA_VALIDA,
  muestraCadetePorPosicion,
  muestraCadeteTotal,
  NOMBRES_POSICION,
  type MuestraCadete,
  type PosicionId,
} from '../data/somatotipo-referencias'
import type { Somatotipo } from './somatotipo'

export const CONFIG = {
  /** z-score: |z| <= este valor => "acorde" con la posición. */
  zAcorde: 1,
  /** z-score: |z| <= este valor (y > zAcorde) => "a trabajar"; por encima => "desajuste notable". */
  zATrabajar: 2,
  /**
   * Diferencia mínima (en distancia estandarizada acumulada) para recomendar una
   * posición distinta a la elegida. Pendiente de validar contra literatura específica:
   * no hay un valor publicado para este umbral, se fija de forma conservadora para
   * evitar recomendaciones agresivas con muestras tan pequeñas (n=2 a n=9).
   */
  umbralCambioPosicion: 1.5,
  /**
   * Umbral de distancia (SAD) por encima del cual, si se supera con TODAS las
   * posiciones, se habilita (solo se habilita, ver orientacionOtroDeporte) la
   * sección de orientación a otro deporte. Pendiente de validar.
   */
  umbralOtroDeporte: 4,
  /** Edad mínima para mostrar la orientación a otro deporte (morfología más estable). */
  edadMinimaOtroDeporte: 16,
  /** n mínimo de una submuestra por posición para confiar en su propia DE. */
  nMinimoConfiable: 5,
} as const

export type NivelAjuste = 'acorde' | 'a-trabajar' | 'desajuste'

export interface ComparacionVariable {
  variable: string
  valorAtleta: number
  valorReferencia: number
  unidad: string
  z: number | null
  nivel: NivelAjuste
  texto: string
}

function nivelPorZ(z: number): NivelAjuste {
  const az = Math.abs(z)
  if (az <= CONFIG.zAcorde) return 'acorde'
  if (az <= CONFIG.zATrabajar) return 'a-trabajar'
  return 'desajuste'
}

function textoNivel(variable: string, nivel: NivelAjuste, porEncima: boolean): string {
  const direccion = porEncima ? 'por encima' : 'por debajo'
  if (nivel === 'acorde') return `${variable} está dentro de lo esperado para la posición.`
  if (nivel === 'a-trabajar') return `${variable} está moderadamente ${direccion} de la referencia de la posición: es un aspecto a trabajar.`
  return `${variable} está claramente ${direccion} de la referencia de la posición: desajuste notable.`
}

interface DatosAtletaBase {
  edad: number
  tallaCm: number
  pesoKg: number
  envergaduraCm: number
  imc: number
  indiceEnvergaduraTalla: number
}

/**
 * Elige la referencia de comparación para una posición: la submuestra cadete de
 * esa posición si tiene n suficiente y la edad del atleta cae en el rango válido
 * de la muestra (~14-17 años); si no, cae a la muestra total (con aviso).
 */
export function elegirReferenciaCadete(
  posicionId: PosicionId,
  edad: number,
): { referencia: MuestraCadete; esTotal: boolean; edadFueraDeRango: boolean } {
  const edadFueraDeRango = edad < EDAD_MUESTRA_VALIDA[0] || edad > EDAD_MUESTRA_VALIDA[1]
  const porPosicion = muestraCadetePorPosicion[posicionId]
  if (!edadFueraDeRango && porPosicion && porPosicion.n >= CONFIG.nMinimoConfiable) {
    return { referencia: porPosicion, esTotal: false, edadFueraDeRango }
  }
  return { referencia: muestraCadeteTotal, esTotal: true, edadFueraDeRango }
}

/** §7.1 — Ajuste a la posición elegida. */
export function ajustePosicion(atleta: DatosAtletaBase, posicionId: PosicionId, somatotipo: Somatotipo | null): {
  comparaciones: ComparacionVariable[]
  fuenteUsada: 'posicion' | 'total'
  avisoEdad: boolean
  avisoN: boolean
} {
  const { referencia, esTotal, edadFueraDeRango } = elegirReferenciaCadete(posicionId, atleta.edad)
  const avisoN = !esTotal && referencia.n < CONFIG.nMinimoConfiable + 3 // n=5..7 sigue siendo poco: se avisa igual

  const comparaciones: ComparacionVariable[] = []

  const agregar = (variable: string, valorAtleta: number, ref: { media: number; de: number }, unidad: string) => {
    const z = ref.de > 0 ? (valorAtleta - ref.media) / ref.de : null
    const nivel = z === null ? 'acorde' : nivelPorZ(z)
    const texto = z === null ? `${variable}: sin desviación estándar fiable para comparar.` : textoNivel(variable, nivel, valorAtleta > ref.media)
    comparaciones.push({ variable, valorAtleta, valorReferencia: ref.media, unidad, z, nivel, texto })
  }

  agregar('Talla', atleta.tallaCm, referencia.talla, 'cm')
  agregar('Peso', atleta.pesoKg, referencia.peso, 'kg')
  agregar('Envergadura', atleta.envergaduraCm, referencia.envergadura, 'cm')
  agregar('IMC', atleta.imc, referencia.imc, 'kg/m²')

  if (somatotipo) {
    agregar('Endomorfia', somatotipo.endomorfia, referencia.endomorfia, '')
    agregar('Mesomorfia', somatotipo.mesomorfia, referencia.mesomorfia, '')
    agregar('Ectomorfia', somatotipo.ectomorfia, referencia.ectomorfia, '')
  }

  return { comparaciones, fuenteUsada: esTotal ? 'total' : 'posicion', avisoEdad: edadFueraDeRango, avisoN }
}

/** §7.2 — Posición más afín, por distancia estandarizada usando las variables antropométricas disponibles. */
export interface RankingPosicion {
  posicionId: PosicionId
  distancia: number
  disponible: boolean
}

export function posicionMasAfin(
  atleta: DatosAtletaBase,
  posicionElegida: PosicionId,
): { ranking: RankingPosicion[]; recomendada: PosicionId | null; texto: string } {
  const posiciones: PosicionId[] = ['base', 'escolta', 'alero', 'ala-pivot', 'pivot']

  const ranking: RankingPosicion[] = posiciones.map((id) => {
    // La media se toma de la submuestra de la posición (más representativa de "cómo
    // es" esa posición); la DE se toma siempre de la muestra total (n=20), más
    // estable que la DE de una submuestra tan pequeña como escolta (n=2).
    const ref = muestraCadetePorPosicion[id] ?? muestraCadeteTotal
    const z = (valor: number, media: number, de: number) => (de > 0 ? (valor - media) / de : 0)
    const dTalla = z(atleta.tallaCm, ref.talla.media, muestraCadeteTotal.talla.de)
    const dPeso = z(atleta.pesoKg, ref.peso.media, muestraCadeteTotal.peso.de)
    const dEnvergadura = z(atleta.envergaduraCm, ref.envergadura.media, muestraCadeteTotal.envergadura.de)
    const distancia = Math.sqrt(dTalla ** 2 + dPeso ** 2 + dEnvergadura ** 2)
    return { posicionId: id, distancia, disponible: muestraCadetePorPosicion[id] !== null }
  })

  ranking.sort((a, b) => a.distancia - b.distancia)

  const masCercana = ranking[0]
  const distanciaElegida = ranking.find((r) => r.posicionId === posicionElegida)?.distancia ?? 0

  let recomendada: PosicionId | null = null
  let texto = `Según talla, peso y envergadura, tu perfil es más cercano al de ${NOMBRES_POSICION[posicionElegida]}, la posición elegida.`

  if (masCercana.posicionId !== posicionElegida && distanciaElegida - masCercana.distancia >= CONFIG.umbralCambioPosicion) {
    recomendada = masCercana.posicionId
    texto = `Por talla, peso y envergadura, tu perfil se parece más al de un(a) ${NOMBRES_POSICION[masCercana.posicionId].toLowerCase()} que al de ${NOMBRES_POSICION[posicionElegida].toLowerCase()}. Esto no es una sugerencia de cambio obligatorio: solo un dato antropométrico más a considerar junto con la técnica, la táctica y la experiencia en la posición actual.`
  } else if (Math.abs(distanciaElegida - masCercana.distancia) < 0.3) {
    texto = `Tu perfil antropométrico no se diferencia claramente entre posiciones cercanas (las distancias son muy similares); con una muestra de referencia tan pequeña, esta comparación debe tomarse como orientativa.`
  }

  return { ranking, recomendada, texto }
}

/** §7.3 — Estimación orientativa de talla adulta por talla media parental (Tanner & Whitehouse). */
export interface EstimacionTallaAdulta {
  estimadoCm: number
  margenErrorCm: number
  texto: string
  source: string
}

export function estimarTallaAdulta(tallaPadreCm: number, tallaMadreCm: number, sexo: 'masculino' | 'femenino'): EstimacionTallaAdulta {
  // Método de la talla media parental (mid-parental height), Tanner y Whitehouse.
  // Niños: (talla padre + talla madre + 13) / 2 cm. Niñas: (talla padre + talla madre - 13) / 2 cm.
  // Margen de error habitualmente citado: ±8,5 cm (aprox. 2 DE).
  const ajuste = sexo === 'masculino' ? 13 : -13
  const estimadoCm = (tallaPadreCm + tallaMadreCm + ajuste) / 2
  return {
    estimadoCm,
    margenErrorCm: 8.5,
    texto: `Estimación orientativa de talla adulta por el método de la talla media parental (Tanner y Whitehouse): ${estimadoCm.toFixed(1)} cm ± 8,5 cm. No es una predicción médica individual.`,
    source: 'Tanner, J. M., y Whitehouse, R. H. — método de la talla media parental (mid-parental height)',
  }
}

/** §7.4 — Aspectos a mejorar, a partir de las desviaciones ya calculadas. */
export function aspectosAMejorar(comparaciones: ComparacionVariable[]): string[] {
  const aspectos: string[] = []
  const buscar = (variable: string) => comparaciones.find((c) => c.variable === variable)

  const meso = buscar('Mesomorfia')
  if (meso && meso.nivel !== 'acorde' && meso.valorAtleta < meso.valorReferencia) {
    aspectos.push(
      'La mesomorfia (desarrollo musculo-esquelético relativo) está por debajo de la referencia: puede valer la pena dar énfasis al trabajo de fuerza y desarrollo muscular, con supervisión de un preparador físico.',
    )
  }

  const endo = buscar('Endomorfia')
  if (endo && endo.nivel !== 'acorde' && endo.valorAtleta > endo.valorReferencia) {
    aspectos.push(
      'La endomorfia (adiposidad relativa) está por encima de la referencia: conviene atender la composición corporal con apoyo profesional (nutricionista, médico deportivo), sin recurrir a dietas no supervisadas.',
    )
  }

  const envergadura = buscar('Envergadura')
  const talla = buscar('Talla')
  if (envergadura && talla && envergadura.valorAtleta - talla.valorAtleta < 0) {
    aspectos.push(
      'La envergadura relativa a la talla es más corta que el promedio: el trabajo técnico y táctico (anticipación, posicionamiento, lectura del juego) puede ayudar a compensar la menor longitud de brazos en defensa y rebote.',
    )
  }

  if (aspectos.length === 0) {
    aspectos.push('No se detectan desajustes claros frente a la referencia de la posición con los datos ingresados.')
  }

  return aspectos
}

/** §7.5 — Orientación hacia otro deporte, solo bajo condiciones estrictas. */
export interface OrientacionOtroDeporte {
  aplica: boolean
  texto: string
}

export function orientacionOtroDeporte(ranking: RankingPosicion[], edad: number): OrientacionOtroDeporte {
  const todasLejos = ranking.every((r) => r.distancia > CONFIG.umbralOtroDeporte)
  const edadSuficiente = edad >= CONFIG.edadMinimaOtroDeporte

  if (!todasLejos || !edadSuficiente) {
    return { aplica: false, texto: '' }
  }

  // No se incluye una lista de deportes alternativos: no se encontró, al construir
  // esta calculadora, literatura específica y verificable que cruce estos somatotipos
  // de baloncesto con perfiles morfológicos de otros deportes concretos. Mostrar
  // nombres de deportes sin esa fuente sería inventar el dato, algo que el proyecto
  // pide explícitamente evitar. Queda como pendiente documentado.
  return {
    aplica: true,
    texto:
      'Tu perfil antropométrico se aleja de forma notable de las cinco posiciones del baloncesto. Esto no es una evaluación completa ni concluyente: el rendimiento deportivo depende de la técnica, la táctica, las capacidades físicas, la psicología y el contexto, no solo de la morfología (el propio artículo base de esta calculadora lo señala). No se incluye aquí una lista de deportes alternativos por no contar con una fuente específica y verificable que los recomiende para este perfil; para una orientación de ese tipo, lo más indicado es una valoración con un profesional de la detección de talento deportivo.',
  }
}
