import type { ReactNode } from 'react'

interface ResponsiveTableProps {
  headers: string[]
  children: ReactNode
  caption?: string
}

/** Envuelve una tabla en un contenedor con scroll horizontal, sin romper el layout en móvil. */
export default function ResponsiveTable({ headers, children, caption }: ResponsiveTableProps) {
  return (
    <div className="border border-ink-900/10 bg-white/60 print:break-inside-avoid">
      {/* En impresión no hay scroll: se permite que la tabla se encoja al ancho de la
          página en vez de recortarse (overflow-x-auto + min-w fijo cortaría columnas). */}
      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm print:min-w-0 print:text-xs">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-ink-950 text-paper">
              {headers.map((h) => (
                <th key={h} scope="col" className="whitespace-nowrap px-4 py-3 font-display text-xs uppercase tracking-wide print:whitespace-normal print:px-2 print:py-1.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      <p className="border-t border-ink-900/10 px-4 py-2 text-xs text-ink-400 sm:hidden print:hidden">
        Desliza horizontalmente para ver toda la tabla →
      </p>
    </div>
  )
}
