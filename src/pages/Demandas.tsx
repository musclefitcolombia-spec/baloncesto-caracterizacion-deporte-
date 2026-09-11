import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import Source from '../components/Source'
import ResponsiveTable from '../components/ResponsiveTable'
import CourtDivider from '../components/CourtDivider'
import SectionPhoto from '../components/SectionPhoto'
import jumpAction from '../assets/images/demandas-jump.jpg'
import sprintStart from '../assets/images/demandas-sprint.jpg'
import { IconPulse, IconTrendUp } from '../components/icons'
import {
  demandasTecnicoTacticas,
  dimensionFisica,
  dimensionFisiologica,
  dimensionAntropometrica,
  rutasMetabolicas,
  capacidadesRequeridas,
} from '../data/demandas'

export default function Demandas() {
  return (
    <div>
      <PageHeader
        number="04"
        kicker="Sección 04 · Demandas físicas y fisiológicas"
        title="Demandas físicas y fisiológicas"
        lead="Un deporte acíclico e intermitente de alta intensidad, que combina las tres vías metabólicas y exige altísima capacidad de decisión bajo presión."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Exigencia técnico-táctica" title="Toma de decisión bajo presión" />
        <div className="max-w-3xl space-y-4">
          <p className="leading-relaxed text-ink-800">{demandasTecnicoTacticas.repertorio}</p>
          <p className="leading-relaxed text-ink-800">{demandasTecnicoTacticas.exigencia}</p>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Dimensión física" title="Potencia de salto y potencia anaeróbica por posición" lead={dimensionFisica.intro} />
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <div>
            <ResponsiveTable headers={['Posición', 'Potencia de salto', 'Potencia anaeróbica']} caption="Potencia de salto y anaeróbica por posición">
              {dimensionFisica.datos.map((d) => (
                <tr key={d.posicion} className="border-t border-ink-900/10 odd:bg-ink-950/[0.02]">
                  <td className="px-4 py-3 font-medium text-ink-950">{d.posicion}</td>
                  <td className="px-4 py-3 text-ink-700">{d.salto}</td>
                  <td className="px-4 py-3 text-ink-700">{d.potencia}</td>
                </tr>
              ))}
            </ResponsiveTable>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-700/70">{dimensionFisica.nota}</p>
            <p className="mt-2 text-xs text-ink-400">
              Fuentes: {dimensionFisica.source1}; {dimensionFisica.source2}
            </p>
          </div>
          <SectionPhoto
            src={jumpAction}
            alt="Jugador en el aire ejecutando un mate sobre una cancha exterior, mostrando la potencia de salto propia del baloncesto"
            aspect="tall"
          />
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Dimensión fisiológica" title="Consumo máximo de oxígeno (VO2máx)" lead={dimensionFisiologica.intro} />
        <div className="grid gap-5 sm:grid-cols-3">
          {dimensionFisiologica.vo2max.map((v) => (
            <div key={v.posicion} className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <IconPulse className="h-6 w-6 text-accent-500" />
              <p className="mt-3 font-jersey text-4xl text-ink-950">{v.valor.split(' ')[0]}</p>
              <p className="text-xs uppercase tracking-wide text-ink-400">ml/kg/min</p>
              <p className="mt-2 font-display uppercase tracking-tight text-ink-800">{v.posicion}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-ink-700/70">{dimensionFisiologica.vo2maxNota}</p>
        <p className="mt-2 text-xs text-ink-400">
          Fuentes: {dimensionFisiologica.source1}; {dimensionFisiologica.source2}
        </p>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Dimensión antropométrica" title="Estatura, peso y perfil por posición" />
        <div className="max-w-3xl space-y-4">
          <p className="leading-relaxed text-ink-800">{dimensionAntropometrica.text1}</p>
          <p className="leading-relaxed text-ink-800">{dimensionAntropometrica.text2}</p>
          <Source>{dimensionAntropometrica.source}</Source>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Bioenergética"
          title="Rutas metabólicas"
          lead={rutasMetabolicas.clasificacion}
        />
        <Source>{rutasMetabolicas.clasificacionSource}</Source>

        <div className="mt-8 grid gap-px overflow-hidden border border-ink-900/10 bg-ink-900/10 sm:grid-cols-3">
          {rutasMetabolicas.sistemas.map((s) => (
            <div key={s.nombre} className="bg-white/70 p-6">
              <h3 className="font-display uppercase tracking-tight text-ink-950">{s.nombre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{s.detalle}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-400">Fuente: {rutasMetabolicas.sistemasSource}</p>

        <SectionPhoto
          src={sprintStart}
          alt="Dos atletas en posición de salida de tacos en una pista de atletismo cubierta, listos para un sprint"
          caption="El sistema ATP-PCr domina justo este tipo de esfuerzo: explosivo y de muy corta duración."
          aspect="wide"
          className="mt-8"
        />

        <div className="mt-10 max-w-2xl border-l-[3px] border-l-accent-500 bg-white/60 p-6 shadow-card">
          <p className="text-sm leading-relaxed text-ink-800">{rutasMetabolicas.estudioEsfuerzos}</p>
          <div className="mt-2">
            <Source>{rutasMetabolicas.estudioEsfuerzosSource}</Source>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-ink-400">
              <IconTrendUp className="h-4 w-4 text-accent-500" />
              Estimación clásica de Fox (1984), partido completo
            </div>
            <div className="mt-3 flex h-8 w-full max-w-md overflow-hidden border border-ink-900/10">
              <div
                className="flex items-center justify-end bg-ink-950 pr-2 text-xs font-medium text-paper"
                style={{ width: `${rutasMetabolicas.foxEstimacion.anaerobico}%` }}
              >
                {rutasMetabolicas.foxEstimacion.anaerobico}% anaeróbico
              </div>
              <div
                className="flex items-center justify-center bg-accent-500 text-xs font-medium text-ink-950"
                style={{ width: `${rutasMetabolicas.foxEstimacion.aerobico}%` }}
              >
                {rutasMetabolicas.foxEstimacion.aerobico}%
              </div>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-700/70">{rutasMetabolicas.foxEstimacion.nota}</p>
            <p className="mt-2 text-xs text-ink-400">Fuente: {rutasMetabolicas.foxEstimacion.source}</p>
          </div>
        </div>

        <div className="mt-10 max-w-2xl border border-ink-900/10 bg-white/60 p-6 shadow-card">
          <p className="text-xs uppercase tracking-wide text-ink-400">Lactato al final del partido (juniors internacionales)</p>
          <p className="mt-1 font-jersey text-4xl text-accent-600">{rutasMetabolicas.lactato.valor}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-700/80">{rutasMetabolicas.lactato.detalle}</p>
          <div className="mt-2">
            <Source>{rutasMetabolicas.lactato.source}</Source>
          </div>
        </div>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Síntesis" title="Capacidades condicionales y coordinativas requeridas" />
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
            <h3 className="font-display uppercase tracking-tight text-ink-950">Condicionales</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-700/80">
              {capacidadesRequeridas.condicionales.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-ink-900/10 bg-white/60 p-6 shadow-card">
            <h3 className="font-display uppercase tracking-tight text-ink-950">Coordinativas</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-700/80">
              {capacidadesRequeridas.coordinativas.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-court-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-700/70">{capacidadesRequeridas.nota}</p>
      </section>
    </div>
  )
}
