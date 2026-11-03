import SplitHeading from '../../../components/animations/SplitHeading'
import Breadcrumbs from '../../../components/common/Breadcrumbs'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { profile } from '../../../data/profile'
import './StoryHero.css'

const ABOUT_PHOTO = '/Abhishek Avaiya About Photo.png'

function StoryHero() {
  const photoRef = useScrollReveal({ delay: 0.15, y: 20 })

  return (
    <section className="section about-hero section--alt">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      </div>
      <div className="container about-hero__grid">
        <div className="about-hero__text">
          <span className="eyebrow">About</span>
          <SplitHeading
            as="h1"
            className="about-hero__heading"
            text={`I’m ${profile.name} — I build Shopify stores that hold up under real traffic.`}
            accentWord="real"
          />
          <p className="about-hero__sub">
            A {profile.role} based in {profile.location}, focused on theme architecture, Liquid, and the kind of
            technical decisions that only show up months after launch.
          </p>
        </div>

        <div ref={photoRef} className="about-hero__photo">
          <img
            src={ABOUT_PHOTO}
            width={832}
            height={1148}
            alt={`${profile.name}, ${profile.role}`}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

export default StoryHero
