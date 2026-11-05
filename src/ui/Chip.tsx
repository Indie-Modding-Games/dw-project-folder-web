import type { ReactNode } from 'react'

export interface ChipProps {
  children: ReactNode
}

/** Etiqueta pequeña para listas de tecnologías y tags. */
export function Chip({ children }: ChipProps) {
  return <span className="chip">{children}</span>
}
