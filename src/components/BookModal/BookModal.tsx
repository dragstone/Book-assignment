import { useState } from 'react'
import Modal from '../core/Modal/Modal'
import { BookTypes } from '../../models/Book'
import './BookModal.scss'

type ModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  editData?: BookTypes
  onSaveHandler: (e: React.FormEvent, x: BookTypes) => void
}
export default function BookModal({
  setOpen,
  editData,
  onSaveHandler,
}: ModalProps) {
  const [formFields, setFormFields] = useState({
    title: editData ? editData.title : '',
    price: editData ? editData.price : 0,
    pageCount: editData ? editData.pageCount : 0,
    imageUrl: editData ? editData.imageUrl : '',
    description: editData ? editData.description : '',
    author: editData ? editData.author : '',
  })

  console.log(formFields)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  return (
    <div className="user-modal-section">
      <Modal setOpen={setOpen} title="Book">
        <form className="input-group">
          <input
            className="input-field"
            id="title"
            type="text"
            placeholder="Enter Title"
            name="title"
            value={formFields.title}
            onChange={onChangeHandler}
            required
          />
          <input
            id="price"
            type="number"
            className="input-field"
            placeholder="Enter Price"
            name="price"
            value={formFields.price}
            onChange={onChangeHandler}
            required
          />
          <input
            id="pageCount"
            type="number"
            className="input-field"
            placeholder="Enter Page Count"
            name="pageCount"
            value={formFields.pageCount}
            onChange={onChangeHandler}
            required
          />
          <input
            id="description"
            type="text"
            className="input-field"
            placeholder="Enter Description"
            name="description"
            value={formFields.description}
            onChange={onChangeHandler}
            required
          />
          <input
            id="imageUrl"
            type="text"
            className="input-field"
            placeholder="Enter Image Url"
            name="imageUrl"
            value={formFields.imageUrl}
            onChange={onChangeHandler}
            required
          />
          <input
            id="author"
            type="text"
            className="input-field"
            placeholder="Enter Author"
            name="author"
            value={formFields.author}
            onChange={onChangeHandler}
            required
          />
          <button
            type="submit"
            onClick={(e) => onSaveHandler(e, formFields)}
            className="submit-btn"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  )
}
