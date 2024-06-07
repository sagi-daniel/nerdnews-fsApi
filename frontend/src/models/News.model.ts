interface SourceModel {
  _id: string;
  sourceName: string;
  sourceType: string;
  sourceLink: string;
  category: string;
  comment: string;
}

interface CategoryModel {
  _id: string;
  categoryName: string;
}

export default interface NewsModel {
  _id: string;
  release: string;
  source: SourceModel;
  category: CategoryModel;
  title: string;
  link: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
