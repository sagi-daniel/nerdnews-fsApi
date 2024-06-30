import { useState } from 'react';
import { formatDateIsoToNormal } from '../../utils/helpers';
import { useUser } from '../../context/UserContext';
import Table, { Column } from '../../components/Table';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import FormModal from '../../components/Modal';
import MovieModel from '../../models/Movie.model';

const moviesColumns: Column<MovieModel>[] = [
  { key: 'release', label: 'Megjelenés', formatter: formatDateIsoToNormal },
  { key: 'title', label: 'Cím' },
  { key: 'genre', label: 'Műfaj' },
  { key: 'poster', label: 'Poszter' },
];

function MyMovies() {
  const { movies, removeFromMyMovies, isLoading } = useUser();

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState<string | null>(null);

  function handleDelete(movieId: string) {
    setMovieIdToDelete(movieId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (movieIdToDelete) {
      removeFromMyMovies(movieIdToDelete);
      setConfirmationVisible(false);
      setMovieIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setMovieIdToDelete(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {movies && <Table<MovieModel> data={movies} columns={moviesColumns} onDelete={handleDelete} />}
      {confirmationVisible && (
        <FormModal title="Biztosan törölni szeretné a felhasználót?" closeModal={cancelDelete}>
          <div className="flex justify-end  space-x-2">
            <button className="btn-delete" onClick={confirmDelete}>
              Töröl
            </button>
            <button onClick={cancelDelete} className="btn-cancel">
              Mégsem
            </button>
          </div>
        </FormModal>
      )}
    </>
  );
}

export default MyMovies;
