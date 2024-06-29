import { useState } from 'react';
import DropDownMenu from './DropDownMenu';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import UserAvatar from './UserAvatar';
import { useAuth } from '../../../context/AuthContext';

function LoginIcon({ mobile }: { mobile: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (): void => {
    setIsOpen(false);
  };

  const dropdownRef = useOutsideClick({
    handler: closeDropdown,
    listenCapturing: true,
  });

  if (mobile) return <DropDownMenu mobile={mobile} />;

  return (
    <div className="relative" ref={dropdownRef}>
      {user && <UserAvatar user={user} onClick={toggleDropdown} isActive={isOpen} />}

      {isOpen && <DropDownMenu />}
    </div>
  );
}

export default LoginIcon;
