import ToggleDarkMode from './ToggleDarkMode';
import LoginIcon from './LoginIcon';
import UserIcon from './UserIcon';

function ControlPanel({ mobile = false }: { mobile?: boolean }) {
  const mobileStyle = `flex justify-start pt-2`;
  const desktopStyle = `flex hidden md:flex justify-end`;

  return (
    <div className={`${mobile ? mobileStyle : desktopStyle} gap-5 items-center`}>
      <LoginIcon />
      <UserIcon />
      <ToggleDarkMode />
    </div>
  );
}

export default ControlPanel;
