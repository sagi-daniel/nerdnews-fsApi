import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { UserModel } from '../../models/User.model';
import { LoginCredentialModel } from '../../models/auth.models';
import { capitalizeWord } from '../../utils/helpers';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginCredentialModel) => loginUser({ email, password }),
    onSuccess: (user: UserModel) => {
      toast.success(`Üdv, ${capitalizeWord(user.userName)}`);
      queryClient.setQueryData(['user'], user);
      navigate('/myAccount', { replace: true });
    },
    onError: () => {
      toast.error('A megadott email vagy jelszó helytelen!');
    },
  });

  return { login, isLoading };
}
