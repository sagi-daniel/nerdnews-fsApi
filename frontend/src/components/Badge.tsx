import { CategoryName } from '../models/CategoryModel';

type CategoryType = 'NORMAL' | 'EXTRA';

interface BadgeProps {
  categoryName?: CategoryName;
  type?: CategoryType;
}

function Badge({ categoryName = 'DEFAULT', type = 'EXTRA' }: BadgeProps) {
  const categoriesColorOptions: Record<CategoryName, string> = {
    DEFAULT: 'bg-secondary text-secondary-content',
    TECH: 'bg-tech text-tech-content',
    CYBERSEC: 'bg-cybersec text-cybersec-content',
    GAMING: 'bg-gaming text-gaming-content',
  };

  if (type === 'EXTRA')
    return (
      <span className={` ${categoriesColorOptions[categoryName]} px-4 py-2 text-lg font-semibold rounded`}>
        {categoryName}
      </span>
    );

  return (
    <span className={` ${categoriesColorOptions[categoryName]} px-1 py-0.5 font-semibold rounded`}>{categoryName}</span>
  );
}

export default Badge;
