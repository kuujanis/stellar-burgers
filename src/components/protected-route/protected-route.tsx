import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

export const ProtectedRoute = ({ element }: {element:JSX.Element}) => {
    const authorized = useAppSelector(store => store.auth.authorized);
    return  authorized ? element : <Navigate to='/login' replace/>
}