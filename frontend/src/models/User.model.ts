import MovieModel from './Movie.model';
import NewsModel from './News.model';

export interface UserModel {
  _id: string;
  role: string;
  userName: string;
  email: string;
  userNews: NewsModel[];
  userMovies: MovieModel[];
}
