import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Homepage from './Home Page/Homepage';
import MyAccount from './Auth/MyAccount/MyAccount';
import Login from './Auth/Login/Login';
import ForgotPassword from './Auth/Password/Finder/Finder';
import ResetPassword from './Auth/Password/Reset/Reset';
import Signup from './Auth/Signup/Signup';
import Library from './Library/Library';
import Profile from './Profile/Profile';
import Pong from './Pong/Pong';
import Snake from './Snake/Snake';
import ServerError from './Error/ServerError/ServerError';
import NotFound from './Error/NotFound/NotFound';
import Unauthorized from './Error/Unauthorized/Unauthorized';

function App() {
  return (
    <Switch>
      <Route path={'/401'} strict sensitive component={Unauthorized} />
      <Route path={'/500'} strict sensitive component={ServerError} />
      <Route path={'/snake'} strict sensitive component={Snake} />
      <Route path={'/pong'} strict sensitive component={Pong} />
      <Route path={'/profile'} strict sensitive component={Profile} />
      <Route path={'/library'} strict sensitive component={Library} />
      <Route path={'/signup'} strict sensitive component={Signup} />
      <Route path={'/reset/:token'} component={ResetPassword} />
      <Route path={'/forgot'} strict sensitive component={ForgotPassword} />
      <Route path={'/login'} strict sensitive component={Login} />
      <Route path={'/account'} strict sensitive component={MyAccount} />
      <Route path={'/'} strict sensitive exact component={Homepage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;