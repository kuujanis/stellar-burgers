import { Dispatch } from "redux";
import {normaUrl} from '../../utils'
import { 
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_ERROR,
    POST_ORDER_REQUEST, 
    POST_ORDER_SUCCESS,
    POST_ORDER_ERROR,
    SELECT_INGREDIENT, 
    GET_CONSTRUCTOR_INGREDIENTS, 
    PUSH_CONSTRUCTOR_INGREDIENT,
    DELETE_CONSTRUCTOR_INGREDIENT,
    REFRESH_CONSTRUCTOR,
    SET_DEFAULT_CONSTRUCTOR,
    COUNT_ORDER_SUM
  } from "../actions";
  import { TDraggingCard, TCard } from "../../utils";

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

export const addConstructorIngredient = (draggedIngridient: TDraggingCard, dragId: string) => ({
    type: PUSH_CONSTRUCTOR_INGREDIENT,
    draggedIngridient,
    dragId,
  });
  
  export const deleteConstructorIngredient = (deletedIngredient: TDraggingCard) => ({
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    deletedIngredient,
  });
  
  export const getConstructorIngredients = (ingredients: Array<TDraggingCard>) => ({
    type: GET_CONSTRUCTOR_INGREDIENTS,
    ingredients,
  });
  
  export const updateConstructorList = (newCards: Array<TDraggingCard>) => ({
    type: REFRESH_CONSTRUCTOR,
    newCards,
  });

  export const getTotalPrice = (bun: TDraggingCard, noBunIngredients: Array<TDraggingCard>) => ({
    type: COUNT_ORDER_SUM,
    bun,
    noBunIngredients,
  });
  
  export const clearConstructor = () => ({ type: SET_DEFAULT_CONSTRUCTOR });