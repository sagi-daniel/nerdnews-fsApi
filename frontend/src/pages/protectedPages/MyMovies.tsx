import { useState } from 'react';
import { formatDateIsoToNormal } from '../../utils/helpers';
import { useUser } from '../../context/UserContext';
import Table, { Column } from '../../components/Table';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import MovieModel from '../../models/Movie.model';
import Alert from '../../components/Alert';
import Modal from '../../components/Modal';

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
      <Modal isOpen={confirmationVisible} setIsOpen={setConfirmationVisible}>
        <Alert
          alertIcon="error"
          alertMessage="Biztosan törölni szeretné az Rss forrást?"
          buttonText="Mégsem"
          buttonStyle="neutral"
          buttonAction={cancelDelete}
          confrimText="Töröl"
          confrimStyle="delete"
          confirmAction={confirmDelete}
        />
      </Modal>
    </>
  );
}

export default MyMovies;
