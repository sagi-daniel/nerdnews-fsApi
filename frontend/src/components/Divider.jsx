import React from 'react';

function Divider({ size = 'full', align = 'left', color = 'primary' }) {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };
  const sizeClasses = {
    small: 'w-1/4',
    medium: 'w-1/2',
    full: 'w-full',
  };

  const colorClasses = {
    primary: 'border-primary',
    neutral: 'border-border-light dark:border-border-dark',
  };

  return (
    <div
      className={`flex mt-3 mb-0 border-y-2 rounded-full ${alignmentClasses[align]} ${sizeClasses[size]} border-t ${colorClasses[color]} w-full`}
    />
  );
}

export default Divider;
