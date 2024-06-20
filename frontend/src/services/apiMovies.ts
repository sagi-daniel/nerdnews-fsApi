import axios from 'axios';
import MovieResponseModel from '../models/responseModel/MovieResponseModel';
import { BASE_URL } from '../utils/constants';

export const getMovies = async (): Promise<MovieResponseModel> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export async function getMoviesByQuery(
  genre: string,
  sortOrder: string,
  fromDate: string,
  toDate: string,
  page: string,
  pageSize: string
): Promise<MovieResponseModel> {
  const params = {
    genre,
    sortOrder,
    fromDate,
    toDate,
    page,
    pageSize,
  };

  try {
    const response = await axios.get(`${BASE_URL}/movie`, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
