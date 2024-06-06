import { useQuery } from '@tanstack/react-query';
import { getTop3FreshNews } from '../../services/apiNews';
import Section from '../../components/Section';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';
import { formatDateIsoToNormal } from '../../utils/helpers';

function NewsGrid() {
  const { data, error, isLoading, isError } = useQuery(['News'], getTop3FreshNews);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <Section type="horizontal" space="small" gap="medium">
      <div className="relative flex flex-col h-56 md:h-full md:w-2/3 bg-black rounded-md">
        <div
          className={`flex flex-col opacity-70 justify-end h-96 bg-cover px-2 py-5 rounded-md`}
          style={{ backgroundImage: `url(${data.data.news[0].imageUrl})` }}
        ></div>

        <div className=" absolute bottom-4 left-4 text-white ">
          <h3 className="text-lg md:text-2xl font-semibold">{data.data.news[0].title}</h3>
          <p>
            <span>{formatDateIsoToNormal(data.data.news[0].release)}</span> |{' '}
            <span>{data.data.news[0].category.categoryName}</span>
          </p>
          <p className="text-sm md:text-2xl ">{data.data.news[0].content}</p>
        </div>
      </div>

      <div className=" flex flex-col gap-2 md:w-1/3 ">
        <div className="relative h-56 md:h-1/2 rounded-md bg-black">
          <div
            className={`flex flex-col opacity-50 justify-end h-full bg-cover px-2 py-5 rounded-md`}
            style={{ backgroundImage: `url(${data.data.news[1].imageUrl})` }}
          ></div>

          <div className=" absolute bottom-4 left-4 text-white ">
            <h3 className="text-lg font-semibold">{data.data.news[1].title}</h3>
            <p className="text-sm">
              <span>{formatDateIsoToNormal(data.data.news[1].release)}</span> |{' '}
              <span>{data.data.news[1].category.categoryName}</span>
            </p>
          </div>
        </div>
        <div className="relative h-56 md:h-1/2 rounded-md bg-black ">
          <div
            className={`flex flex-col opacity-30 justify-end h-full bg-cover px-2 py-5 rounded-md`}
            style={{ backgroundImage: `url(${data.data.news[2].imageUrl})` }}
          ></div>

          <div className=" absolute bottom-4 left-4 text-white ">
            <h3 className="text-lg font-semibold">{data.data.news[2].title}</h3>
            <p className="text-sm">
              <span>{formatDateIsoToNormal(data.data.news[2].release)}</span> |
              <span>{data.data.news[2].category.categoryName}</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default NewsGrid;
