import { useEffect, useRef } from 'react'
import SplitHeading from '../../../components/animations/SplitHeading'
import Typewriter from '../../../components/animations/Typewriter'
import Button from '../../../components/common/Button'
import { gsap, prefersReducedMotion } from '../../../lib/gsap'
import { heroHighlights } from '../../../data/profile'
import './HeroSection.css'

function HeroSection() {
  const introRef = useRef(null)
  const visualRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })
      tl.fromTo(introRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      tl.fromTo(
        visualRef.current.children,
        { opacity: 0, y: 30, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
        '-=0.5'
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero section--alt">
      <div className="container">
        <span className="eyebrow hero__eyebrow">
          <Typewriter words={['Shopify Developer', 'Shopify Plus Developer']} />
        </span>

        <SplitHeading
          as="h1"
          className="hero__headline"
          text="Engineering Exceptional Shopify Experiences."
          accentWord="Exceptional"
        />

        <div className="hero__row">
          <div ref={introRef} className="hero__intro">
            <p>
              I build scalable, high-performing Shopify and Shopify Plus experiences that combine technical
              precision, thoughtful design, and measurable business impact.
            </p>

            <div className="cta-group hero__cta">
              <Button variant="primary" to="/work">
                Explore My Work
              </Button>
              <Button variant="secondary" to="/contact" icon={false}>
                Let's Discuss Your Project
              </Button>
            </div>

            <ul className="hero__highlights">
              {heroHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div ref={visualRef} className="hero__visual" aria-hidden="true">
            <div className="hero__window">
              <div className="hero__window-bar">
                <span className="hero__window-dot" />
                <span className="hero__window-dot" />
                <span className="hero__window-dot" />
                <span className="hero__window-file">featured-collection.liquid</span>
              </div>
              <pre className="hero__code">
                <code>
                  <span className="hc-tag">{'{%'}</span> <span className="hc-kw">if</span>{' '}
                  <span className="hc-var">section.settings.enable_badge</span> <span className="hc-tag">{'%}'}</span>
                  {'\n  '}
                  <span className="hc-tag">&lt;span</span> <span className="hc-attr">class</span>=
                  <span className="hc-str">"badge badge--plus"</span>
                  <span className="hc-tag">&gt;</span>
                  {'\n    '}
                  <span className="hc-tag">{'{{'}</span> <span className="hc-var">section.settings.badge_text</span>{' '}
                  <span className="hc-tag">{'}}'}</span>
                  {'\n  '}
                  <span className="hc-tag">&lt;/span&gt;</span>
                  {'\n'}
                  <span className="hc-tag">{'{%'}</span> <span className="hc-kw">endif</span>{' '}
                  <span className="hc-tag">{'%}'}</span>
                </code>
              </pre>
              <div className="hero__badges">
                <span className="hero__badge">Liquid</span>
                <span className="hero__badge">Shopify Plus</span>
                <span className="hero__badge">GraphQL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
