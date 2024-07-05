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
      <span onClick={onClick} className={`${className} link `}>
        {text}
      </span>
    );

  return (
    <span>
      {path && (
        <Link to={path} className="link ">
          <span className={`${className}`}>{text}</span>
        </Link>
      )}
    </span>
  );
}

export default CustomNavLink;
