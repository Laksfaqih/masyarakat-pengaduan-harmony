
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { hasRole, isAuthenticated } from '@/lib/auth';
import { UserRole } from '@/types';

interface RoleBasedRouteProps {
  element: React.ReactNode;
  allowedRoles: UserRole | UserRole[];
  redirectTo?: string;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  element,
  allowedRoles,
  redirectTo = '/login',
}) => {
  const location = useLocation();
  const isAuth = isAuthenticated();
  const hasPermission = isAuth && hasRole(allowedRoles);

  if (!isAuth) {
    // User is not authenticated, redirect to login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!hasPermission) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required role
  return <>{element}</>;
};

export default RoleBasedRoute;
