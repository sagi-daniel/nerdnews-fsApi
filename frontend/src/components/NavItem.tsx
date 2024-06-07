import { Link } from 'react-router-dom';

interface MenuItem {
  path: string;
  name: string;
  type: string;
}

interface NavItemProps {
  menuItem: MenuItem;
}

function NavItem({ menuItem }: NavItemProps) {
  return (
    <Link
      to={`/${menuItem.path}`}
      className={`relative ${menuItem.type === 'action' ? 'btn-primary-sm' : 'hover-half-underline cursor-pointer '}`}
    >
      <span>{menuItem.name}</span>
    </Link>
  );
}

export default NavItem;
