import { banda, type FilaZ } from '../lib/phantom'

const LIM = 5
const COLOR_NEG = '#7f9bb3' // gris azulado: menor que el Phantom
const COLOR_REVISAR = '#B83A1E' // rojo: |Z| ≥ 4, revisa la medida

const fmt = (n: number, d = 2) => n.toLocaleString('es-CO', { minimumFractionDigits: d, maximumFractionDigits: d })

// Franjas de interpretación (|Z| < 1, 1–2, 2–4) centradas en Z = 0; la escala va de −5 a +5.
const franjas = `linear-gradient(to right,
  transparent 10%, rgba(184,122,50,.10) 10% 30%, rgba(184,122,50,.20) 30% 40%,
  rgba(184,122,50,.32) 40% 60%, rgba(184,122,50,.20) 60% 70%, rgba(184,122,50,.10) 70% 90%, transparent 90%)`

/**
 * Perfil de proporcionalidad: barras horizontales que parten de Z = 0 sobre las franjas de interpretación.
 * Naranja = mayor que el Phantom, gris azulado = menor, rojo = |Z| ≥ 4. Cada fila escribe además el valor
 * y la lectura en texto, así que el color no es la única señal.
 */
export default function PhantomBars({ filas }: { filas: FilaZ[] }) {
  if (filas.length < 2) {
    return <p className="py-6 text-center text-sm text-ink-700">El perfil aparecerá cuando ingreses medidas.</p>
  }
  const ticks = Array.from({ length: 2 * LIM + 1 }, (_, i) => i - LIM)
  return (
    <div>
      <div className="mb-1 hidden sm:grid sm:grid-cols-[11rem_1fr_6rem] sm:gap-3" aria-hidden="true">
        <span />
        <div className="relative h-4">
          {ticks.map((z) => (
            <span
              key={z}
              className="absolute -translate-x-1/2 text-[11px] text-ink-400"
              style={{ left: `${((z + LIM) / (2 * LIM)) * 100}%` }}
            >
              {z > 0 ? '+' : ''}
              {z}
            </span>
          ))}
        </div>
        <span />
      </div>

      <ul className="space-y-1.5">
        {filas.map((r) => {
          const fuera = Math.abs(r.z) > LIM
          const w = (Math.min(Math.abs(r.z), LIM) / LIM) * 50
          const color = Math.abs(r.z) >= 4 ? COLOR_REVISAR : r.z >= 0 ? '#E8720C' : COLOR_NEG
          return (
            <li key={r.key} className="grid items-center gap-x-3 gap-y-0.5 sm:grid-cols-[11rem_1fr_6rem]">
              <span className="truncate text-sm text-ink-900" title={r.label}>
                {r.label}
              </span>
              <div className="relative h-5 border-x border-ink-900/10" style={{ backgroundImage: franjas }} aria-hidden="true">
                <span className="absolute inset-y-0 left-1/2 w-px bg-ink-950/60" />
                <span
                  className="absolute inset-y-[3px] rounded-[2px]"
                  style={{
                    background: color,
                    width: `${Math.max(w, 0.6)}%`,
                    left: r.z >= 0 ? '50%' : `${50 - Math.max(w, 0.6)}%`,
                  }}
                />
              </div>
              <span className="font-mono text-xs text-ink-700 sm:text-right">
                {fuera ? (r.z > 0 ? '› ' : '‹ ') : ''}
                {r.z > 0 ? '+' : ''}
                {fmt(r.z)} <span className="sr-only">— {banda(r.z).txt}</span>
              </span>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 flex justify-between text-xs text-ink-400">
        <span>← Menor que el Phantom</span>
        <span>Mayor que el Phantom →</span>
      </p>
    </div>
  )
}
