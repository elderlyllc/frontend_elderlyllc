import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import {store } from './store/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
  <React.StrictMode>
    
<GoogleOAuthProvider clientId="phrasal-crowbar-436708-r5e5b1c8f0e.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
  </Provider>
);