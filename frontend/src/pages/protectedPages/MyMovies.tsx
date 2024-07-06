import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../context/UserContext';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import toast from 'react-hot-toast';
import MoviesTable from '../../components/tables/MoviesTable';

function MyMovies() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState<string | null>(null);

  const { movies, removeFromMyMovies } = useUser();

  const queryClient = useQueryClient();

  const { mutate: deleteMovieMutate } = useMutation(removeFromMyMovies, {
    onSuccess: () => {
      toast.success(`film törölve!`);
      queryClient.invalidateQueries(['moviesByQuery']);
      queryClient.invalidateQueries(['user']);
    },
  });

  function handleDelete(moviesId: string) {
    setMovieIdToDelete(moviesId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (movieIdToDelete) {
      deleteMovieMutate(movieIdToDelete);
      setConfirmationVisible(false);
      setMovieIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setMovieIdToDelete(null);
  };

  return (
    <div className="flex flex-col items-start gap-2 my-10">
      {movies && <MoviesTable movies={movies} onDelete={handleDelete} />}
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

export default MyMovies;
