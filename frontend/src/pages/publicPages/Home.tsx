import MovieSlider from '../../features/movies/MovieSlider';
import NewsSlider from '../../features/news/NewsSlider';
import NewsGrid from '../../features/news/NewsGrid';

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
