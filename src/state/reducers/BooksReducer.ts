import { bookActionTypes } from '../actionTypes/Books'
import { DataType } from '../../models/Data'
import { StateType } from '../../models/StateType'

const initialState: DataType = {
  data: {},
  loader: false,
  err: '',
}

type actionProps = {
  type: string
  payload: StateType | string | boolean
}

export const booksReducer = (
  state: DataType = initialState,
  action: actionProps,
) => {
  switch (action.type) {
    case bookActionTypes.GET_DATA:
      return { ...state, data: action.payload }
    case bookActionTypes.LOADING:
      return { ...state, loader: action.payload }
    case bookActionTypes.ERROR:
      return { ...state, err: action.payload }
    default:
      return state
  }
}
