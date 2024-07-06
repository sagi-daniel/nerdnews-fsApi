import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../../context/UserContext';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import toast from 'react-hot-toast';
import NewsTable from '../../components/tables/NewsTable';

function MyNews() {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState<string | null>(null);

  const { news, removeFromMyNews } = useUser();

  const queryClient = useQueryClient();

  const { mutate: deleteNewsMutate } = useMutation(removeFromMyNews, {
    onSuccess: () => {
      toast.success(`Hír törölve!`);
      queryClient.invalidateQueries(['newsByQuery']);
      queryClient.invalidateQueries(['user']);
    },
  });

  function handleDelete(newsId: string) {
    setNewsIdToDelete(newsId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (newsIdToDelete) {
      deleteNewsMutate(newsIdToDelete);
      setConfirmationVisible(false);
      setNewsIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setNewsIdToDelete(null);
  };

  return (
    <div className="flex flex-col items-start gap-2 my-10">
      {news && <NewsTable news={news} onDelete={handleDelete} />}
      <Modal isOpen={confirmationVisible} setIsOpen={setConfirmationVisible}>
        <Alert
          alertIcon="error"
          alertMessage="Biztosan törölni szeretné a hírt?"
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

export default MyNews;
