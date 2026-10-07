// Cálculo del somatotipo Heath-Carter.
//
// Fórmulas: Carter, J. E. L. (2002). The Heath-Carter anthropometric somatotype:
// Instruction manual. San Diego State University. Las mismas ecuaciones están
// reproducidas, con idéntica notación y coeficientes, en Carter, J. E. L. (1996).
// Somatotyping. En Norton, K., y Olds, T. (eds.), Anthropometrica (pp. 147-170).
// UNSW Press — y en el artículo base del proyecto (Abella del Campo et al., 2016).
// Verificadas además contra Canda, A. (2024). Body typology according to the
// Heath-Carter somatotype vs. the Conrad system in top-level female athletes.
// Arch Med Deporte, 41(5), 267-273 (Tabla 1 de ese artículo reproduce las mismas
// ecuaciones y coeficientes).

export interface EctomorfiaResultado {
  hwr: number
  ectomorfia: number
}

/** Índice ponderal (HWR / Ponderal Index) y ectomorfia. Solo requiere talla y peso. */
export function calcularEctomorfia(tallaCm: number, pesoKg: number): EctomorfiaResultado {
  const hwr = tallaCm / Math.cbrt(pesoKg)
  let ectomorfia: number
  if (hwr >= 40.75) {
    ectomorfia = 0.732 * hwr - 28.58
  } else if (hwr > 38.25) {
    ectomorfia = 0.463 * hwr - 17.63
  } else {
    ectomorfia = 0.1
  }
  return { hwr, ectomorfia }
}

export interface EndomorfiaResultado {
  x: number
  endomorfia: number
}

/** Endomorfia a partir de los pliegues de tríceps, subescapular y supraespinal (mm) y la talla (cm). */
export function calcularEndomorfia(tricepsMm: number, subescapularMm: number, supraespinalMm: number, tallaCm: number): EndomorfiaResultado {
  const sumaPliegues = tricepsMm + subescapularMm + supraespinalMm
  const x = sumaPliegues * (170.18 / tallaCm)
  const endomorfia = -0.7182 + 0.1451 * x - 0.00068 * x ** 2 + 0.0000014 * x ** 3
  return { x, endomorfia }
}

export interface MesomorfiaEntradas {
  humeroCm: number
  femurCm: number
  perimetroBrazoFlexionadoCm: number
  tricepsMm: number
  perimetroPiernaCm: number
  piernaMedialMm: number
  tallaCm: number
}

export interface MesomorfiaResultado {
  perimetroBrazoCorregidoCm: number
  perimetroPiernaCorregidoCm: number
  mesomorfia: number
}

/** Mesomorfia a partir de diámetros óseos y perímetros corregidos por pliegue. */
export function calcularMesomorfia(entradas: MesomorfiaEntradas): MesomorfiaResultado {
  const { humeroCm, femurCm, perimetroBrazoFlexionadoCm, tricepsMm, perimetroPiernaCm, piernaMedialMm, tallaCm } = entradas
  const perimetroBrazoCorregidoCm = perimetroBrazoFlexionadoCm - tricepsMm / 10
  const perimetroPiernaCorregidoCm = perimetroPiernaCm - piernaMedialMm / 10
  const mesomorfia =
    0.858 * humeroCm +
    0.601 * femurCm +
    0.188 * perimetroBrazoCorregidoCm +
    0.161 * perimetroPiernaCorregidoCm -
    0.131 * tallaCm +
    4.5
  return { perimetroBrazoCorregidoCm, perimetroPiernaCorregidoCm, mesomorfia }
}

export interface Somatotipo {
  endomorfia: number
  mesomorfia: number
  ectomorfia: number
}

export interface CoordenadasSomatocarta {
  x: number
  y: number
}

/** Coordenadas (X, Y) de la somatocarta a partir de los tres componentes. */
export function coordenadasSomatocarta({ endomorfia, mesomorfia, ectomorfia }: Somatotipo): CoordenadasSomatocarta {
  return {
    x: ectomorfia - endomorfia,
    y: 2 * mesomorfia - (endomorfia + ectomorfia),
  }
}

/** Distancia de actitud somatotípica (SAD) entre dos somatotipos. Carter & Heath (1990). */
export function distanciaSAD(a: Somatotipo, b: Somatotipo): number {
  return Math.sqrt((a.endomorfia - b.endomorfia) ** 2 + (a.mesomorfia - b.mesomorfia) ** 2 + (a.ectomorfia - b.ectomorfia) ** 2)
}

/** Distancia euclidiana entre dos puntos (X, Y) de la somatocarta. */
export function distanciaEuclidiana(a: CoordenadasSomatocarta, b: CoordenadasSomatocarta): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

// --- Clasificación en las 13 categorías de Heath-Carter ---
// Regla de "central": ningún componente difiere en más de 1 unidad de los otros dos.
// Regla de "dominante": un componente es dominante si supera a cada uno de los otros
// dos por al menos 0,5 unidades. Regla de "equivalente"/"balanceado": dos componentes
// se consideran iguales si difieren entre sí en menos de 0,5 unidades.
// Fuente: Carter, J. E. L. (2002); terminología en español verificada contra fuentes
// secundarias especializadas en cineantropometría (ver README del proyecto).

export const UMBRAL_DOMINANCIA = 0.5
export const UMBRAL_CENTRAL = 1.0

type Componente = 'endomorfia' | 'mesomorfia' | 'ectomorfia'

const NOMBRE: Record<Componente, string> = {
  endomorfia: 'endomorfo',
  mesomorfia: 'mesomorfo',
  ectomorfia: 'ectomorfo',
}

const ADJETIVO: Record<Componente, string> = {
  endomorfia: 'Endomórfico',
  mesomorfia: 'Mesomórfico',
  ectomorfia: 'Ectomórfico',
}

function capitalizar(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Nombre fijo de las 3 categorías "empatadas" (dos componentes co-dominantes),
// siguiendo la nomenclatura estándar en español de la literatura consultada.
// Claves en orden alfabético (así es como se construyen al usar [a, b].sort().join('|')).
const NOMBRE_EMPATE: Record<string, string> = {
  'endomorfia|mesomorfia': 'Mesomorfo-endomorfo',
  'ectomorfia|mesomorfia': 'Mesomorfo-ectomorfo',
  'ectomorfia|endomorfia': 'Endomorfo-ectomorfo',
}

export function clasificarCategoria(s: Somatotipo): string {
  const valores: Record<Componente, number> = s
  const claves: Componente[] = ['endomorfia', 'mesomorfia', 'ectomorfia']

  const ordenado = claves.slice().sort((a, b) => valores[b] - valores[a])
  const [top, segundo, tercero] = ordenado
  const vTop = valores[top]
  const vSegundo = valores[segundo]
  const vTercero = valores[tercero]

  // 1) ¿Hay un componente claramente dominante? (supera a los otros dos por ≥0,5;
  //    basta comparar con el segundo más alto, porque el tercero está aún más lejos).
  if (vTop - vSegundo >= UMBRAL_DOMINANCIA) {
    if (vSegundo - vTercero < UMBRAL_DOMINANCIA) {
      return `${capitalizar(NOMBRE[top])} balanceado`
    }
    return `${ADJETIVO[segundo]} ${NOMBRE[top]}`
  }

  // 2) No hay dominante único: ¿los dos componentes más altos están "empatados"
  //    (diferencia < 0,5) y ambos superan claramente al tercero (≥0,5 cada uno)?
  //    Esta es la categoría "bipolar" (p. ej. mesomorfo-ectomorfo).
  if (vTop - vTercero >= UMBRAL_DOMINANCIA && vSegundo - vTercero >= UMBRAL_DOMINANCIA) {
    const par = [top, segundo].sort().join('|')
    return NOMBRE_EMPATE[par] ?? `${capitalizar(NOMBRE[top])}-${NOMBRE[segundo]}`
  }

  // 3) Ninguna de las dos condiciones anteriores se cumple: los tres componentes
  //    están lo bastante cerca entre sí (en la práctica, el máximo - mínimo nunca
  //    supera 1 unidad en esta rama) para considerarse "Central".
  return 'Central'
}

// Nota de verificación: los umbrales (0,5 para "dominante"/"empate", 1,0 para
// "central") y la prioridad de evaluación (dominante > empate > central) se
// confirmaron de forma independiente contra tres fuentes: Carter, J. E. L., y
// Heath, B. H. (1990). Somatotyping: Development and applications. Cambridge
// University Press (citada textualmente en un artículo de PMC que describe estas
// mismas reglas); Canda, A. (2024). Body typology according to the Heath-Carter
// somatotype vs. the Conrad system in top-level female athletes. Arch Med
// Deporte, 41(5), 267-273 (reproduce las mismas fórmulas de endo/meso/ecto que
// el artículo base del proyecto); y una síntesis de las 13 categorías con su
// terminología en español (saludmed.com, LAB 4: Kinantropometría — Somatotipo
// Antropométrico de Heath-Carter, E. Lopategui Corsino). Los nombres de
// categoría usados aquí siguen la forma formal de dos palabras ("Mesomórfico
// endomorfo", "Ectomorfo balanceado", "Mesomorfo-ectomorfo"...), no la forma
// compacta de una sola palabra que a veces usa el artículo base del proyecto de
// forma informal para sus propias submuestras pequeñas (p. ej. "mesoectomorfo"),
// porque esa forma compacta no resultó consistente entre las distintas fuentes
// consultadas al verificarla.
