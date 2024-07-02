import { useState } from 'react';
import { capitalizeWord, formatDateIsoToNormal } from '../../utils/helpers';
import { useAuth } from '../../context/AuthContext';
import UserAvatar from '../../components/UserAvatar';
import Section from '../../components/Section';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import UpdatePasswordForm from '../../features/auth/forms/UpdatePasswordForm';

import UserForm from '../../components/forms/UserForm';

const MyAccount = () => {
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [isPasswordUpdateShow, setIsPasswordUpdateShow] = useState(false);
  const [isUserUpdateShow, setIsIsUserUpdateShow] = useState(false);

  const handleAvatarClick = () => {
    setIsActive(!isActive);
  };

  return (
    <Section type="horizontal">
      <div className="flex flex-col md:w-3/12 w-full">
        <h1 className="text-3xl font-bold mb-6">Felhasználói fiók</h1>
        <div className="flex items-center space-x-4 mb-6">
          {user && <UserAvatar user={user} isActive={isActive} onClick={handleAvatarClick} size="large" />}
          <div>
            <h2 className="text-2xl font-semibold">{user && user.userName}</h2>
            <p className="">{user && user.email}</p>
          </div>
        </div>
        <div className="bg-border-dark text-content-dark p-4 rounded-md">
          <ol>
            <li>
              Szerepkör: <span className="font-semibold text-primary">{capitalizeWord(user?.role)}</span>
            </li>
            <li>
              Regisztráció: <span className="font-semibold"> {formatDateIsoToNormal(user?.createdAt)}</span>
            </li>
            <li>
              Adatváltoztatás: <span className="font-semibold">{formatDateIsoToNormal(user?.updatedAt)}</span>
            </li>
          </ol>
          <div className="flex items-center space-x-2 mt-4">
            <Button type="button" size="normal" text="Szerkesztése" onClick={() => setIsIsUserUpdateShow(true)} />
            <Button type="button" size="normal" text="Jelszó csere" onClick={() => setIsPasswordUpdateShow(true)} />
          </div>
          <Modal isOpen={isPasswordUpdateShow} setIsOpen={setIsPasswordUpdateShow}>
            <UpdatePasswordForm />
          </Modal>
          <Modal isOpen={isUserUpdateShow} setIsOpen={setIsIsUserUpdateShow}>
            <UserForm setModalVisible={() => true} />
          </Modal>
        </div>
      </div>
      <div className="flex flex-col md:w-9/12 w-full"></div>
    </Section>
  );
};

export default MyAccount;
