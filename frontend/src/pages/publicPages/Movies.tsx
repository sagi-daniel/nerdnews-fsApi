import Section from '../../components/Section';
import MovieFilters from '../../features/movies/MovieFilters';
import MovieList from '../../features/movies/MovieList';

function Movies() {
  return (
    <Section type="horizontal" gap="small">
      <MovieFilters />
      <MovieList />
    </Section>
  );
}

export default Movies;
