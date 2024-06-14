import { useQuery } from '@tanstack/react-query';
import { getNewsByQuery } from '../services/apiNews';
import useNewsFilter from '../hooks/useNewsFilter';
import NewsResponseModel from '../models/responseModel/NewsResponseModel';

function useNewsData() {
  const { selectedCategory, selectedSort, selectedFromDate, selectedToDate, page, pageSize } = useNewsFilter();

  return useQuery<NewsResponseModel, Error>(
    ['NewsByQuery', selectedCategory, selectedSort, selectedFromDate, selectedToDate, page, pageSize],
    () => getNewsByQuery(selectedCategory, selectedSort, selectedFromDate, selectedToDate, page, pageSize)
  );
}

export default useNewsData;
