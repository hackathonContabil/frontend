import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { ContextProvider } from '../context/authContext';
import { Redirect } from 'react-router';
import CustomRoute from './customRoute';

import Login from '../views/login/Login';
import Register from '../views/register/Register';
import Home from '../views/home/Home';

class Router extends Component {
  render() {
    return (
      <ContextProvider>
        <Switch>
          <CustomRoute exact path="/login" component={Login} />
          <CustomRoute exact path="/register" component={Register} isPrivate />
          <CustomRoute exact path="/" component={Home} isPrivate />
          <Redirect from="*" to={'/'} />
        </Switch>
      </ContextProvider>
    );
  }
}

export default Router;
