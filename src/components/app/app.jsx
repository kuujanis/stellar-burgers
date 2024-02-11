import React, { useEffect, useState } from 'react';
import styles from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { normaUrl } from '../../utils/fetch';
import fetchData from '../../utils/fetch';

import {fetchIngredients} from '../../services/actions/fetchData'
import { dataContext } from '../../context';


import { useDispatch } from 'react-redux';



function App() {
  const [data,setData] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  useEffect(() => {fetchData(normaUrl,setData)},[normaUrl,setData])

  return (
    <div className={styles.main}>
      <AppHeader />
        <main className={styles.frame}>
          <dataContext.Provider value={data}>

              <BurgerIngridients/>
              <BurgerConstructor data={data} />

          </dataContext.Provider>
        </main>
      
    </div>
    
  );
}

export default App;
