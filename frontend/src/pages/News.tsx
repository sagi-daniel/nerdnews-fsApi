import { useQuery } from '@tanstack/react-query';
import Badge from '../components/Badge';
import Section from '../components/Section';
import CategoryModel from '../models/CategoryModel';
import { getCategories } from '../services/apiCategory';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import Error from '../components/Error';

interface Cards {
  _id: string;
  name: string;
}

const cards: Cards[] = [
  { _id: 'ddsdsdsdsdsdsd', name: 'hír1' },
  { _id: 'ddsdsdsdsdse', name: 'hír2' },
  { _id: 'ddsdsdsdsded', name: 'hír3' },
];

function News() {
  const { data, error, isLoading, isError } = useQuery(['categories'], getCategories);
  console.log(data);
  const categories: CategoryModel[] | undefined = data;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={(error as Error).message} />;
  }

  return (
    <>
      <Section type="horizontal">
        <div className="flex md:flex-col md:w-1/6 border border-red-600">
          {/* TODO Category filter, Date filter */}
          <h2>Filter:</h2>
          <div className="flex md:flex-col gap-1 ">
            {categories?.map((category) => (
              <Badge key={category._id} categoryName={category.categoryName} type="EXTRA" />
            ))}
          </div>
        </div>
        <div className="flex flex-col  h-full md:w-5/6 border border-red-600">
          <h2>Cards:</h2>
          <div className="flex gap-5">
            {cards.map((card) => (
              <div key={card._id}>{card.name}</div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export default News;
