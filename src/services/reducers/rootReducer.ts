 import { combineReducers } from "redux";
 import { modalReducer } from "./modalReducer"
 import { ingredientReducer } from "./ingredientReducer";
 import { authorizationReducer } from "./authorizationReducer";

export const rootReducer = combineReducers({
    ingrd: ingredientReducer,
    modal: modalReducer,
    auth: authorizationReducer
})