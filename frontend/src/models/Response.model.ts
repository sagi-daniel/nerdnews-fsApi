export default interface ResponseModel<T, K extends string> {
  status: 'success' | 'error';
  results: number;
  totalItems?: number;
  data: Record<K, T>;
}
