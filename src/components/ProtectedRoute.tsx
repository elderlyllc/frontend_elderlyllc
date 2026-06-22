import React from 'react';
import { Redirect } from 'react-router-dom';
import useRoleMenu from '../hooks/useRoleMenu';

interface ProtectedRouteProps {
  /** Only users with this roleId can access */
  allowedRoleId: number;
  /** Where to redirect if access is denied (default: /not-found) */
  redirectTo?: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoleId,
  redirectTo = '/not-found',
  children,
}) => {
  const { roleId } = useRoleMenu();

  if (roleId === allowedRoleId) {
    return <>{children}</>;
  }

  return <Redirect to={redirectTo} />;
};

export default ProtectedRoute;
