import React from 'react'
import {Navigate, useLocation} from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

const RequiresAuth = ({children}) => {
    const {user} = useAuth();
    const location = useLocation();
  return (
    user ? children : <Navigate to='/login' state={{from: location}} replace />
  )
}

export default RequiresAuth


