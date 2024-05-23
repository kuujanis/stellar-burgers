import { getCookie } from "./cookies"

const BASE_URL = 'https://norma.nomoreparties.space/api'
export const normaUrl = BASE_URL+'/ingredients '
export const postURL = BASE_URL+'/orders'
export const authUrl = BASE_URL+'/auth'

export const registerUrl = authUrl+'/register'
export const loginUrl = authUrl+'/login'
export const tokenUrl = authUrl+'/token'
export const logoutUrl = authUrl+'/logout'
export const userUrl = authUrl+'/user'
export const orderUrl = BASE_URL+'/orders'

export const forgotUrl = BASE_URL+'/password-reset'
export const resetUrl = forgotUrl+'/reset'
export const feedUrl = 'wss://norma.nomoreparties.space/orders'

type TLogin = {
  email: string,
  password: string
}
type TRegisterRequest = { name: string } & TLogin
type TUpdateUserRequest = {
    email: string;
    name: string;
  }

export const checkResponse = (response : Response) => {
    if (response.ok) {
        return response.json(); 
    } else {
        return Promise.reject(response.status);
    }
}

export const registerRequest = ({email, password, name}: TRegisterRequest) => {
    return fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        }
    )
    .then(res => checkResponse(res));
};

export const loginRequest = ({ email, password }:TLogin) => {
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email, password }),
    })
    .then(res => checkResponse(res));
};

export const refreshTokenRequest = () => {
    return fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token : localStorage.getItem('refreshToken')
        }),
    })
    .then(res => checkResponse(res));
};

export const logoutRequest = () => {
    return fetch(logoutUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        }),
    })
    .then(res => checkResponse(res));
};


export const getUserRequest = () => {
    return fetch(userUrl, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        }
    })
    .then(res => checkResponse(res));
};
export const updateUserRequest = ({email, name}:TUpdateUserRequest) => {
    return fetch(userUrl, {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({email, name})
    })
    .then(res => checkResponse(res));
};
