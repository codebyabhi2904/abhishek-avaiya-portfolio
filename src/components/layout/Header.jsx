import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../data/profile'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import Button from '../common/Button'
import ThemeToggle from '../common/ThemeToggle'
import './Header.css'

function isLinkActive(href, pathname) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hoveredHref, setHoveredHref] = useState(null)
  const panelRef = useRef(null)
  const linksRef = useRef(null)
  const toggleRef = useRef(null)
  const wasOpen = useRef(false)
  const navRef = useRef(null)
  const highlightRef = useRef(null)
  const linkRefs = useRef({})
  const hasPositioned = useRef(false)
  const { pathname } = useLocation()

  const activeLink = navLinks.find((link) => isLinkActive(link.href, pathname))
  const activeHref = activeLink?.href ?? null
  const highlightedHref = hoveredHref ?? activeHref

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const positionHighlight = (immediate) => {
      const nav = navRef.current
      const highlight = highlightRef.current
      const target = highlightedHref ? linkRefs.current[highlightedHref] : null
      if (!nav || !highlight) return

      if (!target) {
        gsap.set(highlight, { opacity: 0 })
        return
      }

      const navRect = nav.getBoundingClientRect()
      const rect = target.getBoundingClientRect()

      const vars = { x: rect.left - navRect.left, width: rect.width, opacity: 1 }
      if (immediate || prefersReducedMotion()) {
        gsap.set(highlight, vars)
      } else {
        gsap.to(highlight, { ...vars, duration: 0.45, ease: 'power3.out' })
      }
    }

    positionHighlight(!hasPositioned.current)
    hasPositioned.current = true

    const onResize = () => positionHighlight(true)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [highlightedHref])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!panelRef.current) return

    const items = linksRef.current ? linksRef.current.querySelectorAll('li') : []
    const focusFirstLink = () => linksRef.current?.querySelector('a')?.focus()

    // Clear any in-flight tween from a prior run (e.g. React StrictMode's
    // dev-only double-invoke) so onComplete callbacks aren't orphaned.
    gsap.killTweensOf([panelRef.current, ...items])

    if (open) {
      wasOpen.current = true
      gsap.set(panelRef.current, { display: 'flex' })
      if (prefersReducedMotion()) {
        gsap.set(panelRef.current, { autoAlpha: 1 })
        gsap.set(items, { opacity: 1, y: 0 })
        focusFirstLink()
      } else {
        const tl = gsap.timeline()
        tl.fromTo(panelRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
        tl.fromTo(
          items,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', onComplete: focusFirstLink },
          '-=0.1'
        )
      }
    } else {
      if (wasOpen.current) toggleRef.current?.focus()
      if (prefersReducedMotion()) {
        gsap.set(panelRef.current, { autoAlpha: 0, display: 'none' })
      } else {
        gsap.to(panelRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => gsap.set(panelRef.current, { display: 'none' }),
        })
      }
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="site-header">
      <div className={`site-header__bar ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="container site-header__inner">
          <NavLink to="/" className="site-header__logo">
            <span className="site-header__mark" aria-hidden="true">
              A
            </span>
            {profile.name}
          </NavLink>

          <nav
            className="site-header__nav"
            aria-label="Primary"
            ref={navRef}
            onMouseLeave={() => setHoveredHref(null)}
          >
            <span className="site-header__nav-highlight" ref={highlightRef} aria-hidden="true" />
            {navLinks.map((link) => {
              const isHighlighted = link.href === highlightedHref
              return (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === '/'}
                  ref={(el) => {
                    linkRefs.current[link.href] = el
                  }}
                  className={() =>
                    ['site-header__nav-link', isHighlighted ? 'on-accent' : ''].filter(Boolean).join(' ')
                  }
                  onMouseEnter={() => setHoveredHref(link.href)}
                  onFocus={() => setHoveredHref(link.href)}
                  onBlur={() => setHoveredHref(null)}
                >
                  <span>{link.label}</span>
                </NavLink>
              )
            })}
          </nav>

          <div className="site-header__actions">
            <ThemeToggle />

            <Button variant="primary" to="/contact" className="site-header__cta" icon={false}>
              Hire Me
            </Button>

            <button
              ref={toggleRef}
              type="button"
              className="site-header__toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-nav-panel" className="mobile-nav" ref={panelRef}>
        <nav aria-label="Mobile" ref={linksRef}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} end={link.href === '/'} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button variant="primary" to="/contact" onClick={() => setOpen(false)} icon={false}>
          Hire Me
        </Button>
      </div>
    </header>
  )
}

export default Header
