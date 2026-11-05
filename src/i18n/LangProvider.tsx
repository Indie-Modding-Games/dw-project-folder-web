import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LangContext } from './context'
import { catalogs, lookup, LANGS, type I18n, type Lang } from './types'

const STORAGE_KEY = 'dwe-lang'

/** Preferencia guardada → idioma del navegador → español. */
function detectLang(): Lang {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang
  const nav = navigator.language.slice(0, 2).toLowerCase()
  return (LANGS as readonly string[]).includes(nav) ? (nav as Lang) : 'es'
}

/** Provider de idioma; el hook para consumir vive en ./context (regla de fast-refresh). */
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18n>(
    () => ({
      lang,
      setLang,
      t: (key) => {
        const v = lookup(catalogs[lang], key)
        return typeof v === 'string' ? v : key
      },
      tArr: (key) => {
        const v = lookup(catalogs[lang], key)
        return Array.isArray(v) ? v.map(String) : []
      },
    }),
    [lang, setLang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
