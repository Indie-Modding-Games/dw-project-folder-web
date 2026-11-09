import { links } from './links'
import type { IconName } from '../ui/Icon'

export type ReleaseStatus = 'available' | 'coming-soon'

export type PlatformId = 'linux' | 'macos' | 'windows'

/** Una opción de descarga dentro de una plataforma (p. ej. AppImage, .deb, .dmg, .pkg). */
export interface DownloadFormat {
  /** Etiqueta visible del botón: nombre de formato técnico, no se traduce. */
  label: string
  /**
   * Fuentes regex ordenadas por prioridad, probadas (case-insensitive) contra el `name`
   * de los assets del último release. La primera coincidencia da esta opción; si ninguna
   * coincide (formato aún no publicado), la opción no se muestra.
   */
  patterns: string[]
}

/** Contrato único por plataforma: Linux, macOS y Windows usan el mismo card (LSP, §10.3). */
export interface PlatformRelease {
  id: PlatformId
  osKey: string
  icon: IconName
  status: ReleaseStatus
  /** URL de reserva (página de releases) mientras la API resuelve o si falla. */
  url: string
  fileName: string
  versionLabel: string
  sizeLabel: string
  sha256: string
  /** Opciones de descarga que esta plataforma intenta ofrecer desde la API. */
  formats: DownloadFormat[]
  /** Clave del catálogo con la lista de requisitos (tArr). */
  reqsKey: string
  /** Clave del catálogo con el cómo se ejecuta. */
  howtoKey: string
}

export const releases: PlatformRelease[] = [
  {
    id: 'linux',
    osKey: 'Linux',
    icon: 'linux',
    status: 'available',
    url: links.releases,
    fileName: 'dwe-launcher …amd64.AppImage',
    versionLabel: 'último release',
    sizeLabel: '~80 MB',
    sha256: '',
    // Dos instaladores de launcher reales hoy: AppImage portable y paquete .deb.
    formats: [
      { label: 'AppImage', patterns: ['\\.AppImage$'] },
      { label: '.deb', patterns: ['\\.deb$'] },
    ],
    reqsKey: 'downloads.linuxReqs',
    howtoKey: 'downloads.linuxHowto',
  },
  {
    id: 'macos',
    osKey: 'macOS',
    icon: 'apple',
    status: 'available',
    url: links.releases,
    fileName: 'dwe-launcher …universal.dmg',
    versionLabel: 'último release',
    sizeLabel: '~9 MB',
    sha256: '',
    // .dmg universal hoy; .pkg se muestra automáticamente cuando la CI lo publique;
    // el bundle .app empaquetado en tar.gz como opción avanzada.
    formats: [
      { label: '.dmg', patterns: ['\\.dmg$'] },
      { label: '.pkg', patterns: ['\\.pkg$', 'macos.*\\.pkg$'] },
      { label: '.app (tar.gz)', patterns: ['launcher\\.app\\.tar\\.gz$'] },
    ],
    reqsKey: 'downloads.macosReqs',
    howtoKey: 'downloads.macosHowto',
  },
  {
    id: 'windows',
    osKey: 'Windows',
    icon: 'windows',
    status: 'available',
    url: links.releases,
    fileName: 'dwe-launcher …x64-setup.exe',
    versionLabel: 'último release',
    sizeLabel: '~6 MB',
    sha256: '',
    // Instalador .exe del launcher; .zip portable como segunda opción si se publica.
    formats: [
      { label: 'Installer .exe', patterns: ['-setup\\.exe$', '\\.exe$'] },
      { label: '.zip', patterns: ['windows.*\\.zip$', 'win.*\\.zip$'] },
    ],
    reqsKey: 'downloads.windowsReqs',
    howtoKey: 'downloads.windowsHowto',
  },
]
