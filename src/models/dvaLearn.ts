// Dva
import { add } from '@/services/dvaLearn';

export default {
  namespace: 'dvaLearn',
  state: {
    learnTest: 0,
  },
  reducers: {
    addState(state: { learnTest: any }, { payload }: any) {
      const { num } = payload;
      let learnTest = state.learnTest;
      learnTest += num;
      // 不能仅返回state，否则页面将不更新
      return {
        ...state,
        learnTest,
      };
    },
  },
  effects: {
    *addTest({ payload }: { payload: any }, { call, put }: any) {
      const flag: boolean = yield call(add, payload);
      yield put({ type: 'addState', payload: { num: flag ? 1 : 0 } });
    },
  },
};
