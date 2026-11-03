import { stats } from '../../../data/profile'
import StatCounter from '../../../components/common/StatCounter'
import { useStaggerReveal } from '../../../hooks/useScrollReveal'
import './TrustSection.css'

function TrustSection() {
  const ref = useStaggerReveal({ y: 24 })

  return (
    <section className="section trust">
      <div className="container">
        <p className="trust__note">Shopify development, built on verifiable technical expertise.</p>
        <div ref={ref} className="trust__grid">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection
