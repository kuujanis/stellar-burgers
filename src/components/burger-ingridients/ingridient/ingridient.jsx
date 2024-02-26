import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingridient.module.css';

import { useSelector, useDispatch} from 'react-redux'
import { useDrag } from "react-dnd";

import PropTypes from "prop-types";

import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import { OPEN_INGRD_MODAL, SELECT_INGREDIENT } from "../../../services/actions";

function Ingridient(props) {
    const dispatch = useDispatch();

    const modalIsActive = useSelector((state) => state.modal.ingrdModalActive)
    
    const  ingredientsCount  = useSelector(state => state.ingrd.ingredientsCount);
    const  constructorIngredients  = useSelector(state => state.ingrd.constructorIngredients);
  
    const onIngredientClick = () => {
        dispatch({type: OPEN_INGRD_MODAL})
        dispatch({
            type: SELECT_INGREDIENT, 
            currentIngredient: props })
    };

    const id = props._id;
  
    const [{ opacity }, dragRef] = useDrag({
      type: "ingredients",
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    });
    
    return (
        <div>
            <div className={styles.item} onClick={onIngredientClick} ref={dragRef} style={{opacity}}>
            <img src={props.image} alt={props.name}/>
            
            <p  className={styles.price}>
                <span>{props.price}</span>
                <CurrencyIcon type='primary' />
            </p>

            <p className={styles.name}>
                <span className="text text_type_main-default">{props.name}</span>
            </p>   

            {props.type === "bun" &&
                constructorIngredients.bun &&
                id === constructorIngredients.bun._id ? (
                <Counter count={2} size="small" />
                ) : ingredientsCount[id] ? (
                <Counter count={ingredientsCount[id]} size="small" />
                ) : (<></>)
            }
            </div>
            
            {modalIsActive && <Modal header="Детали ингредиента">
	            <IngredientDetails {...props}/>
            </Modal>
            }
        </div>
    )
}

Ingridient.propTypes = {
	name : PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired
};

export default Ingridient