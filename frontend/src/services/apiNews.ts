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

export async function getNewsByQuery(
  category: string,
  sortOrder: string,
  fromDate?: string,
  toDate?: string
): Promise<NewsModel[]> {
  const params = new URLSearchParams();
  params.append('category', category);
  params.append('sortOrder', sortOrder);
  if (fromDate) {
    params.append('fromDate', fromDate);
  }
  if (toDate) {
    params.append('toDate', toDate);
  }

  const response = await fetch(`${BASE_URL}/news?${params.toString()}`);
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
