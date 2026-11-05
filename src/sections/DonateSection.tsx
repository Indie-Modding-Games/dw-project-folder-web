import { DonateOptionCard } from '../components/DonateOptionCard'
import { links } from '../content/links'
import { useI18n } from '../i18n/context'
import { SectionTitle } from '../ui/SectionTitle'

const OPTIONS = [
  { icon: 'kofi' as const, titleKey: 'donate.kofiTitle', bodyKey: 'donate.kofiBody', ctaKey: 'donate.kofiCta', href: links.kofi },
  { icon: 'patreon' as const, titleKey: 'donate.patreonTitle', bodyKey: 'donate.patreonBody', ctaKey: 'donate.patreonCta', href: links.patreon },
]

/** Donaciones con copy de transparencia: apoyar no comprar el juego. */
export function DonateSection() {
  const { t, tArr } = useI18n()
  return (
    <section className="section" id="donate">
      <div className="container">
        <SectionTitle
          id="donate"
          eyebrow={t('donate.eyebrow')}
          title={t('donate.title')}
          subtitle={t('donate.subtitle')}
        />
        <div className="grid grid-2">
          {OPTIONS.map((option) => (
            <DonateOptionCard key={option.titleKey} {...option} />
          ))}
        </div>
        <div className="other-help">
          <h3 className="other-help-title">{t('donate.otherTitle')}</h3>
          <ul className="reqs-list">
            {tArr('donate.other').map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
