import Seo from '../../components/common/Seo'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import CTASection from '../../components/common/CTASection'
import SplitHeading from '../../components/animations/SplitHeading'
import ServiceList from './sections/ServiceList'
import { profile } from '../../data/profile'
import './Services.css'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Shopify Development',
  provider: { '@type': 'Person', name: profile.name },
  areaServed: 'Worldwide',
}

function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Shopify Store Development, Shopify Plus, Checkout Extensibility, performance optimization, and more — the development services I offer."
        path="/services"
        jsonLd={jsonLd}
      />

      <section className="section services-hero section--alt">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
          <SplitHeading
            as="h1"
            className="services-hero__heading"
            text="Shopify development, done properly."
            accentWord="properly"
          />
          <p className="services-hero__sub">
            From full store builds to deep Shopify Plus customization — thirteen services covering the
            development work most Shopify stores actually need.
          </p>
        </div>
      </section>

      <ServiceList />

      <CTASection
        eyebrow="Project Inquiry"
        heading="Not sure which service you need?"
        description="Tell me about your store and I'll help you figure out the right scope."
        primary={{ label: 'Discuss Your Project', to: '/contact' }}
        secondary={{ label: 'View My Work', to: '/work' }}
      />
    </>
  )
}

export default Services
