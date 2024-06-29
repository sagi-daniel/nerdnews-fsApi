import api from './api';
import { LoginResponseModel } from '../models/auth.models';
import MovieModel from '../models/Movie.model';

export const getMyMovies = async (): Promise<MovieModel[] | null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }
  try {
    const response = await api.get<LoginResponseModel>('/user/movies');
    console.log(response.data);
    const responseData = response.data;
    return responseData.data.user.userMovies;
  } catch (error) {
    throw new Error('Fetching current user movie failed');
  }
};

export const addToMyMovies = async (movieId: string): Promise<MovieModel[] | null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }
  try {
    const response = await api.post<LoginResponseModel>('/user/movies', movieId);
    const responseData = response.data;
    return responseData.data.user.userMovies;
  } catch (error) {
    throw new Error('Add to myMovies failed');
  }
};

export const removeFromMyMovies = async (movieId: string): Promise<MovieModel[] | null> => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return null;
  }

  try {
    const response = await api.delete<LoginResponseModel>(`/user/movies/${movieId}`);
    const responseData = response.data;
    return responseData.data.user.userMovies;
  } catch (error) {
    throw new Error('Remove from myMovies failed');
  }
};
