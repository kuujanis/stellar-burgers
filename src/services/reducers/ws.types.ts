import { TMessage } from "../../utils/type"
import { WS_CONNECTION_END, WS_CONNECTION_FAILED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_DATA } from "../actions"

type StartAction = {type: typeof WS_CONNECTION_START, payload : string}
type SuccessAction = {type: typeof WS_CONNECTION_SUCCESS}
type ErrorAction = {type: typeof WS_CONNECTION_FAILED, payload: WebSocketEventMap}
type ClosedAction = {type: typeof WS_CONNECTION_END}
type GetAction = {type: typeof WS_GET_DATA, payload: TMessage}

export type TWSActions =
    | StartAction
    | SuccessAction
    | ErrorAction
    | ClosedAction
    | GetAction

export type TWSActionNames = {
    [key in TWSActions['type']] : key
}