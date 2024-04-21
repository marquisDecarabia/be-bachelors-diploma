export interface Paginated<T> {
  data: Array<T>;
  count: number;
  limit: number;
  page: number;
}
