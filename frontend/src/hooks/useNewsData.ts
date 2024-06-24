import { useQuery } from '@tanstack/react-query';
import { getNewsByQuery } from '../services/apiNews';
import useNewsFilter from '../hooks/useNewsFilter';
import ResponseModel from '../models/Response.model';
import NewsModel from '../models/News.model';

function useNewsData() {
  const { category, sortOrder, fromDate, toDate, page, pageSize } = useNewsFilter().params;

  return useQuery<ResponseModel<NewsModel[], 'news'>, Error>(
    ['NewsByQuery', category, sortOrder, fromDate, toDate, page, pageSize],
    () => getNewsByQuery(category, sortOrder, fromDate, toDate, page, pageSize)
  );
}

export default useNewsData;
