import { describe, expect, it } from 'vitest'
import html from '../../docs/calculadora-phantom.html?raw'
import { CORREGIDOS, DEPORTES, EJEMPLO, GRUPOS, INDICES } from '../data/phantom'
import { analizarMatriz, banda, calcularFilas, compatibilidad, indicesDe, pistaUnidades, TODAS_LAS_VARIABLES, zPhantom } from './phantom'

const aprox = (n: number, esperado: number, dec = 2) => expect(n).toBeCloseTo(esperado, dec)

function filasEjemplo() {
  const h = EJEMPLO.talla
  return { h, filas: calcularFilas(h, EJEMPLO) }
}

describe('datos idénticos al componente original (docs/calculadora-phantom.html)', () => {
  it('los valores P, s y d de las variables no cambiaron', () => {
    const re = /\["(\w+)","([^"]+)","(cm|mm|kg)",([\d.]+),([\d.]+),(\d)\]/g
    const originales = [...html.matchAll(re)].map((m) => [m[1], m[2], m[3], +m[4], +m[5], +m[6]])
    const actuales = GRUPOS.flatMap((g) => g.vars.map((v) => [...v]))
    expect(originales).toHaveLength(51)
    expect(actuales).toEqual(originales)
  })

  it('los perímetros corregidos no cambiaron', () => {
    const re = /\["(co\w+)","([^"]+)","(\w+)","(\w+)",([\d.]+),([\d.]+)\]/g
    const originales = [...html.matchAll(re)].map((m) => [m[1], m[2], m[3], m[4], +m[5], +m[6]])
    expect(CORREGIDOS.map((c) => [...c])).toEqual(originales)
  })

  it('los 25 perfiles deportivos y los 8 índices no cambiaron', () => {
    const re = /\["([^"]+)",\s*\[\s*([-\d.,\s]+)\],"([^"]+)"\]/g
    const originales = [...html.matchAll(re)].map((m) => [m[1], m[2].split(',').map(Number), m[3]])
    expect(originales).toHaveLength(25)
    expect(DEPORTES.map((d) => [d[0], [...d[1]], d[2]])).toEqual(originales)
    expect(INDICES).toHaveLength(8)
  })
})

describe('puntajes Z de referencia', () => {
  it('peso 82 kg con talla 175 cm → Z ≈ +1,26 (d = 3)', () => {
    aprox(zPhantom(82, 175, 64.58, 8.6, 3), 1.26)
  })

  it('húmero 7,2 cm → Z ≈ +1,49', () => {
    aprox(zPhantom(7.2, 175, 6.48, 0.35, 1), 1.49)
  })

  it('tríceps 9 mm → Z ≈ −1,49', () => {
    aprox(zPhantom(9, 175, 15.4, 4.47, 1), -1.49)
  })

  it('la talla se reporta sin escalar: (h − 170,18) / 6,29', () => {
    const { filas } = filasEjemplo()
    aprox(filas[0].z, (175 - 170.18) / 6.29, 6)
  })

  it('brazo relajado 36 cm + tríceps 9 mm → brazo corregido Z ≈ +5,35 (revisa la medida)', () => {
    const { filas } = filasEjemplo()
    const brazo = filas.find((f) => f.key === 'coBrazo')!
    aprox(brazo.z, 5.35, 1)
    expect(banda(brazo.z).txt).toBe('Revisa la medida')
  })

  it('las 4 bandas de interpretación', () => {
    expect(banda(0.9).cls).toBe('b-ok')
    expect(banda(-1.5).txt).toBe('Moderadamente bajo')
    expect(banda(2.5).txt).toBe('Poco común (alto)')
    expect(banda(-4).cls).toBe('b-bad')
  })

  it('sugiere un error de unidades cuando |Z| ≥ 4', () => {
    // Tríceps de 90 (¿décimas de mm?): dividido entre 10 da un Z normal.
    const filas = calcularFilas(175, { plTriceps: 90 })
    const f = filas.find((x) => x.key === 'plTriceps')!
    expect(Math.abs(f.z)).toBeGreaterThanOrEqual(4)
    expect(pistaUnidades(f, 175, (n) => n.toFixed(2))).toContain('Dividida entre 10')
  })
})

describe('matriz de orientación deportiva', () => {
  it('con el ejemplo recomienda CrossFit 90 %, lucha olímpica 89 % y judo 87 %', () => {
    const { filas } = filasEjemplo()
    const a = analizarMatriz(filas)
    expect(a.ranking).toHaveLength(25)
    expect(a.recomendados.slice(0, 3).map((r) => [r.nom, r.pct])).toEqual([
      ['CrossFit / entrenamiento funcional', 90],
      ['Lucha olímpica', 89],
      ['Judo', 87],
    ])
    expect(a.recomendados.length).toBeGreaterThanOrEqual(3)
  })

  it('con solo talla y peso faltan índices y no hay ranking', () => {
    const filas = calcularFilas(175, { peso: 82 })
    const a = analizarMatriz(filas)
    expect(a.disponibles.length).toBeLessThan(4)
    expect(a.ranking).toHaveLength(0)
    expect(a.faltan).toContain('Muscularidad')
  })

  it('la compatibilidad es 100 % cuando el perfil coincide con el objetivo', () => {
    const obj = DEPORTES[0][1]
    const ind = Object.fromEntries(INDICES.map((I, i) => [I.k, obj[i]])) as ReturnType<typeof indicesDe>
    expect(compatibilidad(ind, obj).pct).toBe(100)
  })

  it('hay 51 variables disponibles para el formulario', () => {
    expect(TODAS_LAS_VARIABLES).toHaveLength(51)
  })
})
