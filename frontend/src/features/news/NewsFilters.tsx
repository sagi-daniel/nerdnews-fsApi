import CategoryFilter from '../../components/CategoryFilter';
import Sort from '../../components/Sort';
import DateRangeFilter from '../../components/form-ui/DateRangfilter';

import { CATEGORY_COLORS } from '../../utils/constants';
import useNewsFilter from '../../hooks/useNewsFilter';
import ShowSavedNewsFilter from '../../components/ShowSavedNewsFilter';

function NewsFilters() {
  const { params, setters } = useNewsFilter();

  return (
    <div className="flex flex-col h-full md:w-1/6 md:h-full gap-4  ">
      <h1>Hírek</h1>
      <CategoryFilter categoryOptions={CATEGORY_COLORS} category={params.category} setCategory={setters.setCategory} />
      <ShowSavedNewsFilter />
      <Sort sortOrder={params.sortOrder} setSortOrder={setters.setSortOrder} />
      <DateRangeFilter
        fromDate={params.fromDate}
        setFromDate={setters.setFromDate}
        toDate={params.toDate}
        setToDate={setters.setToDate}
        divClasses="flex w-full md:w-full md:mb-3 md:flex-col mb-3 md:space-x-0 space-x-2 rounded-md"
      />
    </div>
  );
}

export default NewsFilters;
