import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export function useCountUp(value, { duration = 1.6 } = {}) {
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      setCount(value)
      return
    }

    const counter = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => setCount(Math.round(counter.val)),
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [value, duration])

  return [ref, count]
}
