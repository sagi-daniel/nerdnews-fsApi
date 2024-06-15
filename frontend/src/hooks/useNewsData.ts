import { useQuery } from '@tanstack/react-query';
import { getNewsByQuery } from '../services/apiNews';
import useNewsFilter from '../hooks/useNewsFilter';
import NewsResponseModel from '../models/responseModel/NewsResponseModel';

function useNewsData() {
  const { category, sortOrder, fromDate, toDate, page, pageSize } = useNewsFilter().params;

  return useQuery<NewsResponseModel, Error>(
    ['NewsByQuery', category, sortOrder, fromDate, toDate, page, pageSize],
    () => getNewsByQuery(category, sortOrder, fromDate, toDate, page, pageSize)
  );
}

export default useNewsData;
