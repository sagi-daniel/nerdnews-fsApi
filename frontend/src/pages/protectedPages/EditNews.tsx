import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNews } from '../../services/apiNews';
import { CATEGORY_COLORS } from '../../utils/constants';
import useNewsData from '../../hooks/useNewsData';
import NewsModel from '../../models/News.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import toast from 'react-hot-toast';
import NewsForm from '../../components/forms/NewsForm';
import ErrorMessage from '../../components/ErrorMessage';
import Pagination from '../../components/Pagination';
import useNewsFilter from '../../hooks/useNewsFilter';
import NewsTable from '../../components/tables/NewsTable';
import DateRangeFilter from '../../components/form-ui/DateRangfilter';
import CategoryFilter from '../../components/CategoryFilter';
import Sort from '../../components/Sort';

function EditNews() {
  const [selectedNews, setSelectedNews] = useState<NewsModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [newsIdToDelete, setNewsIdToDelete] = useState<string | null>(null);

  const { params, setters } = useNewsFilter();

  const { data, error, isLoading, isError } = useNewsData();
  const news = data?.data.news;
  const totalItems = data?.totalItems;

  const queryClient = useQueryClient();

  const { mutate: deleteNewsMutate } = useMutation(deleteNews, {
    onSuccess: () => {
      toast.success(`Hír törölve!`);
      queryClient.invalidateQueries(['newsByQuery']);
    },
  });

  function handleCreate() {
    setSelectedNews(null);
    setModalVisible(true);
  }

  function handleUpdate(news: NewsModel) {
    setSelectedNews(news);
    setModalVisible(true);
  }

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

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex flex-col gap-2 my-10">
      <div className="flex items-center space-x-2">
        <CategoryFilter
          categoryOptions={CATEGORY_COLORS}
          category={params.category}
          setCategory={setters.setCategory}
        />
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

      {news && <NewsTable news={news} onEdit={handleUpdate} onCreate={handleCreate} onDelete={handleDelete} />}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2> {selectedNews ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <NewsForm news={selectedNews} setModalVisible={setModalVisible} />
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

export default EditNews;
