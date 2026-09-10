import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ResponsiveTable from '../components/ResponsiveTable'
import CourtDivider from '../components/CourtDivider'
import SectionPhoto from '../components/SectionPhoto'
import fieldTest from '../assets/images/deteccion-running.jpg'
import { IconRadar } from '../components/icons'
import { evaluacionMotriz, metodosDeteccion } from '../data/deteccion'

export default function Deteccion() {
  return (
    <div>
      <PageHeader
        number="09"
        kicker="Sección 09 · Detección de talento"
        title="Evaluación motriz y detección de talento"
        lead="Los instrumentos de evaluación deben ajustarse a la etapa de desarrollo del deportista, y la detección de talento exige combinar varios métodos complementarios."
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Por etapa de aprendizaje"
          title="Evaluación motriz según la edad"
          lead="La siguiente tabla resume, por rango de edad, la batería o instrumento recomendado y lo que evalúa."
        />

        <SectionPhoto
          src={fieldTest}
          alt="Grupo de jóvenes realizando un ejercicio de desplazamiento en cancha, como parte de una evaluación motriz de campo"
          caption="Los test de campo — sprints, agilidad, salto — son la base de toda evaluación motriz aplicada al baloncesto."
          aspect="wide"
          className="mb-10"
        />

        <ResponsiveTable headers={['Etapa (edad)', 'Test / batería', 'Instrumento', 'Qué evalúa']} caption="Evaluación motriz por etapa de aprendizaje">
          {evaluacionMotriz.map((e) => (
            <tr key={e.etapa} className="border-t border-ink-900/10 odd:bg-ink-950/[0.02] align-top">
              <td className="whitespace-nowrap px-4 py-3 font-display uppercase tracking-tight text-accent-600">{e.etapa}</td>
              <td className="px-4 py-3 text-ink-950">{e.test}</td>
              <td className="px-4 py-3 text-ink-700">{e.instrumento}</td>
              <td className="px-4 py-3 text-ink-700">{e.evalua}</td>
            </tr>
          ))}
        </ResponsiveTable>
      </section>

      <CourtDivider />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader
          eyebrow="Metodología integral"
          title="Métodos de detección de talentos en baloncesto"
          lead="Ningún método por sí solo es suficiente: la detección de talento moderna combina evaluación física, técnica, psicológica, madurativa y de desempeño en competencia."
        />
        <ol className="grid gap-6 sm:grid-cols-2">
          {metodosDeteccion.map((m) => (
            <li key={m.numero} className="flex gap-4 border border-ink-900/10 bg-white/60 p-6 shadow-card">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink-950 font-display text-accent-500">
                {m.numero}
              </span>
              <div>
                <h3 className="font-display uppercase tracking-tight text-ink-950">{m.nombre}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700/80">{m.descripcion}</p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-ink-500">
                  <IconRadar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
                  <span>
                    <span className="uppercase tracking-wide text-ink-400">Objetivo: </span>
                    {m.objetivo}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
