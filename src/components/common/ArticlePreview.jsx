import './ArticlePreview.css'

const LINE_SETS = [
  [90, 70, 40, 85, 55, 30],
  [60, 95, 50, 75, 40, 65],
  [80, 45, 90, 60, 35, 70],
]

/**
 * A lightweight "code editor" mockup used as an article thumbnail in place
 * of a flat placeholder block.
 */
function ArticlePreview({ seed = 0 }) {
  const lines = LINE_SETS[seed % LINE_SETS.length]

  return (
    <div className="article-preview" aria-hidden="true">
      <div className="article-preview__chrome">
        <span className="article-preview__dot" />
        <span className="article-preview__dot" />
        <span className="article-preview__dot" />
      </div>
      <div className="article-preview__body">
        {lines.map((width, i) => (
          <span
            key={i}
            className={`article-preview__line ${i === 0 || i === 3 ? 'article-preview__line--accent' : ''}`}
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export default ArticlePreview
