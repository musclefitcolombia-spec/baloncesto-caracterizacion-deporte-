import type { ReactNode } from 'react'

interface PageHeaderProps {
  number: string
  kicker: string
  title: string
  lead?: ReactNode
}

export default function PageHeader({ number, kicker, title, lead }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-ink-900/10 bg-ink-950 text-paper">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-10 select-none font-jersey text-[9rem] leading-none text-paper/[0.05] sm:text-[13rem]"
      >
        {number}
      </p>
      <div className="section-shell relative py-16 sm:py-20">
        <p className="kicker">{kicker}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold uppercase tracking-tightest sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {lead && <div className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">{lead}</div>}
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-accent-500 via-accent-500/60 to-transparent" />
    </header>
  )
}
