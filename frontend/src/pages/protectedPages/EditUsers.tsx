import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getUsers } from '../../services/apiUser';
import UserModel from '../../models/User.model';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Modal from '../../components/Modal';
import Alert from '../../components/Alert';
import toast from 'react-hot-toast';
import UserForm from '../../components/forms/UserForm';
import ErrorMessage from '../../components/ErrorMessage';
import UsersTable from '../../components/tables/UsersTable';

function EditUsers() {
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const { data: users, error, isLoading, isError } = useQuery(['users'], getUsers);

  const queryClient = useQueryClient();

  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success(`Felhasználó törölve!`);
      queryClient.invalidateQueries(['usersByQuery']);
    },
  });

  function handleCreate() {
    setSelectedUser(null);
    setModalVisible(true);
  }

  function handleUpdate(user: UserModel) {
    setSelectedUser(user);
    setModalVisible(true);
  }

  function handleDelete(userId: string) {
    setUserIdToDelete(userId);
    setConfirmationVisible(true);
  }

  function confirmDelete() {
    if (userIdToDelete) {
      deleteUserMutate(userIdToDelete);
      setConfirmationVisible(false);
      setUserIdToDelete(null);
    }
  }

  const cancelDelete = () => {
    setConfirmationVisible(false);
    setUserIdToDelete(null);
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <ErrorMessage message={(error as Error).message} />;

  return (
    <div className="flex flex-col gap-2 my-10">
      {users && <UsersTable users={users} onEdit={handleUpdate} onCreate={handleCreate} onDelete={handleDelete} />}
      {modalVisible && (
        <Modal isOpen={modalVisible} setIsOpen={setModalVisible}>
          <h2> {selectedUser ? 'Szerkesztés' : 'Létrehozás'}</h2>
          <UserForm user={selectedUser} setModalVisible={setModalVisible} />
        </Modal>
      )}

      <Modal isOpen={confirmationVisible} setIsOpen={setConfirmationVisible}>
        <Alert
          alertIcon="error"
          alertMessage="Biztosan törölni szeretné a felhasználót?"
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

export default EditUsers;
