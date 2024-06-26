import { Link } from 'react-router-dom';
import { USER_MENU_ITEMS } from '../utils/constants';
import MenuItem from '../models/MenuItem.model';
import { useLogout } from '../features/auth/useLogout';

const DropDownMenu = ({ mobile }: { mobile?: boolean }) => {
  const { logout } = useLogout();

  const renderMenuItems = (className: string) => (
    <>
      {USER_MENU_ITEMS.map((menuItem: MenuItem) => (
        <Link key={menuItem.path} to={menuItem.path} className={className}>
          {menuItem.name}
        </Link>
      ))}
      <span className={`${className} cursor-pointer`} onClick={() => logout()}>
        Kilépés
      </span>
    </>
  );

  return mobile ? (
    <div>{renderMenuItems('block py-2 text-sm rounded-md')}</div>
  ) : (
    <div className="absolute py-0 top-full right-0 mt-2 w-56 shadow-lg bg-border-dark ring-1 ring-black ring-opacity-5 z-10 rounded-md">
      <div className="rounded-md">
        {renderMenuItems('block px-4 py-2 text-sm text-content-dark hover:bg-border-light rounded-md')}
      </div>
    </div>
  );
};

export default DropDownMenu;
