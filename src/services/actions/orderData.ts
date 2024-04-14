import { Dispatch } from "redux";
import { POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS } from ".";
import {postURL} from '../../utils/api'

export const formOrder = (orderList: Array<string|undefined>) => {
    return function (dispatch: Dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        })
        fetch(postURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"ingredients": orderList})
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Can't post data");
            }
        })
        .then(res => {
            if (res.success) {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    orderNumber: res.order.number
                })
                console.log('success')
            }
        })
        .catch(err => {
            console.log(err.message)
            alert('API CONNECTION ERROR')
            dispatch({
                type: POST_ORDER_ERROR,
            })
        })
    }
    
}