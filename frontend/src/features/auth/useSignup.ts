import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signupUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserModel } from '../../models/User.model';
import { SingupModel } from '../../models/auth.models';

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (newUser: SingupModel) => signupUser(newUser),
    onSuccess: (user: UserModel) => {
      queryClient.setQueryData(['user'], user);
      navigate('/myAccount', { replace: true });
    },
    onError: (err: Error) => {
      console.log(err);
      toast.error('Provided user datas are incorrect');
    },
  });

  return { signup, isLoading };
}
