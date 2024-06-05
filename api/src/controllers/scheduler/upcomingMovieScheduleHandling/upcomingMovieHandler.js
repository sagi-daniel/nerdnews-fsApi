const fetchUpcomingMovieApi = require('./fetchUpcomingMovieApi.js');
const AppError = require('../../../utils/appError.js');
const { create, findAll } = require('../../upcomingmovie/upcomingMovie.service.js');

async function upcomingMovieHandler() {
  const upcomingMoviesAPI = await fetchUpcomingMovieApi();

  const existingMovies = await findAll();
  const upcomingMovies = upcomingMoviesAPI
    .map((movie) => {
      return {
        tmdb_id: movie.id,
        release: new Date(movie.release_date),
        title: movie.title,
        overview: movie.overview,
        poster: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
      };
    })
    .filter((movie) => {
      return !existingMovies.some((existingMovie) => existingMovie.tmdb_id === movie.tmdb_id);
    });

  for (const movie of upcomingMovies) {
    await create(movie);
  }

  return upcomingMovies;
}

module.exports = upcomingMovieHandler;
