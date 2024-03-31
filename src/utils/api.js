
const registerUrl = 'https://norma.nomoreparties.space/api/auth/register'
const loginUrl = 'https://norma.nomoreparties.space/api/auth/login'
const tokenUrl = 'https://norma.nomoreparties.space/api/auth/token'
const logoutUrl = 'https://norma.nomoreparties.space/api/auth/logout'
const userUrl = 'https://norma.nomoreparties.space/api/auth/user'


export const registerRequest = ({email, password, name}) => {
    return fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        }
    )
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
};

export const loginRequest = ({ email, password }) => {
    return fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ email: email, password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
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
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
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
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.status);
        }
    });
};


export const getUserRequest = (token) => {
    return fetch(userUrl, {
        method : 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        });
};
export const updateUserRequest = (email, name, token) => {
    return fetch(userUrl, {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({email, name})
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response.status);
            }
        });
};