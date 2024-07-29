import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSource, getSources } from '../../services/apiSource';
import SourceModel from '../../models/Source.model';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SourceForm from '../../components/forms/SourceForm';
import SourcesTable from '../../components/tables/SourcesTable';
import toast from 'react-hot-toast';
import Alert from '../../components/Alert';

function EditSources() {
  const [selectedSource, setSelectedSource] = useState<SourceModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [sourceIdToDelete, setSourceIdToDelete] = useState<string | null>(null);

  const { data: sources, error, isLoading, isError } = useQuery(['sources'], getSources);

  const queryClient = useQueryClient();

  const { mutate: deleteSourceMutate } = useMutation(deleteSource, {
    onSuccess: () => {
      toast.success(`Forrás törölve!`);
      queryClient.invalidateQueries(['sources']);
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

  function handleDelete(categoryId: string) {
    setSourceIdToDelete(categoryId);
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

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex flex-col gap-2 my-10">
      {sources && (
        <SourcesTable sources={sources} onCreate={handleCreate} onEdit={handleUpdate} onDelete={handleDelete} />
      )}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2>{selectedSource ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <SourceForm source={selectedSource} setModalVisible={setModalVisible} />
        </Modal>
      )}
      <Modal isOpen={confirmationVisible} setIsOpen={setConfirmationVisible}>
        <Alert
          alertIcon="error"
          alertMessage="Biztosan törölni szeretné a forrást?"
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

export default EditSources;
