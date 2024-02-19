 import { combineReducers } from "redux";
 import { modalReducer } from "./modalReducer"
 import { ingredientReducer } from "./ingredientReducer";

export const rootReducer = combineReducers({
    ingrd: ingredientReducer,
    modal: modalReducer,

})