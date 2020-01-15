import React from 'react';

import {useFirebaseAuth} from '../hooks/firebase';
import Loader from '../components/Loader';
import configureFirebase from '../config/firebase';


const AuthContext = React.createContext();



configureFirebase();

function AuthProvider(props){
  const  { user, loading, firebase } = useFirebaseAuth();

  if(loading) return (
    <div>
       <Loader className="full-page" loading={loading}/>
    </div>
  )

  return (
    <AuthContext.Provider value={{ user, firebase, loading }} {...props}/>
  )
}


const useAuth = () => React.useContext(AuthContext);


export { AuthProvider, useAuth };