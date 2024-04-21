import { ModelBase } from '@libs/ddd/interface-adapters/interfaces/model.base.interface';

export interface User extends ModelBase {
  name: string;
}
