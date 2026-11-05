import type { SVGProps } from 'react'

/** Set de iconos propios (siluetas simples; marcas representadas de forma estilizada). */
export type IconName =
  | 'download'
  | 'external'
  | 'play'
  | 'copy'
  | 'check'
  | 'sun'
  | 'moon'
  | 'globe'
  | 'github'
  | 'discord'
  | 'youtube'
  | 'kofi'
  | 'patreon'
  | 'linux'
  | 'windows'
  | 'book'
  | 'heart'
  | 'bug'

interface Glyph {
  d: string
  /** true → se dibuja con trazo en lugar de relleno. */
  stroke?: boolean
}

const ICONS: Record<IconName, Glyph> = {
  download: { d: 'M12 3v11M8 10.5l4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2', stroke: true },
  external: { d: 'M14 5h5v5M19 5l-8.5 8.5M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5', stroke: true },
  play: { d: 'M8 5.5v13l11-6.5z' },
  copy: { d: 'M9 8h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM5 15V5a1 1 0 0 1 1-1h8', stroke: true },
  check: { d: 'M5 12.5l4.5 4.5L19 7.5', stroke: true },
  sun: { d: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8', stroke: true },
  moon: { d: 'M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5z' },
  globe: { d: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M3.5 9h17M3.5 15h17M12 3c2.8 3.5 2.8 14.5 0 18M12 3c-2.8 3.5-2.8 14.5 0 18', stroke: true },
  github: { d: 'M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.3-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1.1.5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .3.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10z' },
  discord: { d: 'M9.3 17.5c-3.2-.5-4.9-2.4-5.4-4.9.9.7 2 1.1 3 1.2-.8-1.2-1.2-2.4-1-3.9.2-1.9 1.2-3.2 2.8-3.7 1.7-.5 3.2 0 4.3 1.4.6-.4 1.1-.6 1.7-.8.5 1.2 1 2.4 1 3.7 1.3-.2 2.5-.7 3.4-1.4-.5 2.6-2.1 4.9-4.8 5.8.3 1.1.7 1.8 1.3 2.3-1.3.7-2.7.6-3.9.3-.9-.3-2-.8-2.5-1.6zM14.8 9.8c0 .4.3.7.7.7s.7-.3.7-.7c0-.9-.3-1.5-.8-1.8-.4.3-.6.8-.6 1.8zM9.9 10.5c.4 0 .7-.3.7-.7 0-.9-.3-1.5-.8-1.8-.4.3-.6.8-.6 1.8 0 .4.3.7.7.7z' },
  youtube: { d: 'M22 12s0-3.6-.5-5.3c-.3-1-1-1.7-2-2C17.7 4.2 12 4.2 12 4.2s-5.7 0-7.5.5c-1 .3-1.7 1-2 2C2 8.4 2 12 2 12s0 3.6.5 5.3c.3 1 1 1.7 2 2 1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5c1-.3 1.7-1 2-2 .5-1.7.5-5.3.5-5.3zM10 15.2V8.8l5.5 3.2-5.5 3.2z' },
  kofi: { d: 'M3.5 8.5h11v5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4v-5zM14.5 9.5h1.2a2.3 2.3 0 0 1 0 4.6h-1.2M5 20h10', stroke: true },
  patreon: { d: 'M4.5 3.5h2.8V20.5H4.5zM11.7 3.5a6.8 6.8 0 1 0 0 13.6 6.8 6.8 0 0 0 0-13.6z' },
  linux: { d: 'M12 2.5c-2.9 0-4.7 2.3-4.7 5 0 1.7-.4 2.6-1.2 3.8C5.2 12.7 4.5 14.2 4.5 15.9c0 2.9 2.4 5 5.5 5.7.4.6 1.1 1.4 2 1.4s1.6-.8 2-1.4c3.1-.7 5.5-2.8 5.5-5.7 0-1.7-.7-3.2-1.6-4.6-.8-1.2-1.2-2.1-1.2-3.8 0-2.7-1.8-5-4.7-5z' },
  windows: { d: 'M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z' },
  book: { d: 'M12 5.5C10.5 4 8 3.5 4.5 3.8V18c3.5-.3 6 .2 7.5 1.8 1.5-1.6 4-2.1 7.5-1.8V3.8C16 3.5 13.5 4 12 5.5zM12 5.5V19.8', stroke: true },
  heart: { d: 'M12 20.3l-1.2-1.1C6 14.9 3 12.1 3 8.8 3 6 5.1 4 7.8 4c1.5 0 3 .7 4.2 2C13.2 4.7 14.7 4 16.2 4 18.9 4 21 6 21 8.8c0 3.3-3 6.1-7.8 10.4z' },
  bug: { d: 'M12 8c-1.9 0-3.5 2-3.5 4.5S10.1 17 12 17s3.5-2 3.5-4.5S13.9 8 12 8zM9 9.5 7 7.5M15 9.5l2-2M8 12.5H5.5M18.5 12.5H16M8.5 15.5 6.5 17.5M15.5 15.5l2 2', stroke: true },
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 18, ...rest }: IconProps) {
  const glyph = ICONS[name]
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path
        d={glyph.d}
        fill={glyph.stroke ? 'none' : 'currentColor'}
        stroke={glyph.stroke ? 'currentColor' : 'none'}
        strokeWidth={glyph.stroke ? 1.8 : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
