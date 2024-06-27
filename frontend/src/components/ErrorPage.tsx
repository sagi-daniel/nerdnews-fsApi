import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from './Logo';
import useMoveBack from '../hooks/useMoveBack';

interface ErrorPageProps {
  errorCode: string | number;
  errorMessage: string;
  errorDescription: string;
}

function ErrorPage({ errorCode, errorMessage, errorDescription }: ErrorPageProps) {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-content-light dark:text-content-dark">
      <Logo align="center" size="small" />
      <div className="text-center mt-10">
        <h1 className="text-9xl font-extrabold text-primary animate-pulse">{errorCode}</h1>
        <h3 className="text-2xl md:text-3xl mb-3">{errorMessage}</h3>
        <p className="text-lg md:text-xl mb-8">{errorDescription}</p>
        <div className="flex justify-center space-x-4">
          <button onClick={moveBack} className="btn-cancel gap-1">
            <FiArrowLeft className="2xl" /> Vissza
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-primary-content rounded-md shadow-md hover:bg-primary-dark transition duration-300"
          >
            Főoldal
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
