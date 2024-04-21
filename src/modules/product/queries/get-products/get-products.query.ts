import { Query } from '@libs/ddd/domain/base-classes/query-handler.base';

export class GetProductsQuery extends Query {
  constructor(props: GetProductsQuery) {
    super();
    this.limit = props.limit;
    this.page = props.page;
  }

  readonly limit: number;

  readonly page: number;
}
