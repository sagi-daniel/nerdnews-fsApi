import NewsModel from '../News.model';

export default interface NewsResponseModel {
  status: 'success' | 'error';
  results: number;
  totalItems: number;
  data: {
    news: NewsModel[];
  };
}
