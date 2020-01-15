import React from 'react';
import { useAuth } from './auth-context';
const UserContext = React.createContext();

function UserProvider(props){
  const  { user } = useAuth();
  return (
    <UserContext.Provider value={{ user }} {...props}/>
  )
}


const useUser = () => React.useContext(UserContext);


export { UserProvider, useUser };
