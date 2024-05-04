import { useEffect, ReactNode, FC } from 'react'
import {  NavLink} from "react-router-dom";


import styles from './profile.module.css'
import { getUserAction, logoutAction } from '../../services/actions/authorizationData';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { WS_CONNECTION_END, WS_CONNECTION_START } from '../../services/actions';
import { getCookie } from '../../utils/cookies';

type TProfile = {
    children: ReactNode
}

export const ProfilePage:FC<TProfile> = ({children}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(getCookie('token'))
        dispatch({type: WS_CONNECTION_START, payload: `wss://norma.nomoreparties.space/orders?token=${getCookie('token')}`});
        // feedUrl+`?token=${accessToken}`
        return () => {
          dispatch({type: WS_CONNECTION_END});
        };
    }, [dispatch]);

    useEffect(()=>{
        dispatch(getUserAction())
    },[]);


    const onLogout = () => {
        dispatch(logoutAction())
    }

    return (
        <section className={styles.profile_main + ' pt-20'}>
            <div className={styles.profile_sidebar + ' mr-15'}>
                <NavLink to='/profile' 
                className={({isActive}) => 
                !isActive ? 
                styles.link+' text text_type_main-medium text_color_inactive'
                : styles.selected+' text text_type_main-medium'}>
                    <span>Профиль</span>
                </NavLink>
                <NavLink to='/profile/orders' 
                className={({isActive}) => 
                !isActive ? 
                styles.link+' text text_type_main-medium text_color_inactive'
                : styles.selected+' text text_type_main-medium'}>
                    <span>История заказов</span>
                </NavLink>
                <NavLink to='/login' onClick={onLogout}
                className={({isActive}) => 
                !isActive ? 
                styles.link+' text text_type_main-medium text_color_inactive'
                : styles.selected+' text text_type_main-medium'}>
                    <span>Выход</span>
                </NavLink>
                <p className={styles.note + " text text_type_main-default text_color_inactive"}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            {children}
        </section>
    )
}