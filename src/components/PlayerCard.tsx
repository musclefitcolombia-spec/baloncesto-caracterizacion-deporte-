interface PlayerCardProps {
  nombre: string
  equipo: string
  rama: 'Masculino' | 'Femenino'
  filas: { label: string; value: string }[]
}

function initials(nombre: string) {
  return nombre
    .split(' ')
    .filter((w) => w.length > 1 || /[A-ZÁÉÍÓÚÑ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function PlayerCard({ nombre, equipo, rama, filas }: PlayerCardProps) {
  return (
    <div className="flex h-full flex-col border border-ink-900/10 bg-white/60 shadow-card">
      <div className="flex items-center gap-4 border-b border-ink-900/10 p-5">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-950 font-display text-lg text-accent-500"
        >
          {initials(nombre)}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-widest2 text-accent-600">{rama}</p>
          <p className="truncate font-display text-lg uppercase leading-tight text-ink-950">{nombre}</p>
          <p className="truncate text-sm text-ink-700/70">{equipo}</p>
        </div>
      </div>
      <dl className="grid flex-1 grid-cols-2 gap-x-4 gap-y-3 p-5 text-sm">
        {filas.map((f) => (
          <div key={f.label} className="min-w-0">
            <dt className="text-xs uppercase tracking-wide text-ink-400">{f.label}</dt>
            <dd className="mt-0.5 text-ink-900">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
