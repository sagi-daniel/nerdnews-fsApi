interface DividerProps {
  size?: 'small' | 'medium' | 'full';
  align?: 'left' | 'center' | 'right';
  color?: 'primary' | 'neutral';
  margin?: 'none' | 'full' | 'top' | 'bottom';
  tag?: string;
}

function Divider({ size = 'full', align = 'left', color = 'primary', margin = 'top', tag = '' }: DividerProps) {
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
    none: '',
    full: 'my-6',
    top: 'mt-3',
    bottom: 'mb-3',
  };

  if (tag) {
    return (
      <div className="flex items-center gap-2 md:px-4">
        <span className="text-xs text-primary">{tag}</span>
        <div
          className={`flex border-y-2 rounded-full ${marginClasses[margin]}  ${alignmentClasses[align]} ${alignmentClasses[align]} ${sizeClasses[size]} border-t ${colorClasses[color]} `}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex border-y-2 rounded-full ${marginClasses[margin]}  ${alignmentClasses[align]} ${alignmentClasses[align]} ${sizeClasses[size]} border-t ${colorClasses[color]} `}
    />
  );
}

export default Divider;
