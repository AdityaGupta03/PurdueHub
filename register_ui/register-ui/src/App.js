import Login from "./revamped/pages/login/Login";
import Register from "./revamped/pages/register/Register";
import Home from "./revamped/pages/home/Home";
import Profile from "./revamped/pages/profile/Profile";
import Navbar from "./revamped/components/navbar/Navbar"
import LeftBar from "./revamped/components/leftBar/LeftBar";

import './revamped/styles.scss'
import './App.css'

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
import ViewCalendar from "./revamped/pages/calendar/ViewCalendar";
import FAQ from "./revamped/pages/faq/FAQPage";
import FAQPage from "./revamped/pages/faq/FAQPage";
import ChatBot from "./revamped/pages/chatbot/Chatbot";
import Map from "./revamped/pages/map/Map";
import FilterCourses from "./revamped/pages/filter-courses/FilterCourses";


function App() {

  sessionStorage.setItem('isLoggedIn', 'false');
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.setItem('user_id', '-1');


  const currentUser = localStorage.getItem('user_id');
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
          {/* <RightBar /> */}
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
          path: "/profile/:username",
          element: <Profile />
        },
        {
          path: "/user-profile",
          element: <UserProfile />
        },
        {
          path: "/club/:clubName",
          element: <Club />
        },
        {
          path: "/class/:className",
          element: <Class />
        },
        {
          path: "/weather",
          element: <Weather />
        },
        {
          path: "/calendar",
          element: <ViewCalendar />
        },
        {
          path: "/faq",
          element: <FAQPage />
        },
        {
          path: "/chat-bot",
          element: <ChatBot />
        },
        {
          path: "/map",
          element: <Map />
        },
        {
          path: "/filter-courses",
          element: <FilterCourses />
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
      path: "/verify_email/:email",
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
    <div>
      <QueryClientProvider client={queryClient}>      
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}

export default App;