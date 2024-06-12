import { MouseEvent } from 'react';
import { CategoryName } from '../models/CategoryModel';

type CategoryType = 'NORMAL' | 'BUTTON';

interface BadgeProps {
  categoryName?: CategoryName;
  type?: CategoryType;
  isSelected?: boolean;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

function Badge({ categoryName = 'DEFAULT', type = 'NORMAL', isSelected, onClick }: BadgeProps) {
  const categoriesColorOptions: Record<CategoryName, string> = {
    DEFAULT: 'bg-secondary text-secondary-content',
    TECH: 'bg-tech text-tech-content',
    CYBERSEC: 'bg-cybersec text-cybersec-content',
    GAMING: 'bg-gaming text-gaming-content',
  };

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  if (type === 'BUTTON') {
    return (
      <span
        className={` ${
          isSelected ? categoriesColorOptions[categoryName] : 'bg-border-light text-content-light'
        } px-1 py-0.5 text-lg font-semibold rounded cursor-pointer`}
        onClick={handleClick}
      >
        {categoryName}
      </span>
    );
  }

  return (
    <span className={` ${categoriesColorOptions[categoryName]} px-4 py-2 text-lg font-semibold rounded`}>
      {categoryName}
    </span>
  );
}

export default Badge;
