import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Components/Main';
import Login from '../Components/Login';

export default () => (
  <>
    <Route exact path="/" component={Main} />
    <Route exact path="/login" component={Login} />
  </>
);
