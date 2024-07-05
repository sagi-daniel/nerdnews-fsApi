import CategoryModel from './Category.model';

export default interface SourceModel {
  _id: string;
  sourceName: string;
  sourceType: string;
  sourceLink: string;
  category: CategoryModel;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSourceModel {
  sourceName: string;
  sourceType: string;
  sourceLink: string;
  category: string;
  comment?: string;
}

export interface UpdateSourceModel {
  sourceId: string;
  source: CreateSourceModel;
}
