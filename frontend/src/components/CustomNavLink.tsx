import { Link } from 'react-router-dom';

interface NavlinkProps {
  text: string;
  path?: string;
  className?: string;
  onClick?: () => void;
}

function CustomNavLink({ text, path, className, onClick }: NavlinkProps) {
  if (onClick)
    return (
      <small onClick={onClick} className={`${className} link`}>
        {text}
      </small>
    );

  return (
    <small>
      {path && (
        <Link to={path} className="link">
          <span className={`${className}`}>{text}</span>
        </Link>
      )}
    </small>
  );
}

export default CustomNavLink;
