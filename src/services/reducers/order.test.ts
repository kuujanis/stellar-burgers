import { TOrder } from "../../utils/type";
import { ORDER_CLEAR, ORDER_GET_FAILED, ORDER_GET_NUMBER, ORDER_GET_REQUEST, ORDER_GET_SUCCESS } from "../actions"
import { initialState, orderReducer } from "./orderReducer"

const number:number = 40505 

const order:TOrder =
    {
        createdAt: new Date("2022-04-15T05:07:37.636Z"),
        ingredients: ["60d3b41abdacab0026a733c7", "60d3b41abdacab0026a733c9"],
        name: "Флюоресцентный бессмертный бургер",
        number: 13672,
        owner: {
            createdAt: new Date("2022-04-15T05:07:37.636Z"),
            updatedAt: new Date("2022-04-15T05:07:37.636Z"),
            email: 'sbugs@mail.ru',
            name: 'SuperBurger'
        },
        price: 2325,
        status: "done",
        updatedAt: new Date("2022-04-15T05:07:37.636Z"),
        __v: 0,
        _id: "61473cbddab0f3001bb06df8"
    };

describe('check order reducer',()=>{
    test('should return initialstate',():void=>{
        expect(orderReducer(initialState, {type: undefined})).toEqual({
            initialState
        })
    })
    test('check ORDER_GET_NUMBER', ():void =>{
        expect(orderReducer(initialState, {type: ORDER_GET_NUMBER, number:number})).toEqual({
            ...initialState,
            number: number
        })
    })
    test('check ORDER_GET_REQUEST', ():void =>{
        expect(orderReducer(initialState, {type: ORDER_GET_REQUEST})).toEqual({
            ...initialState,
            orderRequest: true,
            orderFailed: false,
        })
    })
    test('check ORDER_GET_SUCCESS', ():void =>{
        expect(orderReducer(initialState, {type: ORDER_GET_SUCCESS, order:order})).toEqual({
            ...initialState,
            order: order,
            orderRequest: false
        })
    })
    test('check ORDER_GET_FAILED', ():void =>{
        expect(orderReducer(initialState, {type: ORDER_GET_FAILED})).toEqual({
            ...initialState,
            orderFailed: true,
            orderRequest: false
        })
    })
    test('check ORDER_CLEAR', ():void =>{
        expect(orderReducer(initialState, {type: ORDER_CLEAR})).toEqual({
            ...initialState,
            number: 0,
            order: null
        })
    })
})