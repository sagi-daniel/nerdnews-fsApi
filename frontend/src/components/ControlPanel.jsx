import ToggleDarkMode from './ToggleDarkMode';
import LoginIcon from './LoginIcon';

function ControlPanel({ mobile = false }) {
  const mobileStyle = `flex justify-start pt-2`;
  const desktopStyle = `flex hidden md:flex justify-end`;

  return (
    <div className={`${mobile ? mobileStyle : desktopStyle} gap-5 items-center`}>
      <LoginIcon />
      <ToggleDarkMode />
    </div>
  );
}

export default ControlPanel;
