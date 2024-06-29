import { Link } from 'react-router-dom';
import { ADMIN_MENU_TEMS, USER_MENU_ITEMS } from '../../../utils/constants';
import MenuItem from '../../../models/MenuItem.model';
import { capitalizeWord } from '../../../utils/helpers';
import { useAuth } from '../../../context/AuthContext';
import Divider from '../../Divider';

const DropDownMenu = ({ mobile }: { mobile?: boolean }) => {
  const { user, logout } = useAuth();

  const userName = capitalizeWord(user?.userName || '');
  const userRole = capitalizeWord(user?.role || '');

  const renderMenuItems = (className: string) => (
    <>
      <Divider margin="full" align="center" tag={userName} />
      {USER_MENU_ITEMS.map((menuItem: MenuItem) => (
        <Link key={menuItem.path} to={menuItem.path} className={className}>
          {menuItem.name}
        </Link>
      ))}

      {user?.role === 'admin' && (
        <>
          <Divider margin="full" align="center" tag={userRole} />
          {ADMIN_MENU_TEMS.map((menuItem: MenuItem) => (
            <Link key={menuItem.path} to={menuItem.path} className={className}>
              {menuItem.name}
            </Link>
          ))}
        </>
      )}

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
