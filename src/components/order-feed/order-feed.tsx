import { useAppSelector } from '../../services/store';
import { TOrder } from '../../utils/type'
import OrderCard from '../order-card/order-card';
import styles from './order-feed.module.css'

export const OrderFeed = () => {
    const { messages } = useAppSelector((state) => state.ws);

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