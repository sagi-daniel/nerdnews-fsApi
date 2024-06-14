import { MouseEvent } from 'react';
import { FilterOption } from '../models/FiltersOption.model';

type CategoryType = 'NORMAL' | 'BUTTON' | 'THIN';

interface BadgeProps<T extends string> {
  name: T;
  type?: CategoryType;
  isSelected?: boolean;
  colorOptions: FilterOption[];
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
}

function Badge<T extends string>({ name, type = 'NORMAL', isSelected, colorOptions, onClick }: BadgeProps<T>) {
  const style = colorOptions.find((opt) => opt.name === name)?.colorClass;

  const handleClick = (event: MouseEvent<HTMLSpanElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  if (type === 'BUTTON') {
    return (
      <span
        className={`${
          isSelected ? style : 'bg-border-light text-content-light'
        } px-1 py-0.5 text-lg font-semibold rounded cursor-pointer`}
        onClick={handleClick}
      >
        {name}
      </span>
    );
  }

  if (type === 'THIN') {
    return <span className={`${style} px-1 py-0.5 text-lg font-semibold rounded`}>{name}</span>;
  }

  return <span className={`${style} px-4 py-2 text-lg font-semibold rounded`}>{name}</span>;
}

export default Badge;
