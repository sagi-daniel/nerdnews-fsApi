import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function LoginIcon() {
  return (
    <Link to="/login">
      <FiLogIn className="text-2xl duration-200 cursor-pointer text-content-light hover:text-primary dark:text-content-dark  hover:dark:text-primary " />
    </Link>
  );
}

export default LoginIcon;
