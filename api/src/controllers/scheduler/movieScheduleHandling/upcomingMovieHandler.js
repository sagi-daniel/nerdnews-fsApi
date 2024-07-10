const { fetchGenreMovieApi, fetchUpcomingMovieApi } = require('./fetchUpcomingMovieApi.js');
const AppError = require('../../../utils/appError.js');
const { create, findAll } = require('../../movie/movie.service.js');
const logger = require('../../../utils/logger');

async function upcomingMovieHandler() {
  try {
    logger.info('Fetching upcoming movies...');
    const upcomingMoviesAPI = await fetchUpcomingMovieApi();
    logger.info('Fetching movie genres...');
    const moviesGenreList = await fetchGenreMovieApi();
    logger.info('Fetching existing movies from database...');
    const existingMovies = await findAll();

    logger.info('Processing upcoming movies...');
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
              return genre ? genre.name.toUpperCase() : null;
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
      logger.info(`Creating movie entry in database: ${movie.title}`);
      await create(movie);
    }

    logger.info('Upcoming movies processing completed successfully.');
    return upcomingMovies;
  } catch (error) {
    logger.error(`Error in upcomingMovieHandler: ${error.message}`);
    throw new AppError('Failed to handle upcoming movies', 500);
  }
}

module.exports = upcomingMovieHandler;
