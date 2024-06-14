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

  const selectedGenre = getQueryParam('genre') || 'ALL';
  const selectedSort = getQueryParam('sortOrder') || 'desc';

  // Get current year dynamically
  const currentYear = new Date().getFullYear();

  // Set default fromDate to January 1st of the current year
  const defaultFromDate = `${currentYear}-01-01`;

  // Set default toDate to December 31st of the current year
  const defaultToDate = `${currentYear}-12-31`;

  // Initialize state with default values
  const [fromDate, setFromDate] = useState<string>(defaultFromDate);
  const [toDate, setToDate] = useState<string>(defaultToDate);

  // Effect to update URL params when fromDate or toDate changes
  useEffect(() => {
    setParams({ genre: selectedGenre, sortOrder: selectedSort, fromDate, toDate });
  }, [selectedGenre, selectedSort, fromDate, toDate]);

  return {
    selectedGenre,
    setSelectedGenre: (genre: string) => setParams({ genre }),
    selectedSort,
    setSelectedSort: (sortOrder: string) => setParams({ sortOrder }),
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  };
}

export default useNewsFilter;
