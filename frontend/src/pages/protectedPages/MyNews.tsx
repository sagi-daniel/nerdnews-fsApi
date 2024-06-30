import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { formatDateIsoToNormal } from '../../utils/helpers';
import Table, { Column } from '../../components/Table';
import NewsModel from '../../models/News.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import FormModal from '../../components/Modal';

const newsColumns: Column<NewsModel>[] = [
  { key: 'release', label: 'Publikálva', formatter: formatDateIsoToNormal },
  { key: 'title', label: 'Cím' },
  { key: 'link', label: 'Link' },
];

function MyNews() {
  const { news, removeFromMyNews, isLoading } = useUser();

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState<string | null>(null);

  function handleDelete(newsId: string) {
    setNewsIdToDelete(newsId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (newsIdToDelete) {
      removeFromMyNews(newsIdToDelete);
      setConfirmationVisible(false);
      setNewsIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setNewsIdToDelete(null);
  };

  if (isLoading) return <LoadingSpinner />;

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
