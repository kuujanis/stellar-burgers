import React, { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { useInView } from "react-intersection-observer";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingridients.module.css'

import Ingridient from "./ingridient/ingridient";

import PropTypes from "prop-types";
import ingridientPropType from "../../utils/type";


function BurgerIngridients() {

    const [current,setCurrent] = useState('bun');

    const showTab = (tab) => {
        setCurrent(tab);
		const element = document.getElementById(tab);
		if (element) element.scrollIntoView({ behavior: "smooth" });
    }

    //tab change on scroll

    const [bunRef, inViewBun] = useInView({threshold: 0});
    const [sauceRef, inViewSauce] = useInView({threshold: 0});
    const [mainRef, inViewMain] = useInView({threshold: 0});

    useEffect(() => {
        if (inViewBun) {
          setCurrent('bun');
        } else if (inViewSauce) {
          setCurrent('sauce');
        } else if (inViewMain) {
          setCurrent('main');
        }
      }, [inViewBun, inViewMain, inViewSauce]);


    //data

    const data = useSelector(store => store.data);

    const renderIngridient = (props) => {
        return (
            <li key={props._id}>
                <Ingridient {...props}/>
            </li>
        )};

    const dataBun = data.filter((itm)=>itm.type==='bun' && itm);
	const dataMain= data.filter((itm)=>itm.type==='main'&& itm);
	const dataSauce=data.filter((itm)=>itm.type==='sauce' && itm);

    return(
        <section className={styles.collumn}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className={styles.tablink}>
                    <Tab value='bun' active={current==='bun'} onClick={showTab}>Булки</Tab>
                    <Tab value='main' active={current==='main'} onClick={showTab}>Начинки</Tab>
                    <Tab value='sauce' active={current==='sauce'} onClick={showTab}>Соусы</Tab>
            </div>
            <div className={styles.scrolldiv}>
                <div ref={bunRef}>
                    <h2 id='bun' className="text text_type_main-medium mb-6" >Булки</h2>
                    <ul className={styles.list}>
                        {dataBun.map(renderIngridient)}
                    </ul>
                </div>
                <div ref={mainRef}>
                    <h2 id='main' className="text text_type_main-medium mb-6">Начинки</h2>
                    <ul className={styles.list}>
                        {dataMain.map(renderIngridient)}
                    </ul>
                </div>
                <div  ref={sauceRef}>
                    <h2 id='sauce' className="text text_type_main-medium mb-6">Соусы</h2>
                    <ul className={styles.list}>
                        {dataSauce.map(renderIngridient)}
                    </ul>
                </div>
            </div>
        </section>
    )
}


// BurgerIngridients.propTypes = {data: PropTypes.arrayOf(ingridientPropType).isRequired}


export default BurgerIngridients