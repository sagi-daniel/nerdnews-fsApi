import { useQuery } from '@tanstack/react-query';
import { getTop3FreshNews } from '../../services/apiNews';
import Section from '../../components/Section';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';
import NewsModel from '../../models/News.model';
import NewsGridItem from './NewsGridItem';

function NewsGrid() {
  const { data, error, isLoading, isError } = useQuery(['News'], getTop3FreshNews);
  const top3News: NewsModel[] | undefined = data?.data.news;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={(error as Error).message} />;
  }

  const firstNews: NewsModel | undefined = top3News?.[0];
  const secondNews: NewsModel | undefined = top3News?.[1];
  const thirdNews: NewsModel | undefined = top3News?.[2];

  return (
    <Section type="horizontal" space="small" gap="medium">
      <div className="relative overflow-hidden bg-bg-dark opacity-90 text-content-dark h-48 md:h-96 md:w-2/3 rounded-md">
        <NewsGridItem news={firstNews} highlighted={true} />
      </div>

      <div className=" flex flex-col gap-2 h-96 md:w-1/3 ">
        {secondNews && (
          <div className="relative overflow-hidden bg-bg-dark opacity-90 text-content-dark md:h-1/2 h-56 rounded-md">
            <NewsGridItem news={secondNews} highlighted={false} />
          </div>
        )}

        {thirdNews && (
          <div className="relative overflow-hidden bg-bg-dark opacity-90 text-content-dark md:h-1/2 h-56 rounded-md">
            <NewsGridItem news={thirdNews} highlighted={false} />
          </div>
        )}
      </div>
    </Section>
  );
}

export default NewsGrid;
