import { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-card.module.css'
import { useAppSelector } from "../../services/store";
import { TOrder } from "../../utils/type";

const maxOrderIngredients = 6;

type TOrderCard = {
  order: TOrder;
}

const OrderCard: FC<TOrderCard> = ({ order }) => {
  let { name, number, createdAt, ingredients } = order;
  let { ingredients: allIngredients } = useAppSelector(
    (state) => state.ingrd
  );

  const location = useLocation();

  const orderIngredients = useMemo(
    () =>
      ingredients.map(
        (item) => allIngredients!.filter((ing) => ing._id === item)[0]
      ),
    [ingredients, allIngredients]
  );
  
  console.log(allIngredients)
  console.log(orderIngredients)

  const totalPrice = useMemo(
    () =>
      orderIngredients.reduce(
        (a, b) => a + b.price * (b.type === "bun" ? 2 : 1),
        0
      ),
    [orderIngredients]
  );

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${number}`
      }}
      className={styles.link}
      state={{background: location, order, ingredients, orderIngredients}}
    >
      <article className={`${styles.card} p-6`}>
        <div className={styles.info}>
          <p className="text text_type_digits-default">#{number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </div>
        <p className="text text_type_main-medium mb-6 mt-6">{name}</p>
        <div className={styles.main}>
          <div className={styles.ingredients}>
            {orderIngredients
              .slice(0, maxOrderIngredients)
              .map((ingredient, i) => (
                <div
                  key={i}
                  className={styles.ingredient}
                  style={{ zIndex: maxOrderIngredients - i - 1 }}
                >
                  <img
                    className={styles.image}
                    style={{
                      opacity:
                        i === maxOrderIngredients - 1 &&
                        i !== orderIngredients.length - 1
                          ? 0.6
                          : 1,
                    }}
                    src={ingredient?.image}
                    alt={ingredient?.name}
                  />
                  {i === maxOrderIngredients - 1 &&
                    i !== orderIngredients.length - 1 && (
                      <p
                        className={`${styles.tip} text text_type_main-default`}
                      >
                        +{ingredients.length - maxOrderIngredients + 1}
                      </p>
                    )}
                </div>
              ))}
          </div>
          <div className={styles.price}>
            <p className="text text_type_digits-default mr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OrderCard;