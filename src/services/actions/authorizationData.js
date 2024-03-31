import { LOGIN, LOGOUT, REGISTER_SUCCESS, REGISTER_FAILED, 
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILED
} from "../actions/index";
import {
    registerRequest,
    loginRequest,
    refreshTokenRequest,
    logoutRequest,
    getUserRequest,
    updateUserRequest} from '../../utils/api';
import {setCookie, delCookie, getCookie} from "../../utils/cookies";

export const registerAction = ({email, password, name}) => {
    return function (dispatch) {
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

export function  loginAction (state) {
    return function (dispatch) {
        return loginRequest(state)
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
    return function (dispatch) {
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
    return function (dispatch) {
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
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        return getUserRequest(getCookie('token'))
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
export const updateUserAction = (state) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        updateUserRequest(state.email, state.name, getCookie('token'))
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