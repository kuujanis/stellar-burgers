import React, {useState} from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingridient.module.css';
import PropTypes from "prop-types";
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";

function Ingridient(props) {
    const [modalIsActive, setModalActive] = useState(false);
    return (
        <div>
            <div className={styles.item} onClick={()=>setModalActive(true)}>
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
            {modalIsActive && <Modal header="Детали ингредиента" setModalActive={setModalActive}>
	            <IngredientDetails {...props}/>
            </Modal>
            }
        </div>
        
    )
    
}

Ingridient.propTypes = {
	name : PropTypes.string,
	image: PropTypes.string,
	price: PropTypes.number
};

export default Ingridient