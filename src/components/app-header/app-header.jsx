import React from 'react'
import { BurgerIcon,ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css'

function AppHeader() {
    return(
        <header className = {styles.head}>
        <a href='#' className = {styles.logo}>
            <Logo/>
        </a>
        <a href='#' className = {styles.link + ' ' + styles.white}>
            <BurgerIcon type="primary"/>
            <p className="text text_type_main-default">Конструктор </p>
        </a>
        <a href='#' className = {styles.link}>
            <ListIcon type="secondary"/>
            <p className="text text_type_main-default">Лента заказов</p>
        </a>
        <a href='#' className = {styles.link + ' ' + styles.right}>
            <ProfileIcon type="secondary"/>
            <p className="text text_type_main-default">Личный кабинет</p>
        </a>
    </header>
    )
    
}

export default AppHeader