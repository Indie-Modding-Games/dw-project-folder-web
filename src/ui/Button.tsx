import type { ReactNode } from 'react'
import type { IconName } from './Icon'
import { Icon } from './Icon'

export interface ButtonProps {
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'sm'
  icon?: IconName
  /** Con href renderiza <a>; sin él, <button>. */
  href?: string
  /** Añade target/rel a los enlaces externos. */
  external?: boolean
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  className?: string
}

/** Átomo de acción único para toda la web (CTAs, descargas, donaciones). */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  href,
  external,
  onClick,
  disabled,
  children,
  className = '',
}: ButtonProps) {
  const classes = `btn btn-${variant}${size === 'sm' ? ' btn-sm' : ''} ${className}`.trim()
  const inner = (
    <>
      {icon ? <Icon name={icon} size={size === 'sm' ? 15 : 18} /> : null}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}
