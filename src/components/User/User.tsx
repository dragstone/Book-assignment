import Card from '../core/Card/Card'
import Delete from '../../assets/delete.svg'
import Edit from '../../assets/edit.svg'
import { Link, useNavigate } from 'react-router-dom'
import UserModal from '../UserModal/UserModal'
import './User.scss'
import { useState } from 'react'
import { UserTypes } from '../../models/User'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { editUser, deleteUser } from '../../state/actions/Books'
import { BookTypes } from '../../models/Book'

export default function User() {
  const data = useTypedSelector((state: any) => state.booksReducer.data)
  const err = useTypedSelector((state: any) => state.booksReducer.err)
  const loader = useTypedSelector((state: any) => state.booksReducer.loader)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<UserTypes>({} as UserTypes)

  const onEditClick = () => {
    setEditData(data)

    setOpen((open) => !open)
  }

  const onSaveHandler = (e: React.FormEvent, formFields: UserTypes) => {
    e.preventDefault()
    if (editData.id) {
      dispatch(editUser(formFields, editData.id))
      setOpen((open) => !open)
    }
  }

  const onDeleteUser = () => {
    if (editData.id || data.id) {
      dispatch(deleteUser(editData.id || data.id))
      navigate('/')
    }
  }
  return (
    <Card cssClass="user-section">
      {open && (
        <UserModal
          setOpen={setOpen}
          editData={editData}
          onSaveHandler={onSaveHandler}
        />
      )}
      {loader ? (
        <div className="loader">Loading...</div>
      ) : err ? (
        <h2 className="err">{err}</h2>
      ) : (
        <div className="content">
          <img className="profile" src={data.imageUrl} alt="profile pic" />
          <div className="user-details">
            <h1>{data.name}</h1>
            <p className="description">{data.description}</p>
            <p className="email">{data.email}</p>
            <ul>
              {data &&
                data.books &&
                data.books.length > 0 &&
                data.books.map((book: BookTypes) => {
                  return (
                    <li className="list" key={book.id}>
                      {book.title}
                    </li>
                  )
                })}
            </ul>
            <div className="section">
              <button>
                <Link to="/books">Books Detail</Link>
              </button>
              <div className="icon-section">
                <img
                  src={Edit}
                  className="edit"
                  width="20px"
                  height="20px"
                  alt="edit"
                  onClick={() => onEditClick()}
                  aria-hidden
                />
                <img
                  src={Delete}
                  className="delete"
                  width="20px"
                  onClick={() => onDeleteUser()}
                  height="20px"
                  alt="delete"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
