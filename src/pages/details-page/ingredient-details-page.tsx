import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { TCard } from '../../utils';
import { useAppSelector } from '../../services/store';

export const IngredientDetailsPage = () => {
    const {id} = useParams<{id: string}>();
    const {ingredients} = useAppSelector(state => state.ingrd)
    return(
        <>
            {ingredients
                .filter((item:TCard) => item._id === id)
                .map((item:TCard) => (
                <IngredientDetails ingredient={item} key={id} />
            ))}
        </>
    )

}