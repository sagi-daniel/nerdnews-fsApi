import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CategoryModel } from '../../models/Category.model';
import { getCategories } from '../../services/apiCategory';
import Table, { Column } from '../../components/Table';
import CategoryForm from '../../components/forms/CategoryForm';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import Modal from '../../components/Modal';

const categoryColumns: Column<CategoryModel>[] = [{ key: 'categoryName', label: 'Kategória név' }];

function EditCategories() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: categories, error, isLoading, isError } = useQuery(['Categories'], getCategories);

  function handleCreate() {
    setSelectedCategory(null);
    setModalVisible(true);
  }

  function handleUpdate(category: CategoryModel) {
    setSelectedCategory(category);
    setModalVisible(true);
  }

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <>
      {categories && (
        <Table<CategoryModel>
          data={categories}
          columns={categoryColumns}
          onEdit={handleUpdate}
          onCreate={handleCreate}
        />
      )}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2>{selectedCategory ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <CategoryForm category={selectedCategory} setModalVisible={setModalVisible} />
        </Modal>
      )}
    </>
  );
}

export default EditCategories;
