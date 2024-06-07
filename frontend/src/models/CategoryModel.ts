export type CategoryName = 'DEFAULT' | 'TECH' | 'CYBERSEC' | 'GAMING';

export default interface CategoryModel {
  _id: string;
  categoryName: CategoryName;
}
