import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles = ['admin', 'user'] }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const role = user?.role;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (role && !allowedRoles.includes(role)) {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, role, allowedRoles, navigate]);

  if (isAuthenticated && role && allowedRoles.includes(role)) return <>{children}</>;

  return null;
}

export default ProtectedRoute;
