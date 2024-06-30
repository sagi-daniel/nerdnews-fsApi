import { Toaster } from 'react-hot-toast';

import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const SuccessIcon = () => <FiCheckCircle className="h-6 w-6 text-success-content" />;
const ErrorIcon = () => <FiXCircle className="h-6 w-6 text-error-content" />;

const CustomToaster = () => (
  <Toaster
    position="top-right"
    gutter={12}
    containerStyle={{ margin: '8px' }}
    toastOptions={{
      success: {
        duration: 5000,
        className: 'text-primary-content bg-primary text-lg max-w-[500px] p-4 flex items-center space-x-2 rounded-md ',
        icon: <SuccessIcon />,
      },
      error: {
        duration: 5000,
        className: 'text-error-content bg-error text-lg max-w-[500px] p-2 flex items-center space-x-2 rounded-md',
        icon: <ErrorIcon />,
      },
    }}
  />
);

export default CustomToaster;
