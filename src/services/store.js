import {applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk";
import {rootReducer} from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;
		
const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = configureStore({reducer: rootReducer, enhencer: enhancer});