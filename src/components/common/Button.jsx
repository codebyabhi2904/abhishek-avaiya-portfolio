import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

/**
 * Unified CTA system. Renders a <Link> for internal routes (`to`),
 * an <a> for external links (`href`), or a <button> otherwise.
 *
 * variant: 'primary' | 'secondary' | 'text'
 */
function Button({
  variant = 'primary',
  to,
  href,
  icon = true,
  className = '',
  children,
  ...rest
}) {
  const classes = `btn btn--${variant} ${className}`.trim()

  const arrow = icon ? <ArrowUpRight aria-hidden="true" /> : null

  const content =
    variant === 'text' ? (
      <>
        <span>{children}</span>
        {arrow && <span className="btn--text__icon">{arrow}</span>}
      </>
    ) : (
      <>
        <span>{children}</span>
        {arrow}
      </>
    )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}

export default Button
