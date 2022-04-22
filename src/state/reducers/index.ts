import { booksReducer } from './BooksReducer'
import { combineReducers } from 'redux'

const rootReducers = combineReducers({
  booksReducer: booksReducer,
})

export default rootReducers

export type RootState = ReturnType<typeof rootReducers>
