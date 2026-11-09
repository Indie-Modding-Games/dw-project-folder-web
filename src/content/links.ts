/** Links externos. Única fuente: componentes y secciones nunca escriben URLs. */
export const links = {
  github: 'https://github.com/indie-modding-games/dw-engine',
  // Página de releases (no /latest: el repo publica prereleases, que /latest excluye).
  releases: 'https://github.com/indie-modding-games/dw-engine/releases',
  // API de GitHub para resolver el launcher del último release (excluye drafts; ver §useLatestRelease).
  releaseApi: 'https://api.github.com/repos/Indie-Modding-Games/dw-engine/releases',
  docs: 'https://indie-modding-games.github.io/dw-engine/',
  discord: 'https://discord.gg/CzYCB4MgZ',
  youtube: 'https://www.youtube.com/@DigimonWorldProjectFolder',
  kofi: 'https://ko-fi.com/indiemoddinggames',
  patreon: 'https://www.patreon.com/cw/IndieModdingGames',
} as const
