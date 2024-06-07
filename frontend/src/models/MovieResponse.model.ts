import MovieModel from "../models/Movie.model";

export default interface MovieResponseModel {
  satus: string;
  results: number;
  data: {
    movies: MovieModel[];
  };
}
