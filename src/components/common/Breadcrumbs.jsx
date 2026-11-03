import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { profile } from '../../data/profile'
import './Breadcrumbs.css'

function Breadcrumbs({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.to ? { item: `${profile.siteUrl}${item.to}` } : {}),
    })),
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0
          return (
            <li key={item.label}>
              {isLast || !item.to ? (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to}>
                  {isFirst && <Home size={13} aria-hidden="true" />}
                  {item.label}
                </Link>
              )}
              {!isLast && <ChevronRight size={13} className="breadcrumbs__sep" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
