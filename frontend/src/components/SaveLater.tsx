import { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import { useUserContext } from '../context/UserContext';
import { removeFromMyNews, addToMyNews } from '../services/apiMyNews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SaveLaterSkeleton from './loaders/skeletons/SaveLaterSkeleton';

interface SaveLaterProps {
  newsId: string;
}

function SaveLater({ newsId }: SaveLaterProps) {
  const { userNews, setUserNews } = useUserContext();
  const [isSaved, setIsSaved] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsSaved(userNews.some((news) => news._id === newsId));
  }, [userNews, newsId]);

  const { mutate: addSaveMutate } = useMutation(addToMyNews, {
    onSuccess: (newNews) => {
      setUserNews((prevNews) => [...prevNews, newNews]);
      queryClient.invalidateQueries(['MyNews']);
    },
  });

  const { mutate: removeSavedMutate } = useMutation(removeFromMyNews, {
    onSuccess: (removedNewsId) => {
      setUserNews((prevNews) => prevNews.filter((news) => news._id !== removedNewsId));
      queryClient.invalidateQueries(['MyNews']);
    },
  });

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        removeSavedMutate(newsId);
      } else {
        addSaveMutate(newsId);
      }
    } catch (err) {
      console.error('Error updating user news:', err);
    }
  };

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
