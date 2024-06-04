import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../services/apiUpcomingMovies';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';
import MovieModal from './MovieModal';
import Slider from '../../components/parts/slider/Slider';
import MovieCard from './MovieCard';

function MovieSlider() {
  const { data, isLoading, error, isError } = useQuery(['upcomingmovie'], getMovies);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePosterClick = (movie) => {
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
    return <Error message={error.message} />;
  }

  return (
    <>
      {modalVisible && selectedMovie && (
        <MovieModal
          closeModal={closeModal}
          title={selectedMovie.title}
          releaseDate={selectedMovie.release}
          overview={selectedMovie.overview}
        />
      )}

      <Slider>
        {data.data.movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} onClick={handlePosterClick} />
        ))}
      </Slider>
    </>
  );
}

export default MovieSlider;
