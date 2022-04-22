import { bookActionTypes } from '../actionTypes/Books'
import { BookTypes } from '../../models/Book'
import { UserTypes } from '../../models/User'
import axios from 'axios'
import { StateType } from '../../models/StateType'
import { Dispatch } from 'redux'

export const recieveData = (data: StateType) => {
  return {
    type: bookActionTypes.GET_DATA,
    payload: data,
  }
}

export const loading = (value: boolean) => {
  return {
    type: bookActionTypes.LOADING,
    payload: value,
  }
}

export const error = (value: string) => {
  return {
    type: bookActionTypes.ERROR,
    payload: value,
  }
}

type IDataActionProps = {
  type: string
  payload: StateType
}

type ILoaderActionProps = {
  type: string
}

export const register = (data: UserTypes) => {
  return (dispatch: Dispatch<IDataActionProps | ILoaderActionProps>) => {
    dispatch(loading(true))
    dispatch(error(''))
    const id = Math.floor(Math.random() * 100)
    const addData = Object.assign({}, data, {
      id: id,
      imageUrl:
        'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
      books: [],
      name: '',
      description: '',
    })
    axios
      .post('http://localhost:3000/data', addData)
      .then((response) => {
        dispatch(loading(false))
        console.log('user', response)
        dispatch(recieveData(response.data))
      })
      .catch((err) => {
        console.log(err)
        dispatch(loading(false))
        dispatch(error(err.message))
      })
  }
}

export const login = (data: UserTypes) => {
  return (dispatch: Dispatch<IDataActionProps | ILoaderActionProps>) => {
    dispatch(loading(true))
    dispatch(error(''))
    axios
      .get('http://localhost:3000/data')
      .then((response) => {
        dispatch(loading(false))

        const newArr = response.data.filter((item: StateType) => {
          if (item.email === data.email && item.password === data.password) {
            return item
          }
        })
        if (newArr.length > 0) {
          dispatch(recieveData(newArr[0]))
          dispatch(error(''))
        } else {
          dispatch(recieveData({}))
          dispatch(error('user of this mail does not exist'))
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(loading(false))
        dispatch(error(err.message))
      })
  }
}

export const addNewBook = (data: BookTypes, userId: number) => {
  return (dispatch: Dispatch<IDataActionProps | ILoaderActionProps>) => {
    dispatch(loading(true))
    const id = Math.floor(Math.random() * 100)
    const addData = Object.assign({}, data, { id: id })
    axios
      .get(`http://localhost:3000/data?id=${userId}`)
      .then((response) => {
        dispatch(loading(false))
        console.log('user', response.data)
        const books = response.data[0].books
        console.log('book ', books)
        const newBook = [...books, addData]
        console.log('book new', newBook)

        axios
          .patch(`http://localhost:3000/data/${userId}`, {
            books: newBook,
          })
          .then((response) => {
            console.log('final', response.data)
            dispatch(recieveData(response.data))
          })
      })
      .catch((err) => {
        console.log(err)
        dispatch(loading(false))
        dispatch(error(err.message))
      })
  }
}

export const deleteBook = (id: number | undefined, userId: number) => {
  return (dispatch: Dispatch<IDataActionProps | ILoaderActionProps>) => {
    dispatch(loading(true))
    axios
      .get(`http://localhost:3000/data?id=${userId}`)
      .then((response) => {
        console.log('user', response.data)
        const books = response.data[0].books
        console.log('book ', books)
        const updatedBook = books.filter((book: BookTypes) => book.id !== id)

        axios
          .patch(`http://localhost:3000/data/${userId}`, {
            books: updatedBook,
          })
          .then((response) => {
            console.log('final', response.data)
            dispatch(loading(false))
            dispatch(recieveData(response.data))
          })
      })
      .catch((err) => {
        console.log(err)
        dispatch(loading(false))
        dispatch(error(err.message))
      })
  }
}

export const editBook = (data: BookTypes, userId: number, id: number) => {
  return (dispatch: Dispatch<IDataActionProps | ILoaderActionProps>) => {
    dispatch(loading(true))
    axios
      .get(`http://localhost:3000/data?id=${userId}`)
      .then((response) => {
        dispatch(loading(false))
        console.log('user', response.data)
        const books = response.data[0].books
        console.log('book ', books)
        const index = books.findIndex((book: BookTypes) => book.id === id)
        books[index].title = data.title
        books[index].author = data.author
        books[index].description = data.description
        books[index].pageCount = data.pageCount
        books[index].price = data.price
        books[index].imageUrl = data.imageUrl

        axios
          .patch(`http://localhost:3000/data/${userId}`, {
            books: books,
          })
          .then((response) => {
            console.log('final', response.data)
            dispatch(recieveData(response.data))
          })
      })
      .catch((err) => {
        console.log(err)
        dispatch(loading(false))
        dispatch(error(err.message))
      })
  }
}

export const editUser = (data: UserTypes, userId: number) => {
  return (dispatch: Dispatch<IDataActionProps | ILoaderActionProps>) => {
    dispatch(loading(true))
    axios
      .get(`http://localhost:3000/data?id=${userId}`)
      .then(() => {
        dispatch(loading(false))
        axios
          .patch(`http://localhost:3000/data/${userId}`, {
            email: data.email,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl,
          })
          .then((response) => {
            console.log('final', response.data)
            dispatch(recieveData(response.data))
          })
      })
      .catch((err) => {
        console.log(err)
        dispatch(loading(false))
        dispatch(error(err.message))
      })
  }
}

export const deleteUser = (userId: number) => {
  return (dispatch: Dispatch<IDataActionProps | ILoaderActionProps>) => {
    dispatch(loading(true))

    axios
      .delete(`http://localhost:3000/data/${userId}`)
      .then((response) => {
        console.log(response)
        dispatch(loading(false))
      })
      .catch((err) => {
        console.log(err)
        dispatch(loading(false))
        dispatch(error(err.message))
      })
  }
}
