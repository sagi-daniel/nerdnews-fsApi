import Logo from '../../Logo';
import Navbar from './Navbar';
import ControlPanel from './ControlPanel';
import Divider from '../../Divider';
import SearchBar from '../../SearchBar';

function Header() {
  const handleSearch = (query: string) => {
    console.log('Keresési kifejezés:', query);
    // Itt adhatod hozzá a keresési logikádat
  };

  return (
    <header className="sticky z-10 bg-bg-light dark:bg-bg-dark pt-2 top-0 flex flex-col items-center">
      <div className="w-full flex justify-center items-center space-x-4 text-content-light dark:text-content-dark md:mb-0">
        <div className="w-[20%] flex  items-center">
          <Logo size="xsmall" />
        </div>
        <div className="w-[80%] flex flex-row-reverse md:flex-row justify-center items-center space-x-4">
          <div className="w-full md:w-[75%] flex flex-row-reverse md:flex-row md:justify-center justify-between items-center space-x-4 gap-4 ">
            <Navbar />
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className=" md:w-[25%] flex  justify-center md:justify-end items-center space-x-4 ">
            <ControlPanel />
          </div>
        </div>
      </div>

      <Divider margin="none" color="neutral" />
    </header>
  );
}

export default Header;
