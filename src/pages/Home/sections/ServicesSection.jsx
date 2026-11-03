import { services, featuredServiceSlugs } from '../../../data/services'
import ServiceCard from '../../../components/cards/ServiceCard'
import SectionHeading from '../../../components/common/SectionHeading'
import Button from '../../../components/common/Button'
import './ServicesSection.css'

function ServicesSection() {
  const featured = featuredServiceSlugs.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean)

  return (
    <section className="section services">
      <div className="container">
        <SectionHeading
          eyebrow="What I Do"
          title="Focused Shopify development services"
          description="From full store builds to deep Shopify Plus customization — development work built around how your store actually needs to run."
          action={
            <Button variant="secondary" to="/services" icon={false}>
              Discover My Services
            </Button>
          }
        />

        <div className="services__grid">
          {featured.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
