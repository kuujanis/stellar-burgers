import React, { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useInView } from "react-intersection-observer";
import { Link, useLocation } from "react-router-dom";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingridients.module.css'

import Ingridient from "./ingridient/ingridient";

import {fetchIngredients} from '../../services/actions/ingredientsData'



function BurgerIngridients() {

    const [current,setCurrent] = useState('bun');

    var location = useLocation();

    const showTab = (tab) => {
        setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    //tab change on scroll

    const [bunRef, inViewBun] = useInView({threshold: 0});
    const [sauceRef, inViewSauce] = useInView({threshold: 0});
    const [slopRef, inViewSlop] = useInView({threshold: 0});

    useEffect(() => {
        if (inViewBun) {
          setCurrent('bun');
        } else if (inViewSauce) {
          setCurrent('sauce');
        } else if (inViewSlop) {
          setCurrent('slop');
        }
      }, [inViewBun, inViewSlop, inViewSauce]);


    //data

    const ingredients = useSelector(state => state.ingrd.ingredients);

    const renderIngridient = (props) => {
        return (
            <Link className={styles.nonlink} key={props._id} to={`/ingredients/${props._id}`} state={{background: location }} >
                <Ingridient {...props}/>
            </Link>
        )};

    const ingredientsBun = ingredients.filter((itm)=>itm.type==='bun' && itm);
	const ingredientsSlop = ingredients.filter((itm)=>itm.type==='main'&& itm);
	const ingredientsSauce=ingredients.filter((itm)=>itm.type==='sauce' && itm);

    return(
        <section className={styles.collumn}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={styles.tablink}>
                    <Tab value='bun' active={current==='bun'} onClick={showTab}>Булки</Tab>
                    <Tab value='slop' active={current==='slop'} onClick={showTab}>Начинки</Tab>
                    <Tab value='sauce' active={current==='sauce'} onClick={showTab}>Соусы</Tab>
            </div>
            <div className={styles.scrolldiv}>
                <div ref={bunRef}>
                    <h2 id='bun' className="text text_type_main-medium mb-6" >Булки</h2>
                    <ul className={styles.list}>
                        {ingredientsBun.map(renderIngridient)}
                    </ul>
                </div>
                <div ref={slopRef}>
                    <h2 id='slop' className="text text_type_main-medium mb-6">Начинки</h2>
                    <ul className={styles.list}>
                        {ingredientsSlop.map(renderIngridient)}
                    </ul>
                </div>
                <div  ref={sauceRef}>
                    <h2 id='sauce' className="text text_type_main-medium mb-6">Соусы</h2>
                    <ul className={styles.list}>
                        {ingredientsSauce.map(renderIngridient)}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default BurgerIngridients