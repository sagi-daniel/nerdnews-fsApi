import { BASE_URL } from '../utils/constants';

import NewsModel from '../models/News.model';

export async function getNews(): Promise<NewsModel[]> {
  const response = await fetch(`${BASE_URL}/news`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData.data.news;
}

export async function getTop3FreshNews(): Promise<NewsModel[]> {
  const response = await fetch(`${BASE_URL}/news/top3fresh`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData.data.news;
}
