import { Link } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';
import ControlPanel from './ControlPanel';
import MenuItem from '../models/MenuItem.model';
import NavItem from './NavItem';
import CloseIcon from './CloseIcon';

interface MenuModalProps {
  menuItems: MenuItem[];
  isModalOpen: boolean;
  toggleModal: () => void;
}

function MenuModal({ menuItems, isModalOpen, toggleModal }: MenuModalProps) {
  const { isAuthenticated } = useUser();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
        isModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      } transition-opacity duration-300 ease-in-out`}
      onClick={toggleModal}
    >
      <div
        className={`bg-bg-light dark:bg-bg-dark p-5 rounded-r-lg shadow-lg w-1/2 h-full max-w-md fixed left-0 top-0 transform  ${
          isModalOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-4">
          <CloseIcon onClick={toggleModal} />
        </div>
        <div className="flex flex-col gap-4">
          {menuItems.map((menuItem) => (
            <Link
              to={menuItem.path}
              key={menuItem.name}
              className="relative hover-half-underline cursor-pointer"
              onClick={toggleModal}
            >
              {menuItem.name}
            </Link>
          ))}
          {!isAuthenticated && <NavItem menuItem={{ name: 'Regisztráció', path: 'signup', type: 'regular' }} />}

          <ControlPanel mobile={true} />
        </div>
      </div>
    </div>
  );
}

export default MenuModal;
