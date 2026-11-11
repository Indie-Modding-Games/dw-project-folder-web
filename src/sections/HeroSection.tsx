import heroBanner from '../assets/hero-banner.webp'
import heroLogo from '../assets/hero.webp'
import { TechChipList } from '../components/TechChipList'
import { links } from '../content/links'
import { phases, project } from '../content/project'
import { useI18n } from '../i18n/context'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon, type IconName } from '../ui/Icon'
import { ProgressBadge } from '../ui/ProgressBadge'

/** El "qué es" vive aquí, fusionado con la cabecera de beta. */
const FEATURES: { icon: IconName; titleKey: string; bodyKey: string }[] = [
  { icon: 'play', titleKey: 'overview.f1Title', bodyKey: 'overview.f1Body' },
  { icon: 'book', titleKey: 'overview.f2Title', bodyKey: 'overview.f2Body' },
  { icon: 'copy', titleKey: 'overview.f3Title', bodyKey: 'overview.f3Body' },
  { icon: 'linux', titleKey: 'overview.f4Title', bodyKey: 'overview.f4Body' },
]

/** Cabecera de la landing: identidad + qué es + CTAs + estado del roadmap.
 *  En escritorio: dos columnas (copy a la izquierda, panel de features a la derecha). */
export function HeroSection() {
  const { t } = useI18n()
  return (
    <section className="hero" id="top" style={{ backgroundImage: `url(${heroBanner})` }}>
      <div className="container hero-inner">
        <div className="hero-kicker">
          <div className="hero-tags">
            <Badge tone="warn">{t('brand.beta')}</Badge>
            <Badge tone="neutral">{t('hero.engine')}</Badge>
            <span className="hero-roadmap">
              <ProgressBadge
                phases={phases.map((p) => ({ status: p.status, label: t(p.titleKey) }))}
              />
              <span className="hero-roadmap-label">
                {t('hero.roadmap')} · {project.roadmapUpdated}
              </span>
            </span>
          </div>
          <p className="eyebrow">{t('hero.eyebrow')}</p>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title">
              <img className="hero-logo" src={heroLogo} alt={t('hero.logoAlt')} width={920} height={613} />
            </h1>
            <p className="hero-sub">{t('hero.title')}</p>
            <p className="hero-lead">{t('hero.lead')}</p>
            <div className="hero-ctas">
              <Button href="#downloads" icon="download">
                {t('hero.ctaDownload')}
              </Button>
              <Button href={links.youtube} external variant="ghost" icon="youtube">
                {t('hero.ctaWatch')}
              </Button>
              <Button href={links.github} external variant="ghost" icon="github">
                {t('nav.github')}
              </Button>
            </div>
          </div>

          <div className="hero-features-panel">
            <h2 className="hero-features-title">{t('overview.title')}</h2>
            <div className="hero-features">
              {FEATURES.map((f) => (
                <Card
                  key={f.titleKey}
                  className="hero-feature"
                  eyebrow={
                    <span className="feature-icon">
                      <Icon name={f.icon} size={20} />
                    </span>
                  }
                  title={t(f.titleKey)}
                >
                  <p className="card-text">{t(f.bodyKey)}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <TechChipList label={t('overview.techsLabel')} items={project.techs} />
      </div>
    </section>
  )
}
