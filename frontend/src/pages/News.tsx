import Section from '../components/Section';
import NewsFilters from '../features/news/NewsFilters';
import NewsList from '../features/news/NewsList';

function News() {
  return (
    <Section type="horizontal" gap="small">
      <NewsFilters />
      <NewsList />
    </Section>
  );
}

export default News;
