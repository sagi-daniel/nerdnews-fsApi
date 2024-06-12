import { useQuery } from '@tanstack/react-query';

import { getCategories } from '../services/apiCategory';
import CategoryModel from '../models/CategoryModel';
import LoadingSpinner from './loaders/LoadingSpinner';
import Error from './Error';
import Badge from './Badge';
import { useNavigate } from 'react-router-dom';

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (sortOrder: string) => void;
}

function CategoryFilter({ selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  const { data, error, isLoading, isError } = useQuery<CategoryModel[], Error>(['categoryList'], getCategories);

  const navigate = useNavigate();

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const params = new URLSearchParams(location.search);
    if (categoryName) {
      params.set('category', categoryName);
    } else {
      params.delete('category');
    }

    const newUrl = `${location.pathname}?${params.toString()}`.replace(/%2C/g, ',');
    navigate(newUrl);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={(error as Error).message} />;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        {data?.map((category) => (
          <Badge
            key={category._id}
            categoryName={category.categoryName}
            type="BUTTON"
            isSelected={selectedCategory === category.categoryName}
            onClick={() => handleCategoryChange(category.categoryName)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
