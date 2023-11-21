// import logo from './logo.svg';
import './App.css';
import KioskView from './pages/KioskView'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

// PUT PAGES HERE
import { Home } from "./pages/Home"
import Manager from "./pages/Manager"
// import KioskView from './pages/KioskView';

function App() {
  // add new pages here

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
  ])
    
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;

