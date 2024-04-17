import {checkResponse, normaUrl} from '../../utils/api'
import { 
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_ERROR,
  } from "../actions";
import { AppDispatch } from "../store";

export const fetchIngredients = () => {
    return function(dispatch:AppDispatch) {
        dispatch({
            type: FETCH_INGREDIENTS_REQUEST,
        })
        fetch(normaUrl)
            .then(res => checkResponse(res))
            .then(result => {
                dispatch({
                    type: FETCH_INGREDIENTS_SUCCESS,
                    ingredients: result.data
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