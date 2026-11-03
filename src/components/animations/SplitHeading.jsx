import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import './SplitHeading.css'

/**
 * Renders `text` as a heading with each word masked in its own span,
 * then reveals the words with a staggered rise — a manual stand-in for
 * GSAP's (paid) SplitText plugin.
 */
function SplitHeading({
  as: Tag = 'h1',
  text,
  className = '',
  trigger = 'mount',
  delay = 0,
  wordDelay = 0.045,
  accentWord = '',
}) {
  const ref = useRef(null)
  const words = text.split(' ')
  const accentLower = accentWord.toLowerCase()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('.split-word__inner')

    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          stagger: wordDelay,
          ease: 'power4.out',
          ...(trigger === 'scroll'
            ? { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
            : {}),
        }
      )
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, trigger, delay, wordDelay])

  return (
    <Tag ref={ref} className={`split-heading ${className}`}>
      {words.map((word, i) => (
        <span className="split-word" key={`${word}-${i}`}>
          <span className={`split-word__inner ${accentLower && word.toLowerCase().replace(/[.,!?]/g, '') === accentLower ? 'split-word__inner--accent' : ''}`}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export default SplitHeading
