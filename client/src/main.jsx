import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./screens/Profile/Profile";
import Feed from "./screens/Feed/Feed";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile />,
  },
  
  {
    path: "/feed",
    element: <Feed />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
