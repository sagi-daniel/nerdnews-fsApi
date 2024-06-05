import { Link } from 'react-router-dom';
import Section from '../components/Section';
import MovieSlider from '../features/upcomingMovies/MovieSlider';
import NewsSlider from '../features/News/NewsSlider';

function Home() {
  return (
    <>
      <Section type="vertical">
        <h2>Legújabb Hírek</h2>
        <NewsSlider />
      </Section>

      <Section type="vertical">
        <h2>Közelgő Mozifilmek</h2>
        <MovieSlider />
      </Section>
    </>
  );
}

export default Home;
