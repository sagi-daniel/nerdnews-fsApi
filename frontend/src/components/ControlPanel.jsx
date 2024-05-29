import ToggleDarkMode from './ToggleDarkMode';

import { FiLogIn } from 'react-icons/fi';

function ControlPanel() {
  return (
    <div className="flex justify-end gap-5 items-center ">
      <FiLogIn className="text-2xl duration-200 cursor-pointer text-content-light hover:text-primary dark:text-content-dark  hover:dark:text-primary " />
      <ToggleDarkMode />
    </div>
  );
}

export default ControlPanel;
