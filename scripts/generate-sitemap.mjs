// Generates public/sitemap.xml from the site's route data so it stays in
// sync with projects/articles instead of being hand-maintained.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { profile } from '../src/data/profile.js'
import { projects } from '../src/data/projects.js'
import { articles } from '../src/data/articles.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const baseUrl = profile.siteUrl.replace(/\/$/, '')
const today = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/work', priority: '0.9', changefreq: 'weekly' },
  { path: '/insights', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
]

const projectRoutes = projects.map((p) => ({ path: `/work/${p.slug}`, priority: '0.7', changefreq: 'monthly' }))
const articleRoutes = articles.map((a) => ({ path: `/insights/${a.slug}`, priority: '0.6', changefreq: 'monthly' }))

const routes = [...staticRoutes, ...projectRoutes, ...articleRoutes]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${routes.length} routes.`)
