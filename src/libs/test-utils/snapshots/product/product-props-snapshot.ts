export const productPropsSnapshot = {
  id: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  name: expect.any(String),
  price: expect.any(Number),
  status: expect.any(String),
  currency: expect.any(String),
};

export const productPropsSnapshotWithParams = (
  name: string,
  price: number,
  currency: string,
  status: string,
) => {
  return {
    ...productPropsSnapshot,
    name: name,
    price: price,
    currency: currency,
    status: status,
  };
};
