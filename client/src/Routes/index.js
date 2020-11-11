import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Components/Main';
import Login from '../Components/Login';
import IssueDetail from '../Components/Issue/IssueDetail';
import Label from '../Components/Label/Label';
import NewIssue from '../Components/Issue/NewIssue';
import Header from '../Components/Common/Header';
import Search from '../Components/Label/Search';
import Milestone from '../Components/Milestone/Milestone';
import MilestoneCreate from '../Components/Milestone/MilestoneCreate';

export default () => (
  <>
    <Header />
    <Route exact path="/" component={Main} />
    <Route exact path="/login" component={Login} />
    <Switch>
      <Route exact path="/issue/new" component={NewIssue} />
      <Route path="/issue/:id" component={IssueDetail} />
    </Switch>
    <Route exact path="/labels" component={Label} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/milestones" component={Milestone} />
    <Route exact path="/milestones/new" component={MilestoneCreate} />
  </>
);
