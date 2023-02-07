export const add = (): Promise<{ status: boolean }> => {
  return new Promise<{ status: boolean }>((resolve) => {
    resolve({ status: true });
  });
};
