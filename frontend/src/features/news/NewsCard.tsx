import React from 'react';
import { formatDateIsoToNormal, truncateText } from '../../utils/helpers';
import { FiPlus } from 'react-icons/fi';
import Badge from '../../components/Badge';

type CategoryName = 'DEFAULT' | 'TECH' | 'CYBERSEC' | 'GAMING';

interface NewsCardProps {
  news: {
    imageUrl: string;
    title: string;
    category: {
      categoryName: CategoryName;
    };
    release: string;
    source: {
      sourceName: string;
    };
    content: string;
    link: string;
  };
}

function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="flex-[0_0_40%] sm:flex-[0_0_25%] lg:flex-[0_0_15%]">
      <div className="relative mx-1 flex flex-col justify-between max-w-sm bg-border-dark text-content-dark h-full w-80 rounded-md">
        <div className="flex flex-col justify-evenly">
          <img src={news.imageUrl} alt={news.title} className="h-48 object-cover rounded-t-md" />

          <div className="p-4">
            <div className="absolute top-2 right-1">
              <Badge categoryName={news.category.categoryName} />
            </div>

            <div className="flex justify-between items-center mb-4">
              <span>{formatDateIsoToNormal(news.release)}</span>
              <span>{news.source.sourceName}</span>
            </div>

            <h3 className="text-lg font-bold mt-1">{truncateText(news.title, 80)}</h3>
            <p className=" mt-2">{truncateText(news.content, 100)}</p>
          </div>
        </div>

        <div className="flex p-4">
          <div className="flex items-center gap-2">
            <a href={news.link} target="_blank" rel="noreferrer" className="btn-primary-sm inline-flex items-center">
              Elolvasom
            </a>
            <button className="inline-flex items-center cursor-pointer ">
              <FiPlus /> Elmentem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
