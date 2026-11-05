import type { ReactNode } from 'react'

export interface CardProps {
  eyebrow?: ReactNode
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  className?: string
}

/** Contenedor genérico con slots; no sabe de descargas ni de donaciones. */
export function Card({ eyebrow, title, children, footer, className = '' }: CardProps) {
  return (
    <div className={`card ${className}`.trim()}>
      {eyebrow ? <div className="card-eyebrow">{eyebrow}</div> : null}
      {title ? <h3 className="card-title">{title}</h3> : null}
      {children ? <div className="card-body">{children}</div> : null}
      {footer ? <div className="card-footer">{footer}</div> : null}
    </div>
  )
}
