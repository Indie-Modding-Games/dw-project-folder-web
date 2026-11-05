/** Identidad del proyecto y estado del roadmap. Fuente: dw-engine/docs/roadmap.md (2026-10-20). */
export const project = {
  /** Nombre público: el proyecto. `engine` es el motor sobre el que corre. */
  name: 'Project Folder',
  engine: 'dwe',
  roadmapUpdated: '2026-10-20',
  /** Chips de tecnología — nombres propios, no se traducen. */
  techs: ['C++26', 'Vulkan 1.3', 'SDL3', 'Slang', 'Lua', 'EnTT', 'RmlUi', 'KTX2', 'Opus', 'CMake', 'vcpkg'],
} as const

export type PhaseStatus = 'done' | 'almost' | 'wip' | 'todo'

export interface Phase {
  id: number
  status: PhaseStatus
  /** Clave del catálogo i18n con el nombre y estado legible. */
  titleKey: string
}

/** Estado del port por fases (se muestra en el ProgressBadge del hero). */
export const phases: Phase[] = [
  { id: 0, status: 'almost', titleKey: 'phases.p0' },
  { id: 1, status: 'done', titleKey: 'phases.p1' },
  { id: 2, status: 'done', titleKey: 'phases.p2' },
  { id: 3, status: 'wip', titleKey: 'phases.p3' },
  { id: 4, status: 'todo', titleKey: 'phases.p4' },
]
