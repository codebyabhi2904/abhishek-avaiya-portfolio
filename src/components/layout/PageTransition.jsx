import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

function PageTransition({ children }) {
  const { pathname } = useLocation()
  const ref = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })

    const el = ref.current
    if (!el) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' })
    }, el)

    return () => ctx.revert()
  }, [pathname])

  return (
    <div ref={ref} key={pathname}>
      {children}
    </div>
  )
}

export default PageTransition
