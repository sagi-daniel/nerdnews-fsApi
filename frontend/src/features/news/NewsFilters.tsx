import CategoryFilter from '../../components/CategoryFilter';
import Sort from '../../components/Sort';
import DateRangeFilter from '../../components/DateRangfilter';

import { CATEGORY_COLORS } from '../../utils/constants';
import useNewsFilter from '../../hooks/useNewsFilter';

function NewsFilters() {
  const { category, sortOrder, fromDate, toDate } = useNewsFilter().params;
  const { setCategory, setSortOrder, setFromDate, setToDate } = useNewsFilter().setters;

  return (
    <div className="flex flex-col h-full md:w-1/6 md:h-full p-2 gap-2">
      <h1>Hírek</h1>
      <CategoryFilter categoryOptions={CATEGORY_COLORS} category={category} setCategory={setCategory} />
      <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <DateRangeFilter fromDate={fromDate} setFromDate={setFromDate} toDate={toDate} setToDate={setToDate} />
    </div>
  );
}

export default NewsFilters;
