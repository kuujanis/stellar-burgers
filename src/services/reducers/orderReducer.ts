import { TOrder } from "../../utils/type";
import { ORDER_CLEAR, ORDER_GET_FAILED, ORDER_GET_NUMBER, ORDER_GET_REQUEST, ORDER_GET_SUCCESS } from "../actions";
import { TOrderActions } from "./order.types";

type TOrderStore = {
    number?: number
    orderRequest: boolean
    orderFailed: boolean
    order: TOrder | null
}

const initialState:TOrderStore = {
        number: 0,
        order: null,
        orderRequest: false,
        orderFailed: false,
    };

export const orderReducer = (state = initialState, action:TOrderActions):TOrderStore => {
    switch (action.type) {
        case ORDER_GET_NUMBER:
            return {
                ...state,
                number: action.number
            };
        case ORDER_GET_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
            }
        }
        case ORDER_GET_SUCCESS: {
            return {
                ...state,
                order: action.order,
                orderRequest: false
            }
        }
        case ORDER_GET_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        }
        case ORDER_CLEAR: {
            return {
                ...state,
                number: 0,
                order: null
            }
        }
        default: {
            return state;
        }
    }
}