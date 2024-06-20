import api from './axios';
import { UserModel } from '../models/User.model';
import { LoginCredentials, LoginResponse } from '../models/Login.model';

export const loginUser = async ({ email, password }: LoginCredentials): Promise<UserModel> => {
  try {
    const response = await api.post<LoginResponse>('/user/login', {
      email,
      password,
    });

    const responseData = response.data;
    localStorage.setItem('jwt', responseData.token);
    return responseData.data.user;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const logoutUser = async () => {
  try {
    await api.post<LoginResponse>('/user/logout');
    localStorage.removeItem('jwt');
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const getCurrentUser = async (): Promise<UserModel | null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }
  try {
    const response = await api.get<LoginResponse>('/user/me');
    const responseData = response.data;
    return responseData.data.user;
  } catch (error) {
    throw new Error('Fetching current user failed');
  }
};
