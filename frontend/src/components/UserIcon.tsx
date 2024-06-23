import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import DropdownMenu from './DropDwonMenu';
import Divider from './Divider';

function LoginIcon({ mobile }: { mobile: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (mobile)
    return (
      <>
        <Divider />
        <FiUser className="text-2xl" />
        <DropdownMenu mobile={mobile} />
      </>
    );

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
