import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Routes';
import AuthProvider from './Components/Provider/Auth';
import LabelProvider from './Components/Provider/Label';
import IssueProvider from './Components/Provider/Issue';
import MilestoneProvider from './Components/Provider/Milestone';

const App = () => {
  return (
    <AuthProvider>
      <LabelProvider>
        <MilestoneProvider>
          <IssueProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </IssueProvider>
        </MilestoneProvider>
      </LabelProvider>
    </AuthProvider>
  );
};
export default App;
