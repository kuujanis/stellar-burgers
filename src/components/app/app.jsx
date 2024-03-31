import React, { useEffect, useState } from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import styles from './app.module.css'

import { useDispatch, useSelector } from 'react-redux'
import BurgerIngridients from '../burger-ingridients/burger-ingridients'; 
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import AppHeader from '../app-header/app-header';
import { ProfilePage } from '../../pages/profile/profile';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProtectedRoute } from '../protected-route/protected-route';
// import { MainPage } from '../main/main';
import { LoginPage } from '../../pages/login/login';
import { NotFoundPage } from '../../pages/not-found/not-found';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientDetailsPage } from '../../pages/details-page/ingredient-details-page';
import { fetchIngredients } from '../../services/actions/ingredientsData';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  let background = location.state && location.state.background;
  const modalIsActive = useSelector((state) => state.modal.ingrdModalActive)
  const currentIngredient = useSelector(store => store.ingrd.currentIngredient)

  
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchIngredients())
  }, [dispatch])

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.main}>
      <AppHeader />
      <Routes location={background || location}>
        <Route exact='true' path='/' element={
          <main className={styles.frame}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngridients/>
              <BurgerConstructor />
            </DndProvider>
          </main>
        } />
        <Route exact='true' path='/login' element={<LoginPage />} />
        <Route exact='true' path='/register' element={<RegisterPage />} />
        <Route exact='true' path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route exact='true' path='/reset-password' element={<ResetPasswordPage/>} />
        <Route exact='true' path='/ingredients/:id' element={<IngredientDetailsPage/>} />
        <Route exact='true' path='/profile' element={<ProtectedRoute element={<ProfilePage />}/>}/>
        <Route exact='true' path='*' element={<NotFoundPage/>} />

      </Routes>
        
      {background &&
        <Routes location={location}>
          <Route exact='true' path='/ingredients/:id' element={
            <Modal closeModal={handleModalClose} header={'Детали ингредиента'}>
              <IngredientDetails ingredient={currentIngredient} />
            </Modal>
          }/>
        </Routes>
      }


    </div>
  );
}

export default App;
