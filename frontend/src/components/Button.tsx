interface ButtonProps {
  type: 'submit' | 'reset' | 'button' | undefined;
  size: 'normal' | 'full';
  text: string;
}

function Button({ text, type = 'submit', size = 'normal' }: ButtonProps) {
  const sizeStyle = {
    normal: 'w-auto',
    full: 'w-full',
  };

  return (
    <button
      type={type}
      className={`${sizeStyle[size]} mt-2 bg-primary text-primary-content py-2 rounded-md hover:bg-primary-dark transition-colors`}
    >
      {text}
    </button>
  );
}

export default Button;
