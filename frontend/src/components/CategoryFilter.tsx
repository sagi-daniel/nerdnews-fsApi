import { FilterOption, FilterName } from '../models/FiltersOption.model';
import Badge from './Badge';

interface CategoryFilterProps {
  categoryOptions: FilterOption[];
  category: string;
  setCategory: (category: FilterName) => void;
}

function CategoryFilter({ categoryOptions, category, setCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {categoryOptions.map((option) => (
        <Badge
          name={option.name}
          key={option.name}
          colorOptions={categoryOptions}
          type="BUTTON"
          isSelected={category === option.name}
          onClick={() => setCategory(option.name)}
        />
      ))}
    </div>
  );
}

export default CategoryFilter;
