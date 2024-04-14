const { mockResponse, mockRequest } = require("jest-mock-req-res");
const AppError = require("../../utils/appError");
const userController = require("./user.controller");
const userService = require("./user.service");
jest.mock("./user.service.js");

describe("User Controller Tests", () => {
  let mockData;
  let nextFunction;
  let response;

  beforeEach(() => {
    mockData = require("./__mocks__/mockDataUser.json");

    userService.__setMockData(mockData);
    nextFunction = jest.fn();
    response = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("create() with VALID Data", async () => {
    const VALID_DATA = {
      role: "ADMIN",
      firstName: "Jane",
      lastName: "Doe",
      userName: "admin",
      email: "jane@admin.com",
      password: "admin123",
      passwordConfirm: "admin123",
      birthDate: "1990-05-27T00:00:00.000+00:00",
      phone: "06236754758",
      userNews: [
        "660d0796e5991461e9fc51df",
        "660d0796e5991461e9fc51e1",
        "660d0796e5991461e9fc51e5",
        "660d0796e5991461e9fc51e9",
        "660d0796e5991461e9fc51e7",
        "660d0796e5991461e9fc51ed",
      ],
      userMovies: [
        "660d0796e5991461e9fc51df",
        "660d0796e5991461e9fc51e1",
        "660d0796e5991461e9fc51e5",
        "660d0796e5991461e9fc51e9",
        "660d0796e5991461e9fc51e7",
        "660d0796e5991461e9fc51ed",
      ],
    };
    const request = mockRequest({
      body: VALID_DATA,
    });

    await userController.create(request, response, nextFunction);

    expect(userService.create).toHaveBeenCalledWith(VALID_DATA);
    expect(userService.create).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        user: { ...VALID_DATA, id: mockData.length },
      },
    });
  });

  test("create() with EMPTY Data ", async () => {
    const INVALID_DATA = "";
    const request = mockRequest({
      body: INVALID_DATA,
    });

    await userController.create(request, response, nextFunction);

    expect(userService.create).toHaveBeenCalledWith(INVALID_DATA);
    expect(userService.create).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`User could not saved`)
    );
  });

  test("findById() with VALID ID", async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await userController.findById(request, response, nextFunction);

    expect(userService.findById).toHaveBeenCalledWith(VALID_ID);
    expect(userService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: { user: mockData.find((m) => m.id === VALID_ID) },
    });
  });

  test("findById() with INVALID ID", async () => {
    const INVALID_ID = 0;
    const request = mockRequest({
      params: {
        id: INVALID_ID,
      },
    });

    await userController.findById(request, response, nextFunction);

    expect(userService.findById).toHaveBeenCalledWith(INVALID_ID);
    expect(userService.findById).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`User with ${INVALID_ID} ID could not found`)
    );
  });

  test("update() with VALID ID", async () => {
    const VALID_ID = 1;
    const VALID_DATA = {
      role: "ADMIN",
      firstName: "Jane",
      lastName: "Doe",
      userName: "admin",
      email: "jane@admin.com",
      password: "admin123",
      passwordConfirm: "admin123",
      birthDate: "1990-05-27T00:00:00.000+00:00",
      phone: "06236754758",
      userNews: [
        "660d0796e5991461e9fc51df",
        "660d0796e5991461e9fc51e1",
        "660d0796e5991461e9fc51e5",
        "660d0796e5991461e9fc51e9",
        "660d0796e5991461e9fc51e7",
        "660d0796e5991461e9fc51ed",
      ],
      userMovies: [
        "660d0796e5991461e9fc51df",
        "660d0796e5991461e9fc51e1",
        "660d0796e5991461e9fc51e5",
        "660d0796e5991461e9fc51e9",
        "660d0796e5991461e9fc51e7",
        "660d0796e5991461e9fc51ed",
      ],
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: VALID_ID,
      },
    });

    await userController.update(request, response, nextFunction);

    expect(userService.update).toHaveBeenCalledWith(VALID_ID, VALID_DATA);
    expect(userService.update).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        user: {
          id: VALID_ID,
          role: "ADMIN",
          firstName: "Jane",
          lastName: "Doe",
          userName: "admin",
          email: "jane@admin.com",
          password: "admin123",
          passwordConfirm: "admin123",
          birthDate: "1990-05-27T00:00:00.000+00:00",
          phone: "06236754758",
          userNews: [
            "660d0796e5991461e9fc51df",
            "660d0796e5991461e9fc51e1",
            "660d0796e5991461e9fc51e5",
            "660d0796e5991461e9fc51e9",
            "660d0796e5991461e9fc51e7",
            "660d0796e5991461e9fc51ed",
          ],
          userMovies: [
            "660d0796e5991461e9fc51df",
            "660d0796e5991461e9fc51e1",
            "660d0796e5991461e9fc51e5",
            "660d0796e5991461e9fc51e9",
            "660d0796e5991461e9fc51e7",
            "660d0796e5991461e9fc51ed",
          ],
        },
      },
    });
  });

  test("update() with INVALID ID", async () => {
    const INVALID_ID = 0;
    const VALID_DATA = {
      role: "ADMIN",
      firstName: "Jane",
      lastName: "Doe",
      userName: "admin",
      email: "jane@admin.com",
      password: "admin123",
      passwordConfirm: "admin123",
      birthDate: "1990-05-27T00:00:00.000+00:00",
      phone: "06236754758",
      userNews: [
        "660d0796e5991461e9fc51df",
        "660d0796e5991461e9fc51e1",
        "660d0796e5991461e9fc51e5",
        "660d0796e5991461e9fc51e9",
        "660d0796e5991461e9fc51e7",
        "660d0796e5991461e9fc51ed",
      ],
      userMovies: [
        "660d0796e5991461e9fc51df",
        "660d0796e5991461e9fc51e1",
        "660d0796e5991461e9fc51e5",
        "660d0796e5991461e9fc51e9",
        "660d0796e5991461e9fc51e7",
        "660d0796e5991461e9fc51ed",
      ],
    };
    const request = mockRequest({
      body: VALID_DATA,
      params: {
        id: INVALID_ID,
      },
    });

    await userController.update(request, response, nextFunction);

    expect(userService.update).toHaveBeenCalledWith(INVALID_ID, VALID_DATA);
    expect(userService.update).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`User with ${INVALID_ID} ID could not found`)
    );
  });

  test("remove() with VALID ID", async () => {
    const VALID_ID = 1;
    const request = mockRequest({
      params: {
        id: VALID_ID,
      },
    });

    await userController.remove(request, response, nextFunction);

    expect(userService.remove).toHaveBeenCalledWith(VALID_ID);
    expect(userService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        user: {
          id: VALID_ID,
          role: "ADMIN",
          firstName: "John",
          lastName: "Doe",
          userName: "admin",
          email: "john@admin.com",
          password: "admin123",
          passwordConfirm: "admin123",
          birthDate: "1990-05-27T00:00:00.000+00:00",
          phone: "06236754758",
          userNews: [
            "660d0796e5991461e9fc51df",
            "660d0796e5991461e9fc51e1",
            "660d0796e5991461e9fc51e5",
            "660d0796e5991461e9fc51e9",
            "660d0796e5991461e9fc51e7",
            "660d0796e5991461e9fc51ed",
          ],
          userMovies: [
            "660d0796e5991461e9fc51df",
            "660d0796e5991461e9fc51e1",
            "660d0796e5991461e9fc51e5",
            "660d0796e5991461e9fc51e9",
            "660d0796e5991461e9fc51e7",
            "660d0796e5991461e9fc51ed",
          ],
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

    await userController.remove(request, response, nextFunction);

    expect(userService.remove).toHaveBeenCalledWith(INVALID_ID);
    expect(userService.remove).toHaveBeenCalledTimes(1);
    expect(response.json).not.toHaveBeenCalled();
    expect(nextFunction).toHaveBeenCalledWith(
      new AppError(`User with ${INVALID_ID} ID could not found`)
    );
  });
});
