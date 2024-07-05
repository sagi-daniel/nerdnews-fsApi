import { FilterName } from './FiltersOption.model';

export default interface CategoryModel {
  _id: string;
  categoryName: FilterName | string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryModel {
  categoryName: FilterName | string;
}

export interface UpdateCategoryModel {
  categoryId: string;
  category: FilterName | string;
}
