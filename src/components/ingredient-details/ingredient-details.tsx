import {FC} from 'react';
import styles from "./ingredient-details.module.css";
import { TIngrd } from '../../utils/type';

type TIngredientDetails = {
	ingredient?:TIngrd
}

const IngredientDetails: FC<TIngredientDetails> = ({ingredient}) => {

	return(
		<div className={styles.ingredient_modal}> 
			<img src={ingredient?.image} alt={ingredient?.name} className={styles.ingredient_pic}/>
			<span className="text text_type_main-medium">{ingredient?.name}</span>
			<div className={styles.ingredient_energy}>
				<span className="text text_type_main-small text_color_inactive">
                    Калории, ккал<br/>{ingredient?.calories}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Белки, г<br/>{ingredient?.proteins}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Жиры, г<br/>{ingredient?.fat}
                </span>
				<span className="text text_type_main-small text_color_inactive">
                    Углеводы, г<br/>{ingredient?.carbohydrates}
                </span>
			</div>
		</div>
	);
}

export default IngredientDetails