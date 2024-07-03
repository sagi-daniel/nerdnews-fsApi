import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CountdownRedirectProps {
  path: string;
  counter: number;
}

function CountdownRedirect({ path, counter }: CountdownRedirectProps) {
  const [count, setCount] = useState(counter);
  const navigate = useNavigate();

  useEffect(() => {
    if (count <= 0) {
      navigate(path);
    } else {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [count, path, navigate]);

  return (
    <div className="text-center mt-4">
      <p>
        Átirányítunk a főoldalra{' '}
        <span className="bg-primary text-primary-content p-2 rounded-full">{count < 10 ? `0${count}` : count}</span>{' '}
        másodperc múlva...
      </p>
    </div>
  );
}

export default CountdownRedirect;
