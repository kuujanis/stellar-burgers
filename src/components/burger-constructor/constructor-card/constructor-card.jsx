import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-card.module.css'

import { useDrag, useDrop } from "react-dnd";
import { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import ingredientPropType from "../../../utils/type";

import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  REFRESH_CONSTRUCTOR,
} from "../../../services/actions";


function ConstructorCard({ item, index }) {
  const slop = useSelector(
    state => state.ingrd.constructorIngredients.slop
  );
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = item.dragId;

//   console.log(slop)

  const [{ opacity }, drag] = useDrag({
    type: "constructor-cards",
    item: () => ({
      id: id,
      index: slop.findIndex((item) => item.dragId === id),
    }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = slop[dragIndex];
      const newCards = [...slop];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      dispatch({
        type: REFRESH_CONSTRUCTOR,
        newCards: newCards,
      });
    },
    [slop, dispatch]
  );

  const [, drop] = useDrop({
    accept: "constructor-cards",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  if (item.type !== "bun") drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      className={styles.card}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
    >
      <div className="pr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch({
            type: DELETE_CONSTRUCTOR_INGREDIENT,
            deletedIngredient: item,
          });
        }}
      />
    </div>
  );
}

ConstructorCard.propTypes = {
  item: PropTypes.shape({
    ...ingredientPropType,
    dragId: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ConstructorCard;