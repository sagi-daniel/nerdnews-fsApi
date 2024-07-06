import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/apiCategory';
import CategoryModel from '../../models/Category.model';
import CategoriesTable from '../../components/tables/CategoriesTable';
import CategoryForm from '../../components/forms/CategoryForm';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Modal from '../../components/Modal';

function EditCategories() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: categories, error, isLoading, isError } = useQuery(['categories'], getCategories);

  function handleCreate() {
    setSelectedCategory(null);
    setModalVisible(true);
  }

  function handleUpdate(category: CategoryModel) {
    setSelectedCategory(category);
    setModalVisible(true);
  }

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex size-full flex-col gap-2 my-10">
      {categories && <CategoriesTable categories={categories} onEdit={handleUpdate} onCreate={handleCreate} />}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2>{selectedCategory ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <CategoryForm category={selectedCategory} setModalVisible={setModalVisible} />
        </Modal>
      )}
    </div>
  );
}

export default EditCategories;
