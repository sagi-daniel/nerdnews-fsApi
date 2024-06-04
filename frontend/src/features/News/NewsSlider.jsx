import { useQuery } from '@tanstack/react-query';
import { getNews } from '../../services/apiNews';
import Slider from '../../components/parts/slider/Slider';
import NewsCard from './NewsCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';

function NewsSlider() {
  const { data, isLoading, error, isError } = useQuery(['rssNews'], getNews);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <Slider>
      {data.data.rssNews.map((news, index) => (
        <NewsCard key={index} news={news} />
      ))}
    </Slider>
  );
}

export default NewsSlider;