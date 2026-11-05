import { useCopy } from '../hooks/useCopy'
import { Icon } from './Icon'

export interface CopyButtonProps {
  text: string
  /** Título accesible / tooltip. */
  label: string
  /** Texto mostrado tras copiar (p. ej. '¡Copiado!'). */
  copiedLabel: string
}

/** Botón de copiado con feedback; usado para checksums y rutas. */
export function CopyButton({ text, label, copiedLabel }: CopyButtonProps) {
  const { state, copy } = useCopy()
  return (
    <button type="button" className="copy-btn" aria-label={label} title={label} onClick={() => void copy(text)}>
      {state === 'copied' ? (
        <>
          <Icon name="check" size={14} />
          <span className="mono">{copiedLabel}</span>
        </>
      ) : (
        <Icon name="copy" size={14} />
      )}
    </button>
  )
}
