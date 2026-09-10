import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import Source from '../components/Source'
import CourtDivider from '../components/CourtDivider'
import { IconShieldCheck, IconPulse } from '../components/icons'
import {
  maduracionBiologica,
  lesionesFrecuentes,
  porcentajeMiembroInferior,
  lesionLCA,
  prevencion,
} from '../data/juvenil'

export default function DesarrolloJuvenil() {
  return (
    <div>
      <PageHeader
        number="06"
        kicker="Sección 06 · Desarrollo juvenil y lesiones"
        title="Desarrollo juvenil, maduración biológica y prevención de lesiones"
        lead="La edad cronológica no cuenta toda la historia: la maduración biológica y una prevención adecuada son determinantes en la formación de jóvenes jugadores."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Maduración biológica" title="Edad biológica vs. edad cronológica" />
        <div className="max-w-3xl space-y-4">
          <p className="leading-relaxed text-ink-800">{maduracionBiologica.intro}</p>
          <Source>{maduracionBiologica.introSource}</Source>
        </div>

        <div className="mt-8 max-w-3xl border-l-[3px] border-l-accent-500 bg-white/60 p-6 shadow-card">
          <p className="text-sm leading-relaxed text-ink-800">{maduracionBiologica.estudio}</p>
          <div className="mt-2">
            <Source>{maduracionBiologica.estudioSource}</Source>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-700/80">{maduracionBiologica.conclusion}</p>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Prevención de lesiones" title="Lesiones más frecuentes" />

        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {lesionesFrecuentes.map((l, i) => (
              <li key={l.label} className="flex gap-4 border border-ink-900/10 bg-white/60 p-5 shadow-card">
                <span className="font-jersey text-3xl text-ink-900/20">{i + 1}</span>
                <div>
                  <p className="font-display uppercase tracking-tight text-ink-950">{l.label}</p>
                  <p className="text-sm text-ink-700/70">{l.detalle}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col justify-center border border-ink-900/10 bg-ink-950 p-6 text-paper sm:w-56">
            <IconPulse className="h-6 w-6 text-accent-500" />
            <p className="mt-3 font-jersey text-5xl">{porcentajeMiembroInferior.valor}%</p>
            <p className="mt-1 text-xs leading-snug text-paper/60">{porcentajeMiembroInferior.detalle}</p>
            <p className="mt-3 text-[11px] uppercase tracking-wide text-paper/40">
              Fuente: {porcentajeMiembroInferior.source}
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-3xl border-l-[3px] border-l-accent-500 bg-white/60 p-6 shadow-card">
          <h3 className="font-display uppercase tracking-tight text-ink-950">Lesión de ligamento cruzado anterior (LCA)</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-800">{lesionLCA.texto}</p>
          <div className="mt-2">
            <Source>{lesionLCA.source}</Source>
          </div>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Estrategias con respaldo" title="Prevención" lead={prevencion.intro} />
        <ul className="grid gap-4 sm:grid-cols-2">
          {prevencion.items.map((item) => (
            <li key={item} className="flex gap-3 border border-ink-900/10 bg-white/60 p-5 shadow-card">
              <IconShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
              <p className="text-sm leading-relaxed text-ink-800">{item}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-400">Fuente: {prevencion.source}</p>
      </section>
    </div>
  )
}
