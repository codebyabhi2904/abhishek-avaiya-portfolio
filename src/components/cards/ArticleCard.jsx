import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import ArticlePreview from '../common/ArticlePreview'
import './ArticleCard.css'

function ArticleCard({ article, index = 0 }) {
  const ref = useScrollReveal({ delay: (index % 3) * 0.08 })
  const date = new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <article ref={ref} className="article-card">
      <Link to={`/insights/${article.slug}`} className="article-card__media" aria-hidden="true">
        <ArticlePreview seed={index} />
      </Link>
      <div className="article-card__body">
        <span className="chip chip--accent">{article.category}</span>
        <h3>
          <Link to={`/insights/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.excerpt}</p>
        <div className="article-card__meta">
          <span>{date}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min read</span>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
