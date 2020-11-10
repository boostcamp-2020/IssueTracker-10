import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Components/Main';
import Login from '../Components/Login';
import Issue from '../Components/Issue/Issue';
import Label from '../Components/Label/Label';
import NewIssue from '../Components/Issue/NewIssue';
import Header from '../Components/Common/Header';

export default () => (
  <>
    <Header />
    <Route exact path="/" component={Main} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/issues" component={Issue} />
    <Route exact path="/labels" component={Label} />
    <Route exact path="/new" component={NewIssue} />
  </>
);
