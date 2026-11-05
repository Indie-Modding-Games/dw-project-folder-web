import { createContext, useContext } from 'react'
import type { I18n } from './types'

export const LangContext = createContext<I18n | null>(null)

export function useI18n(): I18n {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <LangProvider>')
  return ctx
}
