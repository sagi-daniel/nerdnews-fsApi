import { useQuery } from '@tanstack/react-query';
import { getNews } from '../services/apiNews';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

import Section from '../components/Section';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import Error from '../components/Error';
import NewsModel from '../models/News.model';
import NewsCard from '../features/news/NewsCard';
import Filter from '../components/Filter';

function News() {
  const [selectedCategory, setSelectedCategory] = useLocalStorageState<string | null>('', 'selectedCategory');
  const { data, error, isLoading, isError } = useQuery(['news'], getNews);

  const news: NewsModel[] | undefined = data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={(error as Error).message} />;
  }

  return (
    <>
      <Section type="horizontal" gap="small">
        <div className="flex flex-col md:justify-start  md:w-1/6  md:h-96 p-2 gap-2">
          {/* TODO Category filter, Date filter, SortByDate */}
          <h1>Hírek</h1>
          <Filter setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="flex flex-col h-full md:w-5/6 ">
          <div className="flex justify-center flex-wrap gap-2 ">
            {news?.map((newsItem) => (
              <NewsCard key={newsItem._id} news={newsItem} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export default News;
