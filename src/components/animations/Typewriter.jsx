import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'
import './Typewriter.css'

/**
 * Cycles through `words`, typing and deleting each one character at a time.
 * Falls back to the longest word, shown statically, under reduced motion.
 */
function Typewriter({ words, typingSpeed = 70, deletingSpeed = 40, pauseDuration = 1400 }) {
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')
  const [text, setText] = useState(prefersReducedMotion() ? longest : '')
  const indexRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    if (prefersReducedMotion()) return

    let timeoutId

    const tick = () => {
      const current = words[indexRef.current % words.length]

      if (!deletingRef.current) {
        charRef.current += 1
        setText(current.slice(0, charRef.current))

        if (charRef.current === current.length) {
          deletingRef.current = true
          timeoutId = setTimeout(tick, pauseDuration)
          return
        }
        timeoutId = setTimeout(tick, typingSpeed)
      } else {
        charRef.current -= 1
        setText(current.slice(0, charRef.current))

        if (charRef.current === 0) {
          deletingRef.current = false
          indexRef.current += 1
          timeoutId = setTimeout(tick, typingSpeed)
          return
        }
        timeoutId = setTimeout(tick, deletingSpeed)
      }
    }

    timeoutId = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className="typewriter">
      <span aria-hidden="true">
        {text}
        <span className="typewriter__cursor" />
      </span>
      <span className="visually-hidden">{longest}</span>
    </span>
  )
}

export default Typewriter
