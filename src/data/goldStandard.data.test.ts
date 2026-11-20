import { describe, expect, it } from 'vitest'
import { evidenciaU15, fuentesGS } from './goldStandard.data'
import { referencias } from './referencias'

describe('goldStandard.data', () => {
  it('tiene 21 fuentes con id único y enlace https', () => {
    expect(fuentesGS).toHaveLength(21)
    expect(new Set(fuentesGS.map((f) => f.id)).size).toBe(21)
    fuentesGS.forEach((f) => expect(f.url.startsWith('https://')).toBe(true))
  })

  it('toda referencia incompleta o sin verificar explica qué falta', () => {
    fuentesGS
      .filter((f) => !f.referencia_completa || !f.verificado)
      .forEach((f) => expect(f.pendiente.length, `fuente ${f.id}`).toBeGreaterThan(0))
  })

  it('las diferencias de la tabla U15 coinciden con el PDF de apoyo', () => {
    const [altura, peso, aphv] = evidenciaU15.antropometria
    expect(+(altura.sel - altura.nosel).toFixed(2)).toBe(6)
    expect(+(peso.sel - peso.nosel).toFixed(2)).toBe(5.64)
    expect(+(aphv.sel - aphv.nosel).toFixed(2)).toBe(0.32)
    const cmj = evidenciaU15.motoras.find((m) => m.id === 'cmj')!
    expect(+(cmj.sel - cmj.nosel).toFixed(2)).toBe(2.68)
  })

  it('las referencias del apartado quedan en el listado general del sitio', () => {
    fuentesGS.forEach((f) => expect(referencias.some((r) => r.url === f.url)).toBe(true))
  })
})
