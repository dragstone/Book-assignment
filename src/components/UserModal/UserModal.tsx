import { useState } from 'react'
import Modal from '../core/Modal/Modal'
import './UserModal.scss'
import { UserTypes } from '../../models/User'

type ModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSaveHandler: (e: React.FormEvent, x: UserTypes) => void
  editData: UserTypes
}

export default function UserModal({
  setOpen,
  onSaveHandler,
  editData,
}: ModalProps) {
  const [formFields, setFormFields] = useState({
    email: editData.email,
    password: '1234',
    name: editData.name,
    description: editData.description,
    imageUrl: editData.imageUrl,
  })
  const onLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formFields)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }
  return (
    <div className="book-modal-section">
      <Modal setOpen={setOpen} title="User">
        <form onSubmit={onLogin} className="input-group">
          <input
            className="input-field"
            id="email"
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formFields.email}
            onChange={onChangeHandler}
            required
          />
          <input
            id="password"
            type="password"
            className="input-field"
            placeholder="Enter Password"
            name="password"
            value={formFields.password}
            onChange={onChangeHandler}
            required
          />
          <input
            id="name"
            type="text"
            className="input-field"
            placeholder="Enter Name"
            name="name"
            value={formFields.name}
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
