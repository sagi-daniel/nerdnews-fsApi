import api from './api';
import { LoginResponseModel } from '../models/auth.models';
import NewsModel from '../models/News.model';

export const getMyNews = async (): Promise<NewsModel[] | null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }
  try {
    const response = await api.get<LoginResponseModel>('/user/news');
    console.log(response.data);
    const responseData = response.data;
    return responseData.data.user.userNews;
  } catch (error) {
    throw new Error('Fetching current user news failed');
  }
};

export const addToMyNews = async (newsId: string): Promise<NewsModel[] | null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }
  try {
    console.log(newsId);
    const response = await api.post<LoginResponseModel>('/user/news', { newsId });
    const responseData = response.data;
    return responseData.data.user.userNews;
  } catch (error) {
    throw new Error('Add to myNews failed');
  }
};

export const removeFromMyNews = async (newsId: string): Promise<NewsModel[] | null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }
  console.log(newsId);
  try {
    const response = await api.delete<LoginResponseModel>(`/user/news/${newsId}`);
    const responseData = response.data;
    return responseData.data.user.userNews;
  } catch (error) {
    throw new Error('Remove from myNews failed');
  }
};
