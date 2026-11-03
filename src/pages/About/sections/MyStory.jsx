import { useScrollReveal } from '../../../hooks/useScrollReveal'
import './MyStory.css'

function MyStory() {
  const ref = useScrollReveal()

  return (
    <section className="section my-story">
      <div className="container">
        <div ref={ref} className="my-story__grid">
          <h2 className="my-story__label">My Story</h2>
          <div className="my-story__text">
            <p>
              I am a Shopify Developer with 3+ years of experience building high-converting, scalable, and
              performance-driven eCommerce stores.
            </p>
            <p>
              I specialize in custom Shopify theme development using Liquid, Shopify 2.0 architecture, and modern
              development workflows with Shopify CLI and Git-based version control. My focus is simple: build
              stores that are clean, fast, optimized, and built for real business growth.
            </p>
            <p>
              I have worked on complete store setups, redesigns, and migrations from WordPress and WooCommerce to
              Shopify. From pixel-perfect UI implementation to advanced custom functionality, I ensure every store
              is technically strong and conversion-focused.
            </p>
            <p className="my-story__expertise-label">My core expertise includes:</p>
            <ul className="my-story__list">
              <li>Custom theme development and reusable section architecture</li>
              <li>Shopify CLI based development workflow</li>
              <li>Git and GitHub version control for structured deployments</li>
              <li>App integrations and API-based custom solutions</li>
              <li>Speed optimization and performance tuning</li>
              <li>Store audits, debugging, and issue resolution</li>
            </ul>
            <p>
              I follow proper development standards using Shopify CLI for local development, theme versioning, and
              efficient deployment. I also maintain development projects and structured code practices that can be
              shared via GitHub when required.
            </p>
            <p>
              I believe successful eCommerce is a combination of performance, user experience, and smart technical
              execution. That is exactly where I focus.
            </p>
            <p className="my-story__tagline">Always learning. Always building. Always improving.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyStory
