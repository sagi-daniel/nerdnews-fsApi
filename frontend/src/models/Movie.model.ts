import { FilterName } from './FiltersOption.model';

export default interface MovieModel {
  _id: string;
  tmdb_id: number;
  release: string;
  title: string;
  overview: string;
  poster: string;
  genre: FilterName[];
  voteAverage: number;
  voteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieModel {
  tmdb_id: number;
  release: string;
  title: string;
  overview: string;
  poster: string;
  genre: FilterName[];
  voteAverage: number;
  voteCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMovieModel {
  movieId: string;
  movie: CreateMovieModel;
}
