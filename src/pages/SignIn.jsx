import React, { Fragment, useState } from 'react';

import { Redirect } from 'react-router-dom';
import GoogleIcon from '../assets/google_log.png';
import { useAuth } from '../context/auth-context';


export default function SignIn() {
  const [isLogin, setFormState] = useState(true)
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setIsLoading] = useState(false);

  const { firebase, error, setError, user: n } = useAuth();


  const handleSubmit = event => {
    console.log(loading, 'loading')
    setIsLoading(true)
    event.preventDefault();
    const { email, password } = user;
    if(isLogin) {
      firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setIsLoading(false))
      // .catch(setError)
    } else {
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => setIsLoading(false))
      // .catch(setError)
    }
  }

  const handleInputChange = event => {
    console.log(event.target.name)
    setUser({...user, [event.target.name]: event.target.value })
  }

  let secondaryButtonText = isLogin ? 'Don\'t have an account? sign up' : 'Already have an account? sign in';

  if(n){
    return <Redirect to="/" />
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-title">{isLogin ? 'Sign In': 'Sign up'}</div>
        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="Enter email"
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input type="password" 
            name="password"
            className="form-control" 
            id="passwordInput" 
            placeholder="Password" 
            onChange={handleInputChange} 
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          { isLogin ? 'Sign In': 'Create account'}
        </button>
        <button  className="btn btn-link" onClick={() => setFormState(!isLogin)}>{secondaryButtonText}</button>
        <div className="google-sign-in">
          Or <br />
          <button className="btn" type="button" onClick={() => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
            <img src={GoogleIcon} alt="Google icon"/>
            <span className="google-sign-in-text">Sign In with Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}
