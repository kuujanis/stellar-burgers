import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const ProtectedRoute = ({ element }: {element:JSX.Element}) => {
    const location = useLocation();
    const authorized = useAppSelector(store => store.auth.authorized);
    return  authorized ? element : <Navigate to='/login' state={{ from: location}} />
}