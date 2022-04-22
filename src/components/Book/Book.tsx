import Card from '../core/Card/Card'
import Delete from '../../assets/delete.svg'
import Edit from '../../assets/edit.svg'
import { BookTypes } from '../../models/Book'
import './Book.scss'

export type editClickType = (id: number | undefined) => void
export type deleteClickType = (id: number | undefined) => void

type BookProps = {
  book: BookTypes
  onEditClick: editClickType
  onDeleteClick: (id: number | undefined) => void
}

export default function Book(props: BookProps) {
  const { book, onEditClick, onDeleteClick } = props
  const { id, title, price, imageUrl, description, author, pageCount } = book
  console.log('image url', imageUrl)

  return (
    <Card key={id} cssClass="book-card">
      <div className="icon-section">
        <img
          src={Edit}
          className="edit"
          width="20px"
          height="20px"
          alt="edit"
          onClick={() => onEditClick(id)}
          aria-hidden
        />
        <img
          src={Delete}
          className="delete"
          width="20px"
          height="20px"
          alt="delete"
          onClick={() => onDeleteClick(id)}
          aria-hidden
        />
      </div>
      <img className="book-image" src={imageUrl} alt="book cover" />
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="author">by {author}</p>

        <div className="price-section">
          <span className="icon">₹</span>
          <p className="price">{price}</p>
        </div>
        <p className="description">{description}</p>

        <p className="page-count">{pageCount}</p>
      </div>
    </Card>
  )
}
