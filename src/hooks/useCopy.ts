import { useCallback, useState } from 'react'

export type CopyState = 'idle' | 'copied' | 'error'

/** Copia al portapapeles con estado efímero para feedback visual. */
export function useCopy(resetMs = 1600) {
  const [state, setState] = useState<CopyState>('idle')

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setState('copied')
      } catch {
        setState('error')
      }
      window.setTimeout(() => setState('idle'), resetMs)
    },
    [resetMs],
  )

  return { state, copy }
}
