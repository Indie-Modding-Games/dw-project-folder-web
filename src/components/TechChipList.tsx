import { Chip } from '../ui/Chip'

export interface TechChipListProps {
  label: string
  items: readonly string[]
}

/** Lista de tecnologías como chips (nombres propios: no se traducen). */
export function TechChipList({ label, items }: TechChipListProps) {
  return (
    <div className="tech-chips">
      <span className="tech-chips-label">{label}</span>
      <div className="chip-row">
        {items.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
    </div>
  )
}
