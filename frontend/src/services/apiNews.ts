import axios from 'axios';
import api from './api';
import NewsModel from '../models/News.model';
import ResponseModel from '../models/Response.model';

interface NewsQueryParams {
  category: string;
  sortOrder: string;
  fromDate: string;
  toDate: string;
  page: string;
  pageSize: string;
}

async function fetchData<T>(url: string, params?: object): Promise<T> {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function getNews(): Promise<ResponseModel<NewsModel[], 'news'>> {
  return fetchData<ResponseModel<NewsModel[], 'news'>>('/news');
}

export async function getNewsByQuery({
  category,
  sortOrder,
  fromDate,
  toDate,
  page,
  pageSize,
}: NewsQueryParams): Promise<ResponseModel<NewsModel[], 'news'>> {
  const params = {
    category,
    sortOrder,
    fromDate,
    toDate,
    page,
    pageSize,
  };

  return fetchData<ResponseModel<NewsModel[], 'news'>>('/news', params);
}

export async function getTop3FreshNews(): Promise<ResponseModel<NewsModel[], 'news'>> {
  const params = {
    sortOrder: 'desc',
  };

  return fetchData<ResponseModel<NewsModel[], 'news'>>('/news/top3fresh', params);
}

export async function sliderNews(): Promise<ResponseModel<NewsModel[], 'news'>> {
  const params = {
    sortOrder: 'desc',
  };

  return fetchData<ResponseModel<NewsModel[], 'news'>>('/news/slider', params);
}
