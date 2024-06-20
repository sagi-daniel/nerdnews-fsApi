import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import DropdownMenu from './DropDwonMenu';

function LoginIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <FiUser
        onClick={toggleDropdown}
        className="text-2xl duration-200 cursor-pointer text-content-light hover:text-primary dark:text-content-dark hover:dark:text-primary"
      />

      {isOpen && <DropdownMenu />}
    </div>
  );
}

export default LoginIcon;
