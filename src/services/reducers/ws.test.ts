import { TMessage } from "../../utils/type";
import { WS_CONNECTION_END, WS_CONNECTION_FAILED, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_DATA } from "../actions"
import { initialState, wsReducer } from "./wsReducer"

const messages: TMessage =
    {
        orders: [
            {
                createdAt: new Date("2024-05-23T05:07:37.636Z"),
                ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c9"],
                name: "Двойной чиз",
                number: 13672,
                status: "done",
                updatedAt: new Date("2024-05-23T05:07:37.636Z"),
                _id: "61473cbddab0f3001bb06df8",
                price: 2325,
                __v: 0
            }
        ],
        success: true,
        total: 3475,
        totalToday: 69,
    };

describe('check websocket reducer',()=>{
    test('check WS_CONNECTION_START', ():void =>{
        expect(wsReducer(initialState, {type: WS_CONNECTION_START})).toEqual({
            ...initialState
        })
    })
    test('check WS_CONNECTION_SUCCESS', ():void =>{
        expect(wsReducer(initialState, {type: WS_CONNECTION_SUCCESS})).toEqual({
            ...initialState,
            wsConnected: true
        })
    })
    test('check WS_CONNECTION_FAILED', ():void =>{
        expect(wsReducer(initialState, {type: WS_CONNECTION_FAILED, payload: null})).toEqual({
            ...initialState,
            wsConnected: false
        })
    })
    test('check WS_CONNECTION_END', ():void =>{
        expect(wsReducer(initialState, {type: WS_CONNECTION_END})).toEqual({
            ...initialState,
            messages: null,
            wsConnected: false
        })
    })
    test('check WS_GET_DATA', ():void =>{
        expect(wsReducer(initialState, {type: WS_GET_DATA, payload: messages})).toEqual({
            ...initialState,
            messages: messages,
            wsConnected: false
        })
    })
})