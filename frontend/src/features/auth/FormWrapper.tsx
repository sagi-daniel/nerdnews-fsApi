import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '../../components/CloseIcon';
import Logo from '../../components/Logo';

type Size = 'small' | 'medium' | 'large';

interface FormWrapperProps {
  label: string;
  size?: Size;
  closePath?: string;
  children: ReactNode;
}

function FormWrapper({ children, label, closePath = '/home', size = 'small' }: FormWrapperProps) {
  const navigate = useNavigate();

  const sizeClasses = {
    small: 'w-full md:w-96',
    medium: 'w-full md:w-1/3',
    large: 'w-full md:w-1/3',
  };

  return (
    <div className={`flex flex-col size-full items-center gap-16 justify-center`}>
      <Logo size="medium" />
      <div className={`relative ${sizeClasses[size]} bg-border-dark text-content-dark p-8 rounded-md w-110`}>
        <CloseIcon onClick={() => navigate(closePath)} />
        <h2 className="mb-6 text-center">{label}</h2>
        {children}
      </div>
    </div>
  );
}

export default FormWrapper;
