import type { ReactNode } from 'react'
import { CopyButton } from './CopyButton'

export interface KeyValueProps {
  label: string
  value: ReactNode
  /** Si viene, añade botón de copiado para este valor (checksums, rutas). */
  copyText?: string
  copyLabel?: string
  copiedLabel?: string
}

/** Fila etiqueta/valor con tipografía mono para datos técnicos. */
export function KeyValue({ label, value, copyText, copyLabel, copiedLabel }: KeyValueProps) {
  return (
    <div className="kv">
      <span className="kv-label">{label}</span>
      <span className="kv-value">
        <span className="mono">{value}</span>
        {copyText && copyLabel && copiedLabel ? (
          <CopyButton text={copyText} label={copyLabel} copiedLabel={copiedLabel} />
        ) : null}
      </span>
    </div>
  )
}
