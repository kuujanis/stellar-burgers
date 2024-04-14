import { getCookie } from "./cookies"

export const normaUrl = 'https://norma.nomoreparties.space/api/ingredients '
export const postURL = 'https://norma.nomoreparties.space/api/orders'
const authUrl = 'https://norma.nomoreparties.space/api/auth'

const registerUrl = authUrl+'/register'
const loginUrl = authUrl+'/login'
const tokenUrl = authUrl+'/token'
const logoutUrl = authUrl+'/logout'
const userUrl = authUrl+'/user'


type TLogin = {
  email: string,
  password: string
}
type TRegisterRequest = { name: string } & TLogin
type TUpdateUserRequest = {
    email: string;
    name: string;
  }

const checkResponse = (response : Response) => {
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