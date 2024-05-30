import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignRight } from 'react-icons/fi';
import MenuModal from './MenuModal';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/home', type: 'regular' },
    { name: 'News', path: '/news', type: 'regular' },
    { name: 'Movies', path: '/movies', type: 'regular' },
    { name: 'Sign up', path: '/signup', type: 'action' },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="nav">
      <div className="hidden md:flex items-center gap-5">
        {menuItems.map((menuItem) => (
          <Link
            to={menuItem.path}
            key={menuItem.name}
            className={`relative ${
              menuItem.type === 'action' ? 'btn-primary-sm' : 'hover-half-underline cursor-pointer font-semibold'
            }`}
          >
            <span>{menuItem.name}</span>
          </Link>
        ))}
      </div>
      <FiAlignRight
        className="text-4xl cursor-pointer text-content-light dark:text-primary hover:text-primary-dark md:hidden"
        onClick={toggleModal}
      />
      <MenuModal menuItems={menuItems} isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </nav>
  );
}

export default Navbar;
