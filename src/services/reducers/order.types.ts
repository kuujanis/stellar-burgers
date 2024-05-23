import { TOrder } from "../../utils/type"
import { ORDER_CLEAR, ORDER_GET_FAILED, ORDER_GET_NUMBER, ORDER_GET_REQUEST, ORDER_GET_SUCCESS } from "../actions"

type BlankAction = {type: undefined}
type OrderNumberAction = {type: typeof ORDER_GET_NUMBER, number : number}
type OrderRequestAction = {type: typeof ORDER_GET_REQUEST}
type OrderSuccessAction = {type: typeof ORDER_GET_SUCCESS, order: TOrder}
type OrderFailedAction = {type: typeof ORDER_GET_FAILED}
type OrderClearAction = {type: typeof ORDER_CLEAR}

export type TOrderActions = 
    OrderNumberAction
    | OrderRequestAction
    | OrderSuccessAction
    | OrderFailedAction
    | OrderClearAction
    | BlankAction