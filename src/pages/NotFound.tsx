import { Link } from 'react-router-dom'
import { IconBall } from '../components/icons'

export default function NotFound() {
  return (
    <div className="section-shell flex flex-col items-center justify-center py-28 text-center">
      <IconBall className="h-12 w-12 text-accent-500" />
      <p className="mt-6 font-jersey text-7xl text-ink-950">404</p>
      <h1 className="mt-2 font-display text-2xl uppercase text-ink-950">Fuera de cancha</h1>
      <p className="mt-3 max-w-sm text-ink-700/70">La página que buscas no existe o fue movida.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-accent-500 px-5 py-3 text-sm font-medium uppercase tracking-wide text-ink-950 transition-colors hover:bg-accent-300"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
