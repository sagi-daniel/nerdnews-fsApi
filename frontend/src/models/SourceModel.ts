import CategoryModel from './CategoryModel';

export default interface SourceModel {
  _id: string;
  sourceName: string;
  sourceType: string;
  sourceLink: string;
  category: CategoryModel;
  comment: string;
}
