import Seo from '../../components/common/Seo'
import CTASection from '../../components/common/CTASection'
import { profile } from '../../data/profile'
import StoryHero from './sections/StoryHero'
import MyStory from './sections/MyStory'
import ExpertiseGrid from './sections/ExpertiseGrid'
import Philosophy from './sections/Philosophy'
import Journey from './sections/Journey'

function About() {
  return (
    <>
      <Seo
        title="About"
        description={`${profile.name} is a Shopify & Shopify Plus Developer based in ${profile.location}. Learn about the journey, technical approach, and development philosophy behind the work.`}
        path="/about"
      />
      <StoryHero />
      <MyStory />
      <ExpertiseGrid />
      <Philosophy />
      <Journey />
      <CTASection
        eyebrow="Let's Connect"
        heading="Let's Build Something Great Together."
        description="Have a Shopify project in mind? I'd like to hear about it."
        primary={{ label: 'Start a Project', to: '/contact' }}
        secondary={{ label: 'View My Work', to: '/work' }}
      />
    </>
  )
}

export default About
