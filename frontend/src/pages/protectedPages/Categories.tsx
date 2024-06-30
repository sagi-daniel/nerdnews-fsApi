import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryModel } from '../../models/Category.model';

import { deleteCategory, getCategories } from '../../services/apiCategory';
import Table, { Column } from '../../components/Table';
import FormModal from '../../components/Modal';
import CategoryForm from '../../components/forms/CategoryForm';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';

const categoryColumns: Column<CategoryModel>[] = [{ key: 'categoryName', label: 'Kategória név' }];

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: categories, error, isLoading, isError } = useQuery(['Categories'], getCategories);

  const { mutate: deleteCategoryMutate } = useMutation(deleteCategory, {
    onSuccess: () => {
      toast.success(`Kategória törölve!`);
      queryClient.invalidateQueries(['Categories']);
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

  const closeModal = () => {
    setSelectedCategory(null);
    setModalVisible(false);
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <>
      {categories && (
        <Table<CategoryModel>
          data={categories}
          columns={categoryColumns}
          onEdit={handleUpdate}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      )}

      {modalVisible && (
        <FormModal title={selectedCategory ? 'Szerkesztés' : 'Létrehozás'} closeModal={closeModal}>
          <CategoryForm category={selectedCategory} setModalVisible={setModalVisible} />
        </FormModal>
      )}
      {confirmationVisible && (
        <FormModal title="Biztosan törölni szeretné a kategóriát?" closeModal={cancelDelete}>
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

export default Categories;
