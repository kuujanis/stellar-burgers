import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { TIngrd } from '../../utils/type';
import { useAppSelector } from '../../services/store';

export const IngredientDetailsPage = () => {
    const {id} = useParams<{id: string}>();
    const {ingredients} = useAppSelector(state => state.ingrd)
    return(
        <>
            {ingredients
                .filter((item:TIngrd) => item._id === id)
                .map((item:TIngrd) => (
                <IngredientDetails ingredient={item} key={id} />
            ))}
        </>
    )

}