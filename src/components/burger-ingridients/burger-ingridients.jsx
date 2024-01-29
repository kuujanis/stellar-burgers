import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingridients.module.css'
import Ingridient from "./ingridient/ingridient";
import ingridientPropType from "../../utils/type";
import PropTypes from "prop-types";

function BurgerIngridients(props) {
    const [current,setCurrent] = React.useState('bun');
    function showTab(tab) {
        setCurrent(tab);
    }

    const renderIngridient = (props) => {
        return (
            <li key={props.id}>
                <Ingridient {...props}/>
            </li>
        )};

    const dataBun = props.data.filter((itm)=>itm.type==='bun' && itm);
	const dataMain= props.data.filter((itm)=>itm.type==='main'&& itm);
	const dataSauce=props.data.filter((itm)=>itm.type==='sauce' && itm);

    return(
        <section className={styles.collumn}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div className="mb-10" style={{ display: "flex" }}>
                <a href='#bun' className={styles.tablink}>
                    <Tab value='bun' active={current==='bun'} onClick={showTab}>Булки</Tab>
                </a>
                <a href='#main' className={styles.tablink}>
                    <Tab value='main' active={current==='main'} onClick={showTab}>Начинки</Tab>
                </a>
                <a  href='#sauce' className={styles.tablink}>
                    <Tab value='sauce' active={current==='sauce'} onClick={showTab}>Соусы</Tab>
                </a>
            </div>
            <div className={styles.scrolldiv}>
                <h2 id='bun' className="text text_type_main-medium mb-6">Булки</h2>
                <ul className={styles.list}>
                    {dataBun.map(renderIngridient)}
                </ul>
                <h2 id='main' className="text text_type_main-medium mb-6">Начинки</h2>
                <ul className={styles.list}>
                    {dataMain.map(renderIngridient)}
                </ul>
                <h2 id='sauce' className="text text_type_main-medium mb-6">Соусы</h2>
                <ul className={styles.list}>
                    {dataSauce.map(renderIngridient)}
                </ul>
            </div>
        </section>

    )

}


BurgerIngridients.propTypes = {data: PropTypes.arrayOf(ingridientPropType)}


export default BurgerIngridients