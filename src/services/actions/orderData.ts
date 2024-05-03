import { ORDER_CLEAR, ORDER_GET_FAILED, ORDER_GET_REQUEST, ORDER_GET_SUCCESS, POST_ORDER_ERROR, POST_ORDER_REQUEST, POST_ORDER_SUCCESS } from ".";
import {checkResponse, orderUrl, postURL} from '../../utils/api'
import { AppDispatch } from "../store";

export const formOrder = (orderList: Array<string|undefined>) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        })
        fetch(postURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"ingredients": orderList})
        })
        .then(res => checkResponse(res))
        .then(result => {
            if (result.success) {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    orderNumber: result.order.number
                })
                console.log('ORDER_CREATED')
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

export const getOrder = (id: string | undefined) => {
	return function(dispatch: AppDispatch) {
		dispatch({type: ORDER_GET_REQUEST});
		fetch(orderUrl + `/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				}
			}
		)
		.then(checkResponse)
		.then((response:any) => {
			console.log(response);
			dispatch({
				type: ORDER_GET_SUCCESS,
				order: response.orders[0]
			});
			return response.data;
		})
		.catch(() => {
			console.log('ORDER_API_ERROR');
			dispatch({
				type: ORDER_GET_FAILED
			})
		})
	}
}
export const clearOrder = () => {
	return function (dispatch: AppDispatch) {
		dispatch({type: ORDER_CLEAR});
	}
}