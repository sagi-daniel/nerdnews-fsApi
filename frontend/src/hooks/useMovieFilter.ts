import useFilter from './useFilter';

function useMovieFilter() {
  return useFilter({
    genre: 'ALL',
    sortOrder: 'desc',
    fromDate: new Date(new Date().setDate(new Date().getDate() - 90)).toISOString().split('T')[0],
    toDate: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString().split('T')[0],
    page: '1',
    pageSize: '9',
  });
}

export default useMovieFilter;
