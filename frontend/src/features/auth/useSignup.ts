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
      toast.success('Sikeres regisztráció!');
      queryClient.setQueryData(['user'], user);
      navigate('/myAccount', { replace: true });
    },
    onError: () => {
      toast.error('A megadott felhasználói adatok helytelenek!');
    },
  });

  return { signup, isLoading };
}
