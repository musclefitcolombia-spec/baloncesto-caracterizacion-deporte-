import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'
import ReferenceAccordion from '../components/ReferenceAccordion'
import { referencias } from '../data/referencias'

function primeraLetra(cita: string) {
  const c = cita.trim()[0]?.toUpperCase() ?? '#'
  return /[A-ZÁÉÍÓÚÑ]/.test(c) ? c : '#'
}

const grupos = referencias.reduce<Record<string, typeof referencias>>((acc, ref) => {
  const letra = primeraLetra(ref.cita)
  acc[letra] = acc[letra] ? [...acc[letra], ref] : [ref]
  return acc
}, {})

const letras = Object.keys(grupos).sort()

export default function Referencias() {
  return (
    <div>
      <PageHeader
        number="10"
        kicker="Sección 10 · Referencias"
        title="Referencias"
        lead={`Listado completo, en formato APA 7 y orden alfabético, de las ${referencias.length} fuentes citadas a lo largo de este sitio.`}
      />

      <section className="section-shell py-14 sm:py-20">
        <SectionHeader eyebrow="Bibliografía" title="Fuentes citadas por inicial" />
        <div className="space-y-3">
          {letras.map((letra) => (
            <ReferenceAccordion key={letra} letra={letra} items={grupos[letra]} />
          ))}
        </div>
      </section>
    </div>
  )
}
