import { testimonials } from '../../../data/testimonials'
import TestimonialCard from '../../../components/cards/TestimonialCard'
import SectionHeading from '../../../components/common/SectionHeading'
import './TestimonialsSection.css'

function TestimonialsSection() {
  return (
    <section className="section testimonials section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say"
          description="Placeholder testimonials — ready to be replaced with verified client feedback."
        />

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name + index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
