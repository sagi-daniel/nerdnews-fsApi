import { Link } from 'react-router-dom';

function NavItem({ menuItem }) {
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
