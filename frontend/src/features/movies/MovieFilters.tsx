import { GENRE_COLORS } from '../../utils/constants';
import CategoryFilter from '../../components/CategoryFilter';
import SearchBar from '../../components/SearchBar';
import Sort from '../../components/Sort';
import DateRangeFilter from '../../components/form-ui/DateRangfilter';
import useMovieFilter from '../../hooks/useMovieFilter';

function MovieFilters() {
  const { params, setters } = useMovieFilter();

  return (
    <div className="flex flex-col  h-full md:w-1/6 md:h-full p-2 gap-2">
      <h1>Filmek</h1>
      <SearchBar searchText={params.searchText} setSearchText={setters.setSearchText} />
      <CategoryFilter categoryOptions={GENRE_COLORS} category={params.genre} setCategory={setters.setGenre} />
      <Sort sortOrder={params.sortOrder} setSortOrder={setters.setSortOrder} />
      <DateRangeFilter
        fromDate={params.fromDate}
        toDate={params.toDate}
        setToDate={setters.setToDate}
        setFromDate={setters.setFromDate}
      />
    </div>
  );
}

export default MovieFilters;
