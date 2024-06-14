import Badge from '../../components/Badge';
import GridItemImageLoader from '../../components/loaders/GridItemImageLoader';
import NewsModel from '../../models/News.model';
import { CATEGORY_COLORS } from '../../utils/constants';
import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';

interface NewsGridItemProps {
  news: NewsModel;
  highlighted?: boolean;
}

function NewsGridItem({ news, highlighted = false }: NewsGridItemProps) {
  let textStyle = 'text-lg';
  if (highlighted) textStyle = 'text-lg md:text-2xl';

  return (
    <a href={news?.link} rel="noreferrer" target="_blank" className="size-full">
      <GridItemImageLoader src={news?.imageUrl} />
      <div className="absolute bottom-4 left-4 ">
        <h3 className={`${textStyle} font-semibold`}>{news?.title}</h3>
        <p>
          <span>{formatDateIsoToNormal(news?.release)}</span> |{' '}
          <Badge name={news.category.categoryName} type="THIN" colorOptions={CATEGORY_COLORS} />
        </p>
        {highlighted && <p className="text-sm md:text-lg ">{truncateText(news?.content, 80)}</p>}
      </div>
    </a>
  );
}

export default NewsGridItem;
