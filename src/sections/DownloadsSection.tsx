import { useMemo } from 'react'
import { releases, type PlatformRelease } from '../content/downloads'
import { DownloadPlatformCard } from '../components/DownloadPlatformCard'
import { useLatestRelease } from '../hooks/useLatestRelease'
import { useI18n } from '../i18n/context'
import { Icon } from '../ui/Icon'
import { SectionTitle } from '../ui/SectionTitle'

/**
 * Windows, macOS y Linux se renderizan desde el mismo dato: ningún `if` de SO aquí.
 * El enlace real, el nombre y el tamaño salen del último release de GitHub (la API);
 * si aún carga o falla, la tarjeta cae al enlace de reserva (página de releases).
 */
export function DownloadsSection() {
  const { t } = useI18n()
  const { loading, error, byPlatform } = useLatestRelease()

  // Una sola resolución por release: mezcla el def estático con el asset dinámico.
  const resolved = useMemo<PlatformRelease[]>(() => {
    return releases.map((def) => {
      const hit = byPlatform[def.id]
      if (hit) {
        return {
          ...def,
          status: 'available',
          url: hit.url,
          fileName: hit.fileName,
          versionLabel: hit.versionLabel,
          sizeLabel: hit.sizeLabel,
        }
      }
      // API confirmada y sin asset para esta plataforma → no hay versión directa.
      if (!loading && !error) return { ...def, status: 'coming-soon' }
      // Cargando o sin API: conserva el enlace de reserva.
      return def
    })
  }, [byPlatform, loading, error])

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
          {resolved.map((release) => (
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
