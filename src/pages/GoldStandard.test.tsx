import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import GoldStandard from './GoldStandard'

describe('GoldStandard (render de humo)', () => {
  // renderToString separa los textos dinámicos con comentarios <!-- -->; se quitan para buscar frases.
  const html = renderToString(
    <MemoryRouter>
      <GoldStandard />
    </MemoryRouter>,
  ).replace(/<!-- -->/g, '')

  it('renderiza las 12 subsecciones', () => {
    for (let i = 1; i <= 12; i++) expect(html).toContain(`id="gs-${i}"`)
  })

  it('incluye las cifras del PDF y las marcas de verificación', () => {
    expect(html).toContain('37,66')
    expect(html).toContain('34,98')
    expect(html).toContain('Referencia en verificación')
    expect(html).toContain('Nivel: Limitado')
  })

  it('no incrusta imágenes del PDF', () => {
    expect(html).not.toContain('<img')
  })
})
