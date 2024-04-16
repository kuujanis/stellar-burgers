import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { registerAction } from "../../services/actions/authorizationData"
import styles from './register.module.css'
import { useAppDispatch, useAppSelector } from "../../services/store"

export const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const authorized = useAppSelector(store => store.auth.authorized);
    const [formData, setFormData] = useState({email:'',password:'', name:''});
    const onInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    };
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerAction({email: formData.email, password: formData.password, name: formData.name}))
        console.log(formData);
    };

    return authorized ? <Navigate to='/' replace /> : (
        <section className={styles.register_main}>
            <h2 className={styles.register_title + ' text text_type_main-medium'}>Регистрация</h2>
            <form className={styles.register_form + ' mb-20 mt-6'} onSubmit={onSubmit}>
                <Input
                    type={'text'}
                    placeholder="Имя"
                    onChange={onInputChange}
                    value={formData.name ?? formData.email}
                    name={'name'}
                    size={"default"}
                    required
                    maxLength={30}
                />
                <Input
                    type={'email'}
                    placeholder="Адрес электронной почты"
                    onChange={onInputChange}
                    value={formData.email}
                    name={'email'}
                    size={"default"}
                    pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+"
                    required                             
                />
                <PasswordInput
                    placeholder="Пароль"
                    onChange={onInputChange}
                    value={formData.password}
                    name={'password'}
                    size={"default"}
                    icon={'ShowIcon'}
                    pattern=".{6,}"
                    required                               
                />  
                <Button type='primary' size='medium' htmlType="submit">
                    Зарегистрироваться
                </Button>
            </form>
            <p className={styles.note + ' text text_type_main-default text_color_inactive'}>
                Уже зарегистрированы?{' '}
                <Link to='/login' className={styles.link}>Войти</Link>
            </p>
        </section>
    )
}
