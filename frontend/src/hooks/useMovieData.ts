import { useQuery } from '@tanstack/react-query';
import { getMoviesByQuery } from '../services/apiMovies';
import useMoviesFilter from '../hooks/useMovieFilter';

function useMoviesData() {
  const { searchText, genre, sortOrder, fromDate, toDate, page, pageSize } = useMoviesFilter().params;

  return useQuery(['moviesByQuery', searchText, genre, sortOrder, fromDate, toDate, page, pageSize], () =>
    getMoviesByQuery(searchText, genre, sortOrder, fromDate, toDate, page, pageSize)
  );
}

export default useMoviesData;
