import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'

import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import bun_hc from "../../utils/bun";
import ingridientPropType from "../../utils/type";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { dataContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { formOrder } from "../../services/actions/orderData";


function BurgerConstructor() {
    const [modalIsActive, setModalActive] = useState(false);
    const data = useContext(dataContext)

    const dispatch = useDispatch();

    const {bun, ingredients} = useSelector(store => store.burgerIngredients)

    const countPrice = (bun, items) => {
	    let totalPrice = (bun)? bun.price*2 : 0
	    if(items) items.map((itm)=>{return totalPrice += itm.price})
	    return totalPrice;
	}

    const orderSubmit = () => {
        let orderList = [bun._id];
        for (let item of ingredients) {
            orderList.push(item._id)
        }
        dispatch(formOrder(orderList));
        setModalActive(true);
    }

    // const renderElement = (props) => {
    //     return ((props.type === 'main' || props.type === 'sauce') ?
    //         <li key={props._id} className={styles.card}>
    //             <DragIcon type="primary"/>
    //             <ConstructorElement 
    //             text={props.name} 
    //             price={props.price} 
    //             thumbnail={props.image}/>
    //         </li>
    //     :null)
    // };

    return(
        <section className={styles.column}>
            <div className="pr-4 pl-20 ">
                <ConstructorElement 
                text={`${bun_hc.name} (верх)`} 
                price={bun_hc.price} 
                type='top' 
                isLocked={true}
                thumbnail={bun_hc.image}/>
            </div>
            
                <ul className={styles.scrolldiv + ' ' + styles.orderlist}>
                    {/* {data.map(renderElement)} */}
                </ul>
            
            
            <div className="pr-4 pl-20 ">
                <ConstructorElement 
                text={`${bun_hc.name} (низ)`} 
                price={bun_hc.price} 
                type='bottom' 
                isLocked={true}
                thumbnail={bun_hc.image}/>
            </div>
            <div className={styles.sum}>
                <p>
                    <span className="text text_type_digits-medium">{countPrice()}</span>
                </p>
                    <CurrencyIcon type="primary"/>
                    <Button type="primary" htmlType='submit' size="large" onClick={orderSubmit}>Оформить заказ</Button>
                    {modalIsActive && <Modal setModalActive={setModalActive}>
	                <OrderDetails/>
                </Modal>}
            </div>
        </section>
    )
}

export default BurgerConstructor