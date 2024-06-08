import MovieModel from '../models/Movie.model';
import { BASE_URL } from '../utils/constants';

export const getMovies = async (): Promise<MovieModel[]> => {
  const response = await fetch(`${BASE_URL}/movie`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const responseData = await response.json();
  return responseData.data.movies;
};
