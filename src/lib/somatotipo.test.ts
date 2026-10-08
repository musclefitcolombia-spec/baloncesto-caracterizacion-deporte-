import { describe, expect, it } from 'vitest'
import {
  calcularEctomorfia,
  calcularEndomorfia,
  calcularMesomorfia,
  clasificarCategoria,
  coordenadasSomatocarta,
  distanciaEuclidiana,
  distanciaSAD,
} from './somatotipo'

// Valores de control tomados del prompt del proyecto (§5.3), derivados de las
// fórmulas oficiales de Heath-Carter aplicadas a los datos del artículo base.

describe('calcularEctomorfia — los tres tramos del HWR', () => {
  it('HWR >= 40.75 usa la primera fórmula (talla/peso medios del artículo)', () => {
    const { hwr, ectomorfia } = calcularEctomorfia(185.76, 75.36)
    expect(hwr).toBeCloseTo(43.98, 1)
    expect(ectomorfia).toBeCloseTo(3.6, 1) // tolerancia ±0.2 indicada en el prompt
  })

  it('38.25 < HWR < 40.75 usa la segunda fórmula', () => {
    // talla/peso elegidos para caer en el tramo medio (HWR ~ 38.8)
    const { hwr, ectomorfia } = calcularEctomorfia(160, 70)
    expect(hwr).toBeGreaterThan(38.25)
    expect(hwr).toBeLessThan(40.75)
    expect(ectomorfia).toBeCloseTo(0.463 * hwr - 17.63, 10)
  })

  it('HWR <= 38.25 siempre da ectomorfia = 0.1', () => {
    const { ectomorfia } = calcularEctomorfia(160, 110)
    expect(ectomorfia).toBe(0.1)
  })
})

describe('calcularEndomorfia', () => {
  it('calcula X y la endomorfia con la fórmula cúbica', () => {
    // Valores arbitrarios válidos; se verifica la fórmula misma, no un dato del artículo
    // (el artículo no publica pliegues individuales, solo el sumatorio de 8).
    const triceps = 10.71
    const subescapular = 9.36
    const supraespinal = 8.95
    const talla = 185.76
    const { x, endomorfia } = calcularEndomorfia(triceps, subescapular, supraespinal, talla)
    const sumaEsperada = (triceps + subescapular + supraespinal) * (170.18 / talla)
    expect(x).toBeCloseTo(sumaEsperada, 10)
    expect(endomorfia).toBeCloseTo(-0.7182 + 0.1451 * x - 0.00068 * x ** 2 + 0.0000014 * x ** 3, 10)
  })
})

describe('calcularMesomorfia', () => {
  it('corrige los perímetros por el pliegue correspondiente', () => {
    const r = calcularMesomorfia({
      humeroCm: 7.04,
      femurCm: 9.75,
      perimetroBrazoFlexionadoCm: 30.07,
      tricepsMm: 10.71,
      perimetroPiernaCm: 37.05,
      piernaMedialMm: 10.4,
      tallaCm: 185.76,
    })
    expect(r.perimetroBrazoCorregidoCm).toBeCloseTo(30.07 - 10.71 / 10, 10)
    expect(r.perimetroPiernaCorregidoCm).toBeCloseTo(37.05 - 10.4 / 10, 10)
    const esperado =
      0.858 * 7.04 + 0.601 * 9.75 + 0.188 * r.perimetroBrazoCorregidoCm + 0.161 * r.perimetroPiernaCorregidoCm - 0.131 * 185.76 + 4.5
    expect(r.mesomorfia).toBeCloseTo(esperado, 10)
  })
})

describe('coordenadasSomatocarta — valores de control del §5.3', () => {
  const casos: [string, { endomorfia: number; mesomorfia: number; ectomorfia: number }, number, number][] = [
    ['Total muestra cadete', { endomorfia: 2.65, mesomorfia: 2.58, ectomorfia: 3.71 }, 1.06, -1.2],
    ['Base (muestra cadete)', { endomorfia: 2.57, mesomorfia: 3.38, ectomorfia: 3.0 }, 0.43, 1.19],
    ['Escolta (muestra cadete)', { endomorfia: 2.38, mesomorfia: 2.49, ectomorfia: 3.39 }, 1.01, -0.79],
    ['Alero (muestra cadete)', { endomorfia: 2.52, mesomorfia: 2.4, ectomorfia: 4.1 }, 1.58, -1.82],
    ['Pívot (muestra cadete)', { endomorfia: 3.07, mesomorfia: 2.31, ectomorfia: 3.69 }, 0.62, -2.14],
    ['Élite base', { endomorfia: 2.5, mesomorfia: 5, ectomorfia: 3 }, 0.5, 4.5],
    ['Élite escolta', { endomorfia: 2.1, mesomorfia: 4.4, ectomorfia: 3.5 }, 1.4, 3.2],
    ['Élite alero', { endomorfia: 2.2, mesomorfia: 4.7, ectomorfia: 3.3 }, 1.1, 3.9],
    ['Élite pívot', { endomorfia: 2.8, mesomorfia: 3.9, ectomorfia: 3.7 }, 0.9, 1.3],
  ]

  it.each(casos)('%s → X, Y correctos', (_nombre, somatotipo, xEsperado, yEsperado) => {
    const { x, y } = coordenadasSomatocarta(somatotipo)
    expect(x).toBeCloseTo(xEsperado, 2)
    expect(y).toBeCloseTo(yEsperado, 2)
  })
})

describe('clasificarCategoria — las 13 categorías', () => {
  it('Total muestra cadete → Ectomorfo balanceado (coincide con el artículo)', () => {
    expect(clasificarCategoria({ endomorfia: 2.65, mesomorfia: 2.58, ectomorfia: 3.71 })).toBe('Ectomorfo balanceado')
  })

  it('componente único claramente dominante y balanceado → "X balanceado"', () => {
    expect(clasificarCategoria({ endomorfia: 1, mesomorfia: 1, ectomorfia: 5 })).toBe('Ectomorfo balanceado')
    expect(clasificarCategoria({ endomorfia: 5, mesomorfia: 1, ectomorfia: 1 })).toBe('Endomorfo balanceado')
    expect(clasificarCategoria({ endomorfia: 1, mesomorfia: 5, ectomorfia: 1 })).toBe('Mesomorfo balanceado')
  })

  it('componente dominante con modificador claro → "[adjetivo] [dominante]"', () => {
    // endo dominante, meso > ecto por >=0.5
    expect(clasificarCategoria({ endomorfia: 5, mesomorfia: 3, ectomorfia: 1 })).toBe('Mesomórfico endomorfo')
    // meso dominante, ecto > endo por >=0.5
    expect(clasificarCategoria({ endomorfia: 1, mesomorfia: 5, ectomorfia: 3 })).toBe('Ectomórfico mesomorfo')
  })

  it('dos componentes empatados y dominantes sobre el tercero → categoría bipolar', () => {
    // meso y ecto empatados (diff < 0.5), ambos superan a endo por >=0.5
    expect(clasificarCategoria({ endomorfia: 1, mesomorfia: 4, ectomorfia: 4.2 })).toBe('Mesomorfo-ectomorfo')
  })

  it('tres componentes muy cercanos entre sí → Central', () => {
    expect(clasificarCategoria({ endomorfia: 3, mesomorfia: 3.3, ectomorfia: 3.6 })).toBe('Central')
  })

  it('caso límite: Base de la muestra cadete cae en Central con la regla estricta de Carter', () => {
    // endo=2.57, meso=3.38, ecto=3.00: meso domina a endo (0.81) pero no a ecto (0.38 < 0.5),
    // y ecto tampoco domina a endo (0.43 < 0.5) -> no hay dominante único ni par empatado
    // dominante -> Central. El artículo lo describe de forma informal como "mesoectomorfo",
    // pero esa etiqueta no se obtiene aplicando estrictamente las reglas de Carter (2002) —
    // ver comentario en somatotipo.ts.
    expect(clasificarCategoria({ endomorfia: 2.57, mesomorfia: 3.38, ectomorfia: 3.0 })).toBe('Central')
  })
})

describe('distanciaSAD y distanciaEuclidiana', () => {
  it('SAD es 0 para dos somatotipos idénticos', () => {
    const s = { endomorfia: 2.65, mesomorfia: 2.58, ectomorfia: 3.71 }
    expect(distanciaSAD(s, s)).toBe(0)
  })

  it('SAD calcula la distancia euclidiana en 3D entre componentes', () => {
    const a = { endomorfia: 2.65, mesomorfia: 2.58, ectomorfia: 3.71 }
    const b = { endomorfia: 2.5, mesomorfia: 5, ectomorfia: 3 } // élite base
    const esperado = Math.sqrt((2.65 - 2.5) ** 2 + (2.58 - 5) ** 2 + (3.71 - 3) ** 2)
    expect(distanciaSAD(a, b)).toBeCloseTo(esperado, 10)
  })

  it('distanciaEuclidiana calcula la distancia 2D entre puntos X, Y', () => {
    expect(distanciaEuclidiana({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5)
  })
})
