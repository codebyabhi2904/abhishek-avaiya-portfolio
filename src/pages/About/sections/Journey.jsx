import { journey } from '../../../data/journey'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import SectionHeading from '../../../components/common/SectionHeading'
import './Journey.css'

function JourneyItem({ item, index }) {
  const ref = useScrollReveal({ delay: (index % 4) * 0.06, y: 18 })

  return (
    <div ref={ref} className="journey-item">
      <span className="journey-item__year">{item.year}</span>
      <div className="journey-item__body">
        <h3>{item.title}</h3>
        <span className="journey-item__place">{item.place}</span>
        <p>{item.description}</p>
      </div>
    </div>
  )
}

function Journey() {
  return (
    <section className="section journey section--alt">
      <div className="container">
        <SectionHeading eyebrow="Professional Journey" title="Milestones along the way" />
        <div className="journey__list">
          {journey.map((item, index) => (
            <JourneyItem key={item.title + item.year} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey
