import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SourceModel from '../../models/Source.model';
import { capitalizeWord, formatDateIsoToNormal } from '../../utils/helpers';
import { getSources } from '../../services/apiSource';
import Table, { Column } from '../../components/Table';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import SourceForm from '../../components/forms/SourceForm';

const sourceColumns: Column<SourceModel>[] = [
  {
    key: 'createdAt',
    label: 'Létrehozva',
    formatter: (value) => formatDateIsoToNormal(value?.toString()),
  },
  { key: 'sourceName', label: 'Kategória Neve' },
  { key: 'sourceType', label: 'Típus' },
  { key: 'sourceLink', label: 'Link' },
  {
    key: 'category',
    label: 'Kategória',
    formatter: (value) => (typeof value === 'object' ? capitalizeWord(value.categoryName) : ''),
  },
];

function EditSources() {
  const [selectedSource, setSelectedSource] = useState<SourceModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: sources, error, isLoading, isError } = useQuery(['Sources'], getSources);

  function handleCreate() {
    setSelectedSource(null);
    setModalVisible(true);
  }

  function handleUpdate(source: SourceModel) {
    setSelectedSource(source);
    setModalVisible(true);
  }

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <>
      {sources && (
        <Table<SourceModel> data={sources} columns={sourceColumns} onEdit={handleUpdate} onCreate={handleCreate} />
      )}

      <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
        <h2>{selectedSource ? 'Szerkesztés' : 'Létrehozás'}</h2>
        <SourceForm source={selectedSource} setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
}

export default EditSources;
