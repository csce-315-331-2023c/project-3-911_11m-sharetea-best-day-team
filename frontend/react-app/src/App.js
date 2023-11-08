// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

// PUT PAGES HERE
import { Home } from "./pages/Home"
import Manager from "./pages/Manager"
import KioskView from './pages/KioskView';

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

