import { useState } from 'react';
import useMovieData from '../../hooks/useMovieData';
import useMovieFilter from '../../hooks/useMovieFilter';
import MovieModel from '../../models/Movie.model';
import Pagination from '../../components/Pagination';
import ErrorMessage from '../../components/ErrorMessage';
import MovieCard from './MovieCard';
import MovieModal from './MovieDetails';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Modal from '../../components/Modal';

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

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex flex-col justify-between md:w-5/6 ">
      <div className=" relative py-4 flex justify-center flex-wrap gap-4 ">
        {movies &&
          movies.map((movieItem: MovieModel) => (
            <MovieCard key={movieItem._id} movie={movieItem} onClick={handlePosterClick} />
          ))}
        {isLoading && <LoadingSpinner />}
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          {selectedMovie && <MovieModal movie={selectedMovie} />}
        </Modal>
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
