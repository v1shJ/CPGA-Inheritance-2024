import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/landing.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Home from "./components/Home.jsx";
import About from "./components/landingpages/about.jsx";
import Discussion from "./components/discussion.jsx";
import Chatbot from "./components/chatbot.jsx";
import Profile from "./components/Profile.jsx";
import Idform from "./components/Idform.jsx";
import VerifyEmail from "./components/verifyEmail.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import DailyProblems from "./components/DailyProblems.jsx";
import 'react-toastify/dist/ReactToastify.css';
import DailyProblemForm from "./components/DailyProblemForm.jsx";

function checkLogin() {
  const token = localStorage.getItem("token");
  return token ? true : false;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: checkLogin() ? <Home /> : <Landing />,
    },
    {
      path: "/login",
      element: checkLogin() ? <Home /> : <Login />,
    },
    {
      path: "/register",
      element: checkLogin() ? <Home /> : <Signup />,
    },
    {
      path: "/about",
      element: checkLogin() ? <About /> : <Login />,
    },
    {
      path: "/discussion",
      element: checkLogin() ? <Discussion /> : <Login />,
    },
    {
      path: "/chatbot",
      element: checkLogin() ? <Chatbot /> : <Login />,
    },
    {
      path: "/profile/:id",
      element: checkLogin() ? <Profile /> : <Login />,
    },
    {
      path: "/getIds",
      element: checkLogin() ? <Idform /> : <Login />,
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />,
    },
    {
      path: "/leaderboard",
      element: checkLogin() ? <Leaderboard /> : <Login />,
    },
    {
      path: "/dailyproblems",
      element: checkLogin() ? <DailyProblems /> : <Login />,
    },
    {
      path: "/daily-problem-form",
      element: checkLogin() ? <DailyProblemForm /> : <Login />,
    }
  ]);

  return (
    <div className="h-fit">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
