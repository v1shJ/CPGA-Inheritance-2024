import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/landing.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Home from "./components/Home.jsx";
import About from "./components/landingpages/about.jsx";

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Signup />
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/about",
      element: <About />,
    }
  ]);


  return (
    <div className="h-fit">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
