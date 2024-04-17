import React, { useEffect, FC} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import styles from './app.module.css'

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
import { LoginPage } from '../../pages/login/login';
import { NotFoundPage } from '../../pages/not-found/not-found';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientDetailsPage } from '../../pages/details-page/ingredient-details-page';
import { fetchIngredients } from '../../services/actions/ingredientsData';
import {TIngrd} from '../../utils/type'
import { useAppDispatch } from '../../services/store';

const App: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  const selectedIngredient:TIngrd = location.state && location.state.ingredient;
  
  const dispatch = useAppDispatch()

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
        <Route path='/' element={
          <main className={styles.frame}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngridients/>
              <BurgerConstructor />
            </DndProvider>
          </main>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password' element={<ResetPasswordPage/>} />
        <Route path='/ingredients/:id' element={<IngredientDetailsPage/>} />
        <Route path='/profile' element={<ProtectedRoute element={<ProfilePage />}/>}/>
        <Route path='*' element={<NotFoundPage/>} />

      </Routes>
        
      {background &&
        <Routes location={location}>
          <Route path='/ingredients/:id' element={
            <Modal closeModal={handleModalClose} header={'Детали ингредиента'}>
              <IngredientDetails ingredient={selectedIngredient} />
            </Modal>
          }/>
        </Routes>
      }


    </div>
  );
}

export default App;
