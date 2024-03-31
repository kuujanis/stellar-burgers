import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import styles from './forgot-password.module.css'



export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    let navigate = useNavigate();
    const authorized = useSelector(store => store.auth.authorized);

    const onSubmit = e => {
        e.preventDefault();
        fetch('https://norma.nomoreparties.space/api/password-reset',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({'email': email})
        })
            .then(response => {
                if (response.ok) {
                    navigate('/reset-password',{replace: true});
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
    const onChange = e => {
        setEmail(e.target.value)
    }

    return authorized ? <Navigate to='/' replace /> : (
        <section className={styles.main}>
            <h2 className={styles.title + ' text text_type_main-medium'}>Восстановление пароля</h2>
            <form className={styles.container + ' mb-20 mt-6'} onSubmit={onSubmit}>
            <Input
                type={'email'}
                placeholder="Укажите e-mail"
                onChange={onChange}
                value={email}
                name={'email'}
                size={"default"}
                icon={'EditIcon'}
                pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+"
                required                             
            />
            <Button type='primary' size='medium' htmlType="submit">
                Восстановить
            </Button>
            </form>
            <p className={styles.note + " text text_type_main-default text_color_inactive"}>
                Вспомнили пароль?{' '}
                <Link to='/login'  className={styles.link}>
                    Войти
                </Link>
            </p>
        </section>
    )
}
