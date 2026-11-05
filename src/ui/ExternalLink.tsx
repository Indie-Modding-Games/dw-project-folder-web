import type { ReactNode } from 'react'
import { Icon } from './Icon'

export interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
}

/** Enlace externo consistente: target, rel e icono automáticos. */
export function ExternalLink({ href, children, className = '' }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`ext-link ${className}`.trim()}>
      {children}
      <Icon name="external" size={14} />
    </a>
  )
}
