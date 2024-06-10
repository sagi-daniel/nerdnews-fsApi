const { fetchGenreMovieApi, fetchUpcomingMovieApi } = require('./fetchUpcomingMovieApi.js');
const AppError = require('../../../utils/appError.js');
const { create, findAll } = require('../../upcomingmovie/upcomingMovie.service.js');

async function upcomingMovieHandler() {
  try {
    const upcomingMoviesAPI = await fetchUpcomingMovieApi();
    const moviesGenreList = await fetchGenreMovieApi();
    const existingMovies = await findAll();

    const upcomingMovies = upcomingMoviesAPI
      .map((movie) => {
        return {
          tmdb_id: movie.id,
          release: new Date(movie.release_date),
          title: movie.title,
          overview: movie.overview,
          genre: movie.genre_ids
            .map((genreId) => {
              const genre = moviesGenreList.find((g) => g.id === genreId);
              return genre ? genre.name : null;
            })
            .filter((genre) => genre !== null),
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
  } catch (error) {
    throw new AppError('Failed to handle upcoming movies', 500);
  }
}

module.exports = upcomingMovieHandler;
