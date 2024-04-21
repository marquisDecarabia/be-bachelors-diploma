import { Query } from '@libs/ddd/domain/base-classes/query-handler.base';

export class GetUserQuery extends Query {
  constructor(props: GetUserQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
