import { processSteps } from '../../../data/process'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import SectionHeading from '../../../components/common/SectionHeading'
import './ProcessSection.css'

function ProcessStep({ step, index }) {
  const ref = useScrollReveal({ delay: (index % 3) * 0.08, y: 24 })

  return (
    <div ref={ref} className="process-step">
      <span className="process-step__number">{step.number}</span>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </div>
  )
}

function ProcessSection() {
  return (
    <section className="section process">
      <div className="container">
        <SectionHeading
          eyebrow="How I Work"
          title="A development process built for clarity"
          description="Six stages that keep a project on schedule, from first conversation to post-launch support."
        />

        <div className="process__grid">
          {processSteps.map((step, index) => (
            <ProcessStep key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
