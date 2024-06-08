import { useQuery } from '@tanstack/react-query';
import { getNews } from '../../services/apiNews';
import Slider from '../../components/parts/slider/Slider';
import NewsCard from './NewsCard';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import Section from '../../components/Section';
import NewsModel from '../../models/News.model';

function NewsSlider({ sliderLabel }: { sliderLabel: string }) {
  const { data, error, isLoading, isError } = useQuery(['Top3News'], getNews);
  const news: NewsModel[] | undefined = data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={(error as Error).message} />;
  }

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
