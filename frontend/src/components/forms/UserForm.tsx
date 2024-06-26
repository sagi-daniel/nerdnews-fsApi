import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { UserModel } from '../../models/User.model';
import { FiRefreshCcw } from 'react-icons/fi';
import { createUser, updateUser } from '../../services/apiUser';
import { generateRandomPassword } from '../../utils/helpers';
import InputField from '../InputField';
import Button from '../Button';
import toast from 'react-hot-toast';
import SelectField from '../SelectField';

interface UserFormProps {
  user?: UserModel | null;
  setModalVisible: (value: boolean) => void;
}

function UserForm({ user, setModalVisible }: UserFormProps) {
  const [role, setRole] = useState(user?.role || 'user');
  const [userName, setUserName] = useState(user?.userName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(generateRandomPassword());

  const queryClient = useQueryClient();

  const { mutate: updateUserMutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast.success(`Felhasználó frissítve!`);
      queryClient.invalidateQueries(['Users']);
    },
  });

  const { mutate: createUserMutate } = useMutation(createUser, {
    onSuccess: () => {
      toast.success(`Felhasználó létrehozva!`);
      queryClient.invalidateQueries(['Users']);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const saveUser = {
      role,
      userName,
      email,
    };

    if (user && user._id) {
      const updateUser = { ...user, ...saveUser };
      const userId = user._id;
      updateUserMutate({ user: updateUser, userId });
      setModalVisible(false);
    } else {
      const newUser = { ...saveUser, password, passwordConfirm: password };
      createUserMutate(newUser);
      setModalVisible(false);
    }
  }

  function handleGeneratePassword() {
    const newPassword = generateRandomPassword();
    setPassword(newPassword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <SelectField
            id="role"
            label="Szerepkör"
            options={[
              { name: 'Admin', value: 'admin' },
              { name: 'User', value: 'user' },
            ]}
            value={role}
            setValue={setRole}
            required={true}
          />
        </div>

        {user ? (
          <div className="mb-3">
            <label className="block mb-1">Jelszó</label>
            <Link className="btn-primary-md w-full" to="/updatePassword">
              Jelszó csere
            </Link>
          </div>
        ) : (
          <div className="mb-3">
            <label className="block mb-1">Jelszó</label>
            <div className="relative">
              <input
                type="text"
                id="password"
                value={password}
                onChange={handleGeneratePassword}
                required={true}
                className="w-full rounded-md p-2 text-primary-content bg-primary font-semibold focus:outline-none focus:ring focus:ring-primary"
              />

              <button
                type="button"
                className="absolute text-2xl text-border-dark inset-y-0 right-0 px-3 py-1"
                onClick={handleGeneratePassword}
              >
                <FiRefreshCcw className="text-2xl " />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InputField
          type="text"
          id="userName"
          label="Felhasználónév"
          value={userName}
          setValue={setUserName}
          required={true}
        />
        <InputField type="email" id="email" label="Email" value={email} setValue={setEmail} required={true} />
      </div>
      <Button type="submit" text={user ? 'Mentés' : 'Létrehozás'} size="full" />
    </form>
  );
}

export default UserForm;
