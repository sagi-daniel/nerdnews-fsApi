import { useState } from "react";
import { FiAlignRight } from "react-icons/fi";
import MenuModal from "./MenuModal";
import { MENU_ITEMS } from "../utils/constants";
import NavItem from "./NavItem";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="nav">
      <div className="hidden md:flex items-center gap-5">
        {MENU_ITEMS.map((menuItem, index) => (
          <NavItem menuItem={menuItem} key={index} />
        ))}
      </div>
      <FiAlignRight
        className="text-4xl cursor-pointer text-content-light dark:text-primary hover:text-primary-dark md:hidden"
        onClick={toggleModal}
      />
      <MenuModal
        menuItems={MENU_ITEMS}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </nav>
  );
}

export default Navbar;
