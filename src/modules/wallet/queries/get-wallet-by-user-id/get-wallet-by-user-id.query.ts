import { Query } from '@libs/ddd/domain/base-classes/query-handler.base';

export class GetWalletByUserIdQuery extends Query {
  constructor(props: GetWalletByUserIdQuery) {
    super();
    this.userId = props.userId;
  }

  readonly userId: string;
}
