import React, { useEffect } from 'react';
import styles from './App.module.css'
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import { normaUrl } from '../../utils/fetch';
import fetchData from '../../utils/fetch';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  const [data,setData] = React.useState([]);
  useEffect(() =>{fetchData(normaUrl,setData)},[normaUrl,setData])
  return (
    <div className={styles.root}>
      <AppHeader />
      <div className={styles.frame}>
      <BurgerIngridients data={data}/>
      <BurgerConstructor data={data}/>
      </div>
    </div>
  );
}

export default App;
