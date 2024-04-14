const { mockResponse, mockRequest } = require("jest-mock-req-res");
const AppError = require("../../../utils/appError");
const rssCategoryController = require("./rssCategory.controller");
const rssCategoryService = require("./rssCategory.service");
jest.mock("./rssCategory.service.js");

describe("Rss Category Controller Tests", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = require("./__mocks__/mockDataRssCategory.json");

    rssCategoryService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() with VALID Data", async () => {
    const VALID_DATA = {
      id: 5,
      categoryName: "CATEGORY5",
    };
    const request = mockRequest({
      body: VALID_DATA,
    });

    await rssCategoryController.create(request, response, nextFunction);

    expect(rssCategoryService.create).toHaveBeenCalledWith(VALID_DATA);
    expect(rssCategoryService.create).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssCategory: { ...VALID_DATA, id: mockData.length },
      },
    });
  });

  test("create() with EMPTY Data ", async () => {
    const INVALID_DATA = "";
    const request = mockRequest({
      body: INVALID_DATA,
    });

    await rssCategoryController.create(request, response, nextFunction);

    expect(rssCategoryService.create).toHaveBeenCalledWith(INVALID_DATA);
    expect(rssCategoryService.create).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`Category could not saved`)
    );
  });

  test("findById() with VALID ID", async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await rssCategoryController.findById(request, response, nextFunction);

    expect(rssCategoryService.findById).toHaveBeenCalledWith(VALID_ID);
    expect(rssCategoryService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: { rssCategory: mockData.find((m) => m.id === VALID_ID) },
    });
  });

  test("findById() with INVALID ID", async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await rssCategoryController.findById(request, response, nextFunction);

    expect(rssCategoryService.findById).toHaveBeenCalledWith(INVALID_ID);
    expect(rssCategoryService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`Category with ${INVALID_ID} ID could not found`)
    );
  });

  test("update() with VALID ID", async () => {
    const VALID_ID = 1;
    const VALID_DATA = {
      categoryName: "CATEGORY15",
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: VALID_ID,
      },
    });

    await rssCategoryController.update(request, response, nextFunction);

    expect(rssCategoryService.update).toHaveBeenCalledWith(
      VALID_ID,
      VALID_DATA
    );
    expect(rssCategoryService.update).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssCategory: {
          id: VALID_ID,
          categoryName: "CATEGORY15",
        },
      },
    });
  });

  test("remove() with VALID ID", async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await rssCategoryController.remove(request, response, nextFunction);

    expect(rssCategoryService.remove).toHaveBeenCalledWith(VALID_ID);
    expect(rssCategoryService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssCategory: {
          id: 1,
          categoryName: "CATEGORY1",
        },
      },
    });
  });
});
