import { TUser } from "../../utils/type"
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN, LOGOUT, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS } from "../actions"
import { authorizationReducer, initialState } from "./authorizationReducer"

const user:TUser = {
    email: 'sasha26x@yandex.ru',
    name:'bob',
    password:''
}

const blankUser: TUser = {
    email: '',
    name: '',
    password: ''
}

describe('check authorization reducer', () => {
    test('should return initialstate',():void=>{
        expect(authorizationReducer(initialState, {type: undefined})).toEqual({
            initialState
        })
    })
    test('scheck LOGOUT', ():void =>{
        expect(authorizationReducer(initialState, {type: LOGIN, user:user})).toEqual({
            ...initialState,
            login: true,
            authorized: true
        })
    })
    test('check LOGIN', ():void =>{
        expect(authorizationReducer(initialState, {type: LOGOUT})).toEqual({
            ...initialState,
            login: false,
            authorized: false,
            user: blankUser
        })
    })
    test('check GET_USER_REQUEST', ():void =>{
        expect(authorizationReducer(initialState, {type: GET_USER_REQUEST})).toEqual({
            ...initialState,
            getUserRequest: true,
            user: blankUser
        })
    })
    test('check GET_USER_SUCCESS', ():void =>{
        expect(authorizationReducer(initialState, {type: GET_USER_SUCCESS, user:user})).toEqual({
            ...initialState,
            getUserRequest: false,
            authorized: false
        })
    })
    test('check GET_USER_FAILED', ():void =>{
        expect(authorizationReducer(initialState, {type: GET_USER_FAILED})).toEqual({
            ...initialState,
            getUserRequest: false,
            authorized: false,
            user: blankUser
        })
    })
    test('check REFRESH_TOKEN_REQUEST', ():void =>{
        expect(authorizationReducer(initialState, {type: REFRESH_TOKEN_REQUEST})).toEqual({
            ...initialState,
            refreshTokenRequest: true,
            tokenIsGood : false
        })
    })
    test('check REFRESH_TOKEN_SUCCESS', ():void =>{
        expect(authorizationReducer(initialState, {type: REFRESH_TOKEN_SUCCESS})).toEqual({
            ...initialState,
            authorized : true,
            refreshTokenRequest: false,
            tokenIsGood : true
        })
    })
    test('check REFRESH_TOKEN_FAILED', ():void =>{
        expect(authorizationReducer(initialState, {type: REFRESH_TOKEN_FAILED})).toEqual({
            ...initialState,
            authorized : false,
            refreshTokenRequest: false,
            tokenIsGood : false
        })
    })
})


