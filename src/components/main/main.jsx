import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import styles from '../app/app.module.css'

import BurgerIngridients from '../burger-ingridients/burger-ingridients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';

export const MainPage = () => {
    <main className={styles.frame}>
        <DndProvider backend={HTML5Backend}>
        <BurgerIngridients/>
        <BurgerConstructor />
        </DndProvider>
    </main>
}