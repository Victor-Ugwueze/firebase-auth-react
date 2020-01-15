import React from 'react'
import { Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth-context';
import { useUser } from '../context/user-context';


export default function Home() {
  const { firebase } = useAuth();
  const { user } = useUser();

  if(!user) {
    return <Redirect to="/login" /> 
  }

  return (
    <div className="container">
    <div>Welcome {user && user.email}</div>
      <button onClick={() => {firebase.auth().signOut()}}>
        logout
      </button>
    </div>
  )
}
