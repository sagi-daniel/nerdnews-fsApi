import { useQuery } from '@tanstack/react-query';
import { getMoviesByQuery } from '../services/apiMovies';
import useMoviesFilter from '../hooks/useMovieFilter';
import MovieResponseModel from '../models/responseModel/MovieResponseModel';

function useMoviesData(page: string, pageSize: string) {
  const { selectedGenre, selectedSort, fromDate, toDate } = useMoviesFilter();

  return useQuery<MovieResponseModel, Error>(
    ['MoviesByQuery', selectedGenre, selectedSort, page, pageSize, fromDate, toDate],
    () => getMoviesByQuery(selectedGenre, selectedSort, page, pageSize, fromDate, toDate)
  );
}

export default useMoviesData;
