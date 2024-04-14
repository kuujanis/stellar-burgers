import { Dispatch } from "redux";
import { FETCH_INGREDIENTS_ERROR, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS } from ".";
import {normaUrl} from '../../utils'

export const fetchIngredients = () => {
    return function(dispatch:Dispatch) {
        dispatch({
            type: FETCH_INGREDIENTS_REQUEST,
        })
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
                    type: FETCH_INGREDIENTS_SUCCESS,
                    ingredients: res.data
                })
            })
            .catch(err => {
                console.log(err.message)
                alert('API CONNECTION ERROR')
                dispatch({
                    type: FETCH_INGREDIENTS_ERROR,
                })
            })
    }
}