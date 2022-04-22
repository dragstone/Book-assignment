import './Card.scss'
type CardProps = {
  children: React.ReactNode
  cssClass: string
}

export default function Card(props: CardProps) {
  const { children, cssClass } = props
  return <div className={`card ${cssClass}`}>{children}</div>
}
