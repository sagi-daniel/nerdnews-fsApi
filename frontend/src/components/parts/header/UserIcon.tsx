import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import DropDownMenu from './DropDownMenu';
import UserAvatar from './UserAvatar';

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
