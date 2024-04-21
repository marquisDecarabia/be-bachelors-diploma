import { defineFeature, loadFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { getTestServer, TestServer } from '../../../jestSetupAfterEnv';
import { Id } from '@libs/ddd/interface-adapters/interfaces/id.interface';
import { Product } from '@src/interface-adapters/interfaces/product/product.interface';
import { userPropsSnapshot } from '@libs/test-utils/snapshots/user/user-props-snapshot';
import { paginatedPropsSnapshot } from '@libs/test-utils/snapshots/general/paginated-props-snapshot';
import {
  productPropsSnapshot,
  productPropsSnapshotWithParams,
} from '@libs/test-utils/snapshots/product/product-props-snapshot';
import { walletPropsSnapshotWithParams } from '@libs/test-utils/snapshots/wallet/wallet-props-spanshot';

const feature = loadFeature(
  'tests/order/create-order/success/create-order-success.feature',
);

defineFeature(feature, (test) => {
  let testServer: TestServer;
  let httpServer: request.SuperTest<request.Test>;

  beforeAll(() => {
    testServer = getTestServer();
    httpServer = request(testServer.serverApplication.getHttpServer());
  });

  afterAll(() => {
    // TODO: clean db after tests are finished OR reinitialize db w/ seed
  });

  test('Creating an order (success)', ({ given, when, then, and }) => {
    let userId: Id;
    let products: Product[];
    let product: Product;
    let orderId: Id;

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
      /^I see product with name is "(.*)" and price is (\d+) "(.*)" and status is "(.*)"$/,
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
      const res = await httpServer
        .post('/v1/orders')
        .send({
          userId: userId.id,
          productId: product.id,
        })
        .expect(201);
      orderId = res.body;
    });

    then('I receive order ID', () => {
      expect(orderId).toMatchSnapshot({
        id: expect.any(String),
      });
    });

    // and('I can see order details by this ID', () => {
    //   // const res = await httpServer.get('v1/orders')
    // });

    and(/^product status is "(.*)"$/, async (status) => {
      const res = await httpServer
        .get('/v1/products?page=1&limit=20')
        .send()
        .expect(200);
      const updatedProduct = res.body.data.find(
        (item) => item.id === product.id,
      );

      expect(updatedProduct).toMatchSnapshot(
        productPropsSnapshotWithParams(
          product.name,
          product.price,
          product.currency,
          status,
        ),
      );
    });

    and(/^my wallet balance is "(.*)" "(.*)"$/, async (balance, currency) => {
      const numBalance = Number(balance);
      const res = await httpServer
        .get(`/v1/wallets/user/${userId.id}`)
        .send()
        .expect(200);
      expect(res.body).toMatchSnapshot(
        walletPropsSnapshotWithParams(userId.id, numBalance, currency),
      );
    });
  });
});
