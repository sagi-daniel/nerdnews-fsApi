import { FiStar } from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import useLocalStorageState from '../hooks/useLocalStorageState';

function SaveLater() {
  const [isSaved, setIsSaved] = useLocalStorageState(false, 'isSaved');

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <span
      className="absolute top-1 left-1 text-3xl text-yellow-300 cursor-pointer z-[5] hover:animate-pulse"
      onClick={handleSave}
    >
      {!isSaved && <FiStar />}
      {isSaved && <GoStarFill />}
    </span>
  );
}

export default SaveLater;
