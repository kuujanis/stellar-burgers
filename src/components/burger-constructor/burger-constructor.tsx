import { Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css'

import React, { useEffect } from "react";
import { useDrop } from "react-dnd";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { generateID } from "../../utils";
import { formOrder } from "../../services/actions/orderData";
import { GET_CONSTRUCTOR_INGREDIENTS, COUNT_ORDER_SUM, PUSH_CONSTRUCTOR_INGREDIENT, OPEN_CONSTRUCT_MODAL, SET_DEFAULT_CONSTRUCTOR, CLOSE_MODAL } from '../../services/actions'
import {ConstructorItem} from "./constructor-item/constructor-item";
import { useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getCookie } from "../../utils/cookies";

function BurgerConstructor() {   

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authorized = useAppSelector(store=>store.auth.authorized);
    const modalIsActive = useAppSelector((state) => state.modal.constructModalActive)

    const openModal = () => {
      dispatch({type: OPEN_CONSTRUCT_MODAL})
    }

    const closeModal = () => {
      dispatch({type: CLOSE_MODAL}, [dispatch])
    }

    const {bun, slop} = useAppSelector(state => state.ingrd.constructorIngredients)
    const constructorIngredients = useAppSelector(state => state.ingrd.constructorIngredients)
    const ingredients = useAppSelector((state) => state.ingrd.ingredients);
    const totalPrice = useAppSelector((state) => state.ingrd.totalPrice);

  
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
        if (getCookie('token')) {
        dispatch(
            formOrder([bun?._id, ...slop.map((item) => item._id)])
        );
        dispatch({
          type: SET_DEFAULT_CONSTRUCTOR
        })
        openModal();} else navigate('/login')
    };
  
    const [, ingridientsTarget] = useDrop({
      accept: "ingredients",
      drop(ingredient:{id:string}) {
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
                    {slop.map((item, i:number) => (
                        <ConstructorItem item={item} key={item.dragId} index={i} />
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
                {modalIsActive && 
                <Modal closeModal={closeModal}>
	                <OrderDetails/>
                </Modal>}
            </div>
        </section>
    )
}

export default BurgerConstructor