const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const TMDB_API_URL = "https://api.themoviedb.org/3/movie/upcoming";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function fetchUpcomingMovieApi() {
  try {
    const res = await axios.get(TMDB_API_URL, {
      headers: {
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return res.data.results;
  } catch (error) {
    throw new Error("Failed to fetch:", error.message);
  }
}

module.exports = fetchUpcomingMovieApi;
