import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const Logo = ({ align = 'left', size = 'small' }) => {
  const { isDarkMode } = useDarkMode();

  const logoSrc = isDarkMode ? './assets/logo/logo-darkbg.svg' : './assets/logo/logo-lightbg.svg';

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };
  const sizeClasses = {
    xsmall: 'w-20',
    small: 'w-40',
    medium: 'w-60',
    large: 'w-80',
  };

  return (
    <div className={`flex ${alignmentClasses[align]} ${sizeClasses[size]} h-auto`}>
      <Link to={'/Home'}>
        <img src={logoSrc} alt="geekHUB logo" />
      </Link>
    </div>
  );
};

export default Logo;
