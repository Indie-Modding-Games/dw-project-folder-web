import { links } from './links'
import type { IconName } from '../ui/Icon'

export type ReleaseStatus = 'available' | 'coming-soon'

export type PlatformId = 'linux' | 'macos' | 'windows'

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
  /**
   * Regex (fuentes) ordenadas por prioridad, probadas contra el `name` de cada asset
   * del último release (sin distinción de mayúsculas). La primera que coincide define
   * la descarga de esta plataforma. Así el SO es dato, no un `if` en el componente.
   */
  assetPatterns: string[]
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
    // La URL real llega de la API (useLatestRelease); esto es el enlace de reserva.
    url: links.releases,
    fileName: 'dwe-launcher …amd64.AppImage',
    versionLabel: 'último release',
    sizeLabel: '~80 MB',
    sha256: '',
    // El instalador de launcher (AppImage / .deb); nunca el tarball del motor.
    assetPatterns: ['\\.AppImage$', '\\.deb$', 'linux.*\\.tar\\.xz$'],
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
    // El lanzador macOS: .dmg universal (Intel + Apple Silicon).
    assetPatterns: ['\\.dmg$', '\\.pkg$', 'macos.*\\.tar\\.gz$', 'launcher\\.app\\.tar\\.gz$'],
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
    // El instalador de launcher .exe; nunca el tarball del motor.
    assetPatterns: ['-setup\\.exe$', '\\.exe$', 'windows.*\\.zip$'],
    reqsKey: 'downloads.windowsReqs',
    howtoKey: 'downloads.windowsHowto',
  },
]
