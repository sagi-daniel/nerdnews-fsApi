import { useUser } from '../../../features/auth/useUser';
import ToggleDarkMode from './ToggleDarkMode';
import LoginIcon from './LoginIcon';
import UserIcon from './UserIcon';

function ControlPanel({ mobile = false }: { mobile?: boolean }) {
  const { isAuthenticated } = useUser();

  const mobileStyle = `flex justify-start items-center gap-2`;
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
