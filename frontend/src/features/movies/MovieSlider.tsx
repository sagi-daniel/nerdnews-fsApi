import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../services/apiMovies';

import Error from '../../components/Error';
import MovieModal from './MovieModal';
import Slider from '../../components/parts/slider/Slider';
import MovieCard from './MovieCard';
import Section from '../../components/Section';
import MovieModel from '../../models/Movie.model';

import ImageSkeleton from '../../components/loaders/skeletons/ImageSkeleton';
import ListSkeleton from '../../components/loaders/skeletons/ListSkeleton';

function MovieSlider({ sliderLabel }: { sliderLabel: string }) {
  const { data, isLoading, error, isError } = useQuery(['Movie'], getMovies);
  const movies = data?.data?.movies;

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

  return (
    <Section type="vertical">
      <h2>{sliderLabel}</h2>
      {modalVisible && selectedMovie && <MovieModal closeModal={closeModal} movie={selectedMovie} />}
      <Slider moreLabel={'Még több mozifilm...'} morePath={'/movies'}>
        {isLoading && <ListSkeleton Child={ImageSkeleton} />}
        {isError && <Error message={(error as Error).message} />}
        {movies &&
          movies.map((movie: MovieModel) => <MovieCard key={movie._id} movie={movie} onClick={handlePosterClick} />)}
      </Slider>
    </Section>
  );
}

export default MovieSlider;
