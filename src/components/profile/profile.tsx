import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getUserAction, updateUserAction } from "../../services/actions/authorizationData";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css'


export const Profile = () => {

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

    return(
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
    )}