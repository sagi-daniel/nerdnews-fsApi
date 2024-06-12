import { useNavigate } from 'react-router-dom';

function useMoveBack(): () => void {
  const navigate = useNavigate();
  return () => navigate(-1);
}

export default useMoveBack;
