import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../utils/constants';
import useLoaderHook from '../../hooks/useLoaderHook';
import Badge from '../../components/Badge';
import NewsModel from '../../models/News.model';
import ImageLoader from '../../components/loaders/ImageLoader';
import NewsCardSkeleton from '../../components/loaders/skeletons/NewsCardSkeleton';

interface NewsCardProps {
  news: NewsModel;
}

function NewsCard({ news }: NewsCardProps) {
  const loaded = useLoaderHook(news.imageUrl);

  if (!loaded) return <NewsCardSkeleton />;

  return (
    <div className="mx-1 hover-outline-highlight cursor-pointer flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%]">
      <a href={news.link} rel="noreferrer" target="_blank">
        <div className=" flex flex-col justify-between max-w-sm bg-border-dark text-content-dark h-full w-80 rounded-md">
          <div className="relative flex flex-col justify-evenly">
            <ImageLoader
              src={news.imageUrl}
              alt={news.title}
              classes="h-48 object-cover rounded-t-md"
              rounded={false}
            />
            <div className="p-4">
              <div className="absolute top-2 right-1">
                <Badge name={news.category.categoryName} colorOptions={CATEGORY_COLORS} />
              </div>

              <div className="flex justify-between items-center mb-4">
                <span>{formatDateIsoToNormal(news.release)}</span>
                <span>{news.source.sourceName}</span>
              </div>

              <h3 className="text-lg font-bold mt-1">{truncateText(news.title, 80)}</h3>
              <p className="mt-2">{truncateText(news.content, 100)}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default NewsCard;
