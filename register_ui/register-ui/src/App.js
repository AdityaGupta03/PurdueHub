import Login from "./revamped/pages/login/Login";
import Register from "./revamped/pages/register/Register";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
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