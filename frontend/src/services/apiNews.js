import { BASE_URL } from '../utils/constants';

const getNews = async () => {
  const response = await fetch(`${BASE_URL}/rssnews`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export default getNews;
