import { BookTypes } from './Book'

export type StateType = {
  books?: BookTypes[]
  id?: number
  password?: string
  confirmPassword?: string
  name?: string
  description?: string
  email?: string
  imageUrl?: string
}
