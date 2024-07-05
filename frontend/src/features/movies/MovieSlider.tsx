import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../services/apiMovies';
import Error from '../../components/Error';
import MovieDetails from './MovieDetails';
import Slider from '../../components/parts/slider/Slider';
import MovieCard from './MovieCard';
import Section from '../../components/Section';
import MovieModel from '../../models/Movie.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Modal from '../../components/Modal';

function MovieSlider({ sliderLabel }: { sliderLabel: string }) {
  const { data: movies, isLoading, error, isError } = useQuery(['sliderMovies'], getMovies);

  const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePosterClick = (movie: MovieModel) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <Section type="vertical">
      <h2>{sliderLabel}</h2>

      <Slider moreLabel={'Még több mozifilm...'} morePath={'/movies'}>
        {movies &&
          movies.map((movie: MovieModel) => <MovieCard key={movie._id} movie={movie} onClick={handlePosterClick} />)}
      </Slider>
      <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
        {selectedMovie && <MovieDetails movie={selectedMovie} />}
      </Modal>
    </Section>
  );
}

export default MovieSlider;
