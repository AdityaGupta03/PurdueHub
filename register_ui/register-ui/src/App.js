import Login from "./revamped/pages/login/Login";
import Register from "./revamped/pages/register/Register";
import Home from "./revamped/pages/home/Home";
import Profile from "./revamped/pages/profile/Profile";
import Navbar from "./revamped/components/navbar/Navbar"
import LeftBar from "./revamped/components/leftBar/LeftBar";

import './revamped/styles.scss'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import RightBar from "./revamped/components/rightBar/RightBar";
import UserProfile from "./revamped/pages/profile/UserProfile";

import ForgotPassword from "./revamped/pages/forgot-password/ForgotPassword";
import ForgotUsername from "./revamped/pages/forgot-username/ForgotUsername";
import VerifyEmail from "./revamped/pages/verify-email/VerifyEmail";

import PasswordAuth from "./revamped/pages/password-auth/PasswordAuth";
import UsernameAuth from "./revamped/pages/username-auth/UsernameAuth";

import ChangeUsername from "./revamped/pages/change-username/ChangeUsername"
import ChangePassword from "./revamped/pages/change-password/ChangePassword"

import Club from "./revamped/pages/club/Club"
import Class from "./revamped/pages/class/Class";
import Weather from "./revamped/pages/weather/Weather";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Calendar from "./revamped/pages/calendar/Calendar";


function App() {

  const currentUser = true;
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="dark-theme">
        <Navbar />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <div className="main-content" style={{ flex: 6 }} >
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    )
  }
  // if there is not a user, navigate to homepage, if there is one, show them the appropiate screen
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }
  // children [] = allow sticky nav bar to exist in any of the children pages
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <ProtectedRoute><Layout /></ProtectedRoute>
      ,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
        {
          path: "/user-profile",
          element: <UserProfile />
        },
        {
          path: "/club/:id",
          element: <Club />
        },
        {
          path: "/class/:id",
          element: <Class />
        },
        {
          path: "/weather",
          element: <Weather />
        },
        {
          path: "/calendar",
          element: <Calendar />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/forgot-username",
      element: <ForgotUsername />
    },
    {
      path: "/verify-email",
      element: <VerifyEmail />
    },
    {
      path: "/password-auth",
      element: <PasswordAuth />
    },
    {
      path: "/username-auth",
      element: <UsernameAuth />
    },
    {
      path: "/change-password",
      element: <ChangePassword />
    },
    {
      path: "/change-username",
      element: <ChangeUsername />
    },
  ]);

  return (
    <div><QueryClientProvider client={queryClient}>      <RouterProvider router={router} />
    </QueryClientProvider>
    </div>
  )
}

export default App;