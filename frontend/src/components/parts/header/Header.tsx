import Logo from '../../Logo';
import Navbar from './Navbar';
import ControlPanel from './ControlPanel';
import Divider from '../../Divider';

function Header() {
  return (
    <header className="sticky z-10 bg-bg-light dark:bg-bg-dark pt-2 top-0 flex flex-col items-center">
      <div className=" w-full flex items-center justify-between text-content-light dark:text-content-dark">
        <Logo />
        <Navbar />
        <ControlPanel />
      </div>
      <Divider margin="none" color="neutral" />
    </header>
  );
}

export default Header;
