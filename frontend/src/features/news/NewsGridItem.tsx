import { CATEGORY_COLORS } from '../../utils/constants';
import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';
import Badge from '../../components/Badge';
import NewsModel from '../../models/News.model';
import useLoaderHook from '../../hooks/useLoaderHook';
import GridItemSkeleton from '../../components/loaders/skeletons/GridItemSkeleton';
import SaveLater from '../../components/SaveLater';

interface NewsGridItemProps {
  news: NewsModel;
  highlighted?: boolean;
  isLoading: boolean;
}

function NewsGridItem({ news, highlighted = false }: NewsGridItemProps) {
  const loaded = useLoaderHook(news.imageUrl);

  let textStyle = 'text-lg';
  if (highlighted) textStyle = 'text-lg md:text-2xl';

  if (!loaded) return <GridItemSkeleton />;

  return (
    <div className="relative overflow-hidden text-content-dark size-full rounded-md">
      <SaveLater itemId={news._id} type="news" />
      <a href={news?.link} rel="noreferrer" target="_blank">
        <div className="relative no-select size-full  ">
          <div className="relative no-select size-full ">
            <div
              className={`size-full select-none justify-end h-full px-2 py-5 rounded-md bg-cover bg-center ease-in-out hover:scale-105 transition-transform duration-500 `}
              style={{ backgroundImage: `url(${news.imageUrl})` }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 ">
          <h3 className={`${textStyle} font-semibold`}>{news?.title}</h3>
          <p>
            <span>{formatDateIsoToNormal(news?.release)}</span> |{' '}
            <Badge name={news.category.categoryName} type="THIN" colorOptions={CATEGORY_COLORS} />
          </p>
          {highlighted && <p className="text-sm md:text-lg ">{truncateText(news?.content, 80)}</p>}
        </div>
      </a>
    </div>
  );
}

export default NewsGridItem;
