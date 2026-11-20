import type { ReactNode } from 'react'
import { metodosSalto, type MetodoSalto } from '../data/goldStandard.data'

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const PICTOS: Record<MetodoSalto['id'], ReactNode> = {
  vuelo: (
    <>
      <line x1="6" x2="74" y1="40" y2="40" {...stroke} strokeWidth={1} />
      <path d="M12 40 Q40 -8 68 40" {...stroke} />
      <line x1="40" x2="40" y1="40" y2="14" {...stroke} strokeDasharray="3 3" strokeWidth={1.5} />
    </>
  ),
  impulso: (
    <>
      <line x1="8" x2="8" y1="6" y2="40" {...stroke} strokeWidth={1} />
      <line x1="8" x2="74" y1="40" y2="40" {...stroke} strokeWidth={1} />
      <path d="M10 38 Q24 4 40 28 L66 38 Z" {...stroke} fill="currentColor" fillOpacity={0.2} />
    </>
  ),
  acelerometria: (
    <>
      <path d="M6 10 Q20 -2 34 10 T62 10" {...stroke} strokeWidth={1.5} />
      <path d="M6 26 Q20 14 34 26 T62 26" {...stroke} strokeWidth={1.5} />
      <path d="M6 42 Q20 30 34 42 T62 42" {...stroke} strokeWidth={1.5} />
      <path d="M68 14 V38 M64 34 L68 38 L72 34" {...stroke} strokeWidth={1.5} />
    </>
  ),
  desplazamiento: (
    <>
      <line x1="28" x2="28" y1="4" y2="44" {...stroke} strokeWidth={1.5} />
      <path d="M22 8 H28 M22 16 H28 M22 24 H28 M22 32 H28 M22 40 H28" {...stroke} strokeWidth={1} />
      <path d="M36 36 H58" {...stroke} />
      <path d="M36 10 H58" {...stroke} />
      <path d="M62 10 V36 M59 14 L62 10 L65 14 M59 32 L62 36 L65 32" {...stroke} strokeWidth={1.5} />
    </>
  ),
}

/** Cuatro formas de medir la altura de un salto, con un pictograma SVG y la fórmula como texto legible. */
export default function MetodosSalto() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2">
      {metodosSalto.map((m, i) => (
        <li key={m.id} className="flex flex-col border border-ink-900/10 bg-white/60 p-5 shadow-card">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-ink-950 font-display text-accent-500">
              {i + 1}
            </span>
            <h3 className="font-display uppercase tracking-tight text-ink-950">{m.titulo}</h3>
          </div>
          <svg viewBox="0 0 80 48" aria-hidden="true" className="mt-3 h-14 w-24 text-accent-600">
            {PICTOS[m.id]}
          </svg>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">{m.idea}</p>
          <p className="mt-3 overflow-x-auto bg-ink-950 px-3 py-2 font-mono text-sm text-paper">
            <span className="sr-only">Fórmula: </span>
            {m.formula}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-ink-700">
            <span className="uppercase tracking-wide text-ink-400">Ojo: </span>
            {m.limite}
          </p>
        </li>
      ))}
    </ol>
  )
}
