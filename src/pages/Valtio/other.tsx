import { actions, store } from '@/stores/valtio/index';
import { useSnapshot } from '@alipay/bigfish';
import React from '@alipay/bigfish/react';
import styles from './index.less';

const ValtioOther = () => {
  const { doubleFn } = actions;
  const { learnTest, double } = useSnapshot(store);
  return (
    <div
      className={styles.container}
      onClick={() => {
        doubleFn();
      }}
    >
      ValtioOther --------- {learnTest} {double}
    </div>
  );
};

export default ValtioOther;
