import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserModel } from '../../models/User.model';
import { formatDateIsoToNormal } from '../../utils/helpers';
import { deleteUser, getUsers } from '../../services/apiUser';
import Table, { Column } from '../../components/Table';
import Modal from '../../components/Modal';
import UserForm from '../../components/forms/UserForm';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';
import Alert from '../../components/Alert';

const userColumns: Column<UserModel>[] = [
  {
    key: 'createdAt',
    label: 'Létrehozva',
    formatter: (value) => formatDateIsoToNormal(value?.toString()),
  },
  { key: 'role', label: 'Szerepkör' },
  { key: 'userName', label: 'Felhasználónév' },
  { key: 'email', label: 'Email' },
];

function Users() {
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data: users, error, isLoading, isError } = useQuery(['Users'], getUsers);

  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success(`Felhasználó törölve!`);
      queryClient.invalidateQueries(['Users']);
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

  if (isError) return <Error message={(error as Error).message} />;

  return (
    <>
      {users && (
        <Table<UserModel>
          data={users}
          columns={userColumns}
          onEdit={handleUpdate}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      )}

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
    </>
  );
}

export default Users;
