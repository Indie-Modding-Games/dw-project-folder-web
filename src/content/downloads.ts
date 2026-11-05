import { links } from './links'
import type { IconName } from '../ui/Icon'

export type ReleaseStatus = 'available' | 'coming-soon'

/** Contrato único por plataforma: Linux y Windows usan el mismo card (LSP, §10.3). */
export interface PlatformRelease {
  id: 'linux' | 'windows'
  osKey: string
  icon: IconName
  status: ReleaseStatus
  url: string
  fileName: string
  versionLabel: string
  sizeLabel: string
  sha256: string
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
    // TODO: fijar cuando se publique la release (scripts/package_linux.sh).
    url: links.releases,
    fileName: 'dwe-beta-<version>-<commit>-linux-x86_64.tar.xz',
    versionLabel: 'beta 0.2',
    sizeLabel: '~260 MB',
    // TODO: generar el checksum junto al tarball.
    sha256: '',
    reqsKey: 'downloads.linuxReqs',
    howtoKey: 'downloads.linuxHowto',
  },
  {
    id: 'windows',
    osKey: 'Windows',
    icon: 'windows',
    status: 'available',
    // TODO: fijar URL directa, tamaño y checksum cuando se publique la release.
    url: links.releases,
    fileName: 'dwe-beta-<version>-<commit>-windows-x64.zip',
    versionLabel: 'beta 0.2',
    sizeLabel: '~300 MB',
    sha256: '',
    reqsKey: 'downloads.windowsReqs',
    howtoKey: 'downloads.windowsHowto',
  },
]
