import logo from '../assets/logo.svg'
import { links } from '../content/links'
import { project } from '../content/project'
import { useI18n } from '../i18n/context'
import { Badge } from '../ui/Badge'
import { Icon } from '../ui/Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

const NAV = [
  { href: '#downloads', key: 'nav.downloads' },
  { href: '#media', key: 'nav.media' },
  { href: '#community', key: 'nav.community' },
  { href: '#donate', key: 'nav.donate' },
]

/** Barra superior fija: marca, anclas y utilidades. */
export function SiteHeader() {
  const { t } = useI18n()
  return (
    <header className="site-header">
      <div className="container header-row">
        <a className="brand" href="#top">
          <img className="brand-logo" src={logo} alt="" width={30} height={30} />
          <span className="brand-name">{project.name}</span>
          <Badge tone="warn">{t('brand.beta')}</Badge>
        </a>
        <nav className="site-nav" aria-label="secciones">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {t(item.key)}
            </a>
          ))}
          <a href={links.docs} target="_blank" rel="noopener noreferrer" className="nav-link">
            {t('nav.docs')}
          </a>
        </nav>
        <div className="header-utils">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="switcher-item icon-btn header-github"
            aria-label={t('nav.github')}
          >
            <Icon name="github" size={17} />
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
