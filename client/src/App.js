import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Routes';
import AuthProvider from './Components/Provider/Auth';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
