import React from 'react'
import { NavLink, useLocation, Link } from "react-router-dom";
import { BurgerIcon,ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'

function AppHeader() {
    const location = useLocation();

    return(
    <header className = {styles.head}>
        <NavLink exact='true' to='/' className = {styles.logo}>
            <Logo/>
        </NavLink>
        <NavLink exact='true' to='/' className = {styles.link + ' ' + styles.white}>
            <BurgerIcon type="primary"/>
            <p className="text text_type_main-default">Конструктор </p>
        </NavLink>
        <NavLink exact='true' to='/feed' className = {styles.link}>
            <ListIcon type="secondary"/>
            <p className="text text_type_main-default">Лента заказов</p>
        </NavLink>
        <NavLink exact='true' to='/profile' className = {styles.link + ' ' + styles.right}>
            <ProfileIcon type="secondary"/>
            <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
    </header>
    )
    
}

export default AppHeader