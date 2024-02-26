import React, { useEffect, useState } from 'react';
import styles from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {

  return (
    <div className={styles.main}>
      <AppHeader />
        <main className={styles.frame}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngridients/>
            <BurgerConstructor />
          </DndProvider>
        </main>
    </div>
  );
}

export default App;
