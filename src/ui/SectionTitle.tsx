export interface SectionTitleProps {
  /** id del <section> para anclas del header. */
  id: string
  eyebrow?: string
  title: string
  subtitle?: string
}

/** Título normalizado de sección; el `id` lo usa el anchor de navegación. */
export function SectionTitle({ id, eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="section-title" data-section={id}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  )
}
