import { NonFunctionProperties } from '@libs/types';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';
import { createdAtUpdatedAtMock } from '@libs/test-utils/mocks/generic-model-props.mock';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';

export const walletSeeds: NonFunctionProperties<WalletOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231',
    userId: '7e0154e2-aca2-4af6-92b4-bd5c517f5b36',
    balance: 217.35,
    currency: Currencies.USD,
  },
  {
    ...createdAtUpdatedAtMock,
    id: '2e8ec853-c6ce-44e3-b3b8-3ef2c6fa613b',
    userId: '11299efa-a2ee-4f65-857e-2fff02d2446e',
    balance: 119.91,
    currency: Currencies.USD,
  },
];
