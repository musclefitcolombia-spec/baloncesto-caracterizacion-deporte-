import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data/navigation'
import { IconBall, IconClose, IconMenu } from './icons'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-ink-950/95 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between">
        <NavLink to="/" className="flex shrink-0 items-center gap-2 text-paper" aria-label="Ir a inicio">
          <IconBall className="h-6 w-6 text-accent-500" />
          <span className="hidden font-display text-base uppercase leading-none tracking-wide sm:inline">
            Baloncesto
          </span>
        </NavLink>

        <nav aria-label="Navegación principal" className="hidden xl:block">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `block whitespace-nowrap px-2.5 py-2 text-[11px] font-medium uppercase tracking-wide transition-colors ${
                      isActive ? 'text-accent-500' : 'text-paper/70 hover:text-paper'
                    }`
                  }
                >
                  {item.shortLabel}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-paper xl:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Navegación móvil" className="border-t border-paper/10 bg-ink-950 xl:hidden">
          <ul className="section-shell flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-baseline gap-3 border-b border-paper/5 py-3.5 text-sm uppercase tracking-wide ${
                      isActive ? 'text-accent-500' : 'text-paper/80'
                    }`
                  }
                >
                  <span className="font-jersey text-lg text-paper/30">{item.number}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
