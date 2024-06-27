interface DividerProps {
  size?: 'small' | 'medium' | 'full';
  align?: 'left' | 'center' | 'right';
  color?: 'primary' | 'neutral';
  margin?: 'full' | 'top' | 'bottom';
}

function Divider({ size = 'full', align = 'left', color = 'primary', margin = 'top' }: DividerProps) {
  const alignmentClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };
  const sizeClasses: Record<string, string> = {
    small: 'w-1/4',
    medium: 'w-1/2',
    full: 'w-full',
  };

  const colorClasses: Record<string, string> = {
    primary: 'border-primary',
    neutral: 'border-border-light dark:border-border-dark',
  };

  const marginClasses: Record<string, string> = {
    full: 'm-3',
    top: 'mt-3',
    bottom: 'mb-3',
  };

  return (
    <div
      className={`flex border-y-2 rounded-${marginClasses[margin]}full  ${alignmentClasses[align]} ${alignmentClasses[align]} ${sizeClasses[size]} border-t ${colorClasses[color]} `}
    />
  );
}

export default Divider;
