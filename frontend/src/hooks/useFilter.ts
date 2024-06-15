import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type Params = {
  [key: string]: string;
};

function useFilter(initialParams: Params) {
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParam = (param: string): string | null => new URLSearchParams(location.search).get(param);

  const setParams = (params: Params) => {
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

  const params: Params = {};
  Object.keys(initialParams).forEach((key) => {
    params[key] = getQueryParam(key) || initialParams[key];
  });

  useEffect(() => {
    setParams(params);
  }, [location.search]);

  const setters: { [key: string]: (value: string) => void } = {};
  Object.keys(initialParams).forEach((key) => {
    setters[`set${key.charAt(0).toUpperCase() + key.slice(1)}`] = (value: string) => setParams({ [key]: value });
  });

  return { params, setters };
}

export default useFilter;
