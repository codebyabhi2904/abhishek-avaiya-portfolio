import { expertiseAreas } from '../../../data/skills'
import { useStaggerReveal } from '../../../hooks/useScrollReveal'
import SectionHeading from '../../../components/common/SectionHeading'
import './ExpertiseSection.css'

function ExpertiseSection() {
  const ref = useStaggerReveal({ selector: '.expertise__item', y: 16, stagger: 0.04 })

  return (
    <section className="section expertise section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Shopify Expertise"
          title="Advanced Shopify development capabilities"
          description="The technical surface area I work in day to day — beyond standard theme edits."
        />

        <div ref={ref} className="expertise__list">
          {expertiseAreas.map((item, index) => (
            <div className="expertise__item" key={item.name}>
              <span className="expertise__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="expertise__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpertiseSection
