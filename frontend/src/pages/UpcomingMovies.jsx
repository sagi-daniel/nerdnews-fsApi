import Section from '../components/Section';
import MovieSlider from '../features/upcomingMovies/MovieSlider';

function UpcomingMovies() {
  return (
    <Section type="vertical">
      <h2>Mozi premierek:</h2>
      <MovieSlider />
    </Section>
  );
}

export default UpcomingMovies;
