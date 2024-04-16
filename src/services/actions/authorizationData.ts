import { LOGIN, LOGOUT, REGISTER_SUCCESS, REGISTER_FAILED, 
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED
} from "./index";
import {
    registerRequest,
    loginRequest,
    refreshTokenRequest,
    logoutRequest,
    getUserRequest,
    updateUserRequest} from '../../utils/api';
import { setCookie, delCookie } from "../../utils/cookies";
import { AppDispatch } from "../store";

type TRegister = {
    email: string,
    password: string,
    name: string
}
type TLogin = {
    email: string,
    password: string
}
type TUpdate = {
    email: string,
    name: string
}

export const registerAction = ({email, password, name}:TRegister) => {
    return function (dispatch:AppDispatch) {
        registerRequest({email, password, name})
        .then((res) => {
            if (res && res.success) {
                const authToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', authToken);
                localStorage.setItem('refreshToken', refreshToken);
                dispatch({
                    type: REGISTER_SUCCESS,
                    user: res.user,
                });

            } else {
                dispatch({
                    type: REGISTER_FAILED,
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: REGISTER_FAILED,
            });
        });
    }
}

export function loginAction ({email, password}:TLogin) {
    return function (dispatch:AppDispatch) {
        return loginRequest({email, password})
            .then((res) => {
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken;
                    setCookie('token', authToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    dispatch({
                        type: LOGIN,
                        user: res.user,
                    });
                    return res;
                } else {
                    console.error(res.message)

                }
            })
            .catch((err) => {
                console.error('Error: ', err);
            });
    };
};

export const refreshTokenAction = () => {
    return function (dispatch:AppDispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST
        });
        refreshTokenRequest()
            .then((res) => {
            if (res && res.success) {
                localStorage.setItem('refreshToken', res.refreshToken);
                const authToken = res.accessToken.split('Bearer ')[1];
                setCookie('token', authToken);
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS
                });
            }
        })
        .catch((err) => {
            dispatch({
                type: REFRESH_TOKEN_FAILED
            });
            console.error('Error: ', err);
        });
    };
}

export const logoutAction = () => {
    return function (dispatch:AppDispatch) {
        logoutRequest()
            .then((res) => {
                if (res && res.success) {
                    delCookie('token');
                    localStorage.removeItem('refreshToken');
                    dispatch({
                        type: LOGOUT,
                    });
                }
            })
            .catch((err) => {
                console.error('Error: ', err);
            });
    };
};

export const getUserAction = () => {
    return function (dispatch:AppDispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        return getUserRequest()
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user,
                    });
                }
            })
            .catch((err) => {
                console.error('Error: ', err);
                dispatch({
                    type: GET_USER_FAILED
                });
                dispatch({
                    type: REFRESH_TOKEN_REQUEST,
                });
            });
    };
};
export const updateUserAction = ({email, name}: TUpdate) => {
    return function (dispatch:AppDispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        updateUserRequest({email, name})
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: res.user,
                    });
                } else {
                    dispatch({
                        type: GET_USER_FAILED,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_USER_FAILED,
                });
            });
    }
}