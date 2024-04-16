import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { NavLink} from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './profile.module.css'
import { getUserAction, logoutAction, updateUserAction } from '../../services/actions/authorizationData';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TUser } from '../../utils/type';

export const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const [defaultState, setDefaultState] = useState({email:'',password:'', name:''});
    const [state, setState] = useState({email:'',password:'', name:''});
    const [changed, setChanged] = useState(false)
    const {user} = useAppSelector(store => store.auth);

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

    const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [ e.target.name ]: e.target.value
        })
        setChanged(true)
    }

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserAction(state))
    }

    const onReset = (e:FormEvent<HTMLFormElement>) => {
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