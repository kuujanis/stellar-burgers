import styles from './order-details.module.css';
import okPic from '../../images/icon-accepted.svg';


function OrderDetails() {
  return (
    <div className={styles.root}>
      <p className="text text_type_digits-large">
        <span className={styles.glow}>034536</span>
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img className={styles.pic} src={okPic} alt='Заказ выполнен'/>
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}
export default OrderDetails