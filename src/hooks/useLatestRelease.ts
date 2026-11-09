import { useEffect, useState } from 'react'
import { links } from '../content/links'
import { releases, type PlatformId } from '../content/downloads'

/** Asset tal como lo devuelve la API de GitHub (solo los campos que usamos). */
interface GhAsset {
  name: string
  size: number
  browser_download_url: string
}

interface GhRelease {
  tag_name: string
  name: string | null
  draft: boolean
  prerelease: boolean
  published_at: string | null
  created_at: string
  assets: GhAsset[]
}

/** Descarga resuelta para una plataforma desde el último release. */
export interface ResolvedAsset {
  url: string
  fileName: string
  versionLabel: string
  sizeLabel: string
}

export interface LatestReleaseState {
  loading: boolean
  error: boolean
  /** Resolución por plataforma: asset → descarga directa; undefined → usar enlace de reserva. */
  byPlatform: Partial<Record<PlatformId, ResolvedAsset>>
}

const EMPTY: LatestReleaseState = { loading: true, error: false, byPlatform: {} }

/** Bytes → etiqueta legible en MB (1 MB = 1024² bytes), sin decimales largos. */
function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024)
  if (mb >= 100) return `~${Math.round(mb)} MB`
  return `~${mb.toFixed(1)} MB`
}

/** Primera coincidencia entre `patterns` y los assets del release (case-insensitive). */
function matchAsset(release: GhRelease, patterns: string[]): ResolvedAsset | undefined {
  for (const source of patterns) {
    const re = new RegExp(source, 'i')
    // Descartamos los .sig: nunca coinciden con los patrones de instalador, por seguridad.
    const asset = release.assets.find((a) => re.test(a.name))
    if (asset) {
      return {
        url: asset.browser_download_url,
        fileName: asset.name,
        versionLabel: release.tag_name,
        sizeLabel: formatSize(asset.size),
      }
    }
  }
  return undefined
}

/**
 * Cache del fetch a nivel de módulo: deduplica la doble llamada del StrictMode en dev
 * y evita recargas si el componente se monta más de una vez en la misma sesión.
 */
let inFlight: Promise<GhRelease[]> | null = null

async function loadReleases(): Promise<GhRelease[]> {
  if (!inFlight) {
    // `/releases/latest` excluye prereleases (este repo solo publica prereleases),
    // así que pedimos la lista y elegimos el más reciente no-borrador.
    inFlight = fetch(`${links.releaseApi}?per_page=10`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`)
        return res.json() as Promise<GhRelease[]>
      })
      .catch((err) => {
        // Un fallo no debe quedar cacheado para siempre: permite reintento.
        inFlight = null
        throw err
      })
  }
  return inFlight
}

/** Ordena por fecha (publicado o, si no, creado) y devuelve el último no-borrador. */
function pickLatest(list: GhRelease[]): GhRelease | null {
  const real = list.filter((r) => !r.draft)
  if (real.length === 0) return null
  return real.reduce((a, b) => {
    const at = Date.parse(a.published_at ?? a.created_at) || 0
    const bt = Date.parse(b.published_at ?? b.created_at) || 0
    return bt > at ? b : a
  })
}

/**
 * Descarga el último release del motor y resuelve el instalador de launcher de cada
 * plataforma. Sin `if` de SO en la UI: el matching vive aquí y en las `assetPatterns`.
 */
export function useLatestRelease(): LatestReleaseState {
  const [state, setState] = useState<LatestReleaseState>(EMPTY)

  useEffect(() => {
    let ignore = false
    loadReleases()
      .then((list) => {
        if (ignore) return
        const latest = pickLatest(list)
        if (!latest) {
          setState({ loading: false, error: true, byPlatform: {} })
          return
        }
        const byPlatform: Partial<Record<PlatformId, ResolvedAsset>> = {}
        for (const platform of releases) {
          const hit = matchAsset(latest, platform.assetPatterns)
          if (hit) byPlatform[platform.id] = hit
        }
        setState({ loading: false, error: false, byPlatform })
      })
      .catch(() => {
        if (ignore) return
        // Sin API seguimos útil: las tarjetas enlazan a la página de releases.
        setState({ loading: false, error: true, byPlatform: {} })
      })
    return () => {
      ignore = true
    }
  }, [])

  return state
}
