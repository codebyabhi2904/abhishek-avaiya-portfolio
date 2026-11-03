import Seo from '../../components/common/Seo'
import Button from '../../components/common/Button'
import SplitHeading from '../../components/animations/SplitHeading'
import './NotFound.css'

function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" />
      <section className="section not-found section--alt">
        <div className="container not-found__inner">
          <span className="eyebrow">404</span>
          <SplitHeading
            as="h1"
            className="not-found__heading"
            text="This page wandered off the storefront."
            accentWord="wandered"
          />
          <p>
            The page you’re looking for doesn’t exist, may have moved, or the URL might have a typo.
          </p>
          <div className="cta-group not-found__actions">
            <Button variant="primary" to="/">
              Back to Home
            </Button>
            <Button variant="secondary" to="/work" icon={false}>
              Explore Projects
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFound
