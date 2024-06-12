import CategoryFilter from '../../components/CategoryFilter';
import Sort from '../../components/Sort';
import DateRangeFilter from '../../components/DateRangfilter';
import useNewsFilter from '../../hooks/useNewsFilter';

function NewsFilters() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
  } = useNewsFilter();

  return (
    <div className="flex flex-col h-full md:w-1/6 md:h-96 p-2 gap-2">
      <h1>Hírek</h1>
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      <DateRangeFilter fromDate={fromDate} toDate={toDate} setToDate={setToDate} setFromDate={setFromDate} />
    </div>
  );
}

export default NewsFilters;
