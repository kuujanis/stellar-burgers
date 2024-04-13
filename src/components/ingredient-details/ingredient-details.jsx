import React from 'react';
import styles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import ingridientPropType from '../../utils/type';
import { useSelector } from 'react-redux';

const IngredientDetails = ({ingredient}) => {

	// const ingredient = useSelector(state => state.ingrd.currentIngredient)

	return(
		<div className={styles.ingredient_modal}> 
			<img src={ingredient.image} alt={ingredient.name} className={styles.ingredient_pic}/>
			<span className="text text_type_main-medium">{ingredient.name}</span>
			<div className={styles.ingredient_energy}>
				<span className="text text_type_main-small text_color_inactive">
                    Калории, ккал<br/>{ingredient.calories}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Белки, г<br/>{ingredient.proteins}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Жиры, г<br/>{ingredient.fat}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Углеводы, г<br/>{ingredient.carbohydrates}
                </span>
			</div>
		</div>
	);
}

IngredientDetails.propTypes = ingridientPropType

export default IngredientDetails