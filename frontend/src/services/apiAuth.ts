import api from './api';
import {
  ForgotPasswordResponseModel,
  LoginCredentialModel,
  LoginResponseModel,
  PasswordsModel,
  SingupModel,
} from '../models/auth.models';

export const loginUser = async ({ email, password }: LoginCredentialModel) => {
  try {
    const loginData = {
      email,
      password,
    };
    const response = await api.post<LoginResponseModel>('/user/login', loginData);
    const responseData = response.data;
    localStorage.setItem('jwt', responseData.token);
    return responseData.data.user;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem('jwt');
    await api.post('/user/logout');
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }
  try {
    const response = await api.get<LoginResponseModel>('/user/me');
    const responseData = response.data;
    return responseData.data.user;
  } catch (error) {
    throw new Error('Fetching current user failed');
  }
};

export const signupUser = async (newUser: SingupModel) => {
  try {
    const response = await api.post<LoginResponseModel>('/user/signup', newUser);
    const responseData = response.data;
    localStorage.setItem('jwt', responseData.token);
    return responseData.data.user;
  } catch (error) {
    throw new Error('Signup failed');
  }
};

export const forgotPasswordUser = async (email: string) => {
  try {
    const response = await api.post<ForgotPasswordResponseModel>('/user/forgotPassword', { email });
    return response.data;
  } catch (error) {
    throw new Error('A jelszó visszaállítás sikertelen volt!');
  }
};

export const resetPasswordUser = async ({
  passwords,
  resetToken,
}: {
  passwords: PasswordsModel;
  resetToken: string;
}) => {
  try {
    const response = await api.patch<LoginResponseModel>(`/user/resetPassword/${resetToken}`, passwords);
    const responseData = response.data;
    localStorage.setItem('jwt', responseData.token);
    return responseData.data.user;
  } catch (error) {
    throw new Error('Reset password failed');
  }
};

export const updatePasswordUser = async (passwords: PasswordsModel) => {
  try {
    const response = await api.patch<LoginResponseModel>(`/user/updateMyPassword`, passwords);
    const responseData = response.data;
    localStorage.setItem('jwt', responseData.token);
    return responseData.data.user;
  } catch (error) {
    throw new Error('Reset password failed');
  }
};
