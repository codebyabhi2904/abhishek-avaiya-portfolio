import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import './CustomCursor.css'

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], .cursor-hover'

// Elements that already show their own circular affordance (an arrow badge,
// a progress ring, a toggle) — the custom cursor would just duplicate it, so
// it hides instead of growing into a second overlapping circle.
const SUPPRESS_SELECTOR = '.btn--text, .back-to-top, .theme-toggle, .site-header__toggle, .site-header__nav a'

function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [suppressed, setSuppressed] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Desktop only: a real mouse/trackpad (not touch) AND wide enough that
    // the site isn't showing its mobile nav/layout.
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 921px)')

    const apply = (matches) => {
      setEnabled(matches)
      document.documentElement.classList.toggle('has-custom-cursor', matches)
    }
    const onChange = (e) => apply(e.matches)

    apply(media.matches)
    media.addEventListener('change', onChange)

    return () => {
      media.removeEventListener('change', onChange)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current
    const reduced = prefersReducedMotion()

    const quickDot = reduced ? null : gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' })
    const quickDotY = reduced ? null : gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' })
    const quickRing = reduced ? null : gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const quickRingY = reduced ? null : gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e) => {
      setHidden(false)
      if (reduced) {
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY })
      } else {
        quickDot(e.clientX)
        quickDotY(e.clientY)
        quickRing(e.clientX)
        quickRingY(e.clientY)
      }
    }

    const onOver = (e) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest(SUPPRESS_SELECTOR)) {
        setSuppressed(true)
        setHovering(false)
      } else if (e.target.closest(INTERACTIVE_SELECTOR)) {
        setHovering(true)
      }
    }
    const onOut = (e) => {
      if (!(e.target instanceof Element)) return
      if (e.target.closest(SUPPRESS_SELECTOR)) {
        setSuppressed(false)
      } else if (e.target.closest(INTERACTIVE_SELECTOR)) {
        setHovering(false)
      }
    }
    const onLeaveWindow = () => setHidden(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={`custom-cursor ${hidden || suppressed ? 'is-hidden' : ''}`} aria-hidden="true">
      <div ref={ringRef} className={`custom-cursor__ring ${hovering ? 'is-hovering' : ''}`} />
      <div ref={dotRef} className="custom-cursor__dot" />
    </div>
  )
}

export default CustomCursor
