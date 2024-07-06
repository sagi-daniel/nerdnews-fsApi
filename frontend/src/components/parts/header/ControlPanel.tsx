import { useAuth } from '../../../context/AuthContext';
import LoginIcon from './LoginIcon';
import ToggleDarkMode from './ToggleDarkMode';
import UserIcon from './UserIcon';

function ControlPanel({ mobile = false }: { mobile?: boolean }) {
  const { isAuthenticated } = useAuth();

  const mobileStyle = `flex flex-col md:flex-row  gap-2`;
  const desktopStyle = `flex hidden md:flex justify-end items-center`;

  return (
    <div className={`${mobile ? mobileStyle : desktopStyle} md:gap-5 `}>
      <ToggleDarkMode />
      {isAuthenticated && <UserIcon mobile={mobile} />}
      {!isAuthenticated && <LoginIcon />}
    </div>
  );
}

export default ControlPanel;
