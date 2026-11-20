import { useId } from 'react'
import { evidenciaU15 } from '../data/goldStandard.data'

const W = 240
const H = 190
const BASE = 150
const MAX_H = 100

function fmt(n: number) {
  return n.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/** Tres paneles (una escala por prueba, todas desde cero) con la comparación seleccionados vs. no seleccionados. */
export default function CmjBarChart() {
  const uid = useId()
  return (
    <figure className="m-0">
      <div className="grid gap-4 sm:grid-cols-3">
        {evidenciaU15.motoras.map((m) => {
          const max = Math.max(m.sel, m.nosel) * 1.1
          const hSel = (m.sel / max) * MAX_H
          const hNo = (m.nosel / max) * MAX_H
          const titleId = `${uid}-${m.id}-t`
          const descId = `${uid}-${m.id}-d`
          return (
            <div key={m.id} className="border border-ink-900/10 bg-white/60 p-3">
              <p className="font-display text-sm uppercase tracking-tight text-ink-950">{m.variable}</p>
              <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${titleId} ${descId}`} className="mt-1 w-full">
                <title id={titleId}>{m.variable}: seleccionados frente a no seleccionados</title>
                <desc id={descId}>
                  Seleccionados {fmt(m.sel)} {m.unidad}; no seleccionados {fmt(m.nosel)} {m.unidad}. {m.lectura}.
                </desc>
                <line x1="20" x2={W - 20} y1={BASE} y2={BASE} className="stroke-ink-900/40" strokeWidth="1" />
                <rect x="45" y={BASE - hSel} width="60" height={hSel} className="fill-accent-500" />
                <rect x="135" y={BASE - hNo} width="60" height={hNo} className="fill-ink-400" />
                <text x="75" y={BASE - hSel - 6} textAnchor="middle" className="fill-ink-950" fontSize="14" fontWeight="600">
                  {fmt(m.sel)}
                </text>
                <text x="165" y={BASE - hNo - 6} textAnchor="middle" className="fill-ink-950" fontSize="14" fontWeight="600">
                  {fmt(m.nosel)}
                </text>
                <text x="75" y={BASE + 18} textAnchor="middle" className="fill-ink-800" fontSize="12">
                  Seleccionados
                </text>
                <text x="165" y={BASE + 18} textAnchor="middle" className="fill-ink-800" fontSize="12">
                  No selecc.
                </text>
                <text x="120" y={H - 4} textAnchor="middle" className="fill-ink-600" fontSize="11">
                  Unidad: {m.unidad}
                  {m.menorEsMejor ? ' (menos es mejor)' : ''}
                </text>
              </svg>
              <p className="mt-1 text-xs leading-snug text-ink-700">{m.lectura}</p>
            </div>
          )
        })}
      </div>
      <figcaption className="mt-3 text-xs text-ink-400">
        Cada panel usa su propia escala desde cero. Cifras según el PDF de apoyo; las barras de sprint y T-test casi no
        se distinguen, y eso es justamente lo que muestran los datos.
      </figcaption>
    </figure>
  )
}
