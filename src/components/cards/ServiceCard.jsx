import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ServiceCard.css'

function ServiceCard({ service, index = 0 }) {
  const ref = useScrollReveal({ delay: (index % 4) * 0.07, y: 22 })

  return (
    <Link to={`/services#${service.slug}`} className="service-card" ref={ref}>
      <span className="service-card__index">{String(index + 1).padStart(2, '0')}</span>
      <h3>{service.name}</h3>
      <p>{service.short}</p>
      <span className="service-card__arrow" aria-hidden="true">
        <ArrowUpRight size={18} />
      </span>
    </Link>
  )
}

export default ServiceCard
