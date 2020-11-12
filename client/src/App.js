import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Routes';
import AuthProvider from './Components/Provider/Auth';
import LabelProvider from './Components/Provider/Label';
import IssueProvider from './Components/Provider/Issue';
import MilestoneProvider from './Components/Provider/Milestone';
import IssueInfoProvider from './Components/Provider/IssueInfo';

const App = () => {
  return (
    <AuthProvider>
      <LabelProvider>
        <MilestoneProvider>
          <IssueProvider>
            <IssueInfoProvider>
              <BrowserRouter>
                <Router />
              </BrowserRouter>
            </IssueInfoProvider>
          </IssueProvider>
        </MilestoneProvider>
      </LabelProvider>
    </AuthProvider>
  );
};
export default App;
