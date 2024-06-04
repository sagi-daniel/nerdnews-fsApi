import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';

import { FiPlus } from 'react-icons/fi';

function NewsCard({ news }) {
  return (
    <div className="flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%]">
      <div className="relative flex flex-col justify-between max-w-sm bg-border-dark text-content-dark h-full w-80 rounded-md">
        <div className="flex flex-col justify-evenly">
          <img src={news.imageUrl} alt={news.title} className="h-48 object-cover rounded-t-md" />

          <div className="p-2">
            <span className="bg-bg-dark p-1 rounded-md">{formatDateIsoToNormal(news.release)}</span>
            <span className="absolute top-2 right-2 bg-secondary text-secondary-content px-4 py-2 text-lg font-semibold rounded">
              {news.category.categoryName}
            </span>

            <h3 className="text-lg font-bold mt-1">{truncateText(news.title, 80)}</h3>
            <p className=" mt-2">{truncateText(news.contentSnippet, 100)}</p>
          </div>
        </div>

        <div className="flex p-2">
          <div className="w-5/6 flex gap-2">
            <a href={news.link} target="_blank" rel="noreferrer" className="btn-primary-sm inline-flex items-center">
              Elolvasom
            </a>
            <button className="inline-flex items-center cursor-pointer ">
              <FiPlus /> Elmentem
            </button>
          </div>
          <div className="w-1/6">
            <img src="./assets/logo/logo-dark.svg" alt="Source Logo" className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
