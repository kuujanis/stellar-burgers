import { INGREDIENTS_DATA } from "../actions";

const initialState = {
    data: []
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case INGREDIENTS_DATA:
            return {
                ...state,
                data: action.data
            }
        default: return state
    }
}