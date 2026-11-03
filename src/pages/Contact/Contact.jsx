import { Mail, MessageCircle } from 'lucide-react'
import Seo from '../../components/common/Seo'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import SplitHeading from '../../components/animations/SplitHeading'
import ContactForm from '../../components/forms/ContactForm'
import Button from '../../components/common/Button'
import { GithubIcon, LinkedinIcon } from '../../components/common/BrandIcons'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { profile } from '../../data/profile'
import './Contact.css'

function Contact() {
  const infoRef = useScrollReveal({ delay: 0.1 })

  return (
    <>
      <Seo
        title="Contact"
        description="Start a Shopify or Shopify Plus project with Abhishek Avaiya — get in touch to discuss scope, timeline, and next steps."
        path="/contact"
      />

      <section className="section contact-page section--alt">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

          <div className="contact-page__grid">
            <div ref={infoRef} className="contact-page__intro">
              <SplitHeading
                as="h1"
                className="contact-page__heading"
                text="Let's Create Something Exceptional."
                accentWord="Exceptional"
              />
              <p>
                Tell me a bit about your Shopify project — current store, goals, and timeline — and I’ll get
                back to you to talk through scope and next steps.
              </p>

              <ul className="contact-page__info">
                <li>
                  <Mail size={18} aria-hidden="true" />
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <LinkedinIcon size={18} />
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn Profile
                  </a>
                </li>
                <li>
                  <GithubIcon size={18} />
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub Profile
                  </a>
                </li>
                <li>
                  <MessageCircle size={18} aria-hidden="true" />
                  <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                    Message on WhatsApp
                  </a>
                </li>
              </ul>

              <div className="contact-page__secondary">
                <p>Prefer a quick async chat first?</p>
                <Button variant="secondary" href={profile.whatsapp} icon={false}>
                  Discuss Your Project on WhatsApp
                </Button>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
