import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import Router from './Routes';
import AuthProvider from './Components/Provider/Auth';
import LabelProvider from './Components/Provider/Label';
import IssueProvider from './Components/Provider/Issue';
import MilestoneProvider from './Components/Provider/Milestone';
import IssueInfoProvider from './Components/Provider/IssueInfo';
import 'react-toastify/dist/ReactToastify.css';

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
              <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
            </IssueInfoProvider>
          </IssueProvider>
        </MilestoneProvider>
      </LabelProvider>
    </AuthProvider>
  );
};
export default App;
