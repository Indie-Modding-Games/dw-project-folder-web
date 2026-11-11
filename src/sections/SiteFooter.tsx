import logo from '../assets/logo.svg'
import { links } from '../content/links'
import { useI18n } from '../i18n/context'
import { Icon } from '../ui/Icon'

/** Pie con los disclaimers legales obligatorios (§9 del plan). */
export function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="footer-brand">
          <img className="brand-logo" src={logo} alt="" width={26} height={26} />
          <span className="footer-brand-name">{t('brand.name')}</span>
        </p>
        <div className="footer-video">
          <iframe
            src="https://www.youtube-nocookie.com/embed/E-UZVcreybA"
            title="Video de YouTube"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="footer-disclaimer">{t('footer.disclaimer')}</p>
        <p className="footer-disclaimer">{t('footer.byod')}</p>
        <p className="footer-license">{t('footer.license')}</p>
        <div className="footer-links">
          <a href={links.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={16} />
            <span>{t('footer.source')}</span>
          </a>
          <a href={links.docs} target="_blank" rel="noopener noreferrer">
            <Icon name="book" size={16} />
            <span>{t('footer.assetsPolicy')}</span>
          </a>
          <a href={links.discord} target="_blank" rel="noopener noreferrer">
            <Icon name="discord" size={16} />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
