interface SectionPhotoProps {
  src: string
  alt: string
  caption?: string
  aspect?: 'wide' | 'tall' | 'square'
  className?: string
}

const aspectClass: Record<NonNullable<SectionPhotoProps['aspect']>, string> = {
  wide: 'aspect-[16/7]',
  tall: 'aspect-[4/5]',
  square: 'aspect-square',
}

/** Fotografía editorial con marco de acento, usada para romper el texto con una imagen real ligada al tema de la sección. */
export default function SectionPhoto({ src, alt, caption, aspect = 'wide', className = '' }: SectionPhotoProps) {
  return (
    <figure className={`border border-ink-900/10 bg-ink-950 ${className}`}>
      <div className={`overflow-hidden ${aspectClass[aspect]}`}>
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      {caption && (
        <figcaption className="border-t-2 border-accent-500 px-4 py-2.5 text-xs leading-snug text-paper/60">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
