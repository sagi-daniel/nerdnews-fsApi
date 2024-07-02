import api from './api';
import { UpdateCategoryModel, CreateCategoryModel, CategoryModel } from '../models/Category.model';

type ResponseKeys = 'category' | 'categories';

const handleRequest = async <T>(
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  responseKey: ResponseKeys,
  data?: CategoryModel | CreateCategoryModel | UpdateCategoryModel | string
): Promise<T | null> => {
  try {
    const response = await api[method](url, data);
    return response.data.data[responseKey];
  } catch (error) {
    throw new Error(`${method.toUpperCase()} request to ${url} failed`);
  }
};

export const getCategories = async () => {
  return await handleRequest<CategoryModel[]>('get', '/category', 'categories');
};

export const createCategory = async (category: CreateCategoryModel) => {
  return await handleRequest<CategoryModel>('post', '/category', 'category', category);
};

export const updateCategory = async ({ category, categoryId }: UpdateCategoryModel) => {
  return await handleRequest<CategoryModel>('patch', `/category/${categoryId}`, 'category', category);
};

export const deleteCategory = async (categoryId: string) => {
  return await handleRequest<CategoryModel>('delete', `/category/${categoryId}`, 'category');
};
