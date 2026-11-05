import { useI18n } from '../i18n/context'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon, type IconName } from '../ui/Icon'

export interface DonateOptionCardProps {
  icon: IconName
  titleKey: string
  bodyKey: string
  ctaKey: string
  href: string
}

/** Opción de donación; Ko-fi y Patreon comparten contrato, solo cambian los datos (LSP). */
export function DonateOptionCard({ icon, titleKey, bodyKey, ctaKey, href }: DonateOptionCardProps) {
  const { t } = useI18n()
  return (
    <Card
      className="donate-card"
      eyebrow={
        <span className="os-row">
          <Icon name={icon} size={20} />
          <span className="os-name">{t(titleKey)}</span>
        </span>
      }
      footer={
        <Button href={href} external variant="ghost" icon="heart">
          {t(ctaKey)}
        </Button>
      }
    >
      <p className="card-text">{t(bodyKey)}</p>
    </Card>
  )
}
