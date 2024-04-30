import { TMessage } from "../../utils/type";
import { WS_CONNECTION_END, WS_CONNECTION_FAILED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_DATA } from "../actions";
import { TWSActions } from "./ws.types";

type TWsStore = {
    wsConnected: boolean
    messages: TMessage | null
}

const initialState: TWsStore = {
  wsConnected: false,
  messages: null
};

export const wsReducer = (state = initialState, action: TWSActions):TWsStore  => {
  switch (action.type) {
    case WS_CONNECTION_START:
        return {
          ...state
    };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_FAILED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_END:
      return {
        messages: null,
        wsConnected: false
      };

    case WS_GET_DATA:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state
  }
};