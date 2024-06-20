import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface CloseIconProps {
  path?: string;
  onClick: () => void;
}

function CloseIcon({ onClick, path }: CloseIconProps) {
  if (!path)
    return <FiX onClick={onClick} className="absolute top-2 right-2 cursor-pointer text-xl hover:text-primary" />;

  return (
    <Link to={path}>
      <FiX onClick={onClick} className="absolute top-2 right-2 cursor-pointer text-xl hover:text-primary" />
    </Link>
  );
}

export default CloseIcon;
