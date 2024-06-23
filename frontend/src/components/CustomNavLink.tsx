import { Link } from 'react-router-dom';

interface NavlinkProps {
  text: string;
  path: string;
  classes?: string;
}

function CustomNavLink({ text, path, classes }: NavlinkProps) {
  return (
    <small>
      <Link to={path} className={`${classes} hover:underline hover:text-primary`}>
        {text}
      </Link>
    </small>
  );
}

export default CustomNavLink;
