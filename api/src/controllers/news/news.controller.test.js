const { mockResponse, mockRequest } = require('jest-mock-req-res');
const AppError = require('../../utils/appError');
const newsController = require('./news.controller');
const newsService = require('./news.service');
jest.mock('./news.service.js');

describe('news Controller Tests', () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = require('./__mocks__/mockDatanews.json');

    newsService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('create() with VALID Data', async () => {
    const VALID_DATA = {
      release: '2024-04-02T63:29:06.000+00:00',
      category: '6c',
      title: 'Sample title 6',
      link: 'https://sample6.hu',
      contentSnippet: '',
      imageUrl: 'https://sample6.hu/6.jpg',
    };
    const request = mockRequest({
      body: VALID_DATA,
    });

    await newsController.create(request, response, nextFunction);

    expect(newsService.create).toHaveBeenCalledWith(VALID_DATA);
    expect(newsService.create).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        news: { ...VALID_DATA, id: mockData.length },
      },
    });
  });

  test('create() with INVALID Data ', async () => {
    const INVALID_DATA = '';
    const request = mockRequest({
      body: INVALID_DATA,
    });

    await newsController.create(request, response, nextFunction);

    expect(newsService.create).toHaveBeenCalledWith(INVALID_DATA);
    expect(newsService.create).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`News could not be saved`));
  });

  test('findById() with VALID ID', async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await newsController.findById(request, response, nextFunction);

    expect(newsService.findById).toHaveBeenCalledWith(VALID_ID);
    expect(newsService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: { news: mockData.find((m) => m.id === VALID_ID) },
    });
  });

  test('findById() with INVALID ID', async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await newsController.findById(request, response, nextFunction);

    expect(newsService.findById).toHaveBeenCalledWith(INVALID_ID);
    expect(newsService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`News with ${INVALID_ID} ID could not be found`));
  });

  test('update() with VALID ID', async () => {
    const VALID_ID = 1;
    const VALID_DATA = {
      release: '2024-04-02T63:29:06.000+00:00',
      category: '6c',
      title: 'Sample title 6',
      link: 'https://sample6.hu',
      contentSnippet: '',
      imageUrl: 'https://sample6.hu/6.jpg',
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: VALID_ID,
      },
    });

    await newsController.update(request, response, nextFunction);

    expect(newsService.update).toHaveBeenCalledWith(VALID_ID, VALID_DATA);
    expect(newsService.update).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        news: { ...VALID_DATA, id: VALID_ID },
      },
    });
  });

  test('update() with INVALID ID', async () => {
    const INVALID_ID = 0;
    const VALID_DATA = {
      release: '2024-04-02T63:29:06.000+00:00',
      category: '6c',
      title: 'Sample title 6',
      link: 'https://sample6.hu',
      contentSnippet: '',
      imageUrl: 'https://sample6.hu/6.jpg',
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: INVALID_ID,
      },
    });

    await newsController.update(request, response, nextFunction);

    expect(newsService.update).toHaveBeenCalledWith(INVALID_ID, VALID_DATA);
    expect(newsService.update).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`News with ${INVALID_ID} ID could not be found`));
  });

  test('remove() with VALID ID', async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await newsController.remove(request, response, nextFunction);

    expect(newsService.remove).toHaveBeenCalledWith(VALID_ID);
    expect(newsService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        news: {
          id: 1,
          release: '2024-04-02T13:29:01.000+00:00',
          category: '1c',
          title: 'Sample title 1',
          link: 'https://sample1.hu',
          contentSnippet: '',
          imageUrl: 'https://sample1.hu/1.jpg',
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

    await newsController.remove(request, response, nextFunction);

    expect(newsService.remove).toHaveBeenCalledWith(INVALID_ID);
    expect(newsService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`News with ${INVALID_ID} ID could not be found`));
  });
});
