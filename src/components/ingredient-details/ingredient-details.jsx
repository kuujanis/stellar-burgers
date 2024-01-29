import React from 'react';
import styles from "./ingredient-details.module.css";
import PropTypes from 'prop-types';
import ingridientPropType from '../../utils/type';

const IngredientDetails = (props) => {
	return(
		<div className={styles.ingredient_modal}> 
			<img src={props.image} alt={props.name} style={{width:'480px'}}/>
			<span className="text text_type_main-medium">{props.name}</span>
			<div className={styles.ingredient_energy}>
				<span className="text text_type_main-small text_color_inactive">
                    Калории, ккал<br/>{props.calories}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Белки, г<br/>{props.proteins}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Жиры, г<br/>{props.fat}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Углеводы, г<br/>{props.carbohydrates}
                </span>
			</div>
		</div>
	);
}

IngredientDetails.propTypes = {data: ingridientPropType}

export default IngredientDetails