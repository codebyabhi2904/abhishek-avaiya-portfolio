import { useEffect } from 'react'
import { profile } from '../../data/profile'

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * Lightweight per-page SEO manager — avoids pulling in react-helmet-async
 * for what is otherwise a handful of document.head mutations.
 */
function Seo({ title, description, path = '/', type = 'website', jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${profile.name}` : profile.name
    document.title = fullTitle

    setMeta('name', 'description', description)
    setLink('canonical', `${profile.siteUrl}${path}`)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', `${profile.siteUrl}${path}`)

    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)

    setJsonLd('page-jsonld', jsonLd)

    return () => setJsonLd('page-jsonld', null)
  }, [title, description, path, type, jsonLd])

  return null
}

export default Seo
