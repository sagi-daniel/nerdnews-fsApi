import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetPasswordUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { PasswordsModel } from '../../models/auth.models';

export function useResetPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: ({ passwords, resetToken }: { passwords: PasswordsModel; resetToken: string }) =>
      resetPasswordUser({ passwords, resetToken }),
    onSuccess: () => {
      toast.success('Sikeres jelszó változtatás!');
      queryClient.removeQueries();
      navigate('/myAccount', { replace: true });
    },
    onError: () => {
      toast.error('Sikertelen jelszó változtatás!');
      navigate('/login', { replace: true });
    },
  });

  return { resetPassword, isLoading };
}
