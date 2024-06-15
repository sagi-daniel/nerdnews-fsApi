import CategoryFilter from '../../components/CategoryFilter';
import Sort from '../../components/Sort';
import DateRangeFilter from '../../components/DateRangfilter';
import useMovieFilter from '../../hooks/useMovieFilter';
import { GENRE_COLORS } from '../../utils/constants';

function MovieFilters() {
  const { genre, sortOrder, fromDate, toDate } = useMovieFilter().params;
  const { setGenre, setSortOrder, setFromDate, setToDate } = useMovieFilter().setters;

  return (
    <div className="flex flex-col  h-full md:w-1/6 md:h-full p-2 gap-2">
      <h1>Filmek</h1>
      <CategoryFilter categoryOptions={GENRE_COLORS} category={genre} setCategory={setGenre} />
      <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <DateRangeFilter fromDate={fromDate} toDate={toDate} setToDate={setToDate} setFromDate={setFromDate} />
    </div>
  );
}

export default MovieFilters;
