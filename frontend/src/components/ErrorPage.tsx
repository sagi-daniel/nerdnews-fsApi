import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useMoveBack from '../hooks/useMoveBack';
import Button from './Button';

interface ErrorPageProps {
  errorCode: string | number;
  errorMessage: string;
  errorDescription: string;
}

function ErrorPage({ errorCode, errorMessage, errorDescription }: ErrorPageProps) {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-content-light dark:text-content-dark">
      <div className="text-center mt-10">
        <h1 className="text-9xl font-extrabold text-primary animate-pulse">{errorCode}</h1>
        <h3 className="text-2xl md:text-3xl mb-3">{errorMessage}</h3>
        <p className="text-lg md:text-xl mb-8">{errorDescription}</p>
        <div className="flex justify-center space-x-4">
          <Button style="cancel" onClick={moveBack}>
            <FiArrowLeft className="2xl" /> Vissza
          </Button>
          <Button style="primary" onClick={() => navigate('/')}>
            Főoldal
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
