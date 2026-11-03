import { developmentPhilosophy } from '../../../data/skills'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import SectionHeading from '../../../components/common/SectionHeading'
import './Philosophy.css'

function PhilosophyItem({ item, index }) {
  const ref = useScrollReveal({ delay: (index % 3) * 0.07, y: 20 })

  return (
    <div ref={ref} className="philosophy-item">
      <span className="philosophy-item__index">{String(index + 1).padStart(2, '0')}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  )
}

function Philosophy() {
  return (
    <section className="section philosophy">
      <div className="container">
        <SectionHeading eyebrow="Philosophy" title="How I approach development" align="center" />
        <div className="philosophy__grid">
          {developmentPhilosophy.map((item, index) => (
            <PhilosophyItem key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Philosophy
