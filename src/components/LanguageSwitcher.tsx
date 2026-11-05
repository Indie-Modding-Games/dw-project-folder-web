import { useI18n } from '../i18n/context'
import { LANGS, type Lang } from '../i18n/types'
import { Icon } from '../ui/Icon'

/** Nombre de cada idioma escrito en sí mismo (estándar en selectores). */
const NAMES: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  ja: '日本語',
  zh: '中文',
}

/** Selector de idioma compacto: globo + dropdown nativo accesible. */
export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  return (
    <label className="switcher lang-switcher">
      <Icon name="globe" size={16} />
      <select
        className="lang-select"
        aria-label="idioma"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
      >
        {LANGS.map((code) => (
          <option key={code} value={code}>
            {NAMES[code]}
          </option>
        ))}
      </select>
    </label>
  )
}
