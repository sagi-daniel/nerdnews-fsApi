import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import NewsModel from '../models/News.model';
import ResponseModel from '../models/Response.model';

export async function getNews(): Promise<ResponseModel<NewsModel[], 'news'> | Error> {
  try {
    const response = await axios.get(`${BASE_URL}/news?`);
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function getNewsByQuery(
  category: string,
  sortOrder: string,
  fromDate: string,
  toDate: string,
  page: string,
  pageSize: string
): Promise<ResponseModel<NewsModel[], 'news'> | Error> {
  const params = {
    category,
    sortOrder,
    fromDate,
    toDate,
    page,
    pageSize,
  };

  try {
    const response = await axios.get(`${BASE_URL}/news`, { params });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function getTop3FreshNews(): Promise<ResponseModel<NewsModel[], 'news'> | Error> {
  const params = {
    sortOrder: 'desc',
  };
  try {
    const response = await axios.get(`${BASE_URL}/news/top3fresh`, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}

export async function sliderNews(): Promise<ResponseModel<NewsModel[], 'news'> | Error> {
  const params = {
    sortOrder: 'desc',
  };
  try {
    const response = await axios.get(`${BASE_URL}/news/slider`, { params });
    console.log(response);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
