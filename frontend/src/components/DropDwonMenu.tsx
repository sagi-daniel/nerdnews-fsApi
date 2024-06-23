import { Link } from 'react-router-dom';
import { USER_MENU_ITEMS } from '../utils/constants';
import MenuItem from '../models/MenuItem.model';
import { useLogout } from '../features/auth/useLogout';

const DropdownMenu = ({ mobile }: { mobile?: boolean }) => {
  const { logout } = useLogout();

  if (mobile)
    return (
      <div>
        {USER_MENU_ITEMS.map((menuItem: MenuItem) => (
          <Link key={menuItem.path} to={menuItem.path} className="block py-2 text-sm rounded-md">
            {menuItem.name}
          </Link>
        ))}
        <span className="block cursor-pointer py-2 text-sm rounded-md" onClick={() => logout()}>
          Kilépés
        </span>
      </div>
    );

  return (
    <div className="absolute py-0 top-full right-0 mt-2 w-56 shadow-lg bg-border-dark ring-1 ring-black ring-opacity-5 z-10 rounded-md">
      <div className="rounded-md ">
        {USER_MENU_ITEMS.map((menuItem: MenuItem) => (
          <Link
            key={menuItem.path}
            to={menuItem.path}
            className="block px-4 py-2 text-sm text-content-dark hover:bg-border-light rounded-md"
          >
            {menuItem.name}
          </Link>
        ))}
        <span
          className="block cursor-pointer px-4 py-2 text-sm text-content-dark hover:bg-border-light rounded-md"
          onClick={() => logout()}
        >
          Kilépés
        </span>
      </div>
    </div>
  );
};

export default DropdownMenu;
