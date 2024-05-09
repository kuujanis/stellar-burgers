import styles from './order-page.module.css';
import { OrderInfo } from '../../components/order-info/order-info';

export const OrderPage = () => {
    return (
        <div className={styles.orderPage}>
            <OrderInfo/>
        </div>
    )
}