import { useState } from 'react'
import Book, { editClickType, deleteClickType } from '../Book/Book'
import BookModal from '../BookModal/BookModal'
import { BookTypes } from '../../models/Book'
import { useDispatch } from 'react-redux'
import { addNewBook, deleteBook, editBook } from '../../state/actions/Books'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import './Books.scss'

export default function Books() {
  const [open, setOpen] = useState<boolean>(false)
  const [editData, setEditData] = useState({} as BookTypes)
  const data = useTypedSelector((state: any) => state.booksReducer?.data)
  const dispatch = useDispatch()

  const onEditClick: editClickType = (id: number | undefined) => {
    const singleBook = data.books.filter((book: BookTypes) => book.id === id)
    setEditData(singleBook[0])
    setOpen((open) => !open)
  }

  const onSaveHandler = (e: React.FormEvent, formFields: BookTypes) => {
    e.preventDefault()
    if (editData.id) {
      dispatch(editBook(formFields, data.id, editData.id))
    } else {
      dispatch(addNewBook(formFields, data.id))
    }
    setOpen((open) => !open)
  }

  const onAddClick = () => {
    setEditData({})
    setOpen((open) => !open)
  }

  const onDeleteClick: deleteClickType = (id: number | undefined) => {
    dispatch(deleteBook(id, data.id))
  }
  return (
    <>
      <div className="add-button">
        <button onClick={onAddClick} className="btn">
          Add new Book
        </button>
      </div>

      <div className="book">
        {open && (
          <BookModal
            setOpen={setOpen}
            editData={editData}
            onSaveHandler={onSaveHandler}
          />
        )}
        {data &&
          data.books &&
          data.books.length > 0 &&
          data.books.map((book: BookTypes) => (
            <Book
              key={book.id}
              book={book}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
      </div>
    </>
  )
}
