import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Routes';
import AuthProvider from './Components/Provider/Auth';
import IssueProvider from './Components/Provider/Issue';

const App = () => {
  return (
    <AuthProvider>
      <IssueProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </IssueProvider>
    </AuthProvider>
  );
};
export default App;
