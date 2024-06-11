const { mockResponse, mockRequest } = require('jest-mock-req-res');
const AppError = require('../../utils/appError');
const movieController = require('./movie.controller');
const movieService = require('./movie.service');
jest.mock('./movie.service.js');

describe('Movie Controller Tests', () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = require('./__mocks__/mockDataMovie.json');

    movieService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('create() with VALID Data', async () => {
    const VALID_DATA = {
      tmdb_id: 123456,
      release: '2024-08-27T00:00:00.000+00:00',
      title: 'Sample Movie 6',
      overview: 'Sample movie overview 6',
      poster: 'https://sample.com/sample6.jpg',
    };
    const request = mockRequest({
      body: VALID_DATA,
    });

    await movieController.create(request, response, nextFunction);

    expect(movieService.create).toHaveBeenCalledWith(VALID_DATA);
    expect(movieService.create).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        movie: { ...VALID_DATA, id: mockData.length },
      },
    });
  });

  test('create() with INVALID Data ', async () => {
    const INVALID_DATA = '';
    const request = mockRequest({
      body: INVALID_DATA,
    });

    await movieController.create(request, response, nextFunction);

    expect(movieService.create).toHaveBeenCalledWith(INVALID_DATA);
    expect(movieService.create).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Movie could not saved`));
  });

  test('findById() with VALID ID', async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await movieController.findById(request, response, nextFunction);

    expect(movieService.findById).toHaveBeenCalledWith(VALID_ID);
    expect(movieService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: { movie: mockData.find((m) => m.id === VALID_ID) },
    });
  });

  test('findById() with INVALID ID', async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await movieController.findById(request, response, nextFunction);

    expect(movieService.findById).toHaveBeenCalledWith(INVALID_ID);
    expect(movieService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Movie with ${INVALID_ID} ID could not found`));
  });

  test('update() with VALID ID', async () => {
    const VALID_ID = 1;
    const VALID_DATA = {
      tmdb_id: 123456,
      release: '2024-08-27T00:00:00.000+00:00',
      title: 'Sample Movie 6',
      overview: 'Sample movie overview 6',
      poster: 'https://sample.com/sample6.jpg',
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: VALID_ID,
      },
    });

    await movieController.update(request, response, nextFunction);

    expect(movieService.update).toHaveBeenCalledWith(VALID_ID, VALID_DATA);
    expect(movieService.update).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        movie: {
          id: VALID_ID,
          tmdb_id: 123456,
          release: '2024-08-27T00:00:00.000+00:00',
          title: 'Sample Movie 6',
          overview: 'Sample movie overview 6',
          poster: 'https://sample.com/sample6.jpg',
        },
      },
    });
  });

  test('update() with INVALID ID', async () => {
    const INVALID_ID = 0;
    const VALID_DATA = {
      tmdb_id: 123456,
      release: '2024-08-27T00:00:00.000+00:00',
      title: 'Sample Movie 6',
      overview: 'Sample movie overview 6',
      poster: 'https://sample.com/sample6.jpg',
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: INVALID_ID,
      },
    });

    await movieController.update(request, response, nextFunction);

    expect(movieService.update).toHaveBeenCalledWith(INVALID_ID, VALID_DATA);
    expect(movieService.update).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Movie with ${INVALID_ID} ID could not found`));
  });

  test('remove() with VALID ID', async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await movieController.remove(request, response, nextFunction);

    expect(movieService.remove).toHaveBeenCalledWith(VALID_ID);
    expect(movieService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        movie: {
          id: 1,
          tmdb_id: 123456,
          release: '2024-05-27T00:00:00.000+00:00',
          title: 'Sample Movie 1',
          overview: 'Sample movie overview 1',
          poster: 'https://sample.com/sample1.jpg',
        },
      },
    });
  });

  test('remove() with INVALID ID', async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await movieController.remove(request, response, nextFunction);

    expect(movieService.remove).toHaveBeenCalledWith(INVALID_ID);
    expect(movieService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Movie with ${INVALID_ID} ID could not found`));
  });
});
