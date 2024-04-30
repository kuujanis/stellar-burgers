 import { combineReducers } from "redux";
 import { modalReducer } from "./modalReducer"
 import { ingredientReducer } from "./ingredientReducer";
 import { authorizationReducer } from "./authorizationReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
    ingrd: ingredientReducer,
    modal: modalReducer,
    auth: authorizationReducer,
    ws: wsReducer
})