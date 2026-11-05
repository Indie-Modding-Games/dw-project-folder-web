/** Vídeos destacados. IDs de YouTube — añadir los reales aquí, nada en los componentes. */
export interface VideoRef {
  id: string
  titleKey: string
}

// TODO: sustituir por IDs reales de devlogs/gameplay.
export const videos: VideoRef[] = [
  { id: '', titleKey: 'media.v1' },
  { id: '', titleKey: 'media.v2' },
  { id: '', titleKey: 'media.v3' },
  { id: '', titleKey: 'media.v4' },
]
