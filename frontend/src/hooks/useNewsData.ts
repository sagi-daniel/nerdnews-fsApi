import { useQuery } from '@tanstack/react-query';
import { getNewsByQuery } from '../services/apiNews';
import NewsModel from '../models/News.model';
import useNewsFilter from '../hooks/useNewsFilter';

function useNewsData() {
  const { selectedCategory, selectedSort, dateRange } = useNewsFilter();

  return useQuery<NewsModel[], Error>(
    ['NewsByCategory', selectedCategory, selectedSort, dateRange.fromDate, dateRange.toDate],
    () => getNewsByQuery(selectedCategory, selectedSort, dateRange.fromDate, dateRange.toDate)
  );
}

export default useNewsData;
