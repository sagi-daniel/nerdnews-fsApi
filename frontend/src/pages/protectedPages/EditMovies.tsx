import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMovie } from '../../services/apiMovies';
import { GENRE_COLORS } from '../../utils/constants';
import MovieModel from '../../models/Movie.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import toast from 'react-hot-toast';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';
import useMovieFilter from '../../hooks/useMovieFilter';
import SearchBar from '../../components/SearchBar';
import DateRangeFilter from '../../components/form-ui/DateRangfilter';
import CategoryFilter from '../../components/CategoryFilter';
import Sort from '../../components/Sort';
import MovieForm from '../../components/forms/MovieForm';
import MoviesTable from '../../components/tables/MoviesTable';
import useMoviesData from '../../hooks/useMovieData';

function EditMovies() {
  const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [moiveIdToDelete, setMovieIdToDelete] = useState<string | null>(null);

  const { params, setters } = useMovieFilter();

  const { data, error, isLoading, isError } = useMoviesData();
  const movies = data?.data.movies;
  const totalItems = data?.totalItems;

  const queryClient = useQueryClient();

  const { mutate: deleteMovieMutate } = useMutation(deleteMovie, {
    onSuccess: () => {
      toast.success(`Film törölve!`);
      queryClient.invalidateQueries(['movieByQuery']);
    },
  });

  function handleUpdate(movie: MovieModel) {
    setSelectedMovie(movie);
    setModalVisible(true);
  }

  function handleDelete(movieId: string) {
    setMovieIdToDelete(movieId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (moiveIdToDelete) {
      deleteMovieMutate(moiveIdToDelete);
      setConfirmationVisible(false);
      setMovieIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setMovieIdToDelete(null);
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex flex-col gap-2 my-10">
      <div className="flex justify-start space-x-2">
        <CategoryFilter categoryOptions={GENRE_COLORS} category={params.genre} setCategory={setters.setGenre} />
      </div>
      <div className="flex items-center space-x-2 ">
        <div className="w-1/3">
          <Sort sortOrder={params.sortOrder} setSortOrder={setters.setSortOrder} />
        </div>

        <div className="w-2/3 ">
          <DateRangeFilter
            fromDate={params.fromDate}
            setFromDate={setters.setFromDate}
            toDate={params.toDate}
            setToDate={setters.setToDate}
            divClasses="flex space-x-2"
          />
        </div>
      </div>

      {movies && <MoviesTable movies={movies} onEdit={handleUpdate} onDelete={handleDelete} />}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2> {selectedMovie ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <MovieForm movie={selectedMovie} setModalVisible={setModalVisible} />
        </Modal>
      )}
      {totalItems > 0 && (
        <Pagination
          page={parseInt(params.page)}
          totalItems={totalItems}
          itemsPerPage={parseInt(params.pageSize)}
          onPageChange={(page) => setters.setPage(page)}
        />
      )}
      <Modal isOpen={confirmationVisible} setIsOpen={setConfirmationVisible}>
        <Alert
          alertIcon="error"
          alertMessage="Biztosan törölni szeretné a filmet?"
          buttonText="Mégsem"
          buttonStyle="neutral"
          buttonAction={cancelDelete}
          confrimText="Töröl"
          confrimStyle="delete"
          confirmAction={confirmDelete}
        />
      </Modal>
    </div>
  );
}

export default EditMovies;
