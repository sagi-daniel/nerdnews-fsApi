import CategoryFilter from '../../components/CategoryFilter';
import Sort from '../../components/Sort';
import DateRangeFilter from '../../components/DateRangfilter';
import useNewsFilter from '../../hooks/useNewsFilter';
import { CATEGORY_COLORS } from '../../utils/constants';

function NewsFilters() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
    selectedFromDate,
    setSelectedFromDate,
    selectedToDate,
    setSelectedToDate,
  } = useNewsFilter();

  return (
    <div className="flex flex-col h-full md:w-1/6 md:h-96 p-2 gap-2">
      <h1>Hírek</h1>
      <CategoryFilter
        categoryOptions={CATEGORY_COLORS}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      <DateRangeFilter
        fromDate={selectedFromDate}
        setFromDate={setSelectedFromDate}
        toDate={selectedToDate}
        setToDate={setSelectedToDate}
      />
    </div>
  );
}

export default NewsFilters;
