import MovieSlider from '../features/upcomingMovies/MovieSlider';
import NewsSlider from '../features/News/NewsSlider';
import NewsGrid from '../features/News/NewsGrid';

function Home() {
  return (
    <>
      <NewsGrid />
      <NewsSlider sliderLabel="Legújabb Hírek" />
      <MovieSlider sliderLabel="Közelgő Mozifilmek" />
    </>
  );
}

export default Home;
