import { useQuery } from '@tanstack/react-query';
import { getMoviesByQuery } from '../services/apiMovies';
import useMoviesFilter from '../hooks/useMovieFilter';

function useMoviesData() {
  const { genre, sortOrder, fromDate, toDate, page, pageSize } = useMoviesFilter().params;

  return useQuery(['moviesByQuery', genre, sortOrder, fromDate, toDate, page, pageSize], () =>
    getMoviesByQuery(genre, sortOrder, fromDate, toDate, page, pageSize)
  );
}

export default useMoviesData;
