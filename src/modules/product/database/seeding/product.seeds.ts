import { createdAtUpdatedAtMock } from '@libs/test-utils/mocks/generic-model-props.mock';
import { NonFunctionProperties } from '@libs/types';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity';
import { ProductStatuses } from '@modules/product/domain/entities/product.types';

export const productSeeds: NonFunctionProperties<ProductOrmEntity>[] = [
  {
    ...createdAtUpdatedAtMock,
    id: 'abac7164-0ef8-42c5-9ea9-ff72cf46ecaa',
    name: 'Venice 77',
    price: 25.0,
    currency: Currencies.USD,
    status: ProductStatuses.available,
  },
  {
    ...createdAtUpdatedAtMock,
    id: '667fdb7a-5d62-461a-9a49-e28b401b8718',
    name: 'Palm Park',
    price: 46.0,
    currency: Currencies.USD,
    status: ProductStatuses.available,
  },
  {
    ...createdAtUpdatedAtMock,
    id: '826de411-2180-4832-87a3-735f0531d66b',
    name: 'Atlantis',
    price: 130.0,
    currency: Currencies.USD,
    status: ProductStatuses.available,
  },
  {
    ...createdAtUpdatedAtMock,
    id: 'c19c219b-f990-458b-a0f3-0e036186dbdb',
    name: 'Skaftafell',
    price: 46.0,
    currency: Currencies.USD,
    status: ProductStatuses.available,
  },
  {
    ...createdAtUpdatedAtMock,
    id: '1b7521f4-535c-4f99-9a73-6fa592bf1652',
    name: 'Lava Lake',
    price: 150.0,
    currency: Currencies.USD,
    status: ProductStatuses.available,
  },
  {
    ...createdAtUpdatedAtMock,
    id: '4902ae28-f2ff-4a9b-8359-8b1ace9ee9b7',
    name: 'Donut Lake',
    price: 37.73,
    currency: Currencies.USD,
    status: ProductStatuses.available,
  },
  {
    ...createdAtUpdatedAtMock,
    id: 'e6028451-07ff-4e91-b329-1fa5961f3681',
    name: 'Ice Lake',
    price: 275.39,
    currency: Currencies.USD,
    status: ProductStatuses.available,
  },
  {
    ...createdAtUpdatedAtMock,
    id: '0850ead1-ee6d-4e82-bfd7-e47b439c6b91',
    name: 'Coffee Lake',
    price: 35.0,
    currency: Currencies.USD,
    status: ProductStatuses.sold,
  },
];
