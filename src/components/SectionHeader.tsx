import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  lead?: ReactNode
}

export default function SectionHeader({ eyebrow, title, lead }: SectionHeaderProps) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-10">
      {eyebrow && <p className="kicker mb-2">{eyebrow}</p>}
      <h2 className="text-2xl font-semibold uppercase tracking-tight text-ink-950 sm:text-3xl">{title}</h2>
      {lead && <p className="mt-3 text-ink-700/80 leading-relaxed">{lead}</p>}
    </div>
  )
}
