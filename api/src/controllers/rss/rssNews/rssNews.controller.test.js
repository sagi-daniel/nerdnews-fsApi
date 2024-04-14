const { mockResponse, mockRequest } = require("jest-mock-req-res");
const AppError = require("../../../utils/appError");
const rssNewsController = require("./rssNews.controller");
const rssNewsService = require("./rssNews.service");
jest.mock("./rssNews.service.js");

describe("Rss News Controller Tests", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = require("./__mocks__/mockDataRssNews.json");

    rssNewsService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() with VALID Data", async () => {
    const VALID_DATA = {
      release: "2024-04-02T63:29:06.000+00:00",
      category: "6c",
      title: "Sample title 6",
      link: "https://sample6.hu",
      contentSnippet: "",
      imageUrl: "https://sample6.hu/6.jpg",
    };
    const request = mockRequest({
      body: VALID_DATA,
    });

    await rssNewsController.create(request, response, nextFunction);

    expect(rssNewsService.create).toHaveBeenCalledWith(VALID_DATA);
    expect(rssNewsService.create).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssnNews: { ...VALID_DATA, id: mockData.length },
      },
    });
  });

  test("create() with EMPTY Data ", async () => {
    const INVALID_DATA = "";
    const request = mockRequest({
      body: INVALID_DATA,
    });

    await rssNewsController.create(request, response, nextFunction);

    expect(rssNewsService.create).toHaveBeenCalledWith(INVALID_DATA);
    expect(rssNewsService.create).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`News could not saved`)
    );
  });

  test("findById() with VALID ID", async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await rssNewsController.findById(request, response, nextFunction);

    expect(rssNewsService.findById).toHaveBeenCalledWith(VALID_ID);
    expect(rssNewsService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: { rssNews: mockData.find((m) => m.id === VALID_ID) },
    });
  });

  test("findById() with INVALID ID", async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await rssNewsController.findById(request, response, nextFunction);

    expect(rssNewsService.findById).toHaveBeenCalledWith(INVALID_ID);
    expect(rssNewsService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`News with ${INVALID_ID} ID could not found`)
    );
  });

  test("update() with VALID ID", async () => {
    const VALID_ID = 1;
    const VALID_DATA = {
      id: 6,
      release: "2024-04-02T63:29:06.000+00:00",
      category: "6c",
      title: "Sample title 6",
      link: "https://sample6.hu",
      contentSnippet: "",
      imageUrl: "https://sample6.hu/6.jpg",
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: VALID_ID,
      },
    });

    await rssNewsController.update(request, response, nextFunction);

    expect(rssNewsService.update).toHaveBeenCalledWith(VALID_ID, VALID_DATA);
    expect(rssNewsService.update).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssnNews: { ...VALID_DATA, id: VALID_ID },
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

    await rssNewsController.remove(request, response, nextFunction);

    expect(rssNewsService.remove).toHaveBeenCalledWith(VALID_ID);
    expect(rssNewsService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        rssnNews: {
          id: 1,
          release: "2024-04-02T13:29:01.000+00:00",
          category: "1c",
          title: "Sample title 1",
          link: "https://sample1.hu",
          contentSnippet: "",
          imageUrl: "https://sample1.hu/1.jpg",
        },
      },
    });
  });
});
