const { mockResponse, mockRequest } = require("jest-mock-req-res");
const AppError = require("../../../utils/appError");
const rssSourceController = require("./rssSource.controller");
const rssSourceService = require("./rssSource.service");
jest.mock("./rssSource.service.js");

describe("Rss Source Controller Tests", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = require("./__mocks__/mockDataRssSource.json");

    rssSourceService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() with VALID Data", async () => {
    const VALID_DATA = {
      sourceName: "SAMPLE RSS SOURCE 6",
      sourceLink: "https://sample6.com/",
      category: "6c",
      comment: "sample comment 6",
    };
    const request = mockRequest({
      body: VALID_DATA,
    });

    await rssSourceController.create(request, response, nextFunction);

    expect(rssSourceService.create).toHaveBeenCalledWith(VALID_DATA);
    expect(rssSourceService.create).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssSource: { ...VALID_DATA, id: mockData.length },
      },
    });
  });

  test("create() with INVALID Data ", async () => {
    const INVALID_DATA = "";
    const request = mockRequest({
      body: INVALID_DATA,
    });

    await rssSourceController.create(request, response, nextFunction);

    expect(rssSourceService.create).toHaveBeenCalledWith(INVALID_DATA);
    expect(rssSourceService.create).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`Source could not saved`)
    );
  });

  test("findById() with VALID ID", async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await rssSourceController.findById(request, response, nextFunction);

    expect(rssSourceService.findById).toHaveBeenCalledWith(VALID_ID);
    expect(rssSourceService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: { rssSource: mockData.find((m) => m.id === VALID_ID) },
    });
  });

  test("findById() with INVALID ID", async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await rssSourceController.findById(request, response, nextFunction);

    expect(rssSourceService.findById).toHaveBeenCalledWith(INVALID_ID);
    expect(rssSourceService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`Source with ${INVALID_ID} ID could not found`)
    );
  });

  test("update() with VALID ID", async () => {
    const VALID_ID = 1;
    const VALID_DATA = {
      sourceName: "SAMPLE RSS SOURCE 6",
      sourceLink: "https://sample6.com/",
      category: "6c",
      comment: "sample comment 6",
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: VALID_ID,
      },
    });

    await rssSourceController.update(request, response, nextFunction);

    expect(rssSourceService.update).toHaveBeenCalledWith(VALID_ID, VALID_DATA);
    expect(rssSourceService.update).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssSource: { ...VALID_DATA, id: VALID_ID },
      },
    });
  });

  test("update() with INVALID ID", async () => {
    const INVALID_ID = 0;
    const VALID_DATA = {
      sourceName: "SAMPLE RSS SOURCE 6",
      sourceLink: "https://sample6.com/",
      category: "6c",
      comment: "sample comment 6",
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: INVALID_ID,
      },
    });

    await rssSourceController.update(request, response, nextFunction);

    expect(rssSourceService.update).toHaveBeenCalledWith(
      INVALID_ID,
      VALID_DATA
    );
    expect(rssSourceService.update).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`Source with ${INVALID_ID} ID could not found`)
    );
  });

  test("remove() with VALID ID", async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await rssSourceController.remove(request, response, nextFunction);

    expect(rssSourceService.remove).toHaveBeenCalledWith(VALID_ID);
    expect(rssSourceService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssSource: {
          id: 1,
          sourceName: "SAMPLE RSS SOURCE 1",
          sourceLink: "https://sample1.com/",
          category: "1c",
          comment: "sample comment 1",
        },
      },
    });
  });

  test("remove() with INVALID ID", async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await rssSourceController.remove(request, response, nextFunction);

    expect(rssSourceService.remove).toHaveBeenCalledWith(INVALID_ID);
    expect(rssSourceService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`Source with ${INVALID_ID} ID could not found`)
    );
  });
});
