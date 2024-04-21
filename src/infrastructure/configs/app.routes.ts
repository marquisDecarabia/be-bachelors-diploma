const usersRoot = '/users';
const walletsRoot = '/wallets';
const ordersRoot = '/orders';
const productsRoot = '/products';

export const routesV1 = {
  version: 'v1',
  user: {
    tagInfo: {
      name: 'User',
      description: 'User methods',
    },
    root: usersRoot,
    findById: `${usersRoot}/:id`,
  },
  wallet: {
    tagInfo: {
      name: 'Wallet',
      description: 'Wallet methods, wallet created on user creation',
    },
    root: walletsRoot,
    topUp: `${walletsRoot}/top-up`,
    findByUserId: `${walletsRoot}/user/:userId`,
  },
  order: {
    tagInfo: { name: 'Order', description: 'Orders methods' },
    root: ordersRoot,
  },
  product: {
    tagInfo: { name: 'Product', description: 'Products methods' },
    root: productsRoot,
  },
};
