import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Components/Main';
import Login from '../Components/Login';
import Issue from '../Components/Issue';
import NewIssue from '../Components/NewIssue';

export default () => (
  <>
    <Route exact path="/" component={Main} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/issues" component={Issue} />
    <Route exact path="/new" component={NewIssue} />
  </>
);
