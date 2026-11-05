import type { ReactNode } from 'react'

export interface StackProps {
  children: ReactNode
  gap?: 'sm' | 'md' | 'lg'
  align?: 'start' | 'center' | 'stretch'
  wrap?: boolean
  className?: string
}

/** Pila vertical de flujo con gap normalizado por tokens. */
export function Stack({ children, gap = 'md', align = 'stretch', wrap = false, className = '' }: StackProps) {
  return (
    <div className={`stack stack-${gap} align-${align}${wrap ? ' stack-wrap' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}

export interface GridProps {
  children: ReactNode
  cols?: 2 | 3
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

/** Rejilla responsive: colapsa a 1 columna en móvil. */
export function Grid({ children, cols = 2, gap = 'md', className = '' }: GridProps) {
  return (
    <div className={`grid grid-${cols} grid-${gap} ${className}`.trim()}>{children}</div>
  )
}

export function Separator() {
  return <hr className="separator" />
}
