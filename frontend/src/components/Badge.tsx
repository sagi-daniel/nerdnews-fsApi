import { MouseEvent } from 'react';
import { CategoryName } from '../models/CategoryModel';

type CategoryType = 'NORMAL' | 'EXTRA';

interface BadgeProps {
  categoryName?: CategoryName;
  type?: CategoryType;
  classes?: string;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

function Badge({ categoryName = 'DEFAULT', type = 'EXTRA', classes, onClick }: BadgeProps) {
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

  if (type === 'EXTRA')
    return (
      <span
        className={`${classes} ${categoriesColorOptions[categoryName]} px-4 py-2 text-lg font-semibold rounded`}
        onClick={handleClick}
      >
        {categoryName}
      </span>
    );

  return (
    <span
      className={`${classes} ${categoriesColorOptions[categoryName]} px-1 py-0.5 font-semibold rounded`}
      onClick={handleClick}
    >
      {categoryName}
    </span>
  );
}

export default Badge;
