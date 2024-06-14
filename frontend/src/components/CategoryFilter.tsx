import { FilterOption, FilterName } from '../models/FiltersOption.model';
import Badge from './Badge';

interface CategoryFilterProps {
  categoryOptions: FilterOption[];
  selectedCategory: string;
  setSelectedCategory: (category: FilterName) => void;
}

function CategoryFilter({ categoryOptions, selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {categoryOptions.map((option) => (
        <Badge
          name={option.name}
          key={option.name}
          colorOptions={categoryOptions}
          type="BUTTON"
          isSelected={selectedCategory === option.name}
          onClick={() => setSelectedCategory(option.name)}
        />
      ))}
    </div>
  );
}

export default CategoryFilter;
