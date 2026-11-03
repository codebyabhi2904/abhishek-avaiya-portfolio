import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../../components/common/Seo'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import CTASection from '../../components/common/CTASection'
import Button from '../../components/common/Button'
import SplitHeading from '../../components/animations/SplitHeading'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { getProjectBySlug, getRelatedProject, projects } from '../../data/projects'
import { profile } from '../../data/profile'
import NotFound from '../NotFound/NotFound'
import StorePreview from '../../components/common/StorePreview'
import './CaseStudy.css'

function Block({ eyebrow, title, children, theme = '' }) {
  const ref = useScrollReveal()
  return (
    <section className={`section case-block ${theme}`}>
      <div className="container case-block__inner" ref={ref}>
        <div className="case-block__label">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
        </div>
        <div className="case-block__body">{children}</div>
      </div>
    </section>
  )
}

function CaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) return <NotFound />

  const related = getRelatedProject(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    about: project.industry,
    creator: { '@type': 'Person', name: profile.name },
  }

  return (
    <>
      <Seo title={project.name} description={project.tagline} path={`/work/${project.slug}`} jsonLd={jsonLd} />

      <section className="section case-hero section--alt">
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'Home', to: '/' }, { label: 'Work', to: '/work' }, { label: project.name }]}
          />
          <div className="case-hero__meta">
            <span className="chip chip--accent">{project.category}</span>
            <span>{project.industry}</span>
          </div>
          <SplitHeading as="h1" className="case-hero__heading" text={project.name} />
          <p className="case-hero__tagline">{project.tagline}</p>
        </div>
        <div className="container">
          <div className="case-hero__media">
            {project.image ? (
              <img src={project.image} alt={`${project.name} storefront`} loading="eager" className="case-hero__image" />
            ) : (
              <StorePreview seed={projects.indexOf(project)} label={project.name} wide />
            )}
          </div>
        </div>
      </section>

      <Block eyebrow="Overview" title="About This Store" theme="">
        <p>{project.tagline}</p>
        {project.tech.length > 0 && (
          <div className="case-block__tags">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}
        <Button variant="secondary" href={project.liveUrl} className="case-block__visit">
          Visit Live Site
        </Button>
      </Block>

      <section className="section case-next section--alt">
        <div className="container">
          <Link to={`/work/${related.slug}`} className="case-next__link">
            <span className="eyebrow">Next Project</span>
            <h2>{related.name}</h2>
            <span className="case-next__arrow" aria-hidden="true">
              <ArrowUpRight size={22} />
            </span>
          </Link>
        </div>
      </section>

      <CTASection
        eyebrow="Start a Project"
        heading="Have a Similar Project in Mind?"
        description="Let's talk through what you're building."
      />
    </>
  )
}

export default CaseStudy
