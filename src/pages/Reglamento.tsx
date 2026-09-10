import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import CourtDivider from '../components/CourtDivider'
import { IconClock, IconJersey, IconRuler, IconWhistle } from '../components/icons'
import {
  reglasBasicas,
  violaciones,
  puntuacion,
  material,
  cuerpoArbitral,
  notaArbitral,
} from '../data/reglamento'

export default function Reglamento() {
  return (
    <div>
      <PageHeader
        number="03"
        kicker="Sección 03 · Reglamento y material"
        title="Reglamento y material"
        lead="Reglas oficiales de baloncesto FIBA 2022: estructura del juego, violaciones, puntuación, indumentaria y cuerpo arbitral."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Lo esencial" title="Reglas básicas del juego" />
        <div className="grid gap-px overflow-hidden border border-ink-900/10 bg-ink-900/10 sm:grid-cols-3 lg:grid-cols-5">
          {reglasBasicas.map((r) => (
            <div key={r.label} className="bg-white/70 p-5">
              <p className="text-xs uppercase tracking-wide text-ink-400">{r.label}</p>
              <p className="mt-2 font-display text-lg uppercase text-ink-950">{r.value}</p>
            </div>
          ))}
        </div>

        {/* Silueta de cancha, motivo SVG propio */}
        <div className="mt-10 border border-ink-900/10 bg-court-50 p-6 sm:p-10" aria-hidden="true">
          <svg viewBox="0 0 280 150" className="mx-auto h-auto w-full max-w-2xl text-ink-900/25">
            <rect x="4" y="4" width="272" height="142" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="140" y1="4" x2="140" y2="146" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="140" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="4" y="45" width="46" height="60" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="230" y="45" width="46" height="60" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M4 15a110 110 0 0 1 0 120" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M276 15a110 110 0 0 0 0 120" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="30" cy="75" r="2" fill="currentColor" />
            <circle cx="250" cy="75" r="2" fill="currentColor" />
          </svg>
          <p className="mt-4 text-center text-xs text-ink-700/60">Cancha oficial: 28 × 15 m — aro a 3.05 m de altura</p>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Restricciones de juego" title="Violaciones principales" />
            <ul className="space-y-4">
              {violaciones.map((v) => (
                <li key={v.nombre} className="flex gap-4 border-b border-ink-900/10 pb-4">
                  <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                  <div>
                    <p className="font-display uppercase tracking-tight text-ink-950">{v.nombre}</p>
                    <p className="text-sm text-ink-700/70">{v.detalle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeader eyebrow="Anotación" title="Puntuación" />
            <ul className="space-y-3">
              {puntuacion.map((p) => (
                <li key={p.label} className="flex items-baseline justify-between border-b border-ink-900/10 pb-3">
                  <span className="text-sm text-ink-700/80">{p.label}</span>
                  <span className="font-display text-lg uppercase text-accent-600">{p.value}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <SectionHeader eyebrow="Dirección del partido" title="Cuerpo arbitral" />
              <ul className="space-y-3">
                {cuerpoArbitral.map((c) => (
                  <li key={c.rol} className="flex gap-3">
                    <IconWhistle className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                    <div>
                      <p className="text-sm font-medium text-ink-950">{c.rol}</p>
                      <p className="text-sm text-ink-700/70">{c.detalle}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-relaxed text-ink-400">{notaArbitral}</p>
            </div>
          </div>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Equipamiento" title="Indumentaria y material deportivo" />
        <div className="grid gap-5 sm:grid-cols-3">
          {material.map((m, i) => (
            <div key={m.titulo} className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
              {i === 0 && <IconRuler className="h-6 w-6 text-accent-500" />}
              {i === 1 && <IconRuler className="h-6 w-6 text-accent-500" />}
              {i === 2 && <IconJersey className="h-6 w-6 text-accent-500" />}
              <h3 className="mt-3 font-display uppercase tracking-tight text-ink-950">{m.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{m.detalle}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-ink-400">Fuente: {m.source}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
