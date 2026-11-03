import { useCountUp } from '../../hooks/useCountUp'
import './StatCounter.css'

function StatCounter({ label, value, suffix = '' }) {
  const [ref, count] = useCountUp(value)

  return (
    <div className="stat-counter" ref={ref}>
      <span className="stat-counter__value">
        {count}
        {suffix}
      </span>
      <span className="stat-counter__label">{label}</span>
    </div>
  )
}

export default StatCounter
