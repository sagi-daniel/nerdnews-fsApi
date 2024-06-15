import { useState } from 'react';
import useMovieData from '../../hooks/useMovieData';
import useMovieFilter from '../../hooks/useMovieFilter';
import MovieModel from '../../models/Movie.model';
import Pagination from '../../components/Pagination';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import Empty from '../../components/Empty';

function MovieList() {
  const { page, pageSize } = useMovieFilter().params;
  const { setPage } = useMovieFilter().setters;

  const { data, error, isLoading, isError } = useMovieData();
  const movies = data?.data.movies;
  const totalItemes = data?.totalItems;

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
    <div className="flex flex-col md:w-5/6">
      <div className="flex justify-center flex-wrap gap-2 md:gap-10">
        {modalVisible && selectedMovie && <MovieModal closeModal={closeModal} movie={selectedMovie} />}
        {isLoading && <LoadingSpinner />}
        {movies?.length === 0 && <Empty message="Nincs találat a megadott szűrési feltételekkel!" />}
        {isError && <Error message={error?.message || 'An error occurred'} />}
        {movies &&
          movies.map((movieItem: MovieModel) => (
            <MovieCard key={movieItem._id} movie={movieItem} onClick={handlePosterClick} />
          ))}
      </div>
      {totalItemes && (
        <Pagination
          page={parseInt(page)}
          totalItems={totalItemes}
          itemsPerPage={parseInt(pageSize)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default MovieList;
