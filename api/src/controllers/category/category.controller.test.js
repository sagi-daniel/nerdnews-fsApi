const { mockResponse, mockRequest } = require('jest-mock-req-res');
const AppError = require('../../../utils/appError');
const categoryController = require('./ctegory.controller');
const categoryService = require('./category.service');
jest.mock('./category.service.js');

describe('Category Controller Tests', () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = require('./__mocks__/mockDataCategory.json');

    categoryService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('create() with VALID Data', async () => {
    const VALID_DATA = {
      id: 5,
      categoryName: 'CATEGORY5',
    };
    const request = mockRequest({
      body: VALID_DATA,
    });

    await categoryController.create(request, response, nextFunction);

    expect(categoryService.create).toHaveBeenCalledWith(VALID_DATA);
    expect(categoryService.create).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        category: { ...VALID_DATA, id: mockData.length },
      },
    });
  });

  test('create() with INVALID Data ', async () => {
    const INVALID_DATA = '';
    const request = mockRequest({
      body: INVALID_DATA,
    });

    await categoryController.create(request, response, nextFunction);

    expect(categoryService.create).toHaveBeenCalledWith(INVALID_DATA);
    expect(categoryService.create).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Category could not saved`));
  });

  test('findById() with VALID ID', async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await categoryController.findById(request, response, nextFunction);

    expect(categoryService.findById).toHaveBeenCalledWith(VALID_ID);
    expect(categoryService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: { category: mockData.find((m) => m.id === VALID_ID) },
    });
  });

  test('findById() with INVALID ID', async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await categoryController.findById(request, response, nextFunction);

    expect(categoryService.findById).toHaveBeenCalledWith(INVALID_ID);
    expect(categoryService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Category with ${INVALID_ID} ID could not found`));
  });

  test('update() with VALID ID', async () => {
    const VALID_ID = 1;
    const VALID_DATA = {
      categoryName: 'CATEGORY15',
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: VALID_ID,
      },
    });

    await categoryController.update(request, response, nextFunction);

    expect(categoryService.update).toHaveBeenCalledWith(VALID_ID, VALID_DATA);
    expect(categoryService.update).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        category: {
          id: VALID_ID,
          categoryName: 'CATEGORY15',
        },
      },
    });
  });

  test('update() with INVALID ID', async () => {
    const INVALID_ID = 0;
    const VALID_DATA = {
      categoryName: 'CATEGORY15',
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: INVALID_ID,
      },
    });

    await categoryController.update(request, response, nextFunction);

    expect(categoryService.update).toHaveBeenCalledWith(INVALID_ID, VALID_DATA);
    expect(categoryService.update).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Category with ${INVALID_ID} ID could not found`));
  });

  test('remove() with VALID ID', async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await categoryController.remove(request, response, nextFunction);

    expect(categoryService.remove).toHaveBeenCalledWith(VALID_ID);
    expect(categoryService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: 'success',
      data: {
        category: {
          id: 1,
          categoryName: 'CATEGORY1',
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

    await categoryController.remove(request, response, nextFunction);

    expect(categoryService.remove).toHaveBeenCalledWith(INVALID_ID);
    expect(categoryService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(new AppError(`Category with ${INVALID_ID} ID could not found`));
  });
});
