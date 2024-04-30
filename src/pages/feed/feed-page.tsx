import { useEffect } from "react";
import { useAppDispatch } from "../../services/store"
import { WS_CONNECTION_END, WS_CONNECTION_START } from "../../services/actions";
import styles from './feed-page.module.css'
import OrdersStats from "../../components/order-stats/order-stats";

export const FeedPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: 'wss://norma.nomoreparties.space/orders/all'});
        return () => {
          dispatch({type: WS_CONNECTION_END});
        };
      }, [dispatch]);
      return (
        <main className={styles.main}>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
        <div className={styles.container}>
          <OrdersStats />
        </div>
        </main>
      )
}