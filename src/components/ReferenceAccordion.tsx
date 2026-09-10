import { useState } from 'react'
import type { Referencia } from '../data/referencias'
import { IconChevronDown } from './icons'

interface ReferenceAccordionProps {
  letra: string
  items: Referencia[]
  defaultOpen?: boolean
}

export default function ReferenceAccordion({ letra, items, defaultOpen = false }: ReferenceAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = `refs-panel-${letra}`

  return (
    <div className="border border-ink-900/10 bg-white/60">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-ink-950 font-display text-accent-500">
              {letra}
            </span>
            <span className="text-sm text-ink-700/70">
              {items.length} referencia{items.length === 1 ? '' : 's'}
            </span>
          </span>
          <IconChevronDown className={`h-5 w-5 shrink-0 text-ink-700 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      {open && (
        <ol id={panelId} className="space-y-4 border-t border-ink-900/10 px-5 py-5">
          {items.map((ref) => (
            <li key={ref.cita} className="text-sm leading-relaxed text-ink-800">
              {ref.url ? (
                <>
                  {ref.cita}{' '}
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent-600 underline decoration-accent-500/40 underline-offset-2 hover:text-accent-500"
                  >
                    {ref.url}
                  </a>
                </>
              ) : (
                ref.cita
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
