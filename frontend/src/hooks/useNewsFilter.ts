import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useNewsFilter() {
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParam = (param: string) => new URLSearchParams(location.search).get(param);

  const setParams = (params: { [key: string]: string }) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const selectedCategory = getQueryParam('category') || 'ALL';
  const selectedSort = getQueryParam('sortOrder') || 'desc';

  // Kezdeti érték beállítása az előző 7 napra
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  const selectedFromDate = getQueryParam('fromDate') || startDate.toISOString().split('T')[0];
  const selectedToDate = getQueryParam('toDate') || new Date().toISOString().split('T')[0];

  const page = getQueryParam('page') || '1';
  const pageSize = getQueryParam('pageSize') || '9';

  useEffect(() => {
    setParams({
      page,
      pageSize,
      category: selectedCategory,
      sortOrder: selectedSort,
      fromDate: selectedFromDate,
      toDate: selectedToDate,
    });
  }, [page, pageSize, selectedCategory, selectedSort, selectedFromDate, selectedToDate]);

  return {
    selectedCategory,
    setSelectedCategory: (category: string) => setParams({ category }),
    selectedSort,
    setSelectedSort: (sortOrder: string) => setParams({ sortOrder }),
    selectedFromDate,
    setSelectedFromDate: (fromDate: string) => setParams({ fromDate }),
    selectedToDate,
    setSelectedToDate: (toDate: string) => setParams({ toDate }),
    page,
    setPage: (page: string) => setParams({ page }),
    pageSize,
  };
}

export default useNewsFilter;
