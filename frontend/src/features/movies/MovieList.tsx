import { useState } from 'react';
import MovieModel from '../../models/Movie.model';
import Empty from '../../components/Empty';
import useMovieData from '../../hooks/useMovieData';
import Pagination from '../../components/Pagination';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

function MovieList() {
  const [currentPage, setCurrentPage] = useState('1');
  const itemsPerPage = 10;

  const { data, error, isLoading, isError } = useMovieData(currentPage, itemsPerPage.toString());
  const movies = data?.data?.movies;
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page.toString());
  };

  return (
    <div className="flex flex-col md:w-5/6">
      <div className="relative flex justify-center flex-wrap gap-2 md:gap-5">
        {modalVisible && selectedMovie && <MovieModal closeModal={closeModal} movie={selectedMovie} />}
        {isLoading && <LoadingSpinner />}
        {isError && <Error message={error.message} />}
        {!movies && <Empty message="Nincs megjeleníthető találat!" />}
        {movies &&
          movies.map((movieItem: MovieModel) => (
            <MovieCard key={movieItem._id} movie={movieItem} onClick={handlePosterClick} />
          ))}
      </div>
      {totalItemes && (
        <div className="flex justify-center items-center mt-4 ">
          <Pagination totalItems={totalItemes} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}

export default MovieList;
