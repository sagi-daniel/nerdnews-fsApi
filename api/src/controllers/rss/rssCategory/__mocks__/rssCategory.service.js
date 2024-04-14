const rssCategoryService = jest.mock("./rssCategory.service");

let mockData;

rssCategoryService.create = jest.fn((category) => {
  category.id = mockData.length + 1;
  mockData.push(category);
  return Promise.resolve(category);
});

rssCategoryService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((m) => m.id === id));
});

rssCategoryService.update = jest.fn((id, category) => {
  mockData = mockData.map((m) => (m.id === id ? { ...category, id } : m));
  return Promise.resolve(mockData.find((m) => m.id === id));
});

rssCategoryService.remove = jest.fn((id) => {
  const deletedCategory = mockData.find((m) => m.id === id);
  return Promise.resolve(
    mockData.splice(mockData.indexOf(deletedCategory), 1)[0]
  );
});

rssCategoryService.__setMockData = (data) => {
  mockData = data;
};

module.exports = rssCategoryService;
