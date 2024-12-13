import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./scss/main.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./screens/Profile/Profile";
import Feed from "./screens/Feed/Feed";
import Login from "./screens/Login/Login";
import Registration from "./screens/Registration/Registration";
import { useAuth } from "./context/AuthContext";
import ProfileEdit from "./screens/ProfileEdit/ProfileEdit";
import axios from "axios";
const App = () => {
  const { user, setUser } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          "http://localhost:5000/api/auth/auth",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.error("Ошибка аутентификации:", error);
      }
    };

    fetchUserData();
  }, [setUser]);

  return <RouterProvider router={router} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/feed",
    element: <Feed />,
  },
  {
    path: "/profileEdit/:id",
    element: <ProfileEdit />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
