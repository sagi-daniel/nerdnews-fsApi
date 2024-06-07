import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

interface LogoProps {
  align?: 'left' | 'center' | 'right';
  size?: 'xsmall' | 'small' | 'medium' | 'large';
}

function Logo({ align = 'left', size = 'small' }: LogoProps) {
  const { isDarkMode } = useDarkMode();

  const logoSrc = isDarkMode ? './assets/logo/logo-dark.svg' : './assets/logo/logo-light.svg';

  const alignmentClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };
  const sizeClasses: Record<string, string> = {
    xsmall: 'w-16',
    small: 'w-20',
    medium: 'w-32',
    large: 'w-40',
  };

  return (
    <div className={`flex ${alignmentClasses[align]} ${sizeClasses[size]} h-auto`}>
      <Link to={'/Home'}>
        <img src={logoSrc} alt="geekHUB logo" />
      </Link>
    </div>
  );
}

export default Logo;
