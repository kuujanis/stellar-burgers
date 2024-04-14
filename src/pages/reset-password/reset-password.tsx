import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { SyntheticEvent, useState } from "react";
import { Link, Navigate} from 'react-router-dom';
import styles from './reset-password.module.css'
import { useAppSelector } from "../../services/store";

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const authorized = useAppSelector(store=>store.auth.authorized);

    const onSubmit = (e:SyntheticEvent) => {
        e.preventDefault();
        fetch('https://norma.nomoreparties.space/api/password-reset/reset',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'password': password, 'token':token})
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.status);
                }
            })
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error);
                alert('Error ' + error + ' while connecting to Api');
            });
    }

    return authorized ? <Navigate to='/' replace /> : (
        <section className={styles.main}>
            <h2 className={styles.title + ' text text_type_main-medium'}>Восстановление пароля</h2>
            <form className={styles.form + ' mb-20 mt-6'} onSubmit={onSubmit}>
                <Input
                    type={'password'}
                    placeholder="Введите новый пароль"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name={'password'}
                    size={"default"}
                    icon={'ShowIcon'}
                    pattern=".{6,}"
                    required                               
                />      
                <Input
                    type={'text'}
                    placeholder='Введите код из письма'
                    onChange={e => setToken(e.target.value)}
                    value={token}
                    size={'default'}
                    required
                />
                <Button type='primary' size='medium' htmlType="submit">
                    Сохранить
                </Button>
            </form>
            <p className={styles.note + ' text text_type_main-default text_color_inactive'}>
                Вспомнили пароль?{' '}
                <Link to='/login' className={styles.link}>
                    Войти
                </Link>
            </p>
        </section>
    )
}