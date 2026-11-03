import { useMemo, useState } from 'react'
import Seo from '../../components/common/Seo'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import CTASection from '../../components/common/CTASection'
import SplitHeading from '../../components/animations/SplitHeading'
import ArticleCard from '../../components/cards/ArticleCard'
import { articles, articleCategories } from '../../data/articles'
import './Blog.css'

function Blog() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? articles : articles.filter((a) => a.category === filter)),
    [filter]
  )

  return (
    <>
      <Seo
        title="Insights"
        description="Technical articles on Shopify development, Shopify Plus, Liquid, and performance optimization."
        path="/insights"
      />

      <section className="section blog-hero section--alt">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Insights' }]} />
          <SplitHeading
            as="h1"
            className="blog-hero__heading"
            text="Notes on Shopify development."
            accentWord="Notes"
          />
          <p className="blog-hero__sub">
            Practical, technical writing on Shopify theme architecture, Shopify Plus, Liquid, and performance —
            drawn from real development work.
          </p>
        </div>
      </section>

      <section className="section blog-list">
        <div className="container">
          <h2 className="visually-hidden">All Articles</h2>
          <div className="blog-list__filters" role="group" aria-label="Filter articles by category">
            <button
              type="button"
              aria-pressed={filter === 'All'}
              className={`filter-chip ${filter === 'All' ? 'is-active' : ''}`}
              onClick={() => setFilter('All')}
            >
              All
            </button>
            {articleCategories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                className={`filter-chip ${filter === category ? 'is-active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="blog-list__grid">
            {filtered.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>

          {filtered.length === 0 && <p className="blog-list__empty">No articles in this category yet.</p>}
        </div>
      </section>

      <CTASection />
    </>
  )
}

export default Blog
