export type PhaseVisualStatus = 'done' | 'almost' | 'wip' | 'todo'

export interface ProgressPhase {
  status: PhaseVisualStatus
  /** Texto accesible (tooltip + aria-label). */
  label: string
}

export interface ProgressBadgeProps {
  phases: ProgressPhase[]
}

/** Puntos de progreso del roadmap; recibe datos planos (el dominio queda en sections/). */
export function ProgressBadge({ phases }: ProgressBadgeProps) {
  return (
    <div className="phase-dots" role="list" aria-label="roadmap">
      {phases.map((phase, i) => (
        <span
          key={i}
          role="listitem"
          className={`phase-dot phase-${phase.status}`}
          title={phase.label}
          aria-label={phase.label}
        />
      ))}
    </div>
  )
}
