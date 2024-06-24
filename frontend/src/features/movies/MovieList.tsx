import { useState } from 'react';
import useMovieData from '../../hooks/useMovieData';
import useMovieFilter from '../../hooks/useMovieFilter';
import MovieModel from '../../models/Movie.model';
import Pagination from '../../components/Pagination';
import Error from '../../components/Error';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';

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

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <div className="flex flex-col md:w-5/6">
      <div className=" relative py-4 flex justify-center flex-wrap gap-4 ">
        {movies &&
          movies.map((movieItem: MovieModel) => (
            <MovieCard key={movieItem._id} movie={movieItem} onClick={handlePosterClick} />
          ))}
        {modalVisible && selectedMovie && <MovieModal closeModal={closeModal} movie={selectedMovie} />}
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
