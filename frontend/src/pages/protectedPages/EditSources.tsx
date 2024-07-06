import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSources } from '../../services/apiSource';
import SourceModel from '../../models/Source.model';
import Modal from '../../components/Modal';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import SourceForm from '../../components/forms/SourceForm';
import SourcesTable from '../../components/tables/SourcesTable';

function EditSources() {
  const [selectedSource, setSelectedSource] = useState<SourceModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: sources, error, isLoading, isError } = useQuery(['sources'], getSources);

  function handleUpdate(source: SourceModel) {
    setSelectedSource(source);
    setModalVisible(true);
  }

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex flex-col gap-2 my-10">
      {sources && <SourcesTable sources={sources} onEdit={handleUpdate} />}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2>{selectedSource ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <SourceForm source={selectedSource} setModalVisible={setModalVisible} />
        </Modal>
      )}
    </div>
  );
}

export default EditSources;
