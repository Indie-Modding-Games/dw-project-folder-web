import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeTone = 'success' | 'warn' | 'neutral' | 'accent'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  children: ReactNode
}

/** Átomo de estado: beta, disponible, en camino… No conoce el dominio. */
export function Badge({ tone = 'neutral', children, className = '', ...rest }: BadgeProps) {
  return (
    <span className={`badge badge-${tone} ${className}`.trim()} {...rest}>
      {children}
    </span>
  )
}
