import { Link } from 'react-router-dom'
import { IconBall } from './icons'

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-ink-950 text-paper">
      <div className="section-shell grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <IconBall className="h-6 w-6 text-accent-500" />
            <span className="font-display text-sm uppercase tracking-wide">Baloncesto · Caracterización del Deporte</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
            Trabajo académico de la asignatura Evaluación Motriz y Detección Deportiva (Entrenamiento Deportivo),
            Fundación Universitaria del Área Andina.
          </p>
          <p className="mt-4 text-xs uppercase tracking-wide text-paper/40">Samuel López Cruz · Juan José Guarín — 2026</p>
        </div>

        <div>
          <p className="kicker mb-4">Fuentes citadas</p>
          <p className="max-w-xs text-sm leading-relaxed text-paper/60">
            Todo el contenido está respaldado por fuentes académicas y periodísticas verificables: FIBA, Fecolcesto,
            estudios en revistas indexadas, Basketball-Reference, ESPN y otras citadas en formato APA.
          </p>
          <Link
            to="/referencias"
            className="mt-4 inline-block text-sm font-medium text-accent-500 underline decoration-accent-500/40 underline-offset-4 hover:text-accent-300"
          >
            Ver listado completo de referencias →
          </Link>
        </div>

        <div>
          <p className="kicker mb-4">Sitio</p>
          <ul className="space-y-2 text-sm text-paper/60">
            <li>
              <Link to="/" className="hover:text-paper">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/deteccion-talento" className="hover:text-paper">
                Detección de talento
              </Link>
            </li>
            <li>
              <Link to="/ventanas-entrenabilidad" className="hover:text-paper">
                Ventanas de entrenabilidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 py-4">
        <p className="section-shell text-xs text-paper/40">
          Proyecto educativo sin fines comerciales · Contenido con fines de evaluación académica
        </p>
      </div>
    </footer>
  )
}
