// import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../services/apiMovies';
import { useState } from 'react';
import MovieModel from '../models/Movie.model';
import MovieModal from '../features/movies/MovieModal';
import Section from '../components/Section';
import MovieCard from '../features/movies/MovieCard';
import LoadingSpinner from '../components/loaders/LoadingSpinner';
import Error from '../components/Error';

function UpcomingMovies() {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const searchParams = new URLSearchParams(location.search);
  // const category = searchParams.get('category');
  // const sortOrder = searchParams.get('sortOrder');

  const { data, error, isLoading, isError } = useQuery<MovieModel[], Error>(['NewsByCategory'], getMovies);

  // const handleSortChange = (newSortOrder: string) => {
  //   const params = new URLSearchParams(location.search);
  //   if (newSortOrder) {
  //     params.set('sortOrder', newSortOrder);
  //   } else {
  //     params.delete('sortOrder');
  //   }
  //   navigate(`${location.pathname}?${params.toString()}`);
  // };

  // const movies: MovieModel[] | undefined = data;

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
    return <Error message={error?.message} />;
  }

  return (
    <>
      <Section type="horizontal" gap="small">
        <div className="flex flex-col md:w-1/6 md:h-96 p-2 gap-2">
          <h1>Filmek</h1>
          {/* <Sort onSort={handleSortChange} />
          <CategoryFilter /> */}
        </div>
        {modalVisible && selectedMovie && <MovieModal closeModal={closeModal} movie={selectedMovie} />}
        <div className="flex flex-col h-full md:w-5/6">
          <div className="flex justify-center flex-wrap gap-2">
            {data?.map((movieItem) => (
              <MovieCard key={movieItem._id} movie={movieItem} onClick={handlePosterClick} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

export default UpcomingMovies;
