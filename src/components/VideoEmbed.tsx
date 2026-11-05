import { useI18n } from '../i18n/context'

export interface VideoEmbedProps {
  /** ID de YouTube; vacío → placeholder honesto (sin vídeos falsos). */
  id: string
  title: string
}

/** Reproductor embebido con carga perezosa y sin cookies (youtube-nocookie). */
export function VideoEmbed({ id, title }: VideoEmbedProps) {
  const { t } = useI18n()
  if (!id) {
    return (
      <div className="video-frame video-placeholder">
        <p>{t('media.placeholder')}</p>
      </div>
    )
  }
  return (
    <div className="video-frame">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
