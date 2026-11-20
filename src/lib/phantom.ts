import { CORREGIDOS, DEPORTES, GRUPOS, H_PH, INDICES, S_TALLA, type IndiceDef } from '../data/phantom'

// Lógica de la Calculadora Z Phantom (Ross y Wilson, 1974).
// Z = (v · (170,18 / h)^d − P) / s, con d = 3 para peso y masas y d = 1 para todo lo demás.
// La talla se reporta sin escalar: Z = (h − 170,18) / 6,29.

export interface VariablePlana {
  key: string
  label: string
  unit: string
  P: number
  s: number
  d: number
  grupo: string
}

export const TODAS_LAS_VARIABLES: VariablePlana[] = GRUPOS.flatMap((g) =>
  g.vars.map(([key, label, unit, P, s, d]) => ({ key, label, unit, P, s, d, grupo: g.titulo })),
)

export interface FilaZ {
  key: string
  label: string
  unit: string
  /** Medida ingresada (o calculada, en los perímetros corregidos). */
  v: number
  /** Medida escalada a la talla del Phantom. */
  esc: number
  P: number
  s: number
  d: number | '—'
  z: number
  grupo: string
}

export function zPhantom(v: number, h: number, P: number, s: number, d: number): number {
  return (v * Math.pow(H_PH / h, d) - P) / s
}

export interface Banda {
  cls: 'b-ok' | 'b-mid' | 'b-warn' | 'b-bad'
  txt: string
}

export function banda(z: number): Banda {
  const a = Math.abs(z)
  if (a < 1) return { cls: 'b-ok', txt: 'Proporción común' }
  if (a < 2) return { cls: 'b-mid', txt: z > 0 ? 'Moderadamente alto' : 'Moderadamente bajo' }
  if (a < 4) return { cls: 'b-warn', txt: z > 0 ? 'Poco común (alto)' : 'Poco común (bajo)' }
  return { cls: 'b-bad', txt: 'Revisa la medida' }
}

export const TALLA_MIN = 80
export const TALLA_MAX = 250

/** Calcula las filas Z (talla, variables ingresadas y perímetros corregidos). `valores` usa NaN para vacío. */
export function calcularFilas(h: number, valores: Record<string, number>): FilaZ[] {
  const filas: FilaZ[] = [
    { key: 'talla', label: 'Talla', unit: 'cm', v: h, esc: h, P: H_PH, s: S_TALLA, d: '—', z: (h - H_PH) / S_TALLA, grupo: 'Básicas' },
  ]
  for (const x of TODAS_LAS_VARIABLES) {
    const v = valores[x.key]
    if (!Number.isFinite(v) || v <= 0) continue
    const esc = v * Math.pow(H_PH / h, x.d)
    filas.push({ ...x, v, esc, z: (esc - x.P) / x.s })
  }
  for (const c of CORREGIDOS) {
    const pe = valores[c[2]]
    const pl = valores[c[3]]
    if (Number.isFinite(pe) && Number.isFinite(pl) && pe > 0 && pl >= 0) {
      const v = pe - Math.PI * (pl / 10)
      const esc = v * (H_PH / h)
      filas.push({
        key: c[0],
        label: c[1],
        unit: 'cm',
        v,
        esc,
        P: c[4],
        s: c[5],
        d: 1,
        z: (esc - c[4]) / c[5],
        grupo: 'Perímetros corregidos (Kerr, 1988)',
      })
    }
  }
  return filas
}

/** Sugerencia automática cuando |Z| ≥ 4: posible error de unidades u otra revisión. */
export function pistaUnidades(r: FilaZ, h: number, fmt: (n: number) => string): string {
  const d = typeof r.d === 'number' ? r.d : 1
  const a = zPhantom(r.v / 10, h, r.P, r.s, d)
  const b = zPhantom(r.v * 10, h, r.P, r.s, d)
  if (Math.abs(a) < 3)
    return `¿Quizá la anotaste en ${r.unit === 'mm' ? 'décimas de mm' : 'mm'}? Dividida entre 10 daría Z = ${fmt(a)}.`
  if (Math.abs(b) < 3)
    return `¿Quizá la anotaste en ${r.unit === 'mm' ? 'cm' : 'metros/dm'}? Multiplicada por 10 daría Z = ${fmt(b)}.`
  if (d === 3) return 'Revisa que el peso se haya elevado al cubo (d = 3) y que esté en kg.'
  return 'Revisa el punto anatómico, la técnica y que el dato esté bien anotado.'
}

// ---------------------------------------------------------------------------
// Matriz de orientación deportiva
// ---------------------------------------------------------------------------

const prom = (arr: (number | undefined)[]): number => {
  const a = arr.filter((x): x is number => typeof x === 'number' && Number.isFinite(x))
  return a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN
}

export type Indices = Record<IndiceDef['k'], number>

export function indicesDe(filas: FilaZ[]): Indices {
  const z: Record<string, number> = {}
  filas.forEach((r) => (z[r.key] = r.z))
  const corr = prom([z.coBrazo, z.coTorax, z.coMuslo, z.coPierna])
  return {
    T: z.talla,
    G: prom([z.plTriceps, z.plSubescapular, z.plBiceps, z.plPectoral, z.plCresta, z.plSupraespinal, z.plAbdominal, z.plMuslo, z.plPierna]),
    M: Number.isFinite(corr) ? corr : prom([z.peBrazoFlex, z.peAntebrazo, z.peMuslo, z.pePierna]),
    O: prom([z.diHumero, z.diFemur, z.diBiestiloideo, z.diBimaleolar]),
    P: z.peso ?? NaN,
    E: prom([z.envergadura, z.loExtSup]),
    H: prom([z.diBiacromial, z.diTransTorax]),
    C: z.tallaSentado ?? NaN,
  }
}

export interface DetalleIndice {
  I: IndiceDef
  v: number
  t: number
  dif: number
}

export interface Compat {
  pct: number
  dist?: number
  det: DetalleIndice[]
  usados: number
}

/** Compatibilidad: distancia euclídea ponderada (peso = 1 + |objetivo|/2); 100·e^(−dist²/(2·1,5²)). */
export function compatibilidad(ind: Indices, obj: readonly number[]): Compat {
  let num = 0
  let den = 0
  let usados = 0
  const det: DetalleIndice[] = []
  INDICES.forEach((I, i) => {
    const v = ind[I.k]
    if (!Number.isFinite(v)) return
    const t = obj[i]
    const w = 1 + Math.abs(t) / 2
    const dif = v - t
    num += w * dif * dif
    den += w
    usados++
    det.push({ I, v, t, dif })
  })
  if (!usados) return { pct: 0, det, usados }
  const dist = Math.sqrt(num / den)
  return { pct: Math.max(0, Math.round(100 * Math.exp(-(dist * dist) / (2 * 1.5 * 1.5)))), dist, det, usados }
}

export interface DeporteRanking extends Compat {
  nom: string
  obj: readonly number[]
  rasgo: string
}

export interface AnalisisMatriz {
  ind: Indices
  disponibles: IndiceDef[]
  faltan: string[]
  /** Vacío cuando hay menos de 4 índices. */
  ranking: DeporteRanking[]
  /** Mínimo 3 deportes (más los empatados con el 3.º, hasta 5). */
  recomendados: DeporteRanking[]
}

export function analizarMatriz(filas: FilaZ[]): AnalisisMatriz {
  const ind = indicesDe(filas)
  const disponibles = INDICES.filter((I) => Number.isFinite(ind[I.k]))
  const faltan = INDICES.filter((I) => !Number.isFinite(ind[I.k])).map((I) => I.nom)
  if (disponibles.length < 4) return { ind, disponibles, faltan, ranking: [], recomendados: [] }
  const ranking = DEPORTES.map(([nom, obj, rasgo]) => ({ nom, obj, rasgo, ...compatibilidad(ind, obj) })).sort(
    (a, b) => b.pct - a.pct,
  )
  const corte = ranking[2].pct
  const recomendados = ranking.filter((r, i) => i < 3 || (r.pct === corte && i < 5))
  return { ind, disponibles, faltan, ranking, recomendados }
}

/** Parsea un texto con coma o punto decimal; vacío → NaN. */
export function parseNumero(t: string): number {
  const s = t.replace(',', '.').trim()
  return s === '' ? NaN : parseFloat(s)
}
