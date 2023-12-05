// import logo from './logo.svg';
import './App.css';
import KioskView from './pages/KioskView'
import MenuView from './pages/MenuView';

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";

import React from 'react';
import {createGlobalStyle} from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';


// PUT PAGES HERE
import { Home } from "./pages/Home"
import Manager from "./pages/Manager"
// import KioskView from './pages/KioskView';
import Cashier from "./pages/Cashier"


function App() {
  // add new pages here
  const GlobalStyle = createGlobalStyle`
  /* Your global styles here */

  /* Import Google Font */
  @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300&family=Jost&family=Nova+Square&display=swap');

  /* Apply the font to the body or root element */
  body {
    font-family: 'Jost', sans-serif;
  }
`;

  const { isAuthenticated, isLoading, user, getIdTokenClaims } = useAuth0();

  

  

  if (isLoading) {
    // You might want to show a loading spinner while Auth0 is checking authentication status
    return <div>Loading...</div>;
  }


  let hasManagerRole = false;
  if (isAuthenticated) {

  const roles = user['https://myroles.com/roles'];
  hasManagerRole = roles.includes('manager');
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    }
    ,
    {
      // path: "/Manager",
      // element: hasManagerRole ? <Manager /> : <Navigate to="/" />,
      path: "/Manager",
      element: hasManagerRole ? <Manager /> : <Navigate to="/login" />,      
    }
    ,
    {
      path: "/Kiosk",
      element: <KioskView/>
    }
    ,
    {
      path: "/Menu",
      element: <MenuView/>
    }
    ,
    {
      path: "/Cashier",
      element: <Cashier/>
    }
  ])
    
  return (
    <RecoilRoot>
      <GlobalStyle/>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

