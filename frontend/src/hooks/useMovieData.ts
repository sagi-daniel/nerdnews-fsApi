import { useQuery } from '@tanstack/react-query';
import { getMoviesByQuery } from '../services/apiMovies';
import useMoviesFilter from '../hooks/useMovieFilter';
import MovieModel from '../models/Movie.model';
import ResponseModel from '../models/Response.model';

function useMoviesData() {
  const { genre, sortOrder, fromDate, toDate, page, pageSize } = useMoviesFilter().params;

  return useQuery<ResponseModel<MovieModel[], 'movies'>, Error>(
    ['MoviesByQuery', genre, sortOrder, fromDate, toDate, page, pageSize],
    () => getMoviesByQuery(genre, sortOrder, fromDate, toDate, page, pageSize)
  );
}

export default useMoviesData;
