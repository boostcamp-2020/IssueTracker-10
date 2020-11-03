import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Components/Main';

export default () => (
  <>
    <Route exact path="/" component={Main} />
  </>
);
