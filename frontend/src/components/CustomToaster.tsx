import { Toaster } from 'react-hot-toast';

import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const SuccessIcon = () => <FiCheckCircle className="h-6 w-6 text-success-content" />;
const ErrorIcon = () => <FiXCircle className="h-6 w-6 text-error-content" />;

const CustomToaster = () => (
  <Toaster
    position="top-center"
    gutter={12}
    containerStyle={{ margin: '8px' }}
    toastOptions={{
      success: {
        duration: 3000,
        className: 'text-success-content bg-success text-lg max-w-[500px] p-4 flex items-center space-x-3',
        icon: <SuccessIcon />,
      },
      error: {
        duration: 5000,
        className: 'text-error-content bg-error text-lg max-w-[500px] p-4 flex items-center space-x-3',
        icon: <ErrorIcon />,
      },
    }}
  />
);

export default CustomToaster;
