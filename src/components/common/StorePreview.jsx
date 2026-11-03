import './StorePreview.css'

/**
 * A lightweight "mini storefront" mockup used wherever a project doesn't
 * have a real screenshot yet — reads as an actual UI preview instead of a
 * flat placeholder block.
 */
function StorePreview({ seed = 0, label, wide = false }) {
  const cols = wide ? [3, 4, 3][seed % 3] : [2, 2, 3][seed % 3]
  const heroWidth = [62, 48, 72][seed % 3]

  return (
    <div className="store-preview" aria-hidden="true">
      <div className="store-preview__chrome">
        <span className="store-preview__dot" />
        <span className="store-preview__dot" />
        <span className="store-preview__dot" />
        <span className="store-preview__url">{label}</span>
      </div>
      <div className="store-preview__body">
        <div className="store-preview__nav">
          <span className="store-preview__logo" />
          <span className="store-preview__navlink" />
          <span className="store-preview__navlink" />
          <span className="store-preview__navlink" />
          <span className="store-preview__navcta" />
        </div>
        <div className="store-preview__hero" style={{ width: `${heroWidth}%` }}>
          <span className="store-preview__hero-line" />
          <span className="store-preview__hero-line store-preview__hero-line--short" />
          <span className="store-preview__hero-btn" />
        </div>
        <div className="store-preview__grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div className="store-preview__card" key={i}>
              <span className="store-preview__card-media" />
              <span className="store-preview__card-line" />
              <span className="store-preview__card-line store-preview__card-line--short" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StorePreview
