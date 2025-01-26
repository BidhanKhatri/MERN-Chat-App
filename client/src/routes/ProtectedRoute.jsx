import React, { useEffect } from "react";
import useChatStore from "../store/chatStore";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const ProtectedRoute = () => {
  const { authUser, checkAuth, isAuthChecking } = useChatStore();

  useEffect(() => {
    if (isAuthChecking) {
      checkAuth();
    }
  }, [isAuthChecking, checkAuth]);

  if (isAuthChecking) {
    return <div>Loading...</div>;
  }

  return authUser ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoute;
