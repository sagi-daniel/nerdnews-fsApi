import useNewsData from '../../hooks/useNewsData';
import useNewsFilter from '../../hooks/useNewsFilter';
import Pagination from '../../components/Pagination';
import NewsCard from '../../features/news/NewsCard';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import Empty from '../../components/Empty';

function NewsList() {
  const { page, pageSize } = useNewsFilter().params;
  const { setPage } = useNewsFilter().setters;

  const { data, error, isLoading, isError } = useNewsData();
  const news = data?.data.news;
  const totalItems = data?.totalItems;

  return (
    <div className="flex flex-col md:w-5/6">
      <div className="flex justify-center flex-wrap gap-2 md:gap-5">
        {isLoading && <LoadingSpinner />}
        {news?.length === 0 && <Empty message="Nincs találat a megadott szűrési feltételekkel!" />}
        {isError && <Error message={error?.message || 'An error occurred'} />}
        {news && news.length > 0 && news.map((newsItem) => <NewsCard key={newsItem._id} news={newsItem} />)}
      </div>
      {totalItems && (
        <Pagination
          page={parseInt(page)}
          totalItems={totalItems}
          itemsPerPage={parseInt(pageSize)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default NewsList;
