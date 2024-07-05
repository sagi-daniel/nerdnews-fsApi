import { useAuth } from '../../../context/AuthContext';
import LoginIcon from './LoginIcon';
import UserIcon from './UserIcon';

function ControlPanel({ mobile = false }: { mobile?: boolean }) {
  const { isAuthenticated } = useAuth();

  const mobileStyle = `flex flex-col  gap-2`;
  const desktopStyle = `flex hidden md:flex justify-end items-center`;

  return (
    <div className={`${mobile ? mobileStyle : desktopStyle} md:gap-5 `}>
      {isAuthenticated && <UserIcon mobile={mobile} />}
      {!isAuthenticated && <LoginIcon />}
    </div>
  );
}

export default ControlPanel;
