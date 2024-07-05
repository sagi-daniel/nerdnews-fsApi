import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { capitalizeWord, formatDateIsoToNormal } from '../../utils/helpers';
import Table, { Column } from '../../components/Table';
import NewsModel from '../../models/News.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';

const newsColumns: Column<NewsModel>[] = [
  { key: 'release', label: 'Publikálva', formatter: (value) => formatDateIsoToNormal(value?.toString()) },
  { key: 'title', label: 'Cím' },
  {
    key: 'category',
    label: 'Kategória',
    formatter: (value) =>
      typeof value === 'object' && 'categoryName' in value ? capitalizeWord(value?.categoryName) : '',
  },
  { key: 'link', label: 'Link' },
];

function EditNews() {
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

export default EditNews;