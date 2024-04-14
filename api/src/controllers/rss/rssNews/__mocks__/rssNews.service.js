const rssNewsService = jest.mock("./rssNews.service");

let mockData;

rssNewsService.create = jest.fn((news) => {
  news.id = mockData.length + 1;
  mockData.push(news);
  return Promise.resolve(news);
});

rssNewsService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((m) => m.id === id));
});

rssNewsService.update = jest.fn((id, news) => {
  mockData = mockData.map((m) => (m.id === id ? { ...news, id } : m));
  return Promise.resolve(mockData.find((m) => m.id === id));
});

rssNewsService.remove = jest.fn((id) => {
  const deletedNews = mockData.find((m) => m.id === id);
  return Promise.resolve(mockData.splice(mockData.indexOf(deletedNews), 1)[0]);
});

rssNewsService.__setMockData = (data) => {
  mockData = data;
};

module.exports = rssNewsService;
