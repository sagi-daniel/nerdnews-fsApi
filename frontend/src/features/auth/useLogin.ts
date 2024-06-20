import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserModel } from '../../models/User.model';

interface LoginCredentials {
  email: string;
  password: string;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) => loginUser({ email, password }),
    onSuccess: (user: UserModel) => {
      queryClient.setQueryData(['user'], user);
      navigate('/myAccount', { replace: true });
    },
    onError: (err: Error) => {
      console.log(err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLoading };
}
