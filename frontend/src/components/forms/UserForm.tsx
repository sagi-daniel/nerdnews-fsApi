import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../services/apiUser';
import UserModel from '../../models/User.model';
import InputField from '../form-ui/InputField';
import Button from '../Button';
import toast from 'react-hot-toast';

interface UserFormProps {
  user?: UserModel | null;
  setModalVisible: (value: boolean) => void;
}

function UserForm({ user, setModalVisible }: UserFormProps) {
  const [userName, setUserName] = useState(user?.userName || '');
  const [email, setEmail] = useState(user?.email || '');

  const queryClient = useQueryClient();

  const { mutate: updateUserMutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast.success(`Felhasználó módosítva!`);
      queryClient.invalidateQueries(['user']);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const saveUser = {
      userName,
      email,
    };

    if (user && user._id) {
      const updateUser = { ...user, ...saveUser };
      const userId = user._id;
      updateUserMutate({ user: updateUser, userId });
      setModalVisible(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          type="text"
          id="userName"
          name="userName"
          label="Felhasználónév"
          value={userName}
          setValue={setUserName}
          required={true}
        />
        <InputField
          type="email"
          id="email"
          name="email"
          label="Email"
          value={email}
          setValue={setEmail}
          required={true}
        />
      </div>
      <Button type="submit" text={user ? 'Mentés' : 'Létrehozás'} size="full" />
    </form>
  );
}

export default UserForm;
