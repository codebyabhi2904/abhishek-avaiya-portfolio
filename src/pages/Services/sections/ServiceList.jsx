import { ArrowUpRight, Check } from 'lucide-react'
import { services } from '../../../data/services'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import Button from '../../../components/common/Button'
import './ServiceList.css'

function ServiceCard({ service, index }) {
  const ref = useScrollReveal({ delay: (index % 2) * 0.08, y: 28 })

  return (
    <article ref={ref} id={service.slug} className="service-detail-card">
      <div className="service-detail-card__top">
        <span className="service-detail-card__index">{String(index + 1).padStart(2, '0')}</span>
        <ArrowUpRight size={20} className="service-detail-card__arrow" aria-hidden="true" />
      </div>

      <h2>{service.name}</h2>
      <p className="service-detail-card__desc">{service.description}</p>

      <ul className="service-detail-card__capabilities">
        {service.capabilities.map((item) => (
          <li key={item}>
            <Check size={15} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <div className="service-detail-card__footer">
        <p className="service-detail-card__benefit">{service.benefits[0]}</p>
        <Button variant="text" to="/contact" className="service-detail-card__cta">
          Discuss Your Project
        </Button>
      </div>
    </article>
  )
}

function ServiceList() {
  return (
    <section className="section service-list-section">
      <div className="container">
        <div className="service-list">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceList
