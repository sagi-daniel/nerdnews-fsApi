import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCategory, getCategories } from '../../services/apiCategory';
import CategoryModel from '../../models/Category.model';
import CategoriesTable from '../../components/tables/CategoriesTable';
import CategoryForm from '../../components/forms/CategoryForm';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import Alert from '../../components/Alert';

function EditCategories() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(null);

  const { data: categories, error, isLoading, isError } = useQuery(['categories'], getCategories);

  const queryClient = useQueryClient();

  const { mutate: deleteCategoryMutate } = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success(`Kategória törölve!`);
      queryClient.invalidateQueries(['categories']);
    },
  });

  function handleCreate() {
    setSelectedCategory(null);
    setModalVisible(true);
  }

  function handleUpdate(category: CategoryModel) {
    setSelectedCategory(category);
    setModalVisible(true);
  }

  function handleDelete(categoryId: string) {
    setCategoryIdToDelete(categoryId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (categoryIdToDelete) {
      deleteCategoryMutate(categoryIdToDelete);
      setConfirmationVisible(false);
      setCategoryIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setCategoryIdToDelete(null);
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex size-full flex-col gap-2 my-10">
      {categories && (
        <CategoriesTable
          categories={categories}
          onEdit={handleUpdate}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />
      )}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2>{selectedCategory ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <CategoryForm category={selectedCategory} setModalVisible={setModalVisible} />
        </Modal>
      )}
      <Modal isOpen={confirmationVisible} setIsOpen={setConfirmationVisible}>
        <Alert
          alertIcon="error"
          alertMessage="Biztosan törölni szeretné a kategóriát?"
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

export default EditCategories;
