import {rootReducer} from "./reducers/rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TWSStoreActions, socketMiddleware } from "./middleware/middleware";
import { WS_CONNECTION_END, WS_CONNECTION_FAILED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_DATA } from "./actions";

const wsActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_END,
    onError: WS_CONNECTION_FAILED,
    onMessage: WS_GET_DATA
  };

export const store = configureStore({reducer: rootReducer,   
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(socketMiddleware(wsActions))});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

