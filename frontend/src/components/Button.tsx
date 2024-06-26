interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  size: 'normal' | 'full';
  isLoading?: boolean;
  text: string;
  onClick?: () => void;
}

function Button({ text, isLoading, type = 'submit', size = 'normal' }: ButtonProps) {
  const sizeStyle = {
    normal: 'w-auto',
    full: 'w-full',
  };

  return (
    <button
      type={type}
      disabled={isLoading}
      className={`${sizeStyle[size]} mt-2 bg-primary text-primary-content py-2 rounded-md hover:bg-primary-dark transition-colors disabled:bg-border-light disabled:text-gray-400`}
    >
      {isLoading ? 'Küldés...' : text}
    </button>
  );
}

export default Button;
