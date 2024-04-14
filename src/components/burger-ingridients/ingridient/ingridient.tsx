import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingridient.module.css';

import { useDrag } from "react-dnd";

import { OPEN_INGRD_MODAL, SELECT_INGREDIENT } from "../../../services/actions";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import { FC } from "react";
import { TCard } from "../../../utils";

type TIngredient = {ingredient: TCard}

const Ingridient: FC<TIngredient> = ({ingredient}) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    
    const  ingredientsCount:{ [id: string]: number }  = useAppSelector(state => state.ingrd.ingredientsCount);
    const  constructorIngredients  = useAppSelector(state => state.ingrd.constructorIngredients);
    const  currentIngredient = useAppSelector(state => state.ingrd.currentIngredient)
  
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

        </Link>
    )
}

export default Ingridient