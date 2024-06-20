import axios from 'axios';
import CategoryModel from '../models/Category.model';
import { BASE_URL } from '../utils/constants';

export async function getCategories(): Promise<CategoryModel[]> {
  try {
    const response = await axios.get(`${BASE_URL}/category`);
    return response.data.data.categories;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.statusText || 'Network response was not ok');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
