import React from 'react';
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
    small: 'w-40',
    medium: 'w-60',
    large: 'w-80',
  };

  return (
    <div className={`flex ${alignmentClasses[align]} ${sizeClasses[size]} h-auto`}>
      <img src={logoSrc} alt="geekHUB logo" />
    </div>
  );
};

export default Logo;
