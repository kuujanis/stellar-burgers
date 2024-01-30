import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'

import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import bun from "../../utils/bun";
import ingridientPropType from "../../utils/type";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { dataContext } from "../../context";


function BurgerConstructor() {
    const [modalIsActive, setModalActive] = useState(false);
    const data = useContext(dataContext)

    // const bun = data.find(itm => itm.type ==='bun');

     const renderElement = (props) => {
        return ((props.type === 'main' || props.type === 'sauce') ?
            <li key={props._id} className={styles.card}>
                <DragIcon type="primary"/>
                <ConstructorElement 
                text={props.name} 
                price={props.price} 
                thumbnail={props.image}/>
            </li>
        :null)};

    return(
        <section className={styles.column}>
            <div className="pr-4 pl-20 ">
                <ConstructorElement 
                text={`${bun.name} (верх)`} 
                price={bun.price} 
                type='top' 
                isLocked={true}
                thumbnail={bun.image}/>
            </div>
            
                <ul className={styles.scrolldiv + ' ' + styles.orderlist}>
                    {data.map(renderElement)}
                </ul>
            
            
            <div className="pr-4 pl-20 ">
                <ConstructorElement 
                text={`${bun.name} (низ)`} 
                price={bun.price} 
                type='bottom' 
                isLocked={true}
                thumbnail={bun.image}/>
            </div>
            <div className={styles.sum}>
                <p>
                    <span className="text text_type_digits-medium">610</span>
                </p>
                    <CurrencyIcon type="primary"/>
                    <Button type="primary" htmlType='submit' size="large" onClick={()=>setModalActive(true)}>Оформить заказ</Button>
                    {modalIsActive && <Modal setModalActive={setModalActive}>
	                <OrderDetails/>
                </Modal>}
            </div>
        </section>
    )
}

export default BurgerConstructor