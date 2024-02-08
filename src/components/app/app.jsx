import React, { useEffect } from 'react';
import styles from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { normaUrl } from '../../utils/fetch';
import fetchData from '../../utils/fetch';

import { dataContext } from '../../context';


function App() {
  const [data,setData] = React.useState([]);
  useEffect(() => {fetchData(normaUrl,setData)},[normaUrl,setData])

  return (
    <div className={styles.main}>
      <AppHeader />
        <main className={styles.frame}>
          <dataContext.Provider value={data}>
            <BurgerIngridients data={data} />
            <BurgerConstructor data={data} />
          </dataContext.Provider>
        </main>
      
    </div>
    
  );
}

export default App;
