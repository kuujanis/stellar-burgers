 import { combineReducers } from "redux";
 import { modalReducer } from "./modalReducer"
 import { ingredientReducer } from "./ingredientReducer";
 import { authorizationReducer } from "./authorizationReducer";
import { wsReducer } from "./wsReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
    ingrd: ingredientReducer,
    modal: modalReducer,
    auth: authorizationReducer,
    order: orderReducer,
    ws: wsReducer
})