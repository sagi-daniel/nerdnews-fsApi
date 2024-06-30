import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SourceModel } from '../../models/Source.model';
import { capitalizeWord, formatDateIsoToNormal } from '../../utils/helpers';
import { deleteSource, getSources } from '../../services/apiSource';
import Table, { Column } from '../../components/Table';
import FormModal from '../../components/Modal';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import SourceForm from '../../components/forms/SourceForm';

const sourceColumns: Column<SourceModel>[] = [
  { key: 'createdAt', label: 'Létrehozva', formatter: formatDateIsoToNormal },
  { key: 'sourceName', label: 'Kategória Neve' },
  { key: 'sourceType', label: 'Típus' },
  { key: 'sourceLink', label: 'Link' },
  {
    key: 'category',
    label: 'Kategória',
    formatter: (value) => capitalizeWord(value.categoryName),
  },
];

function Sources() {
  const [selectedSource, setSelectedSource] = useState<SourceModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [sourceIdToDelete, setSourceIdToDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: sources, error, isLoading, isError } = useQuery(['Sources'], getSources);

  const { mutate: deleteSourceMutate } = useMutation(deleteSource, {
    onSuccess: () => {
      toast.success(`Rss forrás törölve!`);
      queryClient.invalidateQueries(['Sources']);
    },
  });

  function handleCreate() {
    setSelectedSource(null);
    setModalVisible(true);
  }

  function handleUpdate(source: SourceModel) {
    setSelectedSource(source);
    setModalVisible(true);
  }

  function handleDelete(userId: string) {
    setSourceIdToDelete(userId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (sourceIdToDelete) {
      deleteSourceMutate(sourceIdToDelete);
      setConfirmationVisible(false);
      setSourceIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setSourceIdToDelete(null);
  };

  const closeModal = () => {
    setSelectedSource(null);
    setModalVisible(false);
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <>
      {sources && (
        <Table<SourceModel>
          data={sources}
          columns={sourceColumns}
          onEdit={handleUpdate}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      )}

      {modalVisible && (
        <FormModal title={selectedSource ? 'Szerkesztés' : 'Létrehozás'} closeModal={closeModal}>
          <SourceForm source={selectedSource} setModalVisible={setModalVisible} />
        </FormModal>
      )}
      {confirmationVisible && (
        <FormModal title="Biztosan törölni szeretné az Rss forrást?" closeModal={cancelDelete}>
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

export default Sources;
