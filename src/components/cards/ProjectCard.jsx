import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import StorePreview from '../common/StorePreview'
import Button from '../common/Button'
import './ProjectCard.css'

function ProjectCard({ project, size = 'default', index = 0 }) {
  const ref = useScrollReveal({ delay: (index % 3) * 0.08 })

  return (
    <article ref={ref} className={`project-card project-card--${size}`}>
      <Link to={`/work/${project.slug}`} className="project-card__media" aria-label={`View case study: ${project.name}`}>
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" className="project-card__image" />
        ) : (
          <StorePreview seed={index} label={project.name} wide={size === 'large'} />
        )}
        <span className="project-card__media-overlay">
          <ArrowUpRight size={20} aria-hidden="true" />
        </span>
      </Link>

      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="chip chip--accent">{project.category}</span>
          <span className="project-card__industry">{project.industry}</span>
        </div>

        <h3>
          <Link to={`/work/${project.slug}`}>{project.name}</Link>
        </h3>

        <p>{project.tagline}</p>

        {project.tech.length > 0 && (
          <ul className="project-card__tech">
            {project.tech.slice(0, 3).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}

        <Button variant="text" to={`/work/${project.slug}`} className="project-card__link">
          View Case Study
        </Button>
      </div>
    </article>
  )
}

export default ProjectCard
