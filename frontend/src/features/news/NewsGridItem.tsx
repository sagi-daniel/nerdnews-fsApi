import Badge from '../../components/Badge';
import NewsModel from '../../models/News.model';
import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';

interface NewsGridItemProps {
  news?: NewsModel;
  highlighted?: boolean;
}

function NewsGridItem({ news, highlighted = false }: NewsGridItemProps) {
  let textStyle = 'text-lg';
  if (highlighted) textStyle = 'text-lg md:text-2xl';

  return (
    <a href={news?.link} rel="noreferrer" target="_blank" className="w-full h-full">
      <div
        className={`opacity-30 hover:opacity-40 justify-end h-full px-2 py-5 rounded-md bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110 z-[-999]`}
        style={{ backgroundImage: `url(${news?.imageUrl})` }}
      ></div>

      <div className="absolute bottom-4 left-4 ">
        <h3 className={`${textStyle} font-semibold`}>{news?.title}</h3>
        <p>
          <span>{formatDateIsoToNormal(news?.release)}</span> |{' '}
          <Badge categoryName={news?.category.categoryName} type="NORMAL" />
        </p>
        {highlighted && <p className="text-sm md:text-lg ">{truncateText(news?.content, 80)}</p>}
      </div>
    </a>
  );
}

export default NewsGridItem;
