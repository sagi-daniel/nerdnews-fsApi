export default interface MovieModel {
  _id: string;
  tmdb_id: number;
  release: string;
  title: string;
  overview: string;
  poster: string;
  voteAverage: number;
  voteCount: number;
  createdAt: string;
  updatedAt: string;
}
