import Section from '../components/Section';
import MovieSlider from '../features/movies/MovieSlider';

function UpcomingMovies() {
  return (
    <Section type="vertical">
      <MovieSlider sliderLabel="Mozi premierek:" />
    </Section>
  );
}

export default UpcomingMovies;
