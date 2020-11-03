import React from 'react';
import { Route } from 'react-router-dom';
import Main from '../Components/Main';
import Main2 from '../Components/Main2';

export default (props) => (
  <>
    <Route path="/" component={Main} name="헬로" />
    <Route exact path="/hi" component={Main} name="하이" />
  </>
);
