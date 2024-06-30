import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../utils/constants';
import Badge from '../../components/Badge';
import NewsModel from '../../models/News.model';
import useLoaderHook from '../../hooks/useLoaderHook';
import NewsCardSkeleton from '../../components/loaders/skeletons/NewsCardSkeleton';
import SaveLater from '../../components/SaveLater';

interface NewsCardProps {
  news: NewsModel;
}

function NewsCard({ news }: NewsCardProps) {
  const loaded = useLoaderHook(news.imageUrl);

  if (!loaded) return <NewsCardSkeleton />;

  return (
    <div className="relative mx-1 flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%] ">
      <div className=" cursor-pointer flex flex-col justify-between max-w-sm bg-border-dark text-content-dark h-full w-80 rounded-md">
        <SaveLater itemId={news._id} type="news" />
        <a href={news.link} rel="noreferrer" target="_blank">
          <div className="relative flex flex-col justify-evenly overflow-hidden">
            <div className={`h-48 relative size-full no-select z-1 overflow-hidden rounded-t-md`}>
              <div
                className={`size-full select-none justify-end px-2 py-5 rounded-t-md bg-cover bg-center ease-in-out hover:scale-110 transition-transform duration-500 `}
                style={{ backgroundImage: `url(${news.imageUrl})` }}
              />
            </div>
            <div className="p-4">
              <div className="absolute top-2 right-1">
                <Badge name={news.category.categoryName} colorOptions={CATEGORY_COLORS} />
              </div>

              <div className="flex justify-between items-center mb-4">
                <span>{formatDateIsoToNormal(news.release)}</span>
                <span>{news.source.sourceName}</span>
              </div>

              <h3 className="text-lg font-bold mt-1">{truncateText(news.title, 80)}</h3>
              <p className="mt-2">{truncateText(news.content, 80)}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
