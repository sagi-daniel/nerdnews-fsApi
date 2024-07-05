import { useQuery } from '@tanstack/react-query';
import { getTop3FreshNews } from '../../services/apiNews';
import Section from '../../components/Section';
import Error from '../../components/Error';
import NewsGridItem from './NewsGridItem';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

function NewsGrid() {
  const { data: top3News, error, isLoading, isError } = useQuery(['getTop3FreshNews'], getTop3FreshNews);

  const firstNews = top3News?.[0];
  const secondNews = top3News?.[1];
  const thirdNews = top3News?.[2];

  return (
    <Section type="horizontal" space="small" gap="medium">
      <div className="relative h-56 md:h-96 md:w-2/3  ">
        {isLoading && <LoadingSpinner />}
        {isError && <Error message={(error as Error).message} />}
        {firstNews && <NewsGridItem news={firstNews} highlighted={true} isLoading={isLoading} />}
      </div>

      <div className=" flex flex-col gap-2 h-96 md:w-1/3 ">
        <div className=" md:h-1/2 h-56 rounded-md">
          {isLoading && <LoadingSpinner />}
          {isError && <Error message={(error as Error).message} />}
          {secondNews && <NewsGridItem news={secondNews} highlighted={false} isLoading={isLoading} />}
        </div>

        <div className="md:h-1/2 h-56 rounded-md">
          {isLoading && <LoadingSpinner />}
          {isError && <Error message={(error as Error).message} />}
          {thirdNews && <NewsGridItem news={thirdNews} highlighted={false} isLoading={isLoading} />}
        </div>
      </div>
    </Section>
  );
}

export default NewsGrid;
