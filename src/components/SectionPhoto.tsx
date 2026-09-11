import { useEffect, useRef } from 'react'

interface SectionPhotoProps {
  src: string
  alt: string
  caption?: string
  aspect?: 'wide' | 'tall' | 'square'
  className?: string
  /** Activa un efecto sutil de profundidad: la imagen se desplaza un poco al hacer scroll. */
  parallax?: boolean
}

const aspectClass: Record<NonNullable<SectionPhotoProps['aspect']>, string> = {
  wide: 'aspect-[16/7]',
  tall: 'aspect-[4/5]',
  square: 'aspect-square',
}

// Cuánto se desplaza la imagen dentro de su marco, en px, de borde a borde del recorrido.
const PARALLAX_RANGE = 48

function useParallax(enabled: boolean) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!enabled) return
    const wrapper = wrapperRef.current
    const img = imgRef.current
    if (!wrapper || !img) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let ticking = false
    let inView = false

    const apply = () => {
      ticking = false
      if (!inView) return
      const rect = wrapper.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // progress: 0 cuando el elemento entra por abajo, 1 cuando sale por arriba
      const progress = (vh - rect.top) / (vh + rect.height)
      const clamped = Math.min(1, Math.max(0, progress))
      const offset = (clamped - 0.5) * PARALLAX_RANGE
      img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(apply)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) onScroll()
      },
      { rootMargin: '20% 0px' },
    )
    observer.observe(wrapper)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])

  return { wrapperRef, imgRef }
}

/** Fotografía editorial con marco de acento, usada para romper el texto con una imagen real ligada al tema de la sección. */
export default function SectionPhoto({ src, alt, caption, aspect = 'wide', className = '', parallax = false }: SectionPhotoProps) {
  const { wrapperRef, imgRef } = useParallax(parallax)

  return (
    <figure className={`border border-ink-900/10 bg-ink-950 ${className}`}>
      <div ref={wrapperRef} className={`overflow-hidden ${aspectClass[aspect]}`}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover ${parallax ? 'scale-[1.15] will-change-transform' : ''}`}
        />
      </div>
      {caption && (
        <figcaption className="border-t-2 border-accent-500 px-4 py-2.5 text-xs leading-snug text-paper/60">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
