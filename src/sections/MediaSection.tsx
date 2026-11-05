import { useState } from 'react'
import { VideoEmbed } from '../components/VideoEmbed'
import { VideoThumb } from '../components/VideoThumb'
import { links } from '../content/links'
import { videos } from '../content/videos'
import { useI18n } from '../i18n/context'
import { Button } from '../ui/Button'
import { SectionTitle } from '../ui/SectionTitle'

/** Devlogs y gameplay: un reproductor principal + miniaturas seleccionables. */
export function MediaSection() {
  const { t } = useI18n()
  const first = videos.find((v) => v.id)
  const [currentId, setCurrentId] = useState<string>(first?.id ?? '')
  const current = videos.find((v) => v.id === currentId)

  return (
    <section className="section" id="media">
      <div className="container">
        <SectionTitle
          id="media"
          eyebrow={t('media.eyebrow')}
          title={t('media.title')}
          subtitle={t('media.subtitle')}
        />
        <VideoEmbed id={currentId} title={current ? t(current.titleKey) : t('media.title')} />
        <div className="video-row">
          <div className="video-thumbs grid grid-4">
            {videos.map((video) => (
              <VideoThumb
                key={video.titleKey}
                video={video}
                title={t(video.titleKey)}
                active={video.id === currentId}
                onSelect={setCurrentId}
              />
            ))}
          </div>
          <Button href={links.youtube} external variant="ghost" icon="youtube">
            {t('media.subscribe')}
          </Button>
        </div>
      </div>
    </section>
  )
}
