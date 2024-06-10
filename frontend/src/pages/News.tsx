import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { getNewsByCategory } from '../services/apiNews';

import Section from '../components/Section';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import Error from '../components/Error';
import NewsCard from '../features/news/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import Sort from '../components/Sort';
import NewsModel from '../models/News.model';

function News() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const sortOrder = searchParams.get('sortOrder');

  const { data, error, isLoading, isError } = useQuery<NewsModel[], Error>(
    ['NewsByCategory', category, sortOrder],
    () => getNewsByCategory(category, sortOrder)
  );

  const handleSortChange = (newSortOrder: string) => {
    const params = new URLSearchParams(location.search);
    if (newSortOrder) {
      params.set('sortOrder', newSortOrder);
    } else {
      params.delete('sortOrder');
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={error?.message} />;
  }

  return (
    <>
      <Section type="horizontal" gap="small">
        <div className="flex flex-col md:w-1/6 md:h-96 p-2 gap-2">
          <h1>Hírek</h1>
          <Sort onSort={handleSortChange} />
          <CategoryFilter />
        </div>
        <div className="flex flex-col h-full md:w-5/6">
          <div className="flex justify-center flex-wrap gap-2">
            {data?.map((newsItem) => (
              <NewsCard key={newsItem._id} news={newsItem} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export default News;
