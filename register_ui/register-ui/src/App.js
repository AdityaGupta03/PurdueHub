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

import Feedback from "./revamped/pages/feedback/Feedback";
import RightBar from "./revamped/components/rightBar/RightBar";

function App() {

  const currentUser = true;

  const Layout = () => {
    return(
      <div className="dark-theme">
        <Navbar />
        <div style={{display: 'flex'}}>
          <LeftBar/>
          <div style={{flex: 6}}>
            <Outlet />
          </div>
          <RightBar/>
        </div>
      </div>
    )
  }
  // if there is not a user, navigate to homepage, if there is one, show them the appropiate screen
  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login"/>
    }
    return children;
  }
  // children [] = allow sticky nav bar to exist in any of the children pages
  const router = createBrowserRouter([
    {
      path:"/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
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
          path: "/feedback",
          element: <Feedback />
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
  ]);

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App;