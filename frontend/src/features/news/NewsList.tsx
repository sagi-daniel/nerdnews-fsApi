import NewsCard from '../../features/news/NewsCard';
import Empty from '../../components/Empty';
import NewsModel from '../../models/News.model';

function NewsList({ data }: { data: NewsModel[] }) {
  return (
    <div className="flex flex-col h-full md:w-5/6">
      <div className="flex justify-center flex-wrap gap-2 md:gap-5">
        {data.length === 0 && <Empty message="Nincs megjeleníthető találat!" />}
        {data && data?.map((newsItem) => <NewsCard key={newsItem._id} news={newsItem} />)}
      </div>
    </div>
  );
}

export default NewsList;
