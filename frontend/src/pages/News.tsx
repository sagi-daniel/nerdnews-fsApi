import { useQuery } from '@tanstack/react-query';
import { getNewsByQuery } from '../services/apiNews';

import NewsModel from '../models/News.model';

import Section from '../components/Section';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import Error from '../components/Error';
import NewsCard from '../features/news/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import Sort from '../components/Sort';
import DateRangeFilter from '../components/DateRangfilter';
import useNewsFilter from '../hooks/useNewsFilter';
import Empty from '../components/Empty';

function News() {
  const { selectedCategory, setSelectedCategory, selectedSort, setSelectedSort, dateRange, setDateRange } =
    useNewsFilter();

  const { data, error, isLoading, isError } = useQuery<NewsModel[], Error>(
    ['NewsByCategory', selectedCategory, selectedSort, dateRange.fromDate, dateRange.toDate],
    () => getNewsByQuery(selectedCategory, selectedSort, dateRange.fromDate, dateRange.toDate)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={error?.message} />;
  }

  return (
    <>
      <Section type="horizontal" gap="small">
        <div className="flex flex-col h-full md:w-1/6 md:h-96 p-2 gap-2">
          <h1>Hírek</h1>
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
          <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange} />
        </div>
        <div className="flex flex-col h-full md:w-5/6">
          <div className="flex justify-center flex-wrap gap-2">
            {data.length === 0 && <Empty message="Nincs megjeleníthető találat!" />}
            {data && data?.map((newsItem) => <NewsCard key={newsItem._id} news={newsItem} />)}
          </div>
        </div>
      </Section>
    </>
  );
}

export default News;
