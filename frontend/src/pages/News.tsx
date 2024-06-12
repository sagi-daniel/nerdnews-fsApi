import Section from '../components/Section';
import useNewsData from '../hooks/useNewsData';
import NewsFilters from '../features/news/NewsFilters';
import NewsList from '../features/news/NewsList';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import Error from '../components/Error';

function News() {
  const { data, error, isLoading, isError } = useNewsData();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={error?.message} />;
  }

  return (
    <Section type="horizontal" gap="small">
      <NewsFilters />
      <NewsList data={data} />
    </Section>
  );
}

export default News;
