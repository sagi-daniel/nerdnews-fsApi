import { useQuery } from '@tanstack/react-query';
import { sliderNews } from '../../services/apiNews';
import Slider from '../../components/parts/slider/Slider';
import NewsCard from './NewsCard';
import Section from '../../components/Section';
import NewsModel from '../../models/News.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/ErrorMessage';

function NewsSlider({ sliderLabel }: { sliderLabel: string }) {
  const { data: news, error, isLoading, isError } = useQuery(['sliderNews'], sliderNews);

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <Section type="vertical">
      <h2>{sliderLabel}</h2>
      <Slider moreLabel={'Még több hír...'} morePath={'/news'}>
        {news?.map((news: NewsModel) => (
          <NewsCard key={news._id} news={news} />
        ))}
      </Slider>
    </Section>
  );
}

export default NewsSlider;
