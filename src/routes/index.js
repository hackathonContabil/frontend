import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import CustomRoute from './customRoute';

import Login from '../views/login/Login';
import Home from '../views/home/Home';
import Register from '../views/register/Register';

class Router extends Component {
  render() {
    return (
      <Switch>
        <CustomRoute exact path="/login" component={Login} />
        <CustomRoute exact path="/register" component={Register} isPrivate />
        <CustomRoute exact path="/" component={Home} isPrivate />
        <Redirect from="*" to={'/'} />
      </Switch>
    );
  }
}

export default Router;
