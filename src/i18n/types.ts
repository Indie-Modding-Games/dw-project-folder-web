import { es } from './es'
import { en } from './en'
import { pt } from './pt'
import { ja } from './ja'
import { zh } from './zh'
import { id } from './id'
import { ko } from './ko'

export const LANGS = ['es', 'en', 'pt', 'ja', 'zh', 'id', 'ko'] as const
export type Lang = (typeof LANGS)[number]
export type Catalog = typeof es

export const catalogs: Record<Lang, Catalog> = { es, en, pt, ja, zh, id, ko }

export interface I18n {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Texto por clave punteada ('hero.ctaDownload'); devuelve la clave si falta. */
  t: (key: string) => string
  /** Lista por clave punteada ('downloads.linuxReqs'); devuelve [] si falta. */
  tArr: (key: string) => string[]
}

export function lookup(source: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((cur, part) => {
    if (cur && typeof cur === 'object') return (cur as Record<string, unknown>)[part]
    return undefined
  }, source)
}
