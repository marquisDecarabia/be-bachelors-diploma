import { NonFunctionProperties } from '@libs/types';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { createdAtUpdatedAtMock } from '@libs/test-utils/mocks/generic-model-props.mock';

export const userSeeds: NonFunctionProperties<UserOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: '7e0154e2-aca2-4af6-92b4-bd5c517f5b36',
    name: 'Jhon Doe',
  },
  {
    ...createdAtUpdatedAtMock,
    id: '11299efa-a2ee-4f65-857e-2fff02d2446e',
    name: 'Jane Doe',
  },
];
