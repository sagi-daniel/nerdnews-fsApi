import NewsResponseModel from '../models/responseModel/NewsResponseModel';
import { BASE_URL } from '../utils/constants';

export async function getNews(): Promise<NewsResponseModel> {
  const response = await fetch(`${BASE_URL}/news`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();

  return responseData;
}

export async function getNewsByQuery(
  category: string,
  sortOrder: string,
  fromDate: string,
  toDate: string,
  page: string,
  pageSize: string
): Promise<NewsResponseModel> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (sortOrder) params.append('sortOrder', sortOrder);
  if (page) params.append('page', page);
  if (pageSize) params.append('pageSize', pageSize);
  if (fromDate) params.append('fromDate', fromDate);
  if (toDate) params.append('toDate', toDate);

  const response = await fetch(`${BASE_URL}/news?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
}

export async function getTop3FreshNews(): Promise<NewsResponseModel> {
  const response = await fetch(`${BASE_URL}/news/top3fresh`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData;
}
