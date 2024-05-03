import React from 'react';
import styles from './order-info.module.css'
import { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TIngrd } from '../../utils/type';
import { getOrder } from '../../services/actions/orderData';

export const OrderInfo = () => {
    const dispatch = useAppDispatch();
      const { order, orderRequest, orderFailed } = useAppSelector((store) => store.order);
      const { ingredients } = useAppSelector((store) => store.ingrd);
      const { id } = useParams<{ id: string }>();
      const [orderIngredients, setOrderIngredients] = useState<TIngrd[] | null>(null);
      const [price, setPrice] = useState(0);

    const getStatusColor = (status:string) => status === 'done' ? '#00CCCC' : '#FFFFFF';
    useEffect(() => {
        dispatch(getOrder(id))
    }, [dispatch, id]);


    const getStatus = (status: string) => {
        if (status === 'done') {
            return 'Выполнен'
        } else if (status === 'created') {
            return 'Создан'
        } else if (status === 'pending') {
            return 'Готовится'
        }
        return false;
    };

    useEffect(() => {
        if (ingredients.length) {
            let totalPrice = 0;
            let bun = 0;
            order?.ingredients?.forEach((ingredient:string) => {
                let targetIngredient = ingredients.filter(item => item['_id'] === ingredient)[0];
                if (targetIngredient.type === 'bun' && !bun) {
                    totalPrice += 2 * targetIngredient.price;
                    bun = 1
                }
                if ((targetIngredient.type !== 'bun'))
                    totalPrice += targetIngredient.price
            });
            setPrice(totalPrice);

            let orderIngredientsSet = new Set();
            let orderIngredientsList: TIngrd[] = [];
            order?.ingredients?.forEach(item => orderIngredientsSet.add(item));
            orderIngredientsSet.forEach(value => orderIngredientsList.push(ingredients.filter(ingredient => ingredient['_id'] === value)[0]));
            orderIngredientsList.forEach(item => {
                item.type === 'bun'
                    ? item.count = 2
                    : item.count = order?.ingredients.filter(ingredient => ingredient === item['_id']).length
            });
            setOrderIngredients(orderIngredientsList)
        }

    }, [ingredients, order]);

        return (
            (order) &&
                <section className={styles.orderInfo}>
                    <p className={styles.orderHeader +" text text_type_digits-default pt-4"}>#{order.number}</p>
                    <p className="text text_type_main-medium pt-10">{order.name}</p>
                    <p className="text text_type_main-default pt-2">
                        <span style={{color: getStatusColor('done')}}>{getStatus(order.status)}</span>
                    </p>
                    <p className="text text_type_main-medium pt-15 pb-4">Состав:</p>
                    <div className={styles.orderWrapper + ' pr-2'}>
                          {
                        Boolean(orderIngredients) &&
                    orderIngredients?.map((ingredient, i) => {
                        return  <div key={i} className={styles.order + ' mt-4 pb-2'}>
                        <div className={styles.info}>
                        <div className={styles.imageWrapper + ' mr-4'}>
                        <img className={styles.image} src={ingredient.image_mobile} alt="" />
                            </div>
                            <div className={styles.name + ' text text_type_main-default'}>
                            {ingredient.name}
                            </div>
                            </div>

                            <div className={styles.price + ' text text_type_digits-default'}>
                        <span className="pr-2">
                            {(ingredient.count && ingredient.count > 1) && ingredient.count + ' x '}
                        {ingredient.price}
                        </span>
                        <CurrencyIcon type="primary"/>
                            </div>
                            </div>
                    })
            }
                    </div>
                    <div className={styles.footer + ' mt-10 pr-2 pb-10'}>
                        <p className="text text_type_main-default text_color_inactive">{}</p>
                        <div className={styles.price + ' text text_type_digits-default'}>
                            <span className="pr-2">
                                {price}
                            </span>
                        <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </section>
        )
}