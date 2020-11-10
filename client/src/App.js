import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Routes';
import AuthProvider from './Components/Provider/Auth';
import LabelProvider from './Components/Provider/Label';
import IssueProvider from './Components/Provider/Issue';

const App = () => {
  return (
    <AuthProvider>
      <LabelProvider>
        <IssueProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </IssueProvider>
      </LabelProvider>
    </AuthProvider>
  );
};
export default App;
