import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
// NOTE - 2. Step two - Import the store (Go to step 3 with that link below)
// LINK /Users/taehong/Downloads/filmpire_jsm/src/app/store.js
import store from './app/store.js';

const theme = createTheme({});

ReactDOM.render(
  // NOTE - 1. Step one - Provider is a component that makes the Redux store available to any nested components that have been wrapped in the connect() function.
  <Provider store={store}>
    {/* How to theme: https://mui.com/material-ui/customization/theming/ */}
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
