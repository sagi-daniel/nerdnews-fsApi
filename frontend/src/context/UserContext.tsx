import React, { createContext, useContext, ReactNode } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import NewsModel from '../models/News.model';
import MovieModel from '../models/Movie.model';
import { getMyNews, addToMyNews, removeFromMyNews } from '../services/apiMyNews';
import { getMyMovies, addToMyMovies, removeFromMyMovies } from '../services/apiMyMovies';

interface UserContextType {
  news: NewsModel[] | undefined;
  movies: MovieModel[] | undefined;
  isLoading: boolean;
  addToMyNews: (newsId: string) => Promise<void>;
  removeFromMyNews: (newsId: string) => Promise<void>;
  addToMyMovies: (movieId: string) => Promise<void>;
  removeFromMyMovies: (movieId: string) => Promise<void>;
  refreshData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Fetch news query
  const {
    data: news,
    isLoading: newsLoading,
    refetch: refetchNews,
  } = useQuery<NewsModel[]>(['myNews'], getMyNews, {
    onError: (error) => {
      toast.error('Hiba történt a hírek betöltésekor');
      console.error('Failed to fetch news', error);
    },
  });

  // Fetch movies query
  const {
    data: movies,
    isLoading: moviesLoading,
    refetch: refetchMovies,
  } = useQuery<MovieModel[]>(['myMovies'], getMyMovies, {
    onError: (error) => {
      toast.error('Hiba történt a filmek betöltésekor');
      console.error('Failed to fetch movies', error);
    },
  });

  // Mutation hooks for news
  const { mutate: addNewsMutate } = useMutation(addToMyNews, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myNews']);
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['users']);
      refetchNews();
    },
  });

  const { mutate: removeNewsMutate } = useMutation(removeFromMyNews, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myNews']);
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['users']);
      refetchNews();
    },
  });

  // Mutation hooks for movies
  const { mutate: addMovieMutate } = useMutation(addToMyMovies, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myMovies']);
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['users']);
      refetchMovies();
    },
  });

  const { mutate: removeMovieMutate } = useMutation(removeFromMyMovies, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myMovies']);
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['users']);
      refetchMovies();
    },
  });

  const userContextValue: UserContextType = {
    news,
    movies,
    isLoading: newsLoading || moviesLoading,
    addToMyNews: async (newsId: string) => {
      await addNewsMutate(newsId);
    },
    removeFromMyNews: async (newsId: string) => {
      await removeNewsMutate(newsId);
    },
    addToMyMovies: async (movieId: string) => {
      await addMovieMutate(movieId);
    },
    removeFromMyMovies: async (movieId: string) => {
      await removeMovieMutate(movieId);
    },
    refreshData: () => {
      refetchNews();
      refetchMovies();
    },
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
