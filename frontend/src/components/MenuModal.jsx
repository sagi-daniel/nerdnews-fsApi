import React from 'react';

const MenuModal = ({ isOpen, toggleModal }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleModal}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-4 w-3/4 max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="text-gray-600 dark:text-gray-400 mb-4" onClick={toggleModal}>
          Close
        </button>
        <nav className="flex flex-col space-y-4">
          <a href="/" className="text-gray-800 dark:text-gray-200">
            Home
          </a>
          <a href="/about" className="text-gray-800 dark:text-gray-200">
            About
          </a>
          <a href="/contact" className="text-gray-800 dark:text-gray-200">
            Contact
          </a>
        </nav>
      </div>
    </div>
  );
};

export default MenuModal;
