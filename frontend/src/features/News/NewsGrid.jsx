import { useQuery } from '@tanstack/react-query';
import { getNews } from '../../services/apiNews';
import Error from '../../components/Error';
import LoadingSpinner from '../../components/LoadingSpinner';
import NewsCard from './NewsCard';

function NewsGrid() {
  const { data, error, isLoading, isError } = useQuery(['rssnews'], getNews);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Error message={error.message} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 overflow">
      {data.data.rssNews.map((item, index) => (
        <NewsCard news={item} key={index} />
      ))}
    </div>
  );
}

export default NewsGrid;
