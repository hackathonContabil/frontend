import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import CustomRoute from './customRoute';
import Login from '../views/Login';
import Users from '../views/User';
import Offices from '../views/Office';
import Clients from '../views/Client';
import Consolidation from '../views/Consolidation';
import Register from '../views/Register';

class Router extends Component {
  render() {
    return (
      <Switch>
        <CustomRoute exact path="/login" component={Login} />
        <CustomRoute exact path="/cadastrar" component={Register} />
        <CustomRoute exact path="/admin/usuarios" component={Users} isPrivate isAdmin />
        <CustomRoute exact path="/admin/escritorios" component={Offices} isPrivate isAdmin />
        <CustomRoute exact path="/contador/usuarios" component={Clients} isPrivate isAccountant />
        <CustomRoute
          exact
          path="/contador/consolidacao/:id"
          component={Consolidation}
          isPrivate
          isAccountant
        />
        <Redirect from="*" to={'/admin/usuarios'} />
      </Switch>
    );
  }
}

export default Router;
