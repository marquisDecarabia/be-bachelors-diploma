import { ModelBase } from '@libs/ddd/interface-adapters/interfaces/model.base.interface';

export interface Product extends ModelBase {
  name: string;
  price: number;
  status: string;
  currency: string;
}
