import CategoryModel from '../models/CategoryModel';
import { BASE_URL } from '../utils/constants';

export async function getCategories(): Promise<CategoryModel[]> {
  const response = await fetch(`${BASE_URL}/category`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const responseData = await response.json();
  return responseData.data.categories;
}
