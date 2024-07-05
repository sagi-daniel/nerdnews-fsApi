import CategoryModel from './Category.model';
import SourceModel from './Source.model';

export default interface NewsModel {
  _id: string;
  release: string;
  source: SourceModel;
  category: CategoryModel;
  title: string;
  link: string;
  content: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNewsModel {
  release: string;
  source: string;
  category: string;
  title: string;
  link: string;
  content: string;
  imageUrl: string;
}

export interface UpdateNewsModel {
  newsId: string;
  news: CreateNewsModel;
}
