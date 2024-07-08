import axios from 'axios';
import api from './api';
import { BASE_URL } from '../utils/constants';
import MovieModel, { CreateMovieModel, UpdateMovieModel } from '../models/Movie.model';

type ResponseKeys = 'movie' | 'movies';

const handleRequest = async <T>(
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  responseKey: ResponseKeys,
  data?: MovieModel | CreateMovieModel | UpdateMovieModel | string
): Promise<T | null> => {
  try {
    const response = await api[method](url, data);
    return response.data.data[responseKey];
  } catch (error) {
    throw new Error(`${method.toUpperCase()} request to ${url} failed`);
  }
};

export const getMovies = async () => {
  return await handleRequest<MovieModel[]>('get', '/movie', 'movies');
};

export const createMovie = async (movie: CreateMovieModel) => {
  return await handleRequest<MovieModel>('post', '/movie', 'movie', movie);
};

export const updateMovie = async ({ movie, movieId }: UpdateMovieModel) => {
  return await handleRequest<MovieModel>('patch', `/movie/${movieId}`, 'movie', movie);
};

export const deleteMovie = async (movieId: string) => {
  return await handleRequest<MovieModel>('delete', `/movie/${movieId}`, 'movie');
};

export async function getMoviesByQuery(
  searchText: string,
  genre: string,
  sortOrder: string,
  fromDate: string,
  toDate: string,
  page: string,
  pageSize: string
) {
  const params = {
    searchText,
    genre,
    sortOrder,
    fromDate,
    toDate,
    page,
    pageSize,
  };

  try {
    const response = await api.get(`${BASE_URL}/movie`, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function sliderMovies() {
  const params = {
    sortOrder: 'desc',
  };
  try {
    const response = await api.get(`${BASE_URL}/movie/slider`, { params });
    return response.data.data['movies'];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
