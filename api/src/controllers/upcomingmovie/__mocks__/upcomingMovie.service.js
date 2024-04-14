const AppError = require("../../../utils/appError");

const upcomingMovieService = jest.mock("./upcomingMovie.service");

let mockData;

upcomingMovieService.create = jest.fn((movie) => {
  movie.id = mockData.length + 1;
  mockData.push(movie);
  return Promise.resolve(movie);
});

upcomingMovieService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((m) => m.id === id));
});

upcomingMovieService.update = jest.fn((id, movie) => {
  mockData = mockData.map((m) => (m.id === id ? { ...movie, id } : m));
  return Promise.resolve(mockData.find((m) => m.id === id));
});

upcomingMovieService.remove = jest.fn((id) => {
  const deletedMovie = mockData.find((m) => m.id === id);
  return Promise.resolve(mockData.splice(mockData.indexOf(deletedMovie), 1)[0]);
});

upcomingMovieService.__setMockData = (data) => {
  mockData = data;
};

module.exports = upcomingMovieService;
