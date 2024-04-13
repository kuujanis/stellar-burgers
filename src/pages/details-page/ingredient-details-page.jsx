import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useSelector } from 'react-redux'

export const IngredientDetailsPage = () => {
    const {id} = useParams();
    const {ingredients} = useSelector(state => state.ingrd)
    return(
        <>
            {ingredients
                .filter((item) => item._id === id)
                .map((item) => (
                <IngredientDetails ingredient={item} key={id} />
            ))}
        </>
    )

}