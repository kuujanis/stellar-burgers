import { INGREDIENTS_DATA } from ".";

const normaUrl = 'https://norma.nomoreparties.space/api/ingredients '

export const fetchIngredients = () => {
    return function(dispatch) {
        fetch(normaUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status)
                }
            })
            .then(res => {
                dispatch({
                    type: INGREDIENTS_DATA,
                    data: res.data
                })
            })
            .catch(err => {
                console.log(err.message)
                alert('API CONNECTION ERROR')
            })
    }
}