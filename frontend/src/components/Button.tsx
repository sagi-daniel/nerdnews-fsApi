import { ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: 'primary' | 'neutral' | 'cancel';
  size?: 'normal' | 'full';
  isLoading?: boolean;
  text?: string;
  onClick?: (() => void | undefined) | undefined;
  children?: ReactNode;
}

function Button({
  children,
  text,
  isLoading,
  type = 'button',
  size = 'normal',
  style = 'primary',
  onClick,
}: ButtonProps) {
  const sizeStyle = {
    normal: 'w-auto',
    full: 'w-full',
  };

  const buttonStyle = {
    primary: 'btn-primary',
    neutral: 'btn-neutral',
    cancel: 'btn-cancel',
  };

  return (
    <button
      type={type}
      disabled={isLoading}
      className={`${sizeStyle[size]} ${buttonStyle[style]} gap-2`}
      onClick={onClick}
    >
      {isLoading ? 'Küldés...' : children || text}
    </button>
  );
}

export default Button;
