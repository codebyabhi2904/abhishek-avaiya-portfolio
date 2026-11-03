import { useParams, Link } from 'react-router-dom'
import Seo from '../../components/common/Seo'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import CTASection from '../../components/common/CTASection'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { getArticleBySlug, getRelatedArticles } from '../../data/articles'
import { profile } from '../../data/profile'
import NotFound from '../NotFound/NotFound'
import './Article.css'

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function Article() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)
  const headerRef = useScrollReveal()

  if (!article) return <NotFound />

  const related = getRelatedArticles(slug)
  const date = new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Person', name: article.author },
  }

  return (
    <>
      <Seo title={article.title} description={article.excerpt} path={`/insights/${article.slug}`} type="article" jsonLd={jsonLd} />

      <article className="article-page">
        <header className="section article-header section--alt">
          <div className="container" ref={headerRef}>
            <Breadcrumbs
              items={[{ label: 'Home', to: '/' }, { label: 'Insights', to: '/insights' }, { label: article.title }]}
            />
            <span className="chip chip--accent article-header__category">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="article-header__meta">
              <span>{article.author}</span>
              <span aria-hidden="true">·</span>
              <span>{date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </header>

        <div className="section article-body">
          <div className="container article-body__grid">
            <nav className="article-toc" aria-label="Table of contents">
              <span className="article-toc__label">On this page</span>
              <ul>
                {article.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${slugifyHeading(section.heading)}`}>{section.heading}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="article-content">
              {article.sections.map((section) => (
                <section key={section.heading} id={slugifyHeading(section.heading)}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </section>
              ))}

              <div className="article-author">
                <span className="article-author__avatar" aria-hidden="true">
                  {article.author.charAt(0)}
                </span>
                <div>
                  <span className="article-author__name">{article.author}</span>
                  <span className="article-author__role">{profile.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section article-related section--alt">
            <div className="container">
              <span className="eyebrow">Related Articles</span>
              <h2 className="visually-hidden">Related Articles</h2>
              <div className="article-related__grid">
                {related.map((item) => (
                  <Link key={item.slug} to={`/insights/${item.slug}`} className="article-related__item">
                    <span className="chip chip--accent">{item.category}</span>
                    <h3>{item.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection
        eyebrow="Have a Project?"
        heading="Have an Ambitious Shopify Project?"
        description="Let's build something exceptional together."
      />
    </>
  )
}

export default Article
