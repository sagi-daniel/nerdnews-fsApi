import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDateIsoToNormal } from '../../utils/helpers';
import { getMyMovies, removeFromMyMovies } from '../../services/apiMyMovies';
import Table, { Column } from '../../components/Table';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import FormModal from '../../components/FormModal';
import MovieModel from '../../models/Movie.model';

const moviesColumns: Column<MovieModel>[] = [
  { key: 'release', label: 'Megjelenés', formatter: formatDateIsoToNormal },
  { key: 'title', label: 'Cím' },
  { key: 'genre', label: 'Műfaj' },
  { key: 'poster', label: 'Poszter' },
];

function MyMovies() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [movieIdToDelete, setMovieIdToDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: movies, error, isLoading, isError } = useQuery(['MyMovies'], getMyMovies);

  console.log(movies);

  const { mutate: deleteMovieMutate } = useMutation(removeFromMyMovies, {
    onSuccess: () => {
      toast.success(`Mentett film törölve!`);
      queryClient.invalidateQueries(['MyMovies']);
    },
  });

  function handleDelete(movieId: string) {
    console.log(movieId);
    setMovieIdToDelete(movieId);
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

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

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
