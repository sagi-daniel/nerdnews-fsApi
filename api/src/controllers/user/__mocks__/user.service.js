const userService = jest.mock("./user.service");

let mockData;

userService.create = jest.fn((user) => {
  user.id = mockData.length + 1;
  mockData.push(user);
  return Promise.resolve(user);
});

userService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((m) => m.id === id));
});

userService.update = jest.fn((id, user) => {
  mockData = mockData.map((m) => (m.id === id ? { ...user, id } : m));
  return Promise.resolve(mockData.find((m) => m.id === id));
});

userService.remove = jest.fn((id) => {
  const deletedUser = mockData.find((m) => m.id === id);
  return Promise.resolve(mockData.splice(mockData.indexOf(deletedUser), 1)[0]);
});

userService.__setMockData = (data) => {
  mockData = data;
};

module.exports = userService;
