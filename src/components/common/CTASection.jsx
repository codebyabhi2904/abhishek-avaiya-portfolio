import { useScrollReveal } from '../../hooks/useScrollReveal'
import Button from './Button'
import './CTASection.css'

function CTASection({
  eyebrow = 'Start a Project',
  heading = 'Have an Ambitious Shopify Project?',
  description = "Let's build something exceptional together.",
  primary = { label: 'Start a Project', to: '/contact' },
  secondary = { label: 'Explore My Work', to: '/work' },
}) {
  const ref = useScrollReveal({ y: 40 })

  return (
    <section className="cta-banner section--alt">
      <div className="container">
        <div ref={ref} className="cta-banner__inner">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          <p>{description}</p>
          <div className="cta-group cta-banner__actions">
            <Button variant="primary" to={primary.to}>
              {primary.label}
            </Button>
            <Button variant="secondary" to={secondary.to} icon={false}>
              {secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
