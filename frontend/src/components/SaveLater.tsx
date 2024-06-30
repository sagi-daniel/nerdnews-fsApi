import { FiStar } from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { useEffect, useState } from 'react';
import AuhtAlertModal from '../pages/authPages/AuhtAlertModal';

interface SaveLaterProps {
  type: 'news' | 'movie';
  itemId: string;
}

function SaveLater({ itemId, type }: SaveLaterProps) {
  const { isAuthenticated } = useAuth();

  const { news, movies, addToMyNews, removeFromMyNews, addToMyMovies, removeFromMyMovies } = useUser();
  const [isSaved, setIsSaved] = useState<boolean | undefined>(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (type === 'news') {
      setIsSaved(news?.some((item) => item._id === itemId));
    } else if (type === 'movie') {
      setIsSaved(movies?.some((item) => item._id === itemId));
    }
  }, [type, itemId, news, movies]);

  const handleSaveToggle = async () => {
    try {
      if (type === 'news') {
        if (isSaved) {
          await removeFromMyNews(itemId);
        } else {
          await addToMyNews(itemId);
        }
      } else if (type === 'movie') {
        if (isSaved) {
          await removeFromMyMovies(itemId);
        } else {
          await addToMyMovies(itemId);
        }
      }
      setIsSaved((prev) => !prev); // Toggle the saved state
    } catch (err) {
      console.error('Error updating saved items:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <span
          onClick={() => setModalVisible(!modalVisible)}
          className="absolute m-1 p-2 rounded-full bg-bg-dark top-1 left-1 text-2xl z-[5] text-primary cursor-pointer"
        >
          <FiStar />
        </span>
        {modalVisible && (
          <AuhtAlertModal
            title="Kérjük, regisztrálj vagy jelentkezz be!"
            description="A funkció használatához regisztráció szükséges. Kérjük, jelentkezz be, vagy hozd létre saját fiókodat az
          alábbi gombok valamelyikére kattintva."
            closeModal={() => setModalVisible(false)}
          />
        )}
      </>
    );
  }

  return (
    <span
      className="absolute m-1 p-2 rounded-full bg-bg-dark top-1 left-1 text-2xl z-[5] text-primary cursor-pointer"
      onClick={handleSaveToggle}
    >
      {!isSaved ? <FiStar /> : <GoStarFill />}
    </span>
  );
}

export default SaveLater;
