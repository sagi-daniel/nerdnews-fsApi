import axios from 'axios';
import api from './api';
import { BASE_URL } from '../utils/constants';
import NewsModel, { CreateNewsModel, UpdateNewsModel } from '../models/News.model';

type ResponseKeys = 'news';

const handleRequest = async <T>(
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  responseKey: ResponseKeys,
  data?: NewsModel | CreateNewsModel | UpdateNewsModel | string
): Promise<T | null> => {
  try {
    const response = await api[method](url, data);
    return response.data.data[responseKey];
  } catch (error) {
    throw new Error(`${method.toUpperCase()} request to ${url} failed`);
  }
};

export const getNews = async () => {
  return await handleRequest<NewsModel[]>('get', '/news', 'news');
};

export const createNews = async (news: CreateNewsModel) => {
  return await handleRequest<NewsModel>('post', '/news', 'news', news);
};

export const updateNews = async ({ news, newsId }: UpdateNewsModel) => {
  return await handleRequest<NewsModel>('patch', `/news/${newsId}`, 'news', news);
};

export const deleteNews = async (newsId: string) => {
  return await handleRequest<NewsModel>('delete', `/news/${newsId}`, 'news');
};

export async function getNewsByQuery(
  searchText: string,
  category: string,
  sortOrder: string,
  fromDate: string,
  toDate: string,
  page: string,
  pageSize: string
) {
  const params = {
    searchText,
    category,
    sortOrder,
    fromDate,
    toDate,
    page,
    pageSize,
  };

  try {
    console.log(params);
    const response = await api.get(`${BASE_URL}/news`, { params });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function getTop3FreshNews() {
  const params = {
    sortOrder: 'desc',
  };
  try {
    const response = await api.get(`${BASE_URL}/news/top3fresh`, { params });

    return response.data.data['news'];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function sliderNews() {
  const params = {
    sortOrder: 'desc',
  };
  try {
    const response = await api.get(`${BASE_URL}/news/slider`, { params });
    return response.data.data['news'];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
