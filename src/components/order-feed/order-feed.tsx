import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TOrder } from '../../utils/type'
import OrderCard from '../order-card/order-card';
import styles from './order-feed.module.css'
import { getCookie } from '../../utils/cookies';
import { WS_CONNECTION_END, WS_CONNECTION_START } from '../../services/actions';
import { feedUrl } from '../../utils/api';

export const OrderFeed = () => {
    const { messages } = useAppSelector((state) => state.ws);

    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(getCookie('token'))
        dispatch({type: WS_CONNECTION_START, payload: feedUrl+`?token=${getCookie('token')}`});
        // 
        return () => {
          dispatch({type: WS_CONNECTION_END});
        };
    }, [dispatch]);

    return (
        <section className={`${styles.collumn} mb-10`}>
        <div className={`${styles.orders} pr-2`}>
            {messages?.orders?.map((order: TOrder) => (
            <OrderCard key={order._id} order={order} />
            ))}
        </div>
        </section>
    )
}