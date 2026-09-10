import { Link } from 'react-router-dom'
import { IconBall } from '../components/icons'
import CourtDivider from '../components/CourtDivider'

const stats = [
  { value: '1891', label: 'Año de invención, por James Naismith' },
  { value: '1932', label: 'Fundación de la FIBA en Ginebra' },
  { value: '5×5', label: 'Jugadores en cancha por equipo' },
  { value: '24s', label: 'Reloj de lanzamiento (shot clock)' },
]

const secciones = [
  {
    n: '01',
    to: '/historia',
    title: 'Historia',
    text: 'De la YMCA de Springfield a los Juegos Olímpicos; y su llegada a Colombia en 1925.',
  },
  {
    n: '02',
    to: '/clasificacion',
    title: 'Clasificación y categorías',
    text: 'Tipo de deporte, categorías formativas y principales competencias.',
  },
  {
    n: '03',
    to: '/reglamento',
    title: 'Reglamento y material',
    text: 'Reglas oficiales FIBA 2022, indumentaria y cuerpo arbitral.',
  },
  {
    n: '04',
    to: '/demandas',
    title: 'Demandas físicas y fisiológicas',
    text: 'Rutas metabólicas, capacidades condicionales y coordinativas.',
  },
  {
    n: '05',
    to: '/posiciones',
    title: 'Perfil por posición',
    text: 'Diferencias físicas, fisiológicas y antropométricas entre posiciones.',
  },
  {
    n: '06',
    to: '/desarrollo-juvenil',
    title: 'Desarrollo juvenil y lesiones',
    text: 'Maduración biológica, lesiones frecuentes y prevención.',
  },
  {
    n: '07',
    to: '/atletas',
    title: 'Atletas referentes',
    text: 'Leyendas históricas y perfil físico ideal por posición, hoy.',
  },
  {
    n: '08',
    to: '/ventanas-entrenabilidad',
    title: 'Ventanas de entrenabilidad',
    text: 'Fases sensibles por capacidad, de 1 a 40 años.',
  },
  {
    n: '09',
    to: '/deteccion-talento',
    title: 'Detección de talento',
    text: 'Evaluación motriz por etapa y métodos de detección de talento.',
  },
]

export default function Inicio() {
  return (
    <div>
      <section className="relative overflow-hidden bg-ink-950 text-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-wood-grain opacity-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full border border-accent-500/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] scale-75 rounded-full border border-accent-500/10"
        />

        <div className="section-shell relative py-20 sm:py-28 lg:py-32">
          <p className="kicker flex items-center gap-2">
            <IconBall className="h-4 w-4" />
            Evaluación Motriz y Detección Deportiva
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold uppercase leading-[0.95] tracking-tightest sm:text-7xl lg:text-8xl">
            Baloncesto
          </h1>
          <p className="mt-2 max-w-2xl font-display text-lg uppercase tracking-wide text-paper/60 sm:text-xl">
            Caracterización del deporte
          </p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
            Trabajo de caracterización deportiva del baloncesto para la asignatura Entrenamiento Deportivo:
            historia, reglamento, demandas físico-fisiológicas, perfiles por posición, desarrollo juvenil,
            ventanas de entrenabilidad y detección de talento.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/historia"
              className="inline-flex items-center gap-2 bg-accent-500 px-6 py-3.5 text-sm font-medium uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-300"
            >
              Empezar por la historia
            </Link>
            <Link
              to="/referencias"
              className="inline-flex items-center gap-2 border border-paper/20 px-6 py-3.5 text-sm font-medium uppercase tracking-wide text-paper transition-colors hover:border-paper/50"
            >
              Ver referencias
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-ink-900/10 bg-court-50">
        <div className="section-shell grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:py-12">
          {stats.map((s) => (
            <div key={s.label} className="border-l-2 border-accent-500 pl-4">
              <p className="font-jersey text-4xl leading-none text-ink-950 sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-xs leading-snug text-ink-700/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CourtDivider className="py-8" />

      <section className="py-6 sm:py-10">
        <div className="section-shell">
          <p className="kicker">Contenido</p>
          <h2 className="mt-2 max-w-lg text-2xl font-semibold uppercase tracking-tight text-ink-950 sm:text-3xl">
            Recorre las nueve secciones del informe
          </h2>

          <div className="mt-10 grid gap-px overflow-hidden border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {secciones.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group relative flex flex-col justify-between gap-8 bg-paper p-6 transition-colors hover:bg-white sm:p-7"
              >
                <span className="font-jersey text-3xl text-ink-900/15 transition-colors group-hover:text-accent-500/30">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-tight text-ink-950 group-hover:text-accent-600">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700/70">{s.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 border-t border-ink-900/10 bg-ink-950 py-14 text-paper sm:py-16">
        <div className="section-shell grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="kicker">Sobre este trabajo</p>
            <p className="mt-3 max-w-xl text-paper/70">
              Documento elaborado por Samuel López Cruz y Juan José Guarín para la Fundación Universitaria del Área
              Andina, en el marco de la asignatura Evaluación Motriz y Detección Deportiva, programa de
              Entrenamiento Deportivo. Todo el contenido está respaldado por fuentes verificables, citadas en
              formato APA en la sección de referencias.
            </p>
          </div>
          <Link
            to="/referencias"
            className="inline-flex w-fit items-center gap-2 border border-paper/20 px-5 py-3 text-sm font-medium uppercase tracking-wide text-paper transition-colors hover:border-accent-500 hover:text-accent-500"
          >
            Ir a referencias
          </Link>
        </div>
      </section>
    </div>
  )
}
