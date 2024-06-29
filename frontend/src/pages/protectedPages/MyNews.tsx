import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDateIsoToNormal } from '../../utils/helpers';
import { getMyNews, removeFromMyNews } from '../../services/apiMyNews';
import Table, { Column } from '../../components/Table';
import NewsModel from '../../models/News.model';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import FormModal from '../../components/FormModal';

const newsColumns: Column<NewsModel>[] = [
  { key: 'release', label: 'Publikálva', formatter: formatDateIsoToNormal },
  { key: 'title', label: 'Cím' },
  { key: 'link', label: 'Link' },
];

function MyNews() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: news, error, isLoading, isError } = useQuery(['MyNews'], getMyNews);

  const { mutate: deleteMovieMutate } = useMutation(removeFromMyNews, {
    onSuccess: () => {
      toast.success(`Mentett hír törölve!`);
      queryClient.invalidateQueries(['MyNews']);
      queryClient.invalidateQueries(['user']);
    },
  });

  function handleDelete(newsId: string) {
    console.log(newsId);
    setNewsIdToDelete(newsId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (newsIdToDelete) {
      deleteMovieMutate(newsIdToDelete);
      setConfirmationVisible(false);
      setNewsIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setNewsIdToDelete(null);
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <>
      {news && <Table<NewsModel> data={news} columns={newsColumns} onDelete={handleDelete} />}
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

export default MyNews;
