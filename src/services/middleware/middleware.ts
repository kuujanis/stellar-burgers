
import { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { TOrder } from "../../utils/type";
import { AppDispatch, RootState } from "../store";
import { WS_CONNECTION_END, WS_CONNECTION_FAILED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_DATA } from "../actions";


export type TWSStoreActions = {
    wsInit: typeof  WS_CONNECTION_START,
    onOpen: typeof  WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_END,
    onError: typeof  WS_CONNECTION_FAILED,
    onMessage: typeof  WS_GET_DATA,
  };
  
  export const socketMiddleware = (wsActions:TWSStoreActions): Middleware =>
   {return ((
    store: MiddlewareAPI<AppDispatch, RootState>
  ) => {
    let socket:  WebSocket | null = null;
  
    return (next) => (action: AnyAction) => {
      const { dispatch } = store;
      if (action.type === wsActions.wsInit) {
        socket = new WebSocket(`${action.payload}`);
      }
  
      if (action.type === wsActions.onClose && socket?.readyState === 1) {
        socket?.close();
      }
  
      if (socket) {
        socket.onopen = (e) => {
          dispatch({ type: wsActions.onOpen })
        };
  
        socket.onerror = (e) => {
            dispatch({ type: wsActions.onError, payload: e })
        };
  
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
  
          restParsedData.orders.sort(
            (a: TOrder, b: TOrder) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
  
          dispatch({ type: wsActions.onMessage, payload: parsedData })
        };
  
        socket.onclose = (e) => {
          dispatch({ type: wsActions.onClose, payload: e })
        };
      }
      next(action);
    };
    }) as Middleware
  };