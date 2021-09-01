import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

import './App.scss';

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  // **CHANGE LATER TO ACCOMODATE FOR BEING LOGGED IN OR NOT
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'> <Dashboard loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } /> </Route>
          <Route exact path='/login'> <Login loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } /> </Route>
          <Route exact path='/register'> <Register /> </Route>
        </Switch>
      </div>
    </Router> 
  );
}

export default App;
