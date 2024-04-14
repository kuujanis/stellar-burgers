import { Dispatch } from "redux";
import {normaUrl} from '../../utils/api'
import { 
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_ERROR,
  } from "../actions";

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