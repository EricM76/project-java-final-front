import { useState } from 'react'
import './App.css'
import { UserContext } from './contexts/UserContext'
import { AppRouter } from './routers/AppRouter'

function App() {
 const dataUser = sessionStorage.getItem('MercadoLiebreReact') ? JSON.parse(sessionStorage.getItem('MercadoLiebreReact') || '{}') : {
    logged : false,
    name : null,
    rolId : null,
    token : null
  }

  const [user, setUser] = useState(dataUser);


  return (
    <UserContext.Provider
      value={{
        user: {
          logged: user.logged,
          name: user.name,
          rolId: user.rolId,
          token: user.token
        },
        setUser,
      }}
    >
      <AppRouter/>
    </UserContext.Provider>
  );
}

export default App
