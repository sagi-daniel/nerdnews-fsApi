import { useUser } from '../features/auth/useUser';
import ToggleDarkMode from './ToggleDarkMode';
import LoginIcon from './LoginIcon';
import UserIcon from './UserIcon';

function ControlPanel({ mobile = false }: { mobile?: boolean }) {
  const { isAuthenticated } = useUser();

  const mobileStyle = `flex justify-start pt-2`;
  const desktopStyle = `flex hidden md:flex justify-end`;

  return (
    <div className={`${mobile ? mobileStyle : desktopStyle} gap-5 items-center`}>
      {isAuthenticated && <UserIcon />}
      {!isAuthenticated && <LoginIcon />}
      <ToggleDarkMode />
    </div>
  );
}

export default ControlPanel;
