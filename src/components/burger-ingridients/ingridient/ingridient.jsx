import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingridient.module.css';
import PropTypes from "prop-types";

function Ingridient(props) {
    return (
        <div className={styles.item}>
            <Counter />
            <img src={props.image} alt={props.name}/>
            <p  className={styles.price}>
                <span>{props.price}</span>
                <CurrencyIcon type='primary' />
            </p>
            <p className={styles.name}>
                <span className="text text_type_main-default">{props.name}</span>
            </p>      
        </div>
    )
    
}

Ingridient.propTypes = {
	name : PropTypes.string,
	image: PropTypes.string,
	price: PropTypes.number
};

export default Ingridient