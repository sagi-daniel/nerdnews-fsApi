import { useState, useEffect } from 'react';
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

  const selectedCategory = getQueryParam('category') || 'TECH';
  const selectedSort = getQueryParam('sortOrder') || 'desc';

  // Kezdeti érték beállítása az előző 30 napra
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  const initialFromDate = getQueryParam('fromDate') || startDate.toISOString().split('T')[0];
  const initialToDate = getQueryParam('toDate') || new Date().toISOString().split('T')[0];

  const [fromDate, setFromDate] = useState<string>(initialFromDate);
  const [toDate, setToDate] = useState<string>(initialToDate);

  useEffect(() => {
    setParams({ category: selectedCategory, sortOrder: selectedSort });
  }, [selectedCategory, selectedSort]);

  useEffect(() => {
    setParams({ fromDate, toDate });
  }, [fromDate, toDate]);

  return {
    selectedCategory,
    setSelectedCategory: (category: string) => setParams({ category }),
    selectedSort,
    setSelectedSort: (sortOrder: string) => setParams({ sortOrder }),
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  };
}

export default useNewsFilter;
