// import logo from './logo.svg';
import './App.css';
import KioskView from './pages/KioskView'
import MenuView from './pages/MenuView';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import React from 'react';
import {createGlobalStyle} from 'styled-components';

// PUT PAGES HERE
import { Home } from "./pages/Home"
import Manager from "./pages/Manager"
// import KioskView from './pages/KioskView';

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


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    }
    ,
    {
      path: "/Manager",
      element: <Manager/>,
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
  ])
    
  return (
    <RecoilRoot>
      <GlobalStyle/>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

