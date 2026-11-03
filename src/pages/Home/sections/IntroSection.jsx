import SplitHeading from '../../../components/animations/SplitHeading'
import Button from '../../../components/common/Button'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import './IntroSection.css'

function IntroSection() {
  const textRef = useScrollReveal({ delay: 0.1 })

  return (
    <section className="section intro section--alt">
      <div className="container intro__grid">
        <SplitHeading
          as="h2"
          trigger="scroll"
          className="intro__heading"
          text="Turning Complex eCommerce Ideas Into Powerful Digital Experiences."
          accentWord="Powerful"
        />

        <div ref={textRef} className="intro__content">
          <p>
            Shopify development isn&rsquo;t just about Liquid syntax — it&rsquo;s about understanding how a store
            needs to scale, how merchants will actually use it, and where performance quietly makes or breaks the
            customer experience.
          </p>
          <p>
            I focus on clean architecture, deliberate performance choices, and code that holds up well after
            launch, not just on opening day.
          </p>
          <Button variant="text" to="/about" className="intro__link">
            About Me
          </Button>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
