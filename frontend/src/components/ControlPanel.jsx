import ToggleDarkMode from './ToggleDarkMode';

import { FiLogIn } from 'react-icons/fi';

function ControlPanel({ mobile = false }) {
  const mobileStyle = `flex justify-start pt-2`;
  const desktopStyle = `flex hidden md:flex justify-end`;

  return (
    <div className={`${mobile ? mobileStyle : desktopStyle} gap-5 items-center`}>
      <FiLogIn className="text-2xl duration-200 cursor-pointer text-content-light hover:text-primary dark:text-content-dark  hover:dark:text-primary " />
      <ToggleDarkMode />
    </div>
  );
}

export default ControlPanel;
