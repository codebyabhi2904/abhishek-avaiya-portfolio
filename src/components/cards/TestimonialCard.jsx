import { useScrollReveal } from '../../hooks/useScrollReveal'
import './TestimonialCard.css'

function TestimonialCard({ testimonial, index = 0 }) {
  const ref = useScrollReveal({ delay: (index % 3) * 0.08 })

  return (
    <figure ref={ref} className="testimonial-card">
      <blockquote>“{testimonial.quote}”</blockquote>
      <figcaption>
        <span className="testimonial-card__avatar" aria-hidden="true">
          {testimonial.name.charAt(0)}
        </span>
        <div>
          <span className="testimonial-card__name">{testimonial.name}</span>
          <span className="testimonial-card__role">
            {testimonial.role}, {testimonial.company}
          </span>
        </div>
      </figcaption>
    </figure>
  )
}

export default TestimonialCard
