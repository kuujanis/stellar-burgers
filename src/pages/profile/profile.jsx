import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { NavLink} from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './profile.module.css'
import { getUserAction, logoutAction, updateUserAction } from '../../services/actions/authorizationData';

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const [defaultState, setDefaultState] = useState({email:'',password:'', name:''});
    const [state, setState] = useState({email:'',password:'', name:''});
    const [changed, setChanged] = useState(false)
    const user = useSelector(store => store.auth.user);

    useEffect(()=>{
        dispatch(getUserAction())
    },[]);

    useEffect(()=>{
        setState(user);
        setDefaultState({
            ...user,
            ...{password:''}
        });
    },[user]);

    const onInputChange = e => {
        setState({
            ...state,
            [ e.target.name ]: e.target.value
        })
        setChanged(true)
    }

    const onSubmit = e => {
        e.preventDefault();
        dispatch(updateUserAction(state))
    }

    const onReset = e => {
        e.preventDefault();
        setState(defaultState)
        setChanged(false)
    }

    const onLogout = () => {
        dispatch(logoutAction())
    }

    return (
        <section className={styles.profile_main + ' pt-20'}>
            <div className={styles.profile_sidebar + ' mr-15'}>
                <NavLink exact='true' to='/profile' 
                className={({isActive}) => 
                !isActive ? 
                styles.link+' text text_type_main-medium text_color_inactive'
                : styles.selected+' text text_type_main-medium'}>
                    <span>Профиль</span>
                </NavLink>
                <NavLink exact='true' to='/profile/orders' 
                className={({isActive}) => 
                !isActive ? 
                styles.link+' text text_type_main-medium text_color_inactive'
                : styles.selected+' text text_type_main-medium'}>
                    <span>История заказов</span>
                </NavLink>
                <NavLink exact='true' to='/login' onClick={onLogout}
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
            <div className={styles.profile_col}>
                        <form className={styles.profile_form} onSubmit={onSubmit} onReset={onReset}>
                            <Input
                                type={'text'}
                                placeholder="Имя"
                                onChange={onInputChange}
                                value={state.name??''}
                                name={'name'}
                                size={"default"}
                                icon={'EditIcon'}
                                required
                                maxLength={30}
                            />
                            <Input
                                type={'email'}
                                placeholder="Адрес электронной почты"
                                onChange={onInputChange}
                                value={state.email||''}
                                name={'email'}
                                size={"default"}
                                icon={'EditIcon'}
                                pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+"
                                required                             
                            />
                            <Input
                                type={'password'}
                                placeholder="Пароль"
                                onChange={onInputChange}
                                value={state.password||''}
                                name={'password'}
                                size={"default"}
                                icon={'EditIcon'}
                                pattern=".{6,}"
                                required                               
                            />
                            {changed && 
                                <>
                                    <Button type='primary' size='medium' htmlType="submit"><span>Сохранить</span></Button>
                                    <Button type='secondary' size='small' htmlType="reset"><span>Отмена</span></Button>
                                </>
                            }

                        </form>      
            </div>
        </section>
    )
}