import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ element }) => {
    const authorized = useSelector(store => store.auth.authorized);
    
    return  authorized ? element : <Navigate to='/login' replace/>

    
}