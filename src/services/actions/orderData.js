import { ORDER_DATA, RESET_CONSTRUCTOR } from ".";
import {postURL} from '../../utils/fetch'


export const formOrder = (orderList) => {
    return function (dispatch) {
        fetch(postURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({'ingridients':orderList})
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
                    type: ORDER_DATA,
                    number: res.order.number
                })
                dispatch({
                    RESET_CONSTRUCTOR
                })
            }
        })
        .catch(err => {
            console.log(err.message)
            alert('API CONNECTION ERROR')
        })
    }
    
}