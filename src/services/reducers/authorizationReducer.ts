import {
    LOGIN,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGOUT,
    REFRESH_TOKEN_REQUEST,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED, REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS
} from '../actions/index';
import {getCookie} from "../../utils/cookies";
import { TUser } from '../../utils/type';
import { TAuthActions } from './auth.types';


export type TAuthStore = {
    login: Boolean,
    authorized: Boolean,
    user: TUser
}

export const initialState =
    {
        login: false,
        authorized : !!getCookie('token'),
        user: {
            email:'',
            password:'',
            name:''
        }
};

export const authorizationReducer = (state:TAuthStore = initialState, action: TAuthActions) => {
    switch (action.type) {

        case REGISTER_SUCCESS: {
            return {
                ...state
            };
        }
        case REGISTER_FAILED:{
            return {
                ...state
            };
        }

        case LOGIN: {
            console.log(action.user)
            return {
                ...state,
                login: true,
                authorized : true,
                user: action.user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                login: false,
                authorized : false,
                user: {
                    name : '',
                    email: '',
                    password: ''
                }
            };
        }

        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest : true,
                user: {
                    name : '',
                    email: '',
                    password: ''
                }
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest : false,
                authorized : true,
                user: action.user
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest : false,
                authorized: false,
                user: {
                    name : '',
                    email: '',
                    password: ''
                }
            }
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true,
                tokenIsGood : false
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                authorized : true,
                refreshTokenRequest: false,
                tokenIsGood : true
            }
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                authorized : false,
                refreshTokenRequest: false,
                tokenIsGood : false
            }
        }

        default: {
            return state;
        }
    }
}