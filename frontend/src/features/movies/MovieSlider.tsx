import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../services/apiMovies';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import MovieModal from './MovieModal';
import Slider from '../../components/parts/slider/Slider';
import MovieCard from './MovieCard';
import Section from '../../components/Section';
import MovieModel from '../../models/Movie.model';

function MovieSlider({ sliderLabel }: { sliderLabel: string }) {
  const { data, isLoading, error, isError } = useQuery(['upcomingmovie'], getMovies);
  const movies: MovieModel[] | undefined = data?.data?.movies;

  const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePosterClick = (movie: MovieModel) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalVisible(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <Error message={(error as Error).message} />;
  }

  return (
    <Section type="vertical">
      <h2>{sliderLabel}</h2>
      {modalVisible && selectedMovie && (
        <MovieModal
          closeModal={closeModal}
          title={selectedMovie.title}
          releaseDate={selectedMovie.release}
          overview={selectedMovie.overview}
        />
      )}

      <Slider moreLabel={'Még több mozifilm...'} morePath={'/movies'}>
        {movies?.map((movie: MovieModel) => (
          <MovieCard key={movie._id} movie={movie} onClick={handlePosterClick} />
        ))}
      </Slider>
    </Section>
  );
}

export default MovieSlider;
