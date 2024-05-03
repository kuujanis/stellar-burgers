import { useAppSelector } from "../../services/store";
import { TOrder } from "../../utils/type";
import styles from './order-stats.module.css'

const OrdersStats = () => {
    const { messages } = useAppSelector(
      (state) => state.ws
    );
  
    return (
      <section className="ml-15">
        <div className={`${styles.statuses} mb-10`}>
          <div className={`${styles.statusesGroup} mr-9`}>
            <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
            <div className={styles.numbers}>
              {messages?.orders
                ?.slice(0, 30)
                .filter((item: TOrder) => item.status === "done")
                .map((item: TOrder) => (
                  <p
                    key={item.number}
                    className={`${styles.doneNumber} text text_type_digits-default mb-2`}
                  >
                    {item.number}
                  </p>
                ))}
            </div>
          </div>
          <div className={styles.statusesGroup}>
            <h3 className="text text_type_main-medium mb-6">В работе:</h3>
            <div className={styles.numbers}>
              {messages?.orders
                ?.slice(0, 20)
                .filter((item: TOrder) => item.status === "pending")
                .map((item: TOrder) => (
                  <p
                    key={item.number}
                    className="text text_type_digits-default mb-2"
                  >
                    {item.number}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`${styles.number} text text_type_digits-large`}>
          {messages?.total}
        </p>
        <h3 className="text text_type_main-medium mt-10">
          Выполнено за сегодня:
        </h3>
        <p className={`${styles.number} text text_type_digits-large`}>
          {messages?.totalToday}
        </p>
      </section>
    );
  };
  
  export default OrdersStats;