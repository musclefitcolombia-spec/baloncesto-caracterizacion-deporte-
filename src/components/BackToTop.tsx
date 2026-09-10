import { useEffect, useState } from 'react'
import { IconArrowUp } from './icons'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center border border-ink-900/10 bg-ink-950 text-paper shadow-card transition-transform hover:-translate-y-0.5 hover:bg-accent-500 sm:bottom-8 sm:right-8"
    >
      <IconArrowUp className="h-5 w-5" />
    </button>
  )
}
