import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetPasswordUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordModel } from '../../models/auth.models';

export function useResetPassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: ({ passwords, resetToken }: { passwords: ResetPasswordModel; resetToken: string }) =>
      resetPasswordUser({ passwords, resetToken }),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/myAccount', { replace: true });
    },
  });

  return { resetPassword, isLoading };
}
