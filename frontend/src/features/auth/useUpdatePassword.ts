import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePasswordUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { PasswordsModel } from '../../models/auth.models';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: (passwords: PasswordsModel) => updatePasswordUser(passwords),
    onSuccess: () => {
      toast.success('Sikeres jelszó változtatás!');
      queryClient.removeQueries();
      navigate('/myAccount', { replace: true });
    },
    onError: () => {
      toast.error('Sikertelen jelszó változtatás!');
      queryClient.removeQueries();
    },
  });

  return { updatePassword, isLoading };
}
