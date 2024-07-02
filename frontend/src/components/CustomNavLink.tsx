import { Link } from 'react-router-dom';

interface NavlinkProps {
  text: string;
  path?: string;
  onClick?: () => void;
}

function CustomNavLink({ text, path, onClick }: NavlinkProps) {
  if (onClick)
    return (
      <small onClick={onClick} className="link">
        {text}
      </small>
    );

  return (
    <small>
      {path && (
        <Link to={path} className="link">
          {text}
        </Link>
      )}
    </small>
  );
}

export default CustomNavLink;
