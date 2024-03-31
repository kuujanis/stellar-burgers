import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingridient.module.css';

import { useSelector, useDispatch} from 'react-redux'
import { useDrag } from "react-dnd";

import PropTypes from "prop-types";

import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";
import { OPEN_INGRD_MODAL, SELECT_INGREDIENT } from "../../../services/actions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ingredientPropType from "../../../utils/type";

function Ingridient({ingredient}) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const modalIsActive = useSelector((state) => state.modal.ingrdModalActive)
    
    const  ingredientsCount  = useSelector(state => state.ingrd.ingredientsCount);
    const  constructorIngredients  = useSelector(state => state.ingrd.constructorIngredients);
    const  currentIngredient = useSelector(state => state.ingrd.currentIngredient)
  
    const onIngredientClick = () => {
        dispatch({type: OPEN_INGRD_MODAL})
        dispatch({
            type: SELECT_INGREDIENT, 
            currentIngredient: ingredient })
        console.log(currentIngredient)
    };

    const id = ingredient._id;
  
    const [{ opacity }, dragRef] = useDrag({
      type: "ingredients",
      item: { id },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    });
    
    return (
        <Link className={styles.nonlink} key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{background: location, ingredient }} >
            <div className={styles.item} onClick={onIngredientClick} ref={dragRef} style={{opacity}}>
            <img src={ingredient.image} alt={ingredient.name}/>
            
            <p  className={styles.price}>
                <span>{ingredient.price}</span>
                <CurrencyIcon type='primary' />
            </p>

            <p className={styles.name}>
                <span className="text text_type_main-default">{ingredient.name}</span>
            </p>   

            {ingredient.type === "bun" &&
                constructorIngredients.bun &&
                id === constructorIngredients.bun._id ? (
                <Counter count={2} size="small" />
                ) : ingredientsCount[id] ? (
                <Counter count={ingredientsCount[id]} size="small" />
                ) : (<></>)
            }
            </div>
            
            {/* {modalIsActive && 
                <Modal header="Детали ингредиента">
                    <IngredientDetails/>
                </Modal>
            } */}
        </Link>
    )
}

Ingridient.propTypes = {
	ingredient: ingredientPropType
};

export default Ingridient