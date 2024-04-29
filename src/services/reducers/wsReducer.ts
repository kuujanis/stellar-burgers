import { TMessage } from "../../utils/type";
import { WS_CONNECTION_END, WS_CONNECTION_FAILED, WS_CONNECTION_SUCCESS, WS_GET_DATA } from "../actions";
import { TWSActions } from "./ws.types";

type TWsStore = {
    wsConnected: boolean
    messages: TMessage | null
    error: string | null | WebSocketEventMap
}

const initialState: TWsStore = {
  wsConnected: false,
  messages: null,
  error: ''
};

export const wsReducer = (state = initialState, action: TWSActions):TWsStore  => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: null,
        wsConnected: true
      };

    case WS_CONNECTION_FAILED:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_END:
      return {
        messages: null,
        error: null,
        wsConnected: false
      };

    case WS_GET_DATA:
      return {
        ...state,
        error: null,
        messages: action.payload
      };
    default:
      return state
  }
};