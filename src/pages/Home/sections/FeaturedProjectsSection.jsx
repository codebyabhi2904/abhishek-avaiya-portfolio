import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../../../data/projects'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import SectionHeading from '../../../components/common/SectionHeading'
import Button from '../../../components/common/Button'
import StorePreview from '../../../components/common/StorePreview'
import './FeaturedProjectsSection.css'

function FeaturedRow({ project, index }) {
  const ref = useScrollReveal({ y: 44 })
  const reversed = index % 2 === 1

  return (
    <article ref={ref} className={`featured-row ${reversed ? 'featured-row--reverse' : ''}`}>
      <Link
        to={`/work/${project.slug}`}
        className="featured-row__media"
        aria-label={`View case study: ${project.name}`}
      >
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" className="featured-row__image" />
        ) : (
          <StorePreview seed={index} label={project.name} wide />
        )}
        <span className="featured-row__overlay">
          <ArrowUpRight size={22} aria-hidden="true" />
        </span>
      </Link>

      <div className="featured-row__body">
        <span className="featured-row__index">{String(index + 1).padStart(2, '0')}</span>
        <div className="featured-row__meta">
          <span className="chip chip--accent">{project.category}</span>
          <span className="featured-row__industry">{project.industry}</span>
        </div>
        <h3>
          <Link to={`/work/${project.slug}`}>{project.name}</Link>
        </h3>
        <p>{project.tagline}</p>
        {project.tech.length > 0 && (
          <ul className="featured-row__tech">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        <Button variant="text" to={`/work/${project.slug}`}>
          View Case Study
        </Button>
      </div>
    </article>
  )
}

function FeaturedProjectsSection() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section className="section featured-projects section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects engineered with intent"
          description="A sample of real client stores I've worked on, across Shopify and other platforms."
        />

        <div className="featured-projects__list">
          {featured.map((project, index) => (
            <FeaturedRow key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="featured-projects__cta">
          <Button variant="secondary" to="/work" icon={false}>
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjectsSection
