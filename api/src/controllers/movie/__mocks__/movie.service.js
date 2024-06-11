const movieService = jest.mock('./movie.service');

let mockData;

movieService.create = jest.fn((movie) => {
  movie.id = mockData.length + 1;
  mockData.push(movie);
  return Promise.resolve(movie);
});

movieService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((m) => m.id === id));
});

movieService.update = jest.fn((id, movie) => {
  mockData = mockData.map((m) => (m.id === id ? { ...movie, id } : m));
  return Promise.resolve(mockData.find((m) => m.id === id));
});

movieService.remove = jest.fn((id) => {
  const deletedMovie = mockData.find((m) => m.id === id);
  return Promise.resolve(mockData.splice(mockData.indexOf(deletedMovie), 1)[0]);
});

movieService.__setMockData = (data) => {
  mockData = data;
};

module.exports = movieService;
