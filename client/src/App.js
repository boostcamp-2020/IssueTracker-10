import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Routes';
import AuthProvider from './Components/Provider/Auth';
import LabelProvider from './Components/Provider/Label';

const App = () => {
  return (
    <AuthProvider>
      <LabelProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LabelProvider>
    </AuthProvider>
  );
};
export default App;
