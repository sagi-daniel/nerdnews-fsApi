const newsService = jest.mock('./news.service');

let mockData;

newsService.create = jest.fn((news) => {
  news.id = mockData.length + 1;
  mockData.push(news);
  return Promise.resolve(news);
});

newsService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((m) => m.id === id));
});

newsService.update = jest.fn((id, news) => {
  mockData = mockData.map((m) => (m.id === id ? { ...news, id } : m));
  return Promise.resolve(mockData.find((m) => m.id === id));
});

newsService.remove = jest.fn((id) => {
  const deletedNews = mockData.find((m) => m.id === id);
  return Promise.resolve(mockData.splice(mockData.indexOf(deletedNews), 1)[0]);
});

newsService.__setMockData = (data) => {
  mockData = data;
};

module.exports = newsService;
