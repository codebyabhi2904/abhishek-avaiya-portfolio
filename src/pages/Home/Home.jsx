import Seo from '../../components/common/Seo'
import CTASection from '../../components/common/CTASection'
import { profile } from '../../data/profile'
import HeroSection from './sections/HeroSection'
import TrustSection from './sections/TrustSection'
import IntroSection from './sections/IntroSection'
import ServicesSection from './sections/ServicesSection'
import FeaturedProjectsSection from './sections/FeaturedProjectsSection'
import ExpertiseSection from './sections/ExpertiseSection'
import ProcessSection from './sections/ProcessSection'
import TestimonialsSection from './sections/TestimonialsSection'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: profile.name,
  description: 'Shopify & Shopify Plus development services.',
  url: profile.siteUrl,
  areaServed: 'Worldwide',
  founder: {
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: profile.siteUrl,
  },
}

function Home() {
  return (
    <>
      <Seo
        title="Shopify & Shopify Plus Developer"
        description="Abhishek Avaiya engineers scalable, high-performing Shopify and Shopify Plus experiences — combining technical precision, thoughtful design, and measurable business impact."
        path="/"
        jsonLd={jsonLd}
      />
      <HeroSection />
      <TrustSection />
      <IntroSection />
      <ServicesSection />
      <FeaturedProjectsSection />
      <ExpertiseSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

export default Home
