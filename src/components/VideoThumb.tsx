import type { VideoRef } from '../content/videos'
import { Icon } from '../ui/Icon'

export interface VideoThumbProps {
  video: VideoRef
  title: string
  active: boolean
  onSelect: (id: string) => void
}

/** Miniatura clicable del grid de vídeos. */
export function VideoThumb({ video, title, active, onSelect }: VideoThumbProps) {
  return (
    <button
      type="button"
      className={`video-thumb${active ? ' is-active' : ''}`}
      onClick={() => video.id && onSelect(video.id)}
      aria-pressed={active}
      disabled={!video.id}
    >
      {video.id ? (
        <img
          src={`https://i.ytimg.com/vi/${encodeURIComponent(video.id)}/hqdefault.jpg`}
          alt={title}
          loading="lazy"
        />
      ) : (
        <span className="video-thumb-empty" aria-hidden="true" />
      )}
      <span className="video-thumb-play">
        <Icon name="play" size={16} />
      </span>
      <span className="video-thumb-title">{title}</span>
    </button>
  )
}
