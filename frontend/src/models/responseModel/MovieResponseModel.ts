import MovieModel from '../Movie.model';

export default interface NewsResponseModel {
  status: 'success' | 'error';
  results: number;
  totalItems: number;
  data: {
    movies: MovieModel[];
  };
}
