import { useUser } from '../auth/useUser';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Section from '../../components/Section';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles = ['admin', 'user'] }: ProtectedRouteProps) {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated, user } = useUser();
  const role = user?.role;

  useEffect(
    function () {
      if (!isLoading) {
        if (!isAuthenticated) {
          navigate('/login');
        } else if (role && !allowedRoles.includes(role)) {
          navigate('/unauthorized');
        }
      }
    },
    [isAuthenticated, isLoading, role, allowedRoles, navigate]
  );

  if (isLoading)
    return (
      <Section type="horizontal" gap="large">
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Section>
    );

  if (isAuthenticated && role && allowedRoles.includes(role)) return children;

  return null;
}

export default ProtectedRoute;
