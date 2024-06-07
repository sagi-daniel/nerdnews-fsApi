import { BASE_URL } from '../utils/constants';
import NewsResponseModel from '../models/NewsResponse.model';

export async function getNews(): Promise<NewsResponseModel> {
  const response = await fetch(`${BASE_URL}/rssnews`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function getTop3FreshNews(): Promise<NewsResponseModel> {
  const response = await fetch(`${BASE_URL}/rssnews/top3fresh`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
