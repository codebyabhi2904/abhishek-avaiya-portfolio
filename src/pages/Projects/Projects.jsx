import { useMemo, useState } from 'react'
import Seo from '../../components/common/Seo'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import CTASection from '../../components/common/CTASection'
import SplitHeading from '../../components/animations/SplitHeading'
import ProjectCard from '../../components/cards/ProjectCard'
import { projects, projectCategories } from '../../data/projects'
import './Projects.css'

function Projects() {
  const [filter, setFilter] = useState('All Projects')

  const filtered = useMemo(
    () => (filter === 'All Projects' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <>
      <Seo
        title="Work"
        description="A portfolio of Shopify and Shopify Plus projects — store builds, theme customization, and performance optimization work."
        path="/work"
      />

      <section className="section projects-hero section--alt">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Work' }]} />
          <SplitHeading
            as="h1"
            className="projects-hero__heading"
            text="Selected Shopify development work."
            accentWord="Selected"
          />
          <p className="projects-hero__sub">
            A selection of real client stores I've worked on, across Shopify and other platforms.
          </p>
        </div>
      </section>

      <section className="section projects-list">
        <div className="container">
          <h2 className="visually-hidden">All Projects</h2>
          <div className="projects-list__filters" role="group" aria-label="Filter projects by category">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                className={`filter-chip ${filter === category ? 'is-active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="projects-list__grid">
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} size={index % 5 === 0 ? 'large' : 'default'} />
            ))}
          </div>

          {filtered.length === 0 && <p className="projects-list__empty">No projects in this category yet.</p>}
        </div>
      </section>

      <CTASection />
    </>
  )
}

export default Projects
