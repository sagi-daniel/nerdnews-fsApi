import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/apiCategory';
import CategoryModel from '../models/CategoryModel';
import LoadingSpinner from './loaders/LoadingSpinner';
import Error from './Error';
import Badge from './Badge';

function CategoryFilter() {
  const { data, error, isLoading, isError } = useQuery<CategoryModel[], Error>(['categoryList'], getCategories);
  const categories = data;
  const navigate = useNavigate();

  const handleCategoryChange = (categoryName: string) => {
    const newUrl = categoryName ? `/news?category=${categoryName}` : '/news';
    navigate(newUrl);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={(error as Error).message} />;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <span
        className="bg-border-dark text-content-dark px-1 py-0.5 font-semibold rounded cursor-pointer"
        onClick={() => handleCategoryChange('')}
      >
        ALL
      </span>
      {categories?.map((category) => (
        <Badge
          key={category._id}
          categoryName={category.categoryName}
          type="NORMAL"
          classes="cursor-pointer"
          onClick={() => handleCategoryChange(category.categoryName)}
        />
      ))}
    </div>
  );
}

export default CategoryFilter;
