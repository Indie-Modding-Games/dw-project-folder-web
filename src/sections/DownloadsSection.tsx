import { releases } from '../content/downloads'
import { DownloadPlatformCard } from '../components/DownloadPlatformCard'
import { useI18n } from '../i18n/context'
import { Icon } from '../ui/Icon'
import { SectionTitle } from '../ui/SectionTitle'

/** Windows y Linux se renderizan desde el mismo dato: ningún if de SO aquí arriba. */
export function DownloadsSection() {
  const { t } = useI18n()
  return (
    <section className="section" id="downloads">
      <div className="container">
        <SectionTitle
          id="downloads"
          eyebrow={t('downloads.eyebrow')}
          title={t('downloads.title')}
          subtitle={t('downloads.subtitle')}
        />
        <div className="grid grid-2 grid-sm">
          {releases.map((release) => (
            <DownloadPlatformCard key={release.id} release={release} />
          ))}
        </div>
        <p className="section-note">
          <Icon name="book" size={16} />
          <span>{t('downloads.note')}</span>
        </p>
      </div>
    </section>
  )
}
