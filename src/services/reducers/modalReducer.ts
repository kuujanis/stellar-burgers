import { UnknownAction } from 'redux'
import { OPEN_INGRD_MODAL, OPEN_CONSTRUCT_MODAL, CLOSE_MODAL } from '../actions'

type TModalStore = {
  ingrdModalActive: boolean,
  constructModalActive: boolean
}

const initialState = {
    ingrdModalActive: false,
    constructModalActive: false
}

export const modalReducer = (state:TModalStore = initialState, action: UnknownAction) => {
  switch(action.type) {
    case OPEN_INGRD_MODAL:
      return {
        ...state, ingrdModalActive: true
    }
    case OPEN_CONSTRUCT_MODAL:
      return {
        ...state, constructModalActive: true
    }
    case CLOSE_MODAL:
      return {
        ...initialState
    }
    default: return state
  }
}