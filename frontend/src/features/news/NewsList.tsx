import useNewsData from '../../hooks/useNewsData';
import useNewsFilter from '../../hooks/useNewsFilter';
import Pagination from '../../components/Pagination';
import NewsCard from '../../features/news/NewsCard';
import Error from '../../components/Error';

import NewsModel from '../../models/News.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

function NewsList() {
  const { page, pageSize } = useNewsFilter().params;
  const { setPage } = useNewsFilter().setters;

  const { data, error, isLoading, isError } = useNewsData();
  const news = data?.data.news;
  const totalItems = data?.totalItems;

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <div className="flex flex-col md:w-5/6">
      <div className="flex justify-center flex-wrap gap-2 md:gap-5">
        {news && news.map((newsItem: NewsModel) => <NewsCard key={newsItem._id} news={newsItem} />)}
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
