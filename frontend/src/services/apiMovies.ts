import MovieResponseModel from "../models/MovieResponse.model";
import { BASE_URL } from "../utils/constants";

export const getMovies = async (): Promise<MovieResponseModel> => {
  const response = await fetch(`${BASE_URL}/upcomingmovie`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
