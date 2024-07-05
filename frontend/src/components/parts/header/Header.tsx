import Logo from '../../Logo';
import Navbar from './Navbar';
import ControlPanel from './ControlPanel';
import Divider from '../../Divider';
import ToggleDarkMode from './ToggleDarkMode';
import SearchBar from '../../SearchBar';

function Header() {
  const handleSearch = (query: string) => {
    console.log('Keresési kifejezés:', query);
    // Itt adhatod hozzá a keresési logikádat
  };

  return (
    <header className="sticky z-10 bg-bg-light dark:bg-bg-dark pt-2 top-0 flex flex-col items-center">
      <div className=" size-full  flex items-center justify-between space-x-2  text-content-light dark:text-content-dark mb-3 md:mb-0">
        <div className="w-1/6 md:w-2/6 flex">
          <Logo size="xsmall" />
        </div>
        <div className="w-5/6 flex flex-row-reverse md:flex-row ">
          <div className="w-1/6 md:w-4/6 h flex justify-end md:justify-center items-center   ">
            <Navbar />
          </div>
          <div className="flex w-5/6 md:w-2/6 md:justify-end justify-center items-center space-x-2">
            <SearchBar onSearch={handleSearch} />
            <ToggleDarkMode />
            <ControlPanel />
          </div>
        </div>
      </div>

      <Divider margin="none" color="neutral" />
    </header>
  );
}

export default Header;
