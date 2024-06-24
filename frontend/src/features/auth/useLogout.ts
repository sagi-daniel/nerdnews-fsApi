import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success('Köszi, hogy itt voltál! Viszlát! :)');
      queryClient.removeQueries();
      navigate('/home', { replace: true });
    },
  });

  return { logout, isLoading };
}
