import type { PlatformRelease } from '../content/downloads'
import type { ResolvedFormat } from '../hooks/useLatestRelease'
import { useI18n } from '../i18n/context'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { KeyValue } from '../ui/KeyValue'

export interface DownloadPlatformCardProps {
  release: PlatformRelease
  /** Opciones resueltas desde la API; vacío → botón único de reserva o deshabilitado. */
  options: ResolvedFormat[]
}

/**
 * Tarjeta de descarga por plataforma. Linux, macOS y Windows usan ESTE mismo componente:
 * el estado y las opciones (AppImage, .deb, .dmg, .pkg…) llegan como props, no hay
 * ningún `if` con el nombre del SO (LSP). Una plataforma puede ofrecer varias descargas.
 */
export function DownloadPlatformCard({ release, options }: DownloadPlatformCardProps) {
  const { t, tArr } = useI18n()
  const available = release.status === 'available'
  const primary = options[0]
  const title = primary ? primary.fileName : release.fileName

  // Pie de la tarjeta: una fila de botones (una por formato) o el enlace de reserva.
  let footer
  if (available && options.length > 0) {
    footer = (
      <>
        {options.map((opt) => (
          <Button key={opt.url} href={opt.url} external icon="download">
            {opt.label} · {opt.sizeLabel}
          </Button>
        ))}
      </>
    )
  } else if (available) {
    // Cargando o sin API: enlazamos a la página de releases como reserva.
    footer = (
      <Button href={release.url} external icon="download">
        {t('downloads.download')}
      </Button>
    )
  } else {
    footer = (
      <Button disabled icon="download">
        {t('downloads.download')}
      </Button>
    )
  }

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
      title={title}
      footer={footer}
    >
      <div className="kv-list">
        <KeyValue label={t('downloads.version')} value={release.versionLabel} />
        <KeyValue
          label={t('downloads.formats')}
          value={
            options.length > 0
              ? options.map((o) => o.label).join(' · ')
              : t('downloads.pending')
          }
        />
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
