import useNewsData from '../../hooks/useNewsData';
import useNewsFilter from '../../hooks/useNewsFilter';
import Pagination from '../../components/Pagination';
import NewsCard from '../../features/news/NewsCard';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';

function NewsList() {
  const { page, setPage, pageSize } = useNewsFilter();

  const { data, error, isLoading, isError } = useNewsData();
  const news = data?.data.news;
  const totalItemes = data?.totalItems;

  return (
    <div className="flex flex-col md:w-5/6">
      <div className="flex justify-center flex-wrap gap-2 md:gap-5">
        {isLoading && <LoadingSpinner />}
        {isError && <Error message={error.message} />}
        {news && news.map((newsItem) => <NewsCard key={newsItem._id} news={newsItem} />)}
      </div>
      {totalItemes !== undefined && (
        <Pagination
          page={parseInt(page)}
          totalItems={totalItemes}
          itemsPerPage={parseInt(pageSize)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default NewsList;
