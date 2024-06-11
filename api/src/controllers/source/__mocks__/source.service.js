const sourceService = jest.mock('./source.service');

let mockData;

sourceService.create = jest.fn((source) => {
  source.id = mockData.length + 1;
  mockData.push(source);
  return Promise.resolve(source);
});

sourceService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((m) => m.id === id));
});

sourceService.update = jest.fn((id, source) => {
  mockData = mockData.map((m) => (m.id === id ? { ...source, id } : m));
  return Promise.resolve(mockData.find((m) => m.id === id));
});

sourceService.remove = jest.fn((id) => {
  const deletedSource = mockData.find((m) => m.id === id);
  return Promise.resolve(mockData.splice(mockData.indexOf(deletedSource), 1)[0]);
});

sourceService.__setMockData = (data) => {
  mockData = data;
};

module.exports = sourceService;
