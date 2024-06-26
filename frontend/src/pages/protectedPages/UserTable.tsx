import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserModel } from '../../models/User.model';
import { formatDateIsoToNormal } from '../../utils/helpers';
import { deleteUser, getUsers } from '../../services/apiUser';
import Table, { Column } from '../../components/Table';
import FormModal from '../../components/FormModal';
import UserForm from '../../components/forms/UserForm';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Error from '../../components/Error';

const userColumns: Column<UserModel>[] = [
  { key: 'createdAt', label: 'Létrehozva', formatter: formatDateIsoToNormal },
  { key: 'role', label: 'Szerepkör' },
  { key: 'userName', label: 'Felhasználónév' },
  { key: 'email', label: 'Email' },
];

function UserTable() {
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

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
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
        <FormModal title={selectedUser ? 'Szerkesztés' : 'Létrehozás'} closeModal={closeModal}>
          <UserForm user={selectedUser} setModalVisible={setModalVisible} />
        </FormModal>
      )}
      {confirmationVisible && (
        <FormModal title="Biztosan törölni szeretné a felhasználót?" closeModal={cancelDelete}>
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

export default UserTable;
