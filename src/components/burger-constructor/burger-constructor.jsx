import { Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { generateID } from "../../utils";
import { formOrder } from "../../services/actions/orderData";
import { GET_CONSTRUCTOR_INGREDIENTS, COUNT_ORDER_SUM, PUSH_CONSTRUCTOR_INGREDIENT, OPEN_CONSTRUCT_MODAL, SET_DEFAULT_CONSTRUCTOR, CLOSE_MODAL } from '../../services/actions'
import ConstructorCard from "./constructor-card/constructor-card";
import { useNavigate} from "react-router-dom";


function BurgerConstructor() {   

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authorized = useSelector(store=>store.auth.authorized);
    const modalIsActive = useSelector((state) => state.modal.constructModalActive)

    const openModal = () => {
      dispatch({type: OPEN_CONSTRUCT_MODAL})
    }

    const closeModal = () => {
      dispatch({type: CLOSE_MODAL}, [dispatch])
    }

    const {bun, slop} = useSelector(state => state.ingrd.constructorIngredients)
    const constructorIngredients = useSelector(state => state.ingrd.constructorIngredients)
    const ingredients = useSelector((state) => state.ingrd.ingredients);
    const totalPrice = useSelector((state) => state.ingrd.totalPrice);

  
    useEffect(() => {
      dispatch({
        type: GET_CONSTRUCTOR_INGREDIENTS,
        ingredients: constructorIngredients,
      });
    }, [dispatch, ingredients]);
  
    useEffect(() => {
      dispatch({
        type: COUNT_ORDER_SUM,
        bun: bun,
        slop: slop,
      });
    }, [dispatch, slop, bun]);
  
    const onOrderSubmit = () => {
        if (authorized) {
        const orderArr = [bun._id, ...slop.map((item) => item._id)]
        dispatch(
            formOrder(orderArr)
        );
        dispatch({
          type: SET_DEFAULT_CONSTRUCTOR
        })
        openModal();} else navigate('/login')
    };
  
    const [, ingridientsTarget] = useDrop({
      accept: "ingredients",
      drop(ingredient) {
        dispatch({
          type: PUSH_CONSTRUCTOR_INGREDIENT,
          draggedIngridient: ingredients.find(
            (item) => item._id === ingredient.id
          ),
          dragId: generateID(),
        });
      },
    });
  
    return(
        <section className={styles.main}>
        <div  className={styles.column}  ref={ingridientsTarget}>
            {bun && <div className="pr-4 pl-20 ">
                <ConstructorElement 
                text={`${bun.name} (верх)`} 
                price={bun.price} 
                type='top' 
                isLocked={true}
                thumbnail={bun.image}/>
            </div>}
            
                <ul className={styles.scrolldiv + ' ' + styles.orderlist}>
                    {slop.map((item, i) => (
                        <ConstructorCard item={item} key={item.dragId} index={i} />
                    ))}
                </ul>
            
            
            {bun && <div className="pr-4 pl-20 ">
                <ConstructorElement 
                text={`${bun.name} (низ)`} 
                price={bun.price} 
                type='bottom' 
                isLocked={true}
                thumbnail={bun.image}/>
            </div>}
            </div>
            
            <div className={styles.sum}>
                <p>
                    <span className="text text_type_digits-medium">{totalPrice}</span>
                </p>
                    <CurrencyIcon type="primary"/>
                    <Button type="primary" disabled={!bun} htmlType='submit' size="large" onClick={onOrderSubmit}>Оформить заказ</Button>
                    {modalIsActive && <Modal closeModal={closeModal}>
	                <OrderDetails/>
                </Modal>}
            </div>
        </section>
    )
}

export default BurgerConstructor