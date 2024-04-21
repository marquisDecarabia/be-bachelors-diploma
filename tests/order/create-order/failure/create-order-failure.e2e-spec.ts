import { defineFeature, loadFeature } from 'jest-cucumber';
import { getTestServer, TestServer } from '../../../jestSetupAfterEnv';
import * as request from 'supertest';
import { Id } from '@libs/ddd/interface-adapters/interfaces/id.interface';
import { Product } from '@src/interface-adapters/interfaces/product/product.interface';
import { userPropsSnapshot } from '@libs/test-utils/snapshots/user/user-props-snapshot';
import {
  errorResponseSnapshot,
  errorResponseSnapshotWParams,
} from '@libs/test-utils/snapshots/general/error-response-snapshot';
import { walletPropsSnapshotWithParams } from '@libs/test-utils/snapshots/wallet/wallet-props-spanshot';
import { paginatedPropsSnapshot } from '@libs/test-utils/snapshots/general/paginated-props-snapshot';
import { productPropsSnapshot } from '@libs/test-utils/snapshots/product/product-props-snapshot';

const feature = loadFeature(
  'tests/order/create-order/failure/create-order-failure.feature',
);

defineFeature(feature, (test) => {
  let testServer: TestServer;
  let httpServer: request.SuperTest<request.Test>;

  beforeAll(() => {
    testServer = getTestServer();
    httpServer = request(testServer.serverApplication.getHttpServer());
  });

  test('Creating an order (failure)', ({ given, and, when, then }) => {
    let userId: Id;
    let products: Product[];
    let product: Product;
    let orderResponse;

    given(/^that my user ID is "(.*)"$/, async (id: string) => {
      const result = await httpServer.get(`/v1/users/${id}`).send().expect(200);
      expect(result.body).toMatchSnapshot(userPropsSnapshot);
      userId = { id };
    });

    and(
      /^my wallet balance is "(.*)" "(.*)"$/,
      async (balance: string, currency: string) => {
        const numBalance = Number(balance);
        const res = await httpServer
          .get(`/v1/wallets/user/${userId.id}`)
          .send()
          .expect(200);
        expect(res.body).toMatchSnapshot(
          walletPropsSnapshotWithParams(userId.id, numBalance, currency),
        );
      },
    );

    when('i request products list', async () => {
      const res = await httpServer
        .get('/v1/products?page=1&limit=20')
        .send()
        .expect(200);
      expect(res.body).toMatchSnapshot(paginatedPropsSnapshot);
      res.body.data.forEach((product) => {
        expect(product).toMatchSnapshot(productPropsSnapshot);
      });
      products = res.body.data;
    });

    then(
      /^I see product with name is "(.*)" and price is "(.*)" "(.*)" and status is "(.*)"$/,
      (productName, price, currency, status) => {
        const numPrice = Number(price);
        product = products.find((item) => {
          return (
            item.name === productName &&
            item.price === numPrice &&
            item.currency === currency &&
            item.status === status
          );
        });
        expect(product).toMatchSnapshot(productPropsSnapshot);
      },
    );

    when('I send a request to create an order with this product', async () => {
      orderResponse = await httpServer.post('/v1/orders').send({
        userId: userId.id,
        productId: product.id,
      });
    });

    then('I receive error response', () => {
      expect(orderResponse.body).toMatchSnapshot(errorResponseSnapshot);
    });

    and(
      /^response message is "(.*)" and code is "(.*)" and error is "(.*)"$/,
      (message: string, code: string, error: string) => {
        const numCode = Number(code);
        expect(orderResponse.body).toMatchSnapshot(
          errorResponseSnapshotWParams(numCode, message, error),
        );
      },
    );
  });
});
