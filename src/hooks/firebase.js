import React, { useState, useEffect } from 'react';
import * as firebase from "firebase/app";

export function useFirebaseAuth(){
  let [loading, setIsLoading ] = useState(false);
  let [user, setUser] = useState({});
  let [error, setError] = useState('');

  let auth = firebase.auth();

   function signInWithEmailAndPassword(email, password){
     setError('');
    setIsLoading(true);
    firebase.auth.signInWithEmailAndPassword(email, password)
    .catch(err => {
      setIsLoading(false);
      console.log(err.message)
      setError(err.message);
    })
  }

  function signInWithProvider(provider){
     setIsLoading(true);
    var provid = new firebase.auth.GoogleAuthProvider();
    setError('');
   firebase.auth().signInWithPopup()
   .catch(err => {
     setIsLoading(false);
     console.log(err)
     setError(err.message);
   })
 }

  function createUserWithEmailAndPassword(email, password){
    setIsLoading(true);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(err => {
      setIsLoading(false);
      setError(err.message);
    })
  }

  useEffect(() => {
    setIsLoading(true);
    let unSubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
    return () => unSubscribe();
 }, []);


 useEffect(() => {
  if(user === null || user.uid)
    setIsLoading(false);
 }, [user])

  return {
    loading,
    user,
    error,
    firebase
  }
}
