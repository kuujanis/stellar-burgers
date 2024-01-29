import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'
import React from "react";
import ingridientPropType from "../../utils/type";
import PropTypes from "prop-types";


function BurgerConstructor(props) {
    const bun={
        "_id":"60666c42cc7b410027a1a9b1",
        "name":"Краторная булка N-200i",
        "type":"bun",
        "proteins":80,
        "fat":24,
        "carbohydrates":53,
        "calories":420,
        "price":1255,
        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v":0
     }

     const renderElement = (props) => {
        return ((props.type === 'main' || props.type === 'sauce') ?
            <li key={props.id} className={styles.card}>
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
                    {props.data.map(renderElement)}
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
                    <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {data: PropTypes.arrayOf(ingridientPropType)}

export default BurgerConstructor