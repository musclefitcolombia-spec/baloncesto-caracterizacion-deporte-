import { capacidades, EDAD_MAX, EDAD_MIN, GRUPOS, type GrupoCapacidad } from '../data/fases-sensibles'

const LABEL_WIDTH = 210
const TRACK_MIN_WIDTH = 640
const TICKS = [1, 5, 10, 15, 20, 25, 30, 35, 40]

function pct(age: number) {
  return ((age - EDAD_MIN) / (EDAD_MAX - EDAD_MIN)) * 100
}

const gruposOrden: GrupoCapacidad[] = ['condicional', 'coordinativa', 'psicologico', 'teorico', 'tactico']

export default function TrainabilityHeatmap() {
  return (
    <div className="space-y-6">
      {/* Leyenda */}
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {gruposOrden.map((g) => (
          <li key={g} className="flex items-center gap-2 text-xs uppercase tracking-wide text-ink-700">
            <span className="h-2.5 w-2.5 shrink-0" style={{ backgroundColor: GRUPOS[g].color }} />
            {GRUPOS[g].label}
          </li>
        ))}
      </ul>

      {/* Heatmap visual (decorativo; el detalle numérico accesible está en la tabla de abajo) */}
      <div className="border border-ink-900/10 bg-white">
        <div className="overflow-x-auto">
          <div style={{ minWidth: LABEL_WIDTH + TRACK_MIN_WIDTH }} aria-hidden="true">
            {/* Regla de edad */}
            <div className="flex border-b border-ink-900/10 pb-1.5">
              <div style={{ width: LABEL_WIDTH }} className="shrink-0" />
              <div className="relative h-4 flex-1">
                {TICKS.map((t) => (
                  <span
                    key={t}
                    style={{ left: `${pct(t)}%` }}
                    className="absolute -translate-x-1/2 text-[10px] text-ink-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {gruposOrden.map((grupo) => (
              <div key={grupo}>
                <div className="flex items-center bg-ink-950/[0.04] px-0 py-1">
                  <div style={{ width: LABEL_WIDTH }} className="shrink-0 px-2 py-0.5">
                    <p className="truncate text-[11px] font-display uppercase tracking-wide text-ink-950">
                      {GRUPOS[grupo].label}
                    </p>
                  </div>
                  <div className="flex-1" />
                </div>
                {capacidades
                  .filter((c) => c.grupo === grupo)
                  .map((cap) => {
                    const [min, max] = cap.rango
                    return (
                      <div key={cap.nombre} className="flex items-center border-b border-ink-900/[0.04]">
                        <div
                          style={{ width: LABEL_WIDTH }}
                          className="sticky left-0 shrink-0 truncate bg-white py-1.5 pr-3 pl-2 text-xs text-ink-700"
                        >
                          {cap.nombre}
                        </div>
                        <div className="relative h-6 flex-1">
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage:
                                'repeating-linear-gradient(to right, rgba(20,18,16,0.06) 0, rgba(20,18,16,0.06) 1px, transparent 1px, transparent calc(100%/8))',
                            }}
                          />
                          <div
                            title={`${cap.nombre}: ${min}–${max} años`}
                            className="absolute inset-y-1"
                            style={{
                              left: `${pct(min)}%`,
                              width: `${pct(max) - pct(min)}%`,
                              backgroundColor: GRUPOS[grupo].color,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
