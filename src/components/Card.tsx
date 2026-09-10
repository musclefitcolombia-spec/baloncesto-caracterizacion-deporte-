import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  accent?: boolean
}

export default function Card({ children, className = '', accent = false }: CardProps) {
  return (
    <div
      className={`relative border border-ink-900/10 bg-white/60 p-6 shadow-card transition-colors ${
        accent ? 'border-l-[3px] border-l-accent-500' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
