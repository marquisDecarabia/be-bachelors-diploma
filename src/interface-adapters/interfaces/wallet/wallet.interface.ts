import { ModelBase } from '@libs/ddd/interface-adapters/interfaces/model.base.interface';

export interface Wallet extends ModelBase {
  userId: string;
  balance: number;
  currency: string;
}
