import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from './pages/Home';
import SignIn from './pages/SignIn';
import AppProviders from './context';


import './App.css';

function App() {
    return (
      <AppProviders>
        <Router>
          <Switch>
            <Route path="/login" exact component={SignIn} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </AppProviders>
    );
}

export default App;
