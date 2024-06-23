import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePasswordUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { PasswordsModel } from '../../models/auth.models';

export function useUpdatePassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: (passwords: PasswordsModel) => updatePasswordUser(passwords),
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/myAccount', { replace: true });
    },
  });

  return { updatePassword, isLoading };
}
