import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // redirect to /login, keep the attempted location in state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if used as wrapper with children: return children
  if (children) return children;

  // else used as Route element with Outlet
  return <Outlet />;
}
