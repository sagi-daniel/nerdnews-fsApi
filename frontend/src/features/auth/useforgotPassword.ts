import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { forgotPasswordUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useForgotPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: ({ email }: { email: string }) => forgotPasswordUser(email),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.removeQueries();
      navigate('/forgetPasswordConfirm', { replace: true });
    },
    onError: (err: Error) => {
      toast.error(err.message);
      queryClient.removeQueries();
      navigate('/home', { replace: true });
    },
  });

  return { forgotPassword, isLoading };
}
