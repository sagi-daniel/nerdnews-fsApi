import api from './api';
import { LoginResponseModel } from '../models/auth.models';

export const getMyNews = async () => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return [];
  }
  try {
    const response = await api.get<LoginResponseModel>('/user/news');
    const responseData = response.data;
    return responseData.data.user.userNews;
  } catch (error) {
    throw new Error('Fetching current user news failed');
  }
};

export const addToMyNews = async (newsId: string) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return [];
  }
  try {
    const response = await api.post<LoginResponseModel>('/user/news', { newsId });
    const responseData = response.data;
    return responseData.data.user.userNews;
  } catch (error) {
    throw new Error('Add to myNews failed');
  }
};

export const removeFromMyNews = async (newsId: string) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return [];
  }

  try {
    const response = await api.delete<LoginResponseModel>(`/user/news/${newsId}`);
    const responseData = response.data;
    return responseData.data.user.userNews;
  } catch (error) {
    throw new Error('Remove from myNews failed');
  }
};
