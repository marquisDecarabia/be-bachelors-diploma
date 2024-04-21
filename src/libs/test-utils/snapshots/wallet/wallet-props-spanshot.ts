export const walletPropsSnapshot = {
  id: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  userId: expect.any(String),
  balance: expect.any(Number),
  currency: expect.any(String),
};

export const walletPropsSnapshotWithParams = (
  userId: string,
  balanceNum: number,
  currency: string,
) => {
  return {
    ...walletPropsSnapshot,
    userId: userId,
    balance: balanceNum,
    currency: currency,
  };
};
