/**
 * @file This is the entry point of the React application.
 * It imports necessary dependencies, sets up the Auth0Provider,
 * and renders the main App component.
 * @module index
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  /**
   * Renders the App component wrapped in the Auth0Provider.
   * @author Sean Caballa
   * @function
   * @returns {JSX.Element} The rendered App component.
   */
  <Auth0Provider
    domain="dev-6bkhlo4ytu4ftd6m.us.auth0.com"
    clientId="qqqKuU6ZzTlZVv6trgGThHvKYySEZru0"
    authorizationParams={{
      // redirect_uri: window.location.origin
      // redirect_uri: "http://localhost:3000"
      redirect_uri: "https://sharetea-bds8.onrender.com/"
    }}
  >
    <App />
  </Auth0Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
