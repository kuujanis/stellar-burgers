import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './constructor-item.module.css'

import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef, useCallback, FC } from "react";

import {
  DELETE_CONSTRUCTOR_INGREDIENT,
  REFRESH_CONSTRUCTOR,
} from "../../../services/actions";
import { useAppDispatch, useAppSelector } from "../../../services/store";
import { TDragable } from "../../../utils/type";

type TConstructorItem = {
  item: TDragable,
  index: number
}

type TDragItem = {
  id: string;
  index: number;
}

export const ConstructorItem:FC<TConstructorItem> = ({ item, index }) => {
  const {slop} = useAppSelector(
    (state) => state.ingrd.constructorIngredients
  );
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
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
    (dragIndex:number, hoverIndex:number) => {
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
    hover(item:TDragItem, monitor) {
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
      const clientOffset = monitor.getClientOffset() as XYCoord;
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

  return (
    <div
      className={styles.card}
      ref={ref}
      style={{ opacity }}
      onDrop={e => e.preventDefault()}
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
