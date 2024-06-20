import MovieModel from '../Movie.model';

export default interface MoviesResponseModel {
  status: 'success' | 'error';
  results: number;
  totalItems: number;
  data: {
    movies: MovieModel[];
  };
}
