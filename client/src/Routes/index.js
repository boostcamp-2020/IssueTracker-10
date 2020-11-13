import React from 'react';
import { Switch } from 'react-router-dom';
import Issue from '@Components/Issue/Issue';
import IssueDetail from '@Components/Issue/IssueDetail';
import Label from '@Components/Label/Label';
import NewIssue from '@Components/Issue/NewIssue';
import Header from '@Common/Header';
import Search from '@Components/Label/Search';
import Milestone from '@Components/Milestone/Milestone';
import MilestoneCreate from '@Components/Milestone/MilestoneCreate';
import MilestoneEdit from '@Components/Milestone/MilestoneEdit';
import Authenticated, { CheckLogin } from './Authenticated';

export default () => {
  return (
    <>
      <Switch>
        <CheckLogin exact path="/login" />
        <Header />
      </Switch>
      <Authenticated exact path="/" component={Issue} />
      <Switch>
        <Authenticated exact path="/issue/new" component={NewIssue} />
        <Authenticated path="/issue/:id" component={IssueDetail} />
      </Switch>
      <Switch>
        <Authenticated exact path="/milestones" component={Milestone} />
        <Authenticated exact path="/milestones/new" component={MilestoneCreate} />
        <Authenticated exact path="/milestones/:id/edit" component={MilestoneEdit} />
      </Switch>
      <Authenticated exact path="/labels" component={Label} />
      <Authenticated exact path="/search" component={Search} />
    </>
  );
};
