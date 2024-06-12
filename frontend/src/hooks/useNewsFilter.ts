import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useNewsFilter() {
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParam = (param: string) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const setQueryParams = (params: { [key: string]: string }) => {
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

  const selectedCategory = getQueryParam('category') || 'TECH';
  const selectedSort = getQueryParam('sortOrder') || 'desc';
  const fromDate = getQueryParam('fromDate') || '';
  const toDate = getQueryParam('toDate') || '';

  const [dateRange, setDateRange] = useState<{ fromDate: string; toDate: string }>({
    fromDate,
    toDate,
  });

  useEffect(() => {
    setQueryParams({ category: selectedCategory, sortOrder: selectedSort });
  }, [selectedCategory, selectedSort]);

  useEffect(() => {
    setQueryParams({ fromDate: dateRange.fromDate, toDate: dateRange.toDate });
  }, [dateRange]);

  return {
    selectedCategory,
    setSelectedCategory: (category: string) => setQueryParams({ category }),
    selectedSort,
    setSelectedSort: (sortOrder: string) => setQueryParams({ sortOrder }),
    dateRange,
    setDateRange,
  };
}

export default useNewsFilter;
