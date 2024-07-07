import { useQuery } from '@tanstack/react-query';
import { getNewsByQuery } from '../services/apiNews';
import useNewsFilter from '../hooks/useNewsFilter';

function useNewsData() {
  const { searchText, category, sortOrder, fromDate, toDate, page, pageSize } = useNewsFilter().params;

  return useQuery(['newsByQuery', searchText, category, sortOrder, fromDate, toDate, page, pageSize], () =>
    getNewsByQuery(searchText, category, sortOrder, fromDate, toDate, page, pageSize)
  );
}

export default useNewsData;
