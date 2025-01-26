import React from "react";

import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import SettingsPage from "../pages/SettingsPage";
import ProfilePage from "../pages/ProfilePage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <HomePage /> }],
      },
      {
        path: "settings",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <SettingsPage /> }],
      },
      {
        path: "profile",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <ProfilePage /> }],
      },
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);

export default router;
