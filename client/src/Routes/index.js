import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@Components/Login';
import Main from '@Components/Main';
import IssueDetail from '@Components/Issue/IssueDetail';
import Label from '@Components/Label/Label';
import NewIssue from '@Components/Issue/NewIssue';
import Header from '@Common/Header';
import Search from '@Components/Label/Search';
import Milestone from '@Components/Milestone/Milestone';
import MilestoneCreate from '@Components/Milestone/MilestoneCreate';
import Authenticated from './Authenticated';

export default () => {
  return (
    <>
      <Switch>
        <Route exact path="/login" page="login" component={Login} />
        <Header />
      </Switch>
      <Authenticated exact path="/" component={Main} />
      <Switch>
        <Authenticated exact path="/issue/new" component={NewIssue} />
        <Authenticated path="/issue/:id" component={IssueDetail} />
      </Switch>
      <Switch>
        <Authenticated exact path="/milestones" component={Milestone} />
        <Authenticated exact path="/milestones/new" component={MilestoneCreate} />
      </Switch>
      <Authenticated exact path="/labels" component={Label} />
      <Authenticated exact path="/search" component={Search} />
    </>
  );
};
