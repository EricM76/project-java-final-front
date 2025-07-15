import {useContext, useEffect} from 'react'
import { UserContext } from '../contexts/UserContext';
import { UseFetchWithToken } from '../hooks/useFetch';

export const Profile =  () => {

    const {token} = useContext(UserContext);

    useEffect(() => {

        const getData = async () => {
            await UseFetchWithToken('auth/me', 'GET', token, null);
          };
      
          getData();

    
       
    }, []);


  return (
    <div>Profile</div>
  )
}
