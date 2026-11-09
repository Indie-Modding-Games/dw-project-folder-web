import { useMemo } from 'react'
import { links } from '../content/links'
import { releases, type PlatformRelease } from '../content/downloads'
import { DownloadPlatformCard } from '../components/DownloadPlatformCard'
import { useLatestRelease, type ResolvedFormat } from '../hooks/useLatestRelease'
import { useI18n } from '../i18n/context'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionTitle } from '../ui/SectionTitle'

interface CardData {
  release: PlatformRelease
  options: ResolvedFormat[]
}

/**
 * Windows, macOS y Linux se renderizan desde el mismo dato: ningún `if` de SO aquí.
 * El enlace real, el nombre y el tamaño salen del último release de GitHub (la API).
 * Una plataforma puede ofrecer varias opciones (AppImage, .deb, .dmg, .pkg, .exe…).
 */
export function DownloadsSection() {
  const { t } = useI18n()
  const { loading, error, byPlatform, releaseUrl } = useLatestRelease()

  const data = useMemo<CardData[]>(() => {
    return releases.map((def) => {
      const res = byPlatform[def.id]
      const options = res?.formats ?? []
      if (res && options.length > 0) {
        // Resolución confirmada con al menos un formato: versión del tag + "available".
        return { release: { ...def, versionLabel: res.versionLabel, status: 'available' }, options }
      }
      if (!loading && !error) {
        // API cargada y sin ninguna opción para esta plataforma → "en camino".
        return { release: { ...def, status: 'coming-soon' }, options }
      }
      // Cargando o sin API: conserva el enlace de reserva (página de releases).
      return { release: def, options }
    })
  }, [byPlatform, loading, error])

  // Enlace directo a la prerelease más reciente (o a la lista de releases si falla).
  const prereleaseUrl = releaseUrl ?? links.releases

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
          {data.map(({ release, options }) => (
            <DownloadPlatformCard key={release.id} release={release} options={options} />
          ))}
        </div>
        <p className="downloads-prereleases">
          <Button href={prereleaseUrl} external variant="ghost" icon="github">
            {t('downloads.viewPrereleases')}
          </Button>
          <Icon name="bug" size={15} />
          <span>{t('downloads.prereleasesHint')}</span>
        </p>
        <p className="section-note">
          <Icon name="book" size={16} />
          <span>{t('downloads.note')}</span>
        </p>
      </div>
    </section>
  )
}
