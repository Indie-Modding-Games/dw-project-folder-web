import { links } from '../content/links'
import { useI18n } from '../i18n/context'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon, type IconName } from '../ui/Icon'
import { SectionTitle } from '../ui/SectionTitle'

const CARDS: { icon: IconName; titleKey: string; bodyKey: string; ctaKey?: string; href?: string }[] = [
  { icon: 'discord', titleKey: 'community.discordTitle', bodyKey: 'community.discordBody', ctaKey: 'community.discordCta', href: links.discord },
  { icon: 'bug', titleKey: 'community.bugsTitle', bodyKey: 'community.bugsBody', ctaKey: 'community.bugsCta', href: links.discord },
  { icon: 'book', titleKey: 'community.docsTitle', bodyKey: 'community.docsBody', ctaKey: 'community.docsCta', href: links.docs },
]

/** Discord, reporte de bugs (vía Discord) y documentación técnica. */
export function CommunitySection() {
  const { t } = useI18n()
  return (
    <section className="section" id="community">
      <div className="container">
        <SectionTitle
          id="community"
          eyebrow={t('community.eyebrow')}
          title={t('community.title')}
          subtitle={t('community.subtitle')}
        />
        <div className="grid grid-3">
          {CARDS.map((card) => (
            <Card
              key={card.titleKey}
              className="community-card"
              eyebrow={
                <span className="feature-icon">
                  <Icon name={card.icon} size={20} />
                </span>
              }
              title={t(card.titleKey)}
              footer={
                card.ctaKey && card.href ? (
                  <Button href={card.href} external size="sm" variant="ghost">
                    {t(card.ctaKey)}
                  </Button>
                ) : null
              }
            >
              <p className="card-text">{t(card.bodyKey)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
