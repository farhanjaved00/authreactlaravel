import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import  Home  from './components/frontend/Home';
import  Register  from './components/frontend/auth/Register';
import  Login  from './components/frontend/auth/Login';
import axios from 'axios';
import UserPrivateRoute from './UserPrivateRoute';
  
axios.defaults.withCredentials = true;
axios.defaults.baseURL="https://thewealthbank.co.uk";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){
  const token=localStorage.getItem('token');
  config.headers.Authorization= token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact  path="/" component={Home} />
            <Route exact  path="/login" component={Login} />
            <Route exact  path="/register" component={Register} />
             <UserPrivateRoute path="/user" name="User" />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
