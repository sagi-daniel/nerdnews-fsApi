import { useQuery } from '@tanstack/react-query';
import { getNewsByQuery } from '../services/apiNews';
import NewsModel from '../models/News.model';
import useNewsFilter from '../hooks/useNewsFilter';

function useNewsData() {
  const { selectedCategory, selectedSort, fromDate, toDate } = useNewsFilter();

  return useQuery<NewsModel[], Error>(['NewsByCategory', selectedCategory, selectedSort, fromDate, toDate], () =>
    getNewsByQuery(selectedCategory, selectedSort, fromDate, toDate)
  );
}

export default useNewsData;
