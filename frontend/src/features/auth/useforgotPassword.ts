import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forgotPasswordUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useForgotPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPasswordUser(email),
    onSuccess: (data) => {
      queryClient.removeQueries();
      toast.success(data.message);
      navigate('/home', { replace: true });
    },
  });

  return { forgotPassword, isLoading };
}
