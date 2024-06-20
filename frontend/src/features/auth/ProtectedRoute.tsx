import { useUser } from '../auth/useUser';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Section from '../../components/Section';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [isAuthenticated, isLoading, navigate]
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <Section type="horizontal" gap="large">
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </Section>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
