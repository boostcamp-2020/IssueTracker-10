import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import Router from './Routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
};

export default App;
