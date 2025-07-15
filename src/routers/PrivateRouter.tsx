
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';



export const PrivateRouter = () => {

    const {logged} = useContext(UserContext);

    if(!logged){
        return <Navigate to="/users/login"/>
    }

  return <Outlet/>
}
