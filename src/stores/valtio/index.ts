import { add } from '@/services/dvaLearn';
import { proxyWithComputed } from 'umi';

export const store = proxyWithComputed(
  {
    learnTest: 0,
  },
  {
    double: (snap) => snap.learnTest * 2,
  },
);

export const actions = {
  async doubleFn() {
    const status = await add();
    if (status) store.learnTest += 1;
  },
};
