import { INGREDIENTS_DATA } from ".";
import {normaUrl} from '../../utils/fetch'

export const fetchIngredients = () => {
    return function(dispatch) {
        fetch(normaUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Can't fetch data");
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