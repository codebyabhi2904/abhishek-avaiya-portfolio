import { skillGroups } from '../../../data/skills'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import SectionHeading from '../../../components/common/SectionHeading'
import './ExpertiseGrid.css'

function SkillGroupCard({ group, index }) {
  const ref = useScrollReveal({ delay: index * 0.08 })

  return (
    <div ref={ref} className="skill-group-card">
      <h3>{group.title}</h3>
      <ul>
        {group.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

function ExpertiseGrid() {
  return (
    <section className="section expertise-grid section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Expertise"
          title="Technical capabilities"
          description="Shopify, frontend development, and the broader eCommerce architecture skills behind it."
        />
        <div className="skill-group-grid">
          {skillGroups.map((group, index) => (
            <SkillGroupCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpertiseGrid
