import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import ControlPanel from './ControlPanel';

const MenuModal = ({ menuItems, isModalOpen, toggleModal }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${
        isModalOpen ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300 ease-in-out`}
      onClick={toggleModal}
    >
      <div
        className={`bg-border-light dark:bg-border-dark p-5 rounded-r-lg shadow-lg w-1/2 h-full max-w-md fixed left-0 top-0 transform ${
          isModalOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-4">
          <FiX
            className="text-2xl cursor-pointer text-content-light dark:text-primary hover:text-primary-dark"
            onClick={toggleModal}
          />
        </div>
        <div className="flex flex-col gap-4">
          {menuItems.map((menuItem) => (
            <Link
              to={menuItem.path}
              key={menuItem.name}
              className="relative hover-half-underline cursor-pointer font-semibold"
              onClick={toggleModal}
            >
              {menuItem.name}
            </Link>
          ))}
          <ControlPanel mobile={true} />
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
