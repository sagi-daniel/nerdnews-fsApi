import MovieResponseModel from '../models/responseModel/MovieResponseModel';
import { BASE_URL } from '../utils/constants';

export const getMovies = async (): Promise<MovieResponseModel> => {
  const response = await fetch(`${BASE_URL}/movie`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseData = await response.json();
  return responseData;
};

export async function getMoviesByQuery(
  genre: string,
  sortOrder: string,
  page: string,
  pageSize: string,
  fromDate: string,
  toDate: string
): Promise<MovieResponseModel> {
  const params = new URLSearchParams();
  if (genre) params.append('category', genre);
  if (sortOrder) params.append('sortOrder', sortOrder);
  if (page) params.append('page', page);
  if (pageSize) params.append('pageSize', pageSize);
  if (fromDate) params.append('fromDate', fromDate);
  if (toDate) params.append('toDate', toDate);

  const response = await fetch(`${BASE_URL}/movie?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
}
