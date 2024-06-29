import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeFromMyNews, addToMyNews } from '../services/apiMyNews';
import { useAuth } from '../context/AuthContext';

interface UseSaveLaterOptions {
  newsId: string;
}

const useSaveLater = ({ newsId }: UseSaveLaterOptions) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setIsSaved(user.userNews.some((news) => news._id === newsId));
    }
  }, [user, newsId]);

  const { mutate: addSaveMutate } = useMutation(addToMyNews, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  const { mutate: removeSavedMutate } = useMutation(removeFromMyNews, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    },
  });

  const handleSaveToggle = async () => {
    try {
      if (isSaved) {
        await removeSavedMutate(newsId);
      } else {
        await addSaveMutate(newsId);
      }
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error updating user news:', err);
    }
  };

  return {
    isSaved,
    handleSaveToggle,
  };
};

export default useSaveLater;
