import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

export default function ProtectedRoute({ children }) {
  const { isAdminLogged } = useContext(AdminContext);

  if (!isAdminLogged) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
