// AuthContext.tsx
import { ReactNode, createContext, useContext } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import UserModel from '../models/User.model';
import { LoginCredentialModel, SingupModel, PasswordsModel } from '../models/auth.models';
import {
  loginUser,
  logoutUser,
  signupUser,
  forgotPasswordUser,
  resetPasswordUser,
  updatePasswordUser,
  getCurrentUser,
} from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: UserModel | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentialModel) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: SingupModel) => Promise<void>;
  forgotPassword: (data: string) => Promise<void>;
  resetPassword: (data: { passwords: PasswordsModel; resetToken: string }) => Promise<void>;
  updatePassword: (passwords: PasswordsModel) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Login Mutation
  const { mutate: loginMutation, isLoading: loginLoading } = useMutation(loginUser, {
    onSuccess: (user: UserModel) => {
      toast.success(`Üdv, ${user.userName}`);
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries(['myNews']);
      queryClient.invalidateQueries(['myMovies']);

      navigate('/myAccount', { replace: true });
    },
    onError: () => {
      toast.error('A megadott email vagy jelszó helytelen!');
    },
  });

  // Logout Mutation
  const { mutate: logoutMutation, isLoading: logoutLoading } = useMutation(logoutUser, {
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      navigate('/home', { replace: true });
    },
  });

  // Signup Mutation
  const { mutate: signupMutation, isLoading: signupLoading } = useMutation(signupUser, {
    onSuccess: (user: UserModel) => {
      toast.success('Sikeres regisztráció!');
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries(['myNews']);
      queryClient.invalidateQueries(['myMovies']);
      navigate('/myAccount', { replace: true });
    },
    onError: () => {
      toast.error('A megadott felhasználói adatok helytelenek!');
    },
  });

  // Forgot Password Mutation
  const { mutate: forgotPasswordMutation, isLoading: forgotPasswordLoading } = useMutation(forgotPasswordUser, {
    onSuccess: () => {
      toast.success('A jelszó-visszaállítási email elküldve!');
      navigate('/forgetPasswordConfirm', { replace: true });
    },
    onError: (err: Error) => {
      toast.error(err.message);
      navigate('/login', { replace: true });
    },
  });

  // Reset Password Mutation
  const { mutate: resetPasswordMutation, isLoading: resetPasswordLoading } = useMutation(resetPasswordUser, {
    onSuccess: () => {
      toast.success('Sikeres jelszó-változtatás!');
      navigate('/login', { replace: true });
    },
    onError: () => {
      toast.error('Sikertelen jelszó-változtatás!');
    },
  });

  // Update Password Mutation
  const { mutate: updatePasswordMutation, isLoading: updatePasswordLoading } = useMutation(updatePasswordUser, {
    onSuccess: () => {
      toast.success('Sikeres jelszó-változtatás!');
      queryClient.setQueryData(['user'], user);
      navigate('/myAccount', { replace: true });
    },
    onError: () => {
      toast.error('Sikertelen jelszó-változtatás!');
    },
  });

  // Fetch User Query
  const { data: user, isLoading: userLoading } = useQuery(['user'], getCurrentUser, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const isAuthenticated = !!user;

  // Context value
  const authContextValue: AuthContextType = {
    user: user || null,
    isAuthenticated,
    isLoading:
      userLoading ||
      loginLoading ||
      logoutLoading ||
      signupLoading ||
      forgotPasswordLoading ||
      resetPasswordLoading ||
      updatePasswordLoading,
    login: async (credentials: LoginCredentialModel) => {
      await loginMutation(credentials);
    },
    logout: async () => {
      await logoutMutation();
    },
    signup: async (data: SingupModel) => {
      await signupMutation(data);
    },
    forgotPassword: async (data: string) => {
      await forgotPasswordMutation(data);
    },
    resetPassword: async (data: { passwords: PasswordsModel; resetToken: string }) => {
      await resetPasswordMutation(data);
    },
    updatePassword: async (passwords: PasswordsModel) => {
      await updatePasswordMutation(passwords);
    },
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
