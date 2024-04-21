export const errorResponseSnapshot = {
  statusCode: expect.any(Number),
  message: expect.any(String),
  error: expect.any(String),
};

export const errorResponseSnapshotWParams = (
  statusCode: number,
  message: string,
  error: string,
) => {
  return {
    statusCode: statusCode,
    message: message,
    error: error,
  };
};
