import { useScrollReveal } from '../../hooks/useScrollReveal'
import './SectionHeading.css'

function SectionHeading({ eyebrow, title, description, align = 'left', action, size = 'default' }) {
  const ref = useScrollReveal()

  return (
    <div ref={ref} className={`section-heading section-heading--${align} section-heading--${size}`}>
      <div className="section-heading__text">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p className="section-heading__desc">{description}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </div>
  )
}

export default SectionHeading
