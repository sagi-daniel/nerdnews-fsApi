import { UserModel } from './../../models/User.model';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  const { isLoading, data: user } = useQuery<UserModel | null>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === 'user' || user?.role === 'admin' };
}
