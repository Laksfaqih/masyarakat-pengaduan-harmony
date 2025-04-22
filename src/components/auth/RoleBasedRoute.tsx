
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
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
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  // Ensure we're treating profile.role as UserRole type
  const hasPermission = profile && roles.includes(profile.role as UserRole);

  if (!hasPermission) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{element}</>;
};

export default RoleBasedRoute;
