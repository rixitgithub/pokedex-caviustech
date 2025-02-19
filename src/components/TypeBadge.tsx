import '../assets/styles/components/type-badge.css'

interface TypeBadgeProps {
  type: string
}

const TypeBadge = ({ type }: TypeBadgeProps) => (
  <span className={`type-badge type-${type}`}>
    {type.toUpperCase()}
  </span>
)

export default TypeBadge