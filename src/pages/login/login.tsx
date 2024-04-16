import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginAction } from '../../services/actions/authorizationData';
import styles from './login.module.css'
import { useAppDispatch, useAppSelector } from '../../services/store';

export const LoginPage = () => {

    const authorized = useAppSelector(store => store.auth.authorized);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState({
        email:'',
        password:''
    });
    const onChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAction(state))
            .then(() => {
                console.log(location.state?.from?.pathname || '/')
                navigate({ pathname: location.state?.from?.pathname || '/' })
            });
    };

    return authorized ? <Navigate to='/' replace /> : (
        <section className={styles.login_main}>
                <h2 className={styles.login_title + ' text text_type_main-medium'}>Вход</h2>
                <form className={styles.login_form + ' mb-20 mt-6'} onSubmit={onSubmit} >
                            <Input
                                type={'email'}
                                placeholder="Адрес электронной почты"
                                onChange={onChange}
                                value={state.email}
                                name={'email'}
                                size={"default"}
                                icon={'EditIcon'}
                                pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+"
                                required                             
                            />
                            <Input
                                type={'password'}
                                placeholder="Пароль"
                                onChange={onChange}
                                value={state.password}
                                name={'password'}
                                size={"default"}
                                icon={'EditIcon'}
                                pattern=".{6,}"
                                required                               
                            />                    
                    <Button type='primary' size='medium' htmlType='submit'>
                        Войти
                    </Button>
                </form>
                <p className={styles.note + ' text text_type_main-default text_color_inactive'}>
                    Вы - новый пользователь?{' '}
                    <Link to='/register' className={styles.link}>Зарегистрироваться</Link>  
                </p>
                <p className={styles.note + ' text text_type_main-default text_color_inactive'}>
                    Забыли пароль?{' '}
                    <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>  
                </p>
        </section>
    )
}