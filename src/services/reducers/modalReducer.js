import { OPEN_INGRD_MODAL, OPEN_CONSTRUCT_MODAL, CLOSE_MODAL } from '../actions'

const initialState = {
    ingrdModalActive: false,
    constructModalActive: false
}

export const modalReducer = (state = initialState, action) => {
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