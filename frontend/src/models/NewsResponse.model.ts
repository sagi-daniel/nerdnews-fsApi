import NewsModel from "./News.model";

export default interface MovieResponseModel {
  satus: string;
  results: number;
  data: {
    news: NewsModel[];
  };
}
