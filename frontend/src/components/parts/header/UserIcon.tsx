import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import DropDownMenu from './DropDownMenu';
import Divider from '../../Divider';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

function LoginIcon({ mobile }: { mobile: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

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

  if (mobile)
    return (
      <>
        <Divider />
        <FiUser className="text-2xl" />
        <DropDownMenu mobile={mobile} />
      </>
    );

  return (
    <div className="relative" ref={dropdownRef}>
      <FiUser
        onClick={toggleDropdown}
        className="text-2xl duration-200 cursor-pointer text-content-light hover:text-primary dark:text-content-dark hover:dark:text-primary"
      />

      {isOpen && <DropDownMenu />}
    </div>
  );
}

export default LoginIcon;
