import type { PlatformRelease } from '../content/downloads'
import { useI18n } from '../i18n/context'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { KeyValue } from '../ui/KeyValue'

export interface DownloadPlatformCardProps {
  release: PlatformRelease
}

/**
 * Tarjeta de descarga por plataforma. Linux y Windows usan ESTE mismo componente:
 * el estado ('available' | 'coming-soon') es un prop, no un if con el nombre del SO (LSP).
 */
export function DownloadPlatformCard({ release }: DownloadPlatformCardProps) {
  const { t, tArr } = useI18n()
  const available = release.status === 'available'

  return (
    <Card
      className="download-card"
      eyebrow={
        <span className="os-row">
          <Icon name={release.icon} size={20} />
          <span className="os-name">{release.osKey}</span>
          <Badge tone={available ? 'success' : 'warn'}>
            {t(available ? 'downloads.available' : 'downloads.soon')}
          </Badge>
        </span>
      }
      title={release.fileName}
      footer={
        available ? (
          <Button href={release.url} external icon="download">
            {t('downloads.download')}
          </Button>
        ) : (
          <Button disabled icon="download">
            {t('downloads.download')}
          </Button>
        )
      }
    >
      <div className="kv-list">
        <KeyValue label={t('downloads.version')} value={release.versionLabel} />
        <KeyValue label={t('downloads.size')} value={release.sizeLabel} />
        {release.sha256 ? (
          <KeyValue
            label={t('downloads.sha')}
            value={`${release.sha256.slice(0, 16)}…`}
            copyText={release.sha256}
            copyLabel={t('downloads.sha')}
            copiedLabel={t('downloads.copied')}
          />
        ) : (
          <KeyValue label={t('downloads.sha')} value={t('downloads.pending')} />
        )}
      </div>
      <p className="card-text">{t(release.howtoKey)}</p>
      <p className="reqs-label">{t('downloads.requirements')}</p>
      <ul className="reqs-list">
        {tArr(release.reqsKey).map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>
    </Card>
  )
}
