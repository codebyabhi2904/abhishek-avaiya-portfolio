import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons'
import { navLinks, profile } from '../../data/profile'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer section--alt">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            {profile.name}
          </Link>
          <p>
            {profile.role} based in {profile.location}, engineering scalable Shopify experiences for brands that take
            eCommerce seriously.
          </p>
          <div className="site-footer__social">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={18} />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <span className="site-footer__nav-title">Navigate</span>
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-footer__contact">
          <span className="site-footer__nav-title">Get in Touch</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <Link to="/contact">Start a Project</Link>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {year} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
