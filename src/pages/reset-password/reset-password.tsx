import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { FormEvent, useState } from "react";
import { Link, Navigate} from 'react-router-dom';
import styles from './reset-password.module.css'
import { useAppSelector } from "../../services/store";
import { checkResponse, resetUrl } from "../../utils/api";

export const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const authorized = useAppSelector(store=>store.auth.authorized);

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(resetUrl,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'password': password, 'token':token})
        })
        .then(res => checkResponse(res));
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