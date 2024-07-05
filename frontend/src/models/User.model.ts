import MovieModel from './Movie.model';
import NewsModel from './News.model';

export default interface UserModel {
  _id: string;
  role: string;
  userName: string;
  email: string;
  userNews: NewsModel[];
  userMovies: MovieModel[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserModel {
  password: string;
  passwordConfirm: string;
  role: string;
  userName: string;
  email: string;
}

export interface UpdateUserModel {
  user: UserModel;
  userId: string;
}
